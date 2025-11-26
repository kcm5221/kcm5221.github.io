// blog-auth-worker — Bearer token + /content/commit (정리본)

/* ================== 공통 헤더 ================== */
const TEXT_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
};
const JSON_HEADERS = { ...TEXT_HEADERS, "content-type": "application/json; charset=utf-8" };

/* ================== 설정 상수 ================== */
const PKCE_COOKIE = "pkce";      // 임시 로그인 검증용
const PKCE_TTL_SEC = 5 * 60;     // 5분
const JWT_TTL_SEC = 60 * 60;    // 1시간 (필요 시 15~30분으로)
const RL_WINDOW_MS = 60 * 1000;  // 레이트리밋 1분 윈도우
const RL_MAX_REQ = 5;          // 분당 최대 5회(쓰기)

/* 메모리 레이트리밋(콜드 스타트시 초기화) */
const rateMap = new Map();

/* ================== 유틸: 레이트리밋 ================== */
function isRateLimited(key) {
    const now = Date.now();
    const entry = rateMap.get(key);
    if (!entry) {
        rateMap.set(key, { count: 1, ts: now });
        return false;
    }
    if (now - entry.ts > RL_WINDOW_MS) {
        rateMap.set(key, { count: 1, ts: now });
        return false;
    }
    entry.count += 1;
    return entry.count > RL_MAX_REQ;
}


/* ================== 핸들러 ================== */
export default {
    async fetch(req, env, ctx) {
        try {
            const url = new URL(req.url);
            const origin = req.headers.get("Origin") || "";
            const allowOrigin = env.CORS_ALLOW_ORIGIN || "";

            // CORS
            const cors =
                origin && allowOrigin && origin === allowOrigin
                    ? {
                        "Access-Control-Allow-Origin": allowOrigin,
                        "Vary": "Origin",
                        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                        "Access-Control-Allow-Headers": "authorization,content-type",
                    }
                    : {};

            // Preflight
            if (req.method === "OPTIONS") {
                return new Response(null, { status: 204, headers: { ...TEXT_HEADERS, ...cors } });
            }

            // /health
            if (url.pathname === "/health") {
                return json({ ok: true, service: "blog-auth-worker", time: new Date().toISOString() }, 200, cors);
            }

            // /auth/login — PKCE+state 발급 → GitHub OAuth로 리다이렉트
            if (url.pathname === "/auth/login") {
                const state = base64url(fromRandomBytes(16)); // 시각적 디버깅 용이
                const verifierBytes = fromRandomBytes(32);
                const verifier = base64url(verifierBytes);
                const challenge = await sha256_b64url(verifier);

                const pkcePayload = { s: state, v: verifier, ts: nowSec() };
                const pkceValue = await signCookie(pkcePayload, env.JWT_SECRET);

                const redirectUri = new URL("/auth/callback", getOrigin(url)).toString();
                const authUrl = new URL("https://github.com/login/oauth/authorize");
                authUrl.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
                authUrl.searchParams.set("redirect_uri", redirectUri);
                authUrl.searchParams.set("state", state);
                authUrl.searchParams.set("scope", "read:user");
                authUrl.searchParams.set("code_challenge", challenge);
                authUrl.searchParams.set("code_challenge_method", "s256");

                return new Response(null, {
                    status: 302,
                    headers: {
                        ...TEXT_HEADERS,
                        "Location": authUrl.toString(),
                        "Set-Cookie": cookieSerialize(PKCE_COOKIE, pkceValue, {
                            httpOnly: true, secure: true, sameSite: "Lax", maxAge: PKCE_TTL_SEC, path: "/",
                        }),
                    },
                });
            }

            // /auth/callback — code 교환 → /user → JWT 발급(JSON token 반환)
            if (url.pathname === "/auth/callback") {
                const code = url.searchParams.get("code") || "";
                const state = url.searchParams.get("state") || "";
                if (!code || !state) return jsonErr("invalid_request", 400, cors);

                const cookies = parseCookies(req.headers.get("Cookie") || "");
                const pkceRaw = cookies[PKCE_COOKIE];
                if (!pkceRaw) return jsonErr("pkce_missing", 400, cors);

                const pkceObj = await verifyCookie(pkceRaw, env.JWT_SECRET);
                if (!pkceObj) return jsonErr("pkce_bad_signature", 400, cors);
                if (nowSec() - pkceObj.ts > PKCE_TTL_SEC) return jsonErr("pkce_expired", 400, cors);
                if (pkceObj.s !== state) return jsonErr("state_mismatch", 400, cors);
                const verifier = pkceObj.v;

                // code → access_token
                const redirectUri = new URL("/auth/callback", getOrigin(url)).toString();
                const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
                    method: "POST",
                    headers: { "content-type": "application/json", "accept": "application/json" },
                    body: JSON.stringify({
                        client_id: env.GITHUB_OAUTH_CLIENT_ID,
                        client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
                        code, redirect_uri: redirectUri, code_verifier: verifier,
                    }),
                });
                if (!tokenRes.ok) return jsonErr("token_exchange_failed", 400, cors);
                const tokenJson = await tokenRes.json();
                if (!tokenJson.access_token) return jsonErr("no_access_token", 400, cors);

                // /user
                const userRes = await fetch("https://api.github.com/user", {
                    headers: {
                        "accept": "application/vnd.github+json",
                        "authorization": `Bearer ${tokenJson.access_token}`,
                        "user-agent": "blog-auth-worker",
                    },
                });
                if (!userRes.ok) return jsonErr("user_fetch_failed", 400, cors);
                const user = await userRes.json();
                const login = (user && user.login) || "";
                if (!login) return jsonErr("no_login", 400, cors);

                if (!env.ALLOWED_GITHUB_LOGIN || login.toLowerCase() !== String(env.ALLOWED_GITHUB_LOGIN).toLowerCase()) {
                    return jsonErr("unauthorized_user", 401, cors);
                }

                // JWT 발급 (Bearer)
                // JWT 발급 (Bearer)
                const iat = nowSec();
                const exp = iat + JWT_TTL_SEC;
                const payload = { sub: login, iat, exp, iss: "blog-auth-worker" };
                const jwt = await signJWT({ alg: "HS256", typ: "JWT" }, payload, env.JWT_SECRET);

                // PKCE 임시 쿠키 제거 + 프론트엔드로 리다이렉트
                //   1) env.FRONTEND_BASE_URL > CORS_ALLOW_ORIGIN > 현재 워커 origin 순으로 사용
                const base =
                    env.FRONTEND_BASE_URL ||
                    (env.CORS_ALLOW_ORIGIN || "") ||
                    getOrigin(url);

                // 🔁 정적 블로그로 리다이렉트 (#auth=토큰)
                const appOrigin = (
                    env.FRONTEND_BASE_URL ||           // 1순위: FRONTEND_BASE_URL
                    env.CORS_ALLOW_ORIGIN ||          // 2순위: CORS_ALLOW_ORIGIN
                    getOrigin(url)                    // 마지막 fallback
                ).replace(/\/$/, "");

                const redirectTo = `${appOrigin}/#auth=${encodeURIComponent(jwt)}`;

                return new Response(null, {
                    status: 302,
                    headers: {
                        ...TEXT_HEADERS,
                        ...cors,
                        "Location": redirectTo,
                        // PKCE 임시 쿠키 삭제
                        "Set-Cookie": cookieSerialize(PKCE_COOKIE, "", {
                            httpOnly: true,
                            secure: true,
                            sameSite: "Lax",
                            maxAge: 0,
                            path: "/",
                        }),
                    },
                });

            }

            // /content/commit — 글 작성 커밋 (JWT 필요)
            if (url.pathname === "/content/commit") {
                if (req.method !== "POST") return jsonErr("method_not_allowed", 405, cors);

                // 레이트리밋(간단 메모리 버전)
                const ip = req.headers.get("CF-Connecting-IP") || req.headers.get("x-forwarded-for") || "unknown";
                if (isRateLimited(ip)) return jsonErr("rate_limited", 429, cors);

                // JWT 검증 (Bearer)
                const auth = req.headers.get("authorization") || "";
                const token = (auth.startsWith("Bearer ") && auth.slice(7)) || "";
                const claims = await verifyJWT(token, env.JWT_SECRET);
                if (!claims) return jsonErr("unauthorized", 401, cors);
                const login = claims.sub;

                // 입력 파싱
                let body;
                try { body = await req.json(); } catch { return jsonErr("invalid_json", 400, cors); }

                const { title, slug, tags, collection, cover = null, content, summary = "" } = body || {};

                // 검증
                const vTitle = validateTitle(title);
                const vSlug = validateSlug(slug);
                const vTags = validateTags(tags);
                if (!vTitle.ok) return jsonErr(vTitle.err, 400, cors);
                if (!vSlug.ok) return jsonErr(vSlug.err, 400, cors);
                if (!vTags.ok) return jsonErr(vTags.err, 400, cors);
                if (typeof content !== "string" || content.trim().length < 1) {
                    return jsonErr("content_required", 400, cors);
                }
                if (collection) {
                    const c = collection.trim();
                    // 비어 있지 않고, 너무 길지만 않으면 OK (2~40자)
                    if (!c || c.length > 40) {
                        return jsonErr("bad_collection", 400, cors);
                    }
                }

                // 커버 이미지(data URL or 경로) 처리 준비
                let coverPath = null;
                let coverIsDataUrl = false;
                let coverDataBase64 = null;
                let coverExt = "jpg";

                if (typeof cover === "string" && cover.trim()) {
                    const trimmedCover = cover.trim();
                    if (trimmedCover.startsWith("data:image/")) {
                        const m = trimmedCover.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
                        if (!m) {
                            return jsonErr("bad_cover_dataurl", 400, cors);
                        }
                        const mime = m[1];
                        coverDataBase64 = m[2];
                        coverIsDataUrl = true;

                        if (mime === "image/png") coverExt = "png";
                        else if (mime === "image/webp") coverExt = "webp";
                        else coverExt = "jpg";
                    } else {
                        // 이미 경로/URL 형태로 넘어온 경우
                        coverPath = trimmedCover;
                    }
                }

                // 경로 구성
                const iso = new Date().toISOString();
                const { yyyy, mm } = yyyymm(iso);
                const relPath = `posts/${yyyy}/${mm}/${slug}.md`; // 화이트리스트 루트
                if (!relPath.startsWith(`posts/${yyyy}/${mm}/`)) {
                    return jsonErr("forbidden_path", 400, cors);
                }

                // data URL로 넘어온 커버라면 파일 경로 확정
                let coverRelPath = null;
                if (coverIsDataUrl) {
                    coverRelPath = `images/covers/${yyyy}/${mm}/${slug}.${coverExt}`;
                    coverPath = `/${coverRelPath}`;
                }

                // Frontmatter + Markdown 본문
                const fm = {
                    title: title.trim(),
                    date: iso,
                    tags,
                    collection: collection || null,
                    cover: coverPath || null,
                    summary: summary || null,  // 없으면 4단계에서 자동 생성
                };
                const md = buildMarkdownWithFrontmatter(fm, content);

                // GitHub App Installation Token 발급
                const [owner, repo] = String(env.PRIVATE_REPO || "").split("/");
                if (!owner || !repo) return jsonErr("bad_private_repo_env", 500, cors);

                const appId = env.GITHUB_APP_ID;
                const instId = env.GITHUB_APP_INSTALLATION_ID;
                const pem = env.GITHUB_APP_PRIVATE_KEY;
                if (!appId || !instId || !pem) return jsonErr("github_app_env_missing", 500, cors);

                const appJwt = await signGitHubAppJWT(appId, pem); // RS256
                const instToken = await getInstallationToken(instId, appJwt);
                if (!instToken) return jsonErr("install_token_failed", 500, cors);

                // 커버 이미지 파일 커밋 (data URL로 넘어온 경우만)
                if (coverIsDataUrl && coverRelPath && coverDataBase64) {
                    const coverUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(coverRelPath)}`;
                    const coverCommitMsg = `cover: ${slug} by ${login} @${iso}`;
                    const coverPutRes = await fetch(coverUrl, {
                        method: "PUT",
                        headers: {
                            "accept": "application/vnd.github+json",
                            "authorization": `Bearer ${instToken}`,
                            "user-agent": "blog-auth-worker",
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            message: coverCommitMsg,
                            // data URL에서 이미 base64 부분만 추출했으므로 그대로 사용
                            content: coverDataBase64,
                        }),
                    });
                    if (!coverPutRes.ok) {
                        return jsonErr("cover_commit_failed", 500, cors);
                    }
                }
                // 파일 커밋 (PUT /repos/{owner}/{repo}/contents/{path})
                const commitMsg = `post: ${slug} by ${login} @${iso}`;
                const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(relPath)}`;
                const putRes = await fetch(putUrl, {
                    method: "PUT",
                    headers: {
                        "accept": "application/vnd.github+json",
                        "authorization": `Bearer ${instToken}`,
                        "user-agent": "blog-auth-worker",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        message: commitMsg,
                        content: b64encodeUtf8(md), // ✅ UTF-8 → Base64 (한글/이모지 안전)
                        // branch: "main"
                    }),
                });
                if (!putRes.ok) {
                    const err = await safeText(putRes);
                    console.log("PUT error", putRes.status, err);
                    return jsonErr("git_commit_failed", 500, cors);
                }
                const putJson = await putRes.json();
                const sha = putJson && putJson.commit && putJson.commit.sha;

                // 성공 응답
                return json({ ok: true, repo: `${owner}/${repo}`, path: relPath, sha, date: iso }, 200, cors);
            }

            // 404
            return new Response("Not Found", { status: 404, headers: { ...TEXT_HEADERS, ...cors } });
        } catch (e) {
            console.error(e);
            return new Response(JSON.stringify({ ok: false, error: "internal_error" }), { status: 500, headers: JSON_HEADERS });
        }
    },
};

/* ================== 유틸: 공통 ================== */
function getOrigin(u) { return `${u.protocol}//${u.host}`; }
function nowSec() { return Math.floor(Date.now() / 1000); }
function json(obj, status = 200, extra = {}) { return new Response(JSON.stringify(obj), { status, headers: { ...JSON_HEADERS, ...extra } }); }
function jsonErr(code, status = 400, extra = {}) { return json({ ok: false, error: code }, status, extra); }
async function safeText(res) { try { return await res.text(); } catch { return ""; } }

/* ================== 유틸: 쿠키 ================== */
function parseCookies(str) {
    const out = {};
    str.split(/; */).forEach((pair) => {
        if (!pair) return;
        const idx = pair.indexOf("=");
        const key = decodeURIComponent(pair.slice(0, idx).trim());
        const val = decodeURIComponent(pair.slice(idx + 1).trim());
        out[key] = val;
    });
    return out;
}
function cookieSerialize(name, val, opts = {}) {
    const enc = encodeURIComponent;
    let s = `${name}=${enc(val)}`;
    if (opts.maxAge != null) s += `; Max-Age=${opts.maxAge}`;
    if (opts.domain) s += `; Domain=${opts.domain}`;
    if (opts.path) s += `; Path=${opts.path}`;
    if (opts.expires) s += `; Expires=${opts.expires.toUTCString()}`;
    if (opts.httpOnly) s += `; HttpOnly`;
    if (opts.secure) s += `; Secure`;
    if (opts.sameSite) s += `; SameSite=${opts.sameSite}`;
    return s;
}

/* ================== 유틸: 바이트/해시/베이스64 ================== */
// 랜덤 바이트 (Uint8Array)
function fromRandomBytes(len) {
    const a = new Uint8Array(len);
    crypto.getRandomValues(a);
    return a;
}

// Uint8Array → base64 (대용량 안전)
function base64FromBytes(bytes) {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
}

// 문자열(UTF-8) → base64 (한글/이모지 안전)
function b64encodeUtf8(s) {
    const bytes = new TextEncoder().encode(s);
    return base64FromBytes(bytes);
}

// base64url (Uint8Array 또는 ASCII 문자열 입력 허용)
function base64url(input) {
    const b64 = input instanceof Uint8Array ? base64FromBytes(input) : btoa(input);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

// SHA-256 → base64url
async function sha256_b64url(input) {
    const raw = typeof input === "string" ? new TextEncoder().encode(input) : input;
    const digest = await crypto.subtle.digest("SHA-256", raw);
    return base64url(new Uint8Array(digest));
}

/* ================== 유틸: HMAC JWT(서비스용) ================== */
async function hmacSHA256(keyStr, dataStr) {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(keyStr), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(dataStr));
    return base64url(new Uint8Array(sig));
}
async function signCookie(obj, secret) {
    const payload = base64url(JSON.stringify(obj));
    const sig = await hmacSHA256(secret, payload);
    return `${payload}.${sig}`;
}
async function verifyCookie(raw, secret) {
    const [payload, sig] = raw.split(".");
    if (!payload || !sig) return null;
    const expect = await hmacSHA256(secret, payload);
    if (expect !== sig) return null;
    try {
        return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch { return null; }
}
async function signJWT(headerObj, payloadObj, secret) {
    const enc = (o) => base64url(JSON.stringify(o)); // URL-safe
    const unsigned = `${enc(headerObj)}.${enc(payloadObj)}`;
    const sig = await hmacSHA256(secret, unsigned);
    return `${unsigned}.${sig}`;
}
async function verifyJWT(token, secret) {
    const [h, p, s] = (token || "").split(".");
    if (!h || !p || !s) return null;
    const expect = await hmacSHA256(secret, `${h}.${p}`);
    if (expect !== s) return null;
    try {
        const payload = JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
        const now = nowSec();
        if (typeof payload.exp === "number" && now > payload.exp) return null;
        return payload;
    } catch { return null; }
}

/* ================== 유틸: 입력 검증/문서 생성 ================== */
function validateTitle(v) {
    if (typeof v !== "string") return { ok: false, err: "title_required" };
    const t = v.trim();
    if (t.length < 2 || t.length > 120) return { ok: false, err: "title_length" };
    return { ok: true };
}
function validateSlug(v) {
    if (typeof v !== "string") {
        return { ok: false, err: "slug_required" };
    }
    const s = v.trim();
    // 유니코드 글자(한글/영문 등) + 숫자 + _ - 만 허용, 길이 2~80
    if (!/^[\p{Letter}\p{Number}_-]{2,80}$/u.test(s)) {
        return { ok: false, err: "bad_slug" };
    }
    // 디렉터리 탈출 방지용 안전장치만 유지
    if (s.includes("..")) {
        return { ok: false, err: "bad_slug" };
    }
    return { ok: true };
}
function validateTags(arr) {
    if (!Array.isArray(arr) || arr.length < 1) {
        return { ok: false, err: "missing_tag" };
    }
    for (const t of arr) {
        if (typeof t !== "string") {
            return { ok: false, err: "bad_tag" };
        }
        const s = t.trim();
        // 비어 있거나 너무 길지 않기만 체크 (1~32자)
        if (!s || s.length > 32) {
            return { ok: false, err: "bad_tag" };
        }
    }
    return { ok: true };
}

function yyyymm(iso) {
    const d = new Date(iso);
    const yyyy = d.getUTCFullYear().toString();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    return { yyyy, mm };
}
function buildMarkdownWithFrontmatter(frontmatterObj, content) {
    const yaml = toYAML(frontmatterObj);
    const body = content.endsWith("\n") ? content : content + "\n";
    return `---\n${yaml}---\n\n${body}`;
}
function toYAML(obj) {
    // 매우 단순한 YAML 직렬화(필요 필드만)
    const lines = [];
    for (const [k, v] of Object.entries(obj)) {
        if (v === null || v === undefined) continue;
        if (Array.isArray(v)) {
            lines.push(`${k}:`);
            for (const item of v) lines.push(`  - ${yamlEscape(String(item))}`);
        } else if (typeof v === "string") {
            lines.push(`${k}: ${yamlEscape(v)}`);
        } else {
            lines.push(`${k}: ${JSON.stringify(v)}`);
        }
    }
    return lines.join("\n") + "\n";
}
function yamlEscape(s) {
    if (/[:#{}[\],&*?]|^\s|\'|\"/.test(s)) {
        return JSON.stringify(s); // 따옴표로 감쌈
    }
    return s;
}

/* ================== GitHub App JWT & Installation Token ================== */
// RS256으로 GitHub App JWT 서명
async function signGitHubAppJWT(appId, pem) {
    const header = { alg: "RS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const payload = { iat: now - 60, exp: now + 9 * 60, iss: String(appId) };
    const enc = (o) => base64url(JSON.stringify(o));
    const unsigned = `${enc(header)}.${enc(payload)}`;

    const key = await importPKCS8(pem, "RSASSA-PKCS1-v1_5");
    const sigBuf = await crypto.subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, key, new TextEncoder().encode(unsigned));
    const sig = base64url(new Uint8Array(sigBuf));
    return `${unsigned}.${sig}`;
}

// installation access token 발급
async function getInstallationToken(installationId, appJwt) {
    const url = `https://api.github.com/app/installations/${installationId}/access_tokens`;
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "application/vnd.github+json",
            "authorization": `Bearer ${appJwt}`,
            "user-agent": "blog-auth-worker",
        },
    });
    if (!res.ok) { console.log("installation token err", res.status); return null; }
    const j = await res.json();
    return j.token;
}

/* ================== PKCS8 PEM → CryptoKey ================== */
async function importPKCS8(pem, algName = "RSASSA-PKCS1-v1_5") {
    // -----BEGIN PRIVATE KEY----- / -----BEGIN RSA PRIVATE KEY----- 모두 허용 시도
    const clean = pem.replace(/-----BEGIN [\s\S]+?-----/g, "").replace(/-----END [\s\S]+?-----/g, "").replace(/\s+/g, "");
    const raw = Uint8Array.from(atob(clean), c => c.charCodeAt(0));

    // PKCS#8 시도
    try {
        return await crypto.subtle.importKey(
            "pkcs8",
            raw.buffer,
            { name: algName, hash: "SHA-256" },
            false,
            ["sign"]
        );
    } catch (e) {
        // 대부분 최신 GitHub App 키는 PKCS#1일 수 있음 → 변환 필요
        // 에러가 나면 PKCS#8로 변환해서 넣어주세요.
        throw new Error("Failed to import private key. Ensure the PEM is PKCS#8. (GitHub App 키를 PKCS#8로 변환해 넣어주세요)");
    }
}