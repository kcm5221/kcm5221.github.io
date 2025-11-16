// src/main.ts
import "./style.css";
import { loadInitialFeed } from "./api/feed";
import type { FeedItem } from "./types/Feed";

type Route = "home" | "search" | "profile" | "write" | "authCallback" | "postDetail";
type Tab = "posts" | "saved";

type SidebarItem = {
    id: string;
    label: string;
    icon: IconName;
    route?: Route;
};

type BottomNavItem = {
    id: string;
    icon: IconName;
    route?: Route;
};

interface InfoCard {
    title: string;
    lines: string[];
}

interface ProfileStat {
    label: string;
    value: string;
}

interface DetailComment {
    id: string;
    username: string;
    avatar: string;
    text: string;
    likes: number;
    timeAgo: string;
}

type IconName =
    | "home"
    | "search"
    | "compass"
    | "film"
    | "message"
    | "heart"
    | "plus"
    | "user"
    | "menu"
    | "grid"
    | "bookmark"
    | "tagged"
    | "chevron"
    | "send"
    | "smile";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
    throw new Error("#app element not found");
}

const SIDEBAR_ITEMS: SidebarItem[] = [
    { id: "home", label: "Home", icon: "home", route: "home" },
    { id: "search", label: "Search", icon: "search", route: "search" },
    { id: "profile", label: "Profile", icon: "user", route: "profile" },
    { id: "create", label: "Create", icon: "plus", route: "write" },
];

const BOTTOM_NAV: BottomNavItem[] = [
    { id: "home", icon: "home", route: "home" },
    { id: "search", icon: "search", route: "search" },
    { id: "profile", icon: "user", route: "profile" },
    { id: "create", icon: "plus", route: "write" },
];

const ROUTE_DESCRIPTIONS = {
    home: "Developer",
} as const;

// Worker 베이스 URL (env 우선, 없으면 기본값)
const API_BASE =
    (import.meta as any).env?.VITE_API_BASE ??
    "https://blog-auth-worker.kimcm5221.workers.dev";

// JWT 저장 키
const JWT_STORAGE_KEY = "devlog_jwt";

// JWT payload 타입 (exp만 써도 됨)
interface JwtPayload {
    exp?: number;
    sub?: string;
    iat?: number;
    iss?: string;
}

// base64url → JSON payload 파싱
function parseJwt(token: string): JwtPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payloadBase64 = parts[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/");
        const json = atob(payloadBase64);
        return JSON.parse(json);
    } catch {
        return null;
    }
}

// 만료 체크 포함한 토큰 읽기
function getJwtToken(): string | null {
    try {
        const token = localStorage.getItem(JWT_STORAGE_KEY);
        if (!token) return null;

        const payload = parseJwt(token);
        if (!payload || typeof payload.exp !== "number") {
            // exp 없으면 그냥 쓴다
            return token;
        }

        const now = Math.floor(Date.now() / 1000);
        if (now > payload.exp) {
            // 만료 → 토큰 제거
            localStorage.removeItem(JWT_STORAGE_KEY);
            return null;
        }

        return token;
    } catch {
        return null;
    }
}

function isLoggedIn(): boolean {
    return !!getJwtToken();
}


function bootstrapAuthFromHash() {
    const hash = window.location.hash || "";
    if (!hash.startsWith("#auth=")) return;

    const token = decodeURIComponent(hash.slice("#auth=".length));
    if (!token) return;

    try {
        localStorage.setItem(JWT_STORAGE_KEY, token);
        console.log("✅ JWT 저장 완료");
    } catch (e) {
        console.error("JWT 저장 실패:", e);
    }

    // 해시를 깨끗하게 정리 (#/ 로 돌리기)
    window.location.hash = "#/";
}

// 🔐 GitHub OAuth 콜백(#auth=...)에서 토큰 회수
// URL 해시에서 #auth=토큰 형태를 소비해서 localStorage에 저장
function consumeAuthFromHash(): void {
    const raw = window.location.hash || "";

    // #auth=... 또는 #/auth=... 둘 다 허용
    const match = raw.match(/^#\/?auth=(.+)$/);
    if (!match) return;

    const token = match[1];
    if (!token) return;

    try {
        localStorage.setItem(JWT_STORAGE_KEY, token);
    } catch {
        // localStorage 막힌 환경이면 무시
    }

    // 해시를 깔끔하게 정리하면서 작성 페이지로 이동
    window.location.replace("#/write");
}




const INFO_CARDS: Record<"search" | "write", InfoCard[]> = {
    search: [
        {
            title: "검색 화면 준비 중",
            lines: [
                "태그, 제목, 요약을 동시에 검색하는 통합 입력창",
                "기간과 컬렉션 필터, 즐겨찾기 저장",
                "PKCE 기반 GitHub OAuth 로 권한 제어",
            ],
        },
        {
            title: "릴리스 계획",
            lines: [
                "v0.2 - 전체 검색 API 연결",
                "v0.3 - 저장된 검색 & 공유",
                "v1.0 - Cloudflare Worker 확장",
            ],
        },
    ],
    write: [
        {
            title: "작성 도구",
            lines: [
                "제목 · 슬러그 · 요약 입력 UI",
                "컬렉션/태그 선택 및 미리보기",
                "Cloudflare Worker 로 커밋",
            ],
        },
        {
            title: "보안 메모",
            lines: [
                "PKCE + GitHub App 권한 확인",
                "JWT 1시간 유효",
                "Audit 로그 저장",
            ],
        },
    ],
};

const POST_DETAIL_COMMENTS: DetailComment[] = [
    {
        id: "1",
        username: "dev_mode",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150",
        text: "깊이 있는 글 감사합니다. 구조가 한눈에 들어오네요!",
        likes: 18,
        timeAgo: "2시간 전",
    },
    {
        id: "2",
        username: "infra_lab",
        avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=150",
        text: "Cloudflare Worker 설정 참고해서 따라 해볼게요.",
        likes: 11,
        timeAgo: "1시간 전",
    },
    {
        id: "3",
        username: "frontend_flow",
        avatar: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150",
        text: "UI 디테일 너무 좋아요. JSON feed 연결도 기대됩니다!",
        likes: 7,
        timeAgo: "45분 전",
    },
    {
        id: "4",
        username: "cloudworker",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150",
        text: "Rate limit 처리 팁 공유 부탁드려요 🙌",
        likes: 5,
        timeAgo: "30분 전",
    },
];

const TAB_LABELS: Record<Tab, { label: string; icon: IconName }> = {
    posts: { label: "Posts", icon: "grid" },
    saved: { label: "Saved", icon: "bookmark" },
};

const ICONS: Record<IconName, string> = {
    home: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    `,
    search: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    `,
    compass: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    `,
    film: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 3v18" />
        <path d="M3 7.5h4" />
        <path d="M3 12h18" />
        <path d="M3 16.5h4" />
        <path d="M17 3v18" />
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
      </svg>
    `,
    message: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    `,
    heart: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    `,
    plus: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    `,
    user: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    `,
    menu: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    `,
    grid: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    `,
    bookmark: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    `,
    tagged: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 21a6 6 0 0 0-12 0" />
        <circle cx="12" cy="11" r="4" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    `,
    chevron: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    `,
    send: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 2 11 13" />
        <path d="m22 2-7 20-4-9-9-4Z" />
      </svg>
    `,
    smile: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </svg>
    `,
};

let currentItems: FeedItem[] = [];
let activeTab: Tab = "posts";

function getCurrentRouteFromHash(): Route {
    const hash = window.location.hash || "#/";
    if (hash.startsWith("#/search")) return "search";
    if (hash.startsWith("#/profile")) return "profile";
    if (hash.startsWith("#/write")) return "write";
    if (hash.startsWith("#/auth/callback")) return "authCallback";
    if (hash.startsWith("#/post/")) return "postDetail";
    return "home";
}

function extractPostSlugFromHash(): string | null {
    const hash = window.location.hash || "";
    const match = hash.match(/^#\/post\/([^/?#]+)/);
    if (!match) return null;
    try {
        return decodeURIComponent(match[1]);
    } catch {
        return match[1];
    }
}

function extractTokenFromHash(): string | null {
    const hash = window.location.hash; // "#/auth/callback?token=...."
    const qIndex = hash.indexOf("?");
    if (qIndex === -1) return null;

    const query = hash.slice(qIndex + 1); // "token=...."
    const params = new URLSearchParams(query);
    return params.get("token");
}


function renderAppShell(route: Route, bodyHtml: string) {
    app!.innerHTML = `
      <div class="app-shell">
        ${renderSidebar(route)}
        <div class="main-area">
          ${renderMobileHeader()}
          <div class="main-inner">${bodyHtml}</div>
        </div>
        ${renderBottomNav(route)}
      </div>
    `;

    setupRouteHandlers();
}

function renderSidebar(route: Route): string {
    return `
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${SIDEBAR_ITEMS.map((item) => renderSidebarButton(item, route)).join("")}
        </nav>
      </aside>
    `;
}

function renderSidebarButton(item: SidebarItem, activeRoute: Route): string {
    const isActive = !!item.route && item.route === activeRoute;
    return `
      <button
        class="sidebar-link ${isActive ? "is-active" : ""}"
        type="button"
        ${item.route ? `data-route="${item.route}"` : ""}
      >
        ${iconMarkup(item.icon)}
        <span>${item.label}</span>
      </button>
    `;
}

function renderMobileHeader(): string {
    return `
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${iconMarkup("chevron")}</div>
      </header>
    `;
}

function renderBottomNav(route: Route): string {
    return `
      <nav class="bottom-nav">
        ${BOTTOM_NAV.map((item) => {
        const isActive = !!item.route && item.route === route;
        return `
              <button
                type="button"
                class="bottom-nav-btn ${isActive ? "is-active" : ""}"
                ${item.route ? `data-route="${item.route}"` : ""}
              >
                ${iconMarkup(item.icon)}
              </button>
            `;
    }).join("")}
      </nav>
    `;
}

function iconMarkup(name: IconName): string {
    return `<span class="icon">${ICONS[name]}</span>`;
}

function renderProfileHeader(stats: ProfileStat[], description: string): string {
    return `
      <section class="profile-header">
        <div class="profile-avatar">
          <img src="/profile/profile.jpg" alt="Profile" loading="lazy" />
        </div>
        <div class="profile-details">
          <div class="profile-top-row">
            <h2 class="profile-username">Cheolmin Kim</h2>
          </div>
          <div class="profile-stat-row">
            ${stats
            .map(
                (stat) => `
                      <div class="stat">
                        <span class="stat-value">${escapeHtml(stat.value)}</span>
                        ${escapeHtml(stat.label)}
                      </div>
                    `
            )
            .join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${escapeHtml(description)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `;
}

function renderProfileDetails(): string {
    return `
      <section class="profile-section">
        <div class="profile-section-block">
          <h3>기본 정보</h3>
          <div class="profile-section-body">
            <div class="profile-row">
              <span class="profile-label">이름</span>
              <span class="profile-value">김철민</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">출생</span>
              <span class="profile-value">1996년</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">학력</span>
              <span class="profile-value">원광대학교 원예산업학과 학사</span>
            </div>
          </div>
        </div>

        <div class="profile-section-block">
          <h3>교육 이력</h3>
          <div class="profile-section-body">
            <div class="profile-row">
              <span class="profile-label">2023.05 ~ 2023.11</span>
              <span class="profile-value">
                AWS를 활용한 Java/Spring 기반 풀스택 개발자 양성과정<br />
                이젠컴퓨터아트서비스학원 (전주)
              </span>
            </div>
            <div class="profile-row">
              <span class="profile-label">2024.03 ~ 2024.10</span>
              <span class="profile-value">
                언리얼엔진 기반 게임 개발자 양성과정<br />
                GCC 사관학교 (광주)
              </span>
            </div>
            <div class="profile-row">
              <span class="profile-label">2025.01 ~ 2025.02</span>
              <span class="profile-value">
                42경산 라피신
              </span>
            </div>
          </div>
        </div>

        <div class="profile-section-block">
          <h3>경력</h3>
          <div class="profile-section-body">
            <div class="profile-row">
              <span class="profile-label">2024.10 ~ 2024.12</span>
              <span class="profile-value">루노소프트 기획팀 인턴</span>
            </div>
          </div>
        </div>

        <div class="profile-section-block">
          <h3>스킬</h3>
          <div class="profile-section-body">
            <div class="profile-row">
              <span class="profile-label">언어</span>
              <span class="profile-value">C++</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">게임 엔진</span>
              <span class="profile-value">Unreal Engine / Unity</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">웹</span>
              <span class="profile-value">HTML / CSS</span>
            </div>
          </div>
        </div>
      </section>
    `;
}

function renderTabStrip(): string {
    return `
      <div class="tab-strip" role="tablist">
        ${Object.entries(TAB_LABELS)
            .map(([tab, meta]) => {
                const typed = tab as Tab;
                const isActive = activeTab === typed;
                return `
                  <button
                    class="tab-btn ${isActive ? "is-active" : ""}"
                    role="tab"
                    data-tab="${typed}"
                    type="button"
                  >
                    ${iconMarkup(meta.icon)}
                    <span>${meta.label}</span>
                  </button>
                `;
            })
            .join("")}
      </div>
    `;
}

function renderPostGrid(items: FeedItem[]): string {
    if (items.length === 0) {
        return `<div class="empty-state">조건에 맞는 글이 없습니다.</div>`;
    }

    return `
      <div class="post-grid">
        ${items.map((item) => renderPostTile(item)).join("")}
      </div>
    `;
}

function renderPostTile(item: FeedItem): string {
    const tags = item.tags.length
        ? item.tags.map((tag) => `#${escapeHtml(tag)}`).join(" ")
        : "태그 없음";
    const createdDate = new Date(item.created);
    const createdLabel = isNaN(createdDate.getTime())
        ? "작성일 미정"
        : createdDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    const pseudoLikes = 100 + (item.summary?.length ?? 20);
    const pseudoComments = item.tags.length * 5 + 12;
    const cover = item.cover
        ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(
            item.title
        )}" loading="lazy" />`
        : "";

    return `
      <article class="post-card" data-slug="${escapeHtml(item.slug)}">
        <div class="post-media ${cover ? "" : "is-fallback"}" ${cover ? "" : `style="background:${fallbackGradient(item.slug)}"`}
        >
          ${cover || `<span>${escapeHtml(item.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${escapeHtml(item.title)}</p>
          <p class="overlay-tags">${tags}</p>
          <div class="overlay-meta">
            <span>❤️ ${pseudoLikes.toLocaleString()}</span>
            <span>💬 ${pseudoComments}</span>
          </div>
          <p class="overlay-date">${createdLabel} · ${escapeHtml(item.slug)}</p>
        </div>
      </article>
    `;
}

function slugifyTitle(title: string): string {
    return title
        .trim()
        .toLowerCase()
        // 문자/숫자/공백/하이픈만 남기고 나머지 제거 (한글은 그대로 둠)
        .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
        // 공백을 하이픈으로
        .replace(/\s+/g, "-")
        // 하이픈 중복 제거
        .replace(/-+/g, "-");
}

function fallbackGradient(seed: string): string {
    const colors = ["#fee2e2", "#dbeafe", "#ede9fe", "#dcfce7", "#fef3c7"];
    const index = Math.abs(
        seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % colors.length;
    return `linear-gradient(135deg, ${colors[index]}, #fff)`;
}

function truncateText(text: string, maxLength = 48): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 1)}…`;
}

function renderInfoCards(cards: InfoCard[]): string {
    return `
      <section class="info-grid">
        ${cards
            .map(
                (card) => `
                  <article class="info-card">
                    <h3>${escapeHtml(card.title)}</h3>
                    <ul>
                      ${card.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
                    </ul>
                  </article>
                `
            )
            .join("")}
      </section>
    `;
}

function renderDetailComments(): string {
    if (!POST_DETAIL_COMMENTS.length) {
        return `<p class="post-detail-comment-empty">준비 중인 댓글 더미입니다.</p>`;
    }

    return POST_DETAIL_COMMENTS.map(
        (comment) => `
      <article class="post-detail-comment">
        <img src="${escapeHtml(comment.avatar)}" alt="${escapeHtml(comment.username)}" loading="lazy" />
        <div class="post-detail-comment-content">
          <div class="post-detail-comment-body">
            <span class="comment-author">${escapeHtml(comment.username)}</span>
            ${escapeHtml(comment.text)}
          </div>
          <div class="post-detail-comment-meta">
            <span>${escapeHtml(comment.timeAgo)}</span>
            <button type="button">좋아요 ${comment.likes}</button>
            <button type="button">답글</button>
          </div>
        </div>
        <button type="button" class="post-detail-comment-like" aria-label="댓글 좋아요">
          ${iconMarkup("heart")}
        </button>
      </article>
    `
    ).join("");
}

function buildCommonProfileStats(): ProfileStat[] {
    return [{ label: "posts", value: `${currentItems.length}` }];
}

function renderHomeView() {
    const route: Route = "home";
    const visibleItems = currentItems;

    const stats = buildCommonProfileStats();

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      ${renderTabStrip()}
      ${activeTab === "posts"
            ? renderPostGrid(visibleItems)
            : `<div class="empty-state">${TAB_LABELS[activeTab].label} 뷰는 준비 중입니다.</div>`
        }
    `;

    renderAppShell(route, mainContent);
    bindHomeInteractions();
}

function renderSearchView() {
    const stats = buildCommonProfileStats();

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      ${renderInfoCards(INFO_CARDS.search)}
    `;

    renderAppShell("search", mainContent);
}

function renderPostDetailView(slug: string | null) {
    if (!slug) {
        renderError("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");
        return;
    }

    if (!currentItems.length) {
        renderError("아직 피드를 불러오지 못했습니다. 홈 화면을 한 번 연 뒤 다시 시도해 주세요.");
        return;
    }

    const item = currentItems.find((it) => it.slug === slug);
    if (!item) {
        renderError(`슬러그가 '${slug}'인 글을 찾을 수 없습니다.`);
        return;
    }

    const stats = buildCommonProfileStats();
    const createdDate = new Date(item.created);
    const createdLabel = isNaN(createdDate.getTime())
        ? "작성일 미정"
        : createdDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    const summaryText = (item.summary ?? "요약이 아직 작성되지 않았습니다.").trim();
    const summarySnippet = truncateText(summaryText, 140);
    const readingMinutes = Math.max(2, Math.round((summaryText.length + item.title.length * 6) / 220));
    const pseudoLikes = Math.max(320, 120 + item.title.length * 12 + item.tags.length * 8);

    const tags = item.tags.length
        ? item.tags.map((tag) => `<span class="post-detail-tag">#${escapeHtml(tag)}</span>`).join("")
        : '<span class="post-detail-tag is-empty">태그 없음</span>';

    const cover = item.cover
        ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.title)}" class="post-detail-cover" loading="lazy" />`
        : `
        <div class="post-detail-fallback" style="background:${fallbackGradient(item.slug)}">
          <span class="post-detail-collection-chip">${escapeHtml(item.collection ?? "Gitstagram")}</span>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(summarySnippet)}</p>
        </div>
      `;

    const index = currentItems.findIndex((it) => it.slug === item.slug);
    const prevItem = index > 0 ? currentItems[index - 1] : null;
    const nextItem = index >= 0 && index < currentItems.length - 1 ? currentItems[index + 1] : null;

    const buildNavBtn = (direction: "prev" | "next", target: FeedItem | null) => {
        if (!target) {
            return `<span class="post-detail-nav-btn is-disabled">${direction === "prev" ? "첫 글입니다" : "마지막 글입니다"}</span>`;
        }
        const arrow = direction === "prev" ? "←" : "→";
        return `
        <a class="post-detail-nav-btn" href="#/post/${encodeURIComponent(target.slug)}">
          ${arrow} ${escapeHtml(truncateText(target.title, 28))}
        </a>
      `;
    };

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      <section class="post-detail">
        <div class="post-detail-container">
          <div class="post-detail-media">
            ${cover}
          </div>
          <div class="post-detail-panel">
            <header class="post-detail-header">
              <div class="post-detail-author">
                <img src="/profile/profile.jpg" alt="Cheolmin Kim" loading="lazy" />
                <div>
                  <p>Cheolmin Kim</p>
                  <span>${createdLabel}</span>
                </div>
              </div>
              <div class="post-detail-header-actions">
                <button type="button" class="post-detail-action-btn" aria-label="모든 메뉴">${iconMarkup("menu")}</button>
              </div>
            </header>
            <div class="post-detail-nav">
              ${buildNavBtn("prev", prevItem)}
              ${buildNavBtn("next", nextItem)}
            </div>
            <div class="post-detail-scroll">
              <div class="post-detail-summary">
                ${escapeHtml(summaryText)}
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${createdLabel}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${escapeHtml(item.collection ?? "지정 없음")}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">슬러그</span>
                  <span class="post-detail-meta-value">${escapeHtml(item.slug)}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">예상 읽기</span>
                  <span class="post-detail-meta-value">${readingMinutes}분</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${tags}
              </div>
              <div class="post-detail-body">
                <h4>본문</h4>
                <div id="post-body" class="post-detail-body-content">
                  <p>본문을 불러오는 중입니다...</p>
                </div>
              </div>
              <div class="post-detail-comments">
                <h4>최근 메모</h4>
                ${renderDetailComments()}
              </div>
            </div>
            <div class="post-detail-footer">
              <div class="post-detail-actions">
                <div class="post-detail-action-buttons">
                  <button type="button" id="post-like-btn" class="post-detail-action-btn" aria-label="좋아요" aria-pressed="false">${iconMarkup("heart")}</button>
                  <button type="button" class="post-detail-action-btn" aria-label="댓글">${iconMarkup("message")}</button>
                  <button type="button" class="post-detail-action-btn" aria-label="공유">${iconMarkup("send")}</button>
                </div>
                <button type="button" id="post-save-btn" class="post-detail-action-btn" aria-label="저장" aria-pressed="false">${iconMarkup("bookmark")}</button>
              </div>
              <div class="post-detail-likes">${pseudoLikes.toLocaleString()}명이 이 글을 읽었어요</div>
              <div class="post-detail-timestamp">${createdLabel} · ${escapeHtml(item.slug)}</div>
              <div class="post-detail-comment-input">
                <button type="button" class="post-detail-emoji-btn" aria-label="이모지">${iconMarkup("smile")}</button>
                <input type="text" id="post-comment-input" placeholder="느낀점을 남겨주세요" />
                <button type="button" id="post-comment-submit" class="post-detail-submit-btn" disabled>게시</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // 상세 페이지에서도 프로필 탭이 활성화된 느낌을 주기 위해 route는 "profile"로 사용
    renderAppShell("profile", mainContent);
    bindPostDetailInteractions();
    loadAndRenderPostBody(item);
}

async function loadAndRenderPostBody(item: FeedItem) {
    const container = document.querySelector<HTMLDivElement>("#post-body");
    if (!container) return;

    try {
        const markdown = await fetchPostMarkdown(item);
        const { body } = splitFrontmatter(markdown);
        const html = renderMarkdown(body.trim());
        container.innerHTML = html || "<p>본문이 비어 있습니다.</p>";
    } catch (e) {
        console.error(e);
        container.innerHTML =
            "<p>본문을 불러오지 못했습니다. GitHub Pages 설정 또는 경로를 확인해 주세요.</p>";
    }
}

function bindPostDetailInteractions() {
    const commentInput = document.querySelector<HTMLInputElement>("#post-comment-input");
    const submitBtn = document.querySelector<HTMLButtonElement>("#post-comment-submit");
    const likeBtn = document.querySelector<HTMLButtonElement>("#post-like-btn");
    const saveBtn = document.querySelector<HTMLButtonElement>("#post-save-btn");

    if (commentInput && submitBtn) {
        const syncState = () => {
            const hasText = commentInput.value.trim().length > 0;
            submitBtn.disabled = !hasText;
            submitBtn.classList.toggle("is-active", hasText);
        };
        commentInput.addEventListener("input", syncState);
    }

    if (likeBtn) {
        likeBtn.addEventListener("click", () => {
            const nextState = !likeBtn.classList.contains("is-active");
            likeBtn.classList.toggle("is-active", nextState);
            likeBtn.setAttribute("aria-pressed", nextState ? "true" : "false");
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const nextState = !saveBtn.classList.contains("is-active");
            saveBtn.classList.toggle("is-active", nextState);
            saveBtn.setAttribute("aria-pressed", nextState ? "true" : "false");
        });
    }
}

function renderProfileView() {
    const stats = buildCommonProfileStats();

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      ${renderProfileDetails()}
    `;

    renderAppShell("profile", mainContent);
}

function renderWriteView() {
    const stats = buildCommonProfileStats();

    // 1) 로그인 안 되어 있으면: 로그인 유도 화면
    if (!isLoggedIn()) {
        const mainContent = `
          ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
          <section class="profile-section">
            <article class="info-card">
              <h3>로그인이 필요합니다</h3>
              <div class="profile-section-body">
                <p class="write-hint">
                  GitHub OAuth로 본인 확인 후, 이 블로그에서 글을 작성할 수 있습니다.
                  (현재는 소유자 계정만 작성 가능하도록 제한되어 있습니다.)
                </p>
                <div class="write-actions">
                  <button type="button" id="write-login-btn" class="primary">
                    GitHub로 로그인
                  </button>
                </div>
              </div>
            </article>
          </section>
        `;

        renderAppShell("write", mainContent);

        const loginBtn = document.querySelector<HTMLButtonElement>("#write-login-btn");
        loginBtn?.addEventListener("click", () => {
            // Worker의 /auth/login 으로 이동 → PKCE + OAuth 시작
            window.location.href = `${API_BASE}/auth/login`;
        });

        return;
    }

    // 2) 로그인 되어 있으면: 작성 폼 렌더
    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      <section class="profile-section">
        <article class="info-card">
          <h3>새 글 작성</h3>
          <form id="write-form" class="write-form">
            <div class="profile-section-body">
              
              <!-- 제목 -->
              <div class="profile-row">
                <div class="profile-label">제목 *</div>
                <div class="profile-value">
                  <input
                    id="write-title"
                    type="text"
                    placeholder="예: Cloudflare Workers로 GitHub 블로그 자동화"
                    class="write-input"
                  />
                </div>
              </div>

              <!-- 슬러그 -->
              <div class="profile-row">
                <div class="profile-label">슬러그 *</div>
                <div class="profile-value">
                  <input
                    id="write-slug"
                    type="text"
                    placeholder="예: cloudflare-workers-github-blog"
                    class="write-input"
                  />
                  <p class="write-hint">제목을 입력하면 자동으로 생성되며, 직접 수정도 가능합니다.</p>
                </div>
              </div>

              <!-- 요약 -->
              <div class="profile-row">
                <div class="profile-label">요약</div>
                <div class="profile-value">
                  <textarea
                    id="write-summary"
                    rows="3"
                    placeholder="이 글에서 다루는 내용을 한두 문장으로 정리해 주세요."
                    class="write-textarea"
                  ></textarea>
                </div>
              </div>

              <!-- 태그 -->
              <div class="profile-row">
                <div class="profile-label">태그 *</div>
                <div class="profile-value">
                  <input
                    id="write-tags"
                    type="text"
                    placeholder="예: devlog, cloudflare, github"
                    class="write-input"
                  />
                  <p class="write-hint">쉼표 또는 공백으로 여러 태그를 구분합니다. (최소 1개 이상)</p>
                </div>
              </div>

              <!-- 컬렉션 -->
              <div class="profile-row">
                <div class="profile-label">컬렉션</div>
                <div class="profile-value">
                  <input
                    id="write-collection"
                    type="text"
                    placeholder="예: 게임개발, 블로그 인프라, 코테 기록"
                    class="write-input"
                  />
                  <p class="write-hint">선택 사항입니다. 나중에 상세 페이지에서 변경할 수 있습니다.</p>
                </div>
              </div>

              <!-- 본문 -->
              <div class="profile-row">
                <div class="profile-label">본문 *</div>
                <div class="profile-value">
                  <textarea
                    id="write-body"
                    rows="10"
                    placeholder="Markdown 형식으로 본문을 작성해 주세요."
                    class="write-textarea"
                  ></textarea>
                  <p class="write-hint">지금은 미리보기 없이 textarea만 사용합니다. (나중에 Preview 탭 추가 예정)</p>
                </div>
              </div>

              <!-- 에러 메시지 -->
              <div id="write-error" class="write-error" style="display:none;"></div>

              <!-- 액션 버튼 -->
              <div class="write-actions">
                <button type="button" id="write-reset" class="secondary">초기화</button>
                <button type="submit" id="write-submit" class="primary">게시</button>
              </div>
            </div>
          </form>
        </article>
      </section>
    `;

    renderAppShell("write", mainContent);
    setupWriteViewInteractions();
}

function bindHomeInteractions() {
    const tabButtons = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab as Tab | undefined;
            if (!tab) return;
            activeTab = tab;
            renderHomeView();
        });
    });

    // ✅ 게시물 카드 클릭 → 상세 페이지로 이동
    const postCards = document.querySelectorAll<HTMLElement>(".post-card[data-slug]");
    postCards.forEach((card) => {
        card.addEventListener("click", () => {
            const slug = card.dataset.slug;
            if (!slug) return;
            window.location.hash = `#/post/${encodeURIComponent(slug)}`;
        });
    });
}


function setupWriteViewInteractions() {
    const form = document.querySelector<HTMLFormElement>("#write-form");
    if (!form) return;

    const titleInput = form.querySelector<HTMLInputElement>("#write-title");
    const slugInput = form.querySelector<HTMLInputElement>("#write-slug");
    const summaryInput = form.querySelector<HTMLTextAreaElement>("#write-summary");
    const tagsInput = form.querySelector<HTMLInputElement>("#write-tags");
    const collectionInput = form.querySelector<HTMLInputElement>("#write-collection");
    const bodyInput = form.querySelector<HTMLTextAreaElement>("#write-body");
    const submitBtn = form.querySelector<HTMLButtonElement>("#write-submit");
    const resetBtn = form.querySelector<HTMLButtonElement>("#write-reset");
    const errorBox = form.querySelector<HTMLDivElement>("#write-error");

    if (!titleInput || !slugInput || !tagsInput || !bodyInput || !submitBtn || !errorBox) {
        return;
    }

    // 제목 입력 시 슬러그 자동 생성 (사용자가 슬러그를 직접 수정한 후에는 자동 변경 중단)
    titleInput.addEventListener("input", () => {
        if (slugInput.dataset.userEdited === "1") return;
        slugInput.value = slugifyTitle(titleInput.value);
    });

    slugInput.addEventListener("input", () => {
        slugInput.dataset.userEdited = "1";
    });

    // 초기화 버튼
    resetBtn?.addEventListener("click", () => {
        form.reset();
        slugInput.dataset.userEdited = "0";
        errorBox.style.display = "none";
        errorBox.textContent = "";
    });

    // 폼 제출
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = titleInput.value.trim();
        const slug = slugInput.value.trim();
        const summary = summaryInput?.value.trim() ?? "";
        const tagsRaw = tagsInput.value;
        const collection = collectionInput?.value.trim() ?? "";
        const body = bodyInput.value.trim();

        const errors: string[] = [];

        if (!title) errors.push("제목을 입력해 주세요.");
        if (!slug) errors.push("슬러그를 입력해 주세요.");

        const tags = tagsRaw
            .split(/[,\s]+/)
            .map((t) => t.trim())
            .filter(Boolean);

        if (tags.length === 0) {
            errors.push("태그를 한 개 이상 입력해 주세요.");
        }

        if (body.length < 10) {
            errors.push(
                "본문을 10자 이상 작성해 주세요. (현재 글자 수: " + body.length + ")"
            );
        }

        if (errors.length > 0) {
            errorBox.textContent = errors.join(" / ");
            errorBox.style.display = "block";
            return;
        }

        errorBox.style.display = "none";

        // ✅ Worker가 기대하는 필드 이름에 맞게 body → content 로 변경
        const payload: CommitPayload = {
            title,
            slug,
            summary,
            tags,
            collection: collection || null,
            content: body,
        };

        console.log("✏️ 새 글 작성 payload:", payload);

        submitBtn.disabled = true;
        const originalLabel = submitBtn.textContent;
        submitBtn.textContent = "게시 중...";

        try {
            const result = await submitPostToWorker(payload);
            console.log("✅ Worker 응답:", result);

            submitBtn.textContent = "게시 완료";

            // 폼 초기화
            form.reset();
            slugInput.dataset.userEdited = "0";

            window.alert(
                "작성 요청이 성공적으로 전송되었습니다.\n" +
                "잠시 후 private 저장소에 커밋이 반영됩니다."
            );

            // 홈으로 이동 (원래 로직 유지)
            window.location.hash = "#/";
        } catch (err) {
            const msg =
                err instanceof Error
                    ? err.message
                    : "작성 중 알 수 없는 오류가 발생했습니다.";
            errorBox.textContent = msg;
            errorBox.style.display = "block";
            submitBtn.textContent = originalLabel;
            submitBtn.disabled = false;
        }
    });
}

function setupRouteHandlers() {
    const routeButtons = document.querySelectorAll<HTMLButtonElement>("[data-route]");
    routeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.route as Route | undefined;
            if (!target) return;

            if (target === "home") {
                window.location.hash = "#/";
            } else if (target === "search") {
                window.location.hash = "#/search";
            } else if (target === "profile") {
                window.location.hash = "#/profile";
            } else if (target === "write") {
                window.location.hash = "#/write";
            }
        });
    });
}

function renderLoading() {
    app!.innerHTML = `
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `;
}

function renderError(message: string) {
    app!.innerHTML = `
      <div class="view-state">
        <p>${escapeHtml(message)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `;

    const btn = document.querySelector<HTMLButtonElement>("#reload");
    btn?.addEventListener("click", () => {
        bootstrap();
    });
}

function escapeHtml(str: string): string {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildPostMarkdownUrl(item: FeedItem): string {
    const d = new Date(item.created);
    if (!isNaN(d.getTime())) {
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
        return `/posts/${yyyy}/${mm}/${encodeURIComponent(item.slug)}.md`;
    }
    // created 값을 신뢰할 수 없는 경우 fallback
    return `/posts/${encodeURIComponent(item.slug)}.md`;
}

async function fetchPostMarkdown(item: FeedItem): Promise<string> {
    const url = buildPostMarkdownUrl(item);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`Markdown 로드 실패: ${res.status} ${res.statusText} (${url})`);
    }
    return await res.text();
}

function splitFrontmatter(markdown: string): { frontmatter: string; body: string } {
    if (!markdown.startsWith("---")) {
        return { frontmatter: "", body: markdown };
    }
    const lines = markdown.split(/\r?\n/);
    if (lines[0].trim() !== "---") {
        return { frontmatter: "", body: markdown };
    }
    let endIndex = -1;
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "---") {
            endIndex = i;
            break;
        }
    }
    if (endIndex === -1) {
        return { frontmatter: "", body: markdown };
    }
    const front = lines.slice(1, endIndex).join("\n");
    const body = lines.slice(endIndex + 1).join("\n");
    return { frontmatter: front, body };
}

// 아주 단순한 Markdown → HTML 변환기 (헤더/단락/코드블럭/리스트 정도만 지원)
function renderMarkdown(md: string): string {
    const lines = md.split(/\r?\n/);
    let html = "";
    let inCode = false;
    let inList = false;

    function closeList() {
        if (inList) {
            html += "</ul>";
            inList = false;
        }
    }

    for (let raw of lines) {
        const line = raw.replace(/\s+$/, "");

        // ``` 코드블럭 토글
        if (line.trim().startsWith("```")) {
            if (!inCode) {
                closeList();
                html += "<pre><code>";
                inCode = true;
            } else {
                html += "</code></pre>";
                inCode = false;
            }
            continue;
        }

        if (inCode) {
            html += escapeHtml(line) + "\n";
            continue;
        }

        if (!line.trim()) {
            closeList();
            continue;
        }

        // #, ##, ### 헤더
        const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (hMatch) {
            closeList();
            const level = hMatch[1].length;
            const content = escapeHtml(hMatch[2]);
            html += `<h${level}>${content}</h${level}>`;
            continue;
        }

        // 리스트(-, *)
        if (/^[-*]\s+/.test(line)) {
            const itemText = escapeHtml(line.replace(/^[-*]\s+/, ""));
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            html += `<li>${itemText}</li>`;
            continue;
        } else {
            closeList();
        }

        // 기본 단락
        html += `<p>${escapeHtml(line)}</p>`;
    }

    closeList();
    return html;
}

// 글 커밋 요청에 사용할 페이로드 타입
interface CommitPayload {
    title: string;
    slug: string;
    summary: string;
    tags: string[];
    collection: string | null;
    content: string;
}

// Worker /content/commit 호출 헬퍼
async function submitPostToWorker(payload: CommitPayload): Promise<unknown> {
    const token = getJwtToken();
    if (!token) {
        throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");
    }

    const res = await fetch(`${API_BASE}/content/commit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    // 🔹 토큰 만료 / 인증 실패 → 자동 로그아웃 처리
    if (res.status === 401) {
        try {
            localStorage.removeItem(JWT_STORAGE_KEY);
        } catch { }

        // 필요하면 토스트/alert
        alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");

        // 글쓰기 화면으로 보내면, 자동으로 '로그인 필요' 카드가 뜸
        window.location.hash = "#/write";

        throw new Error("인증이 만료되었습니다.");
    }

    if (!res.ok) {
        let detail = "";
        try {
            const data = await res.json();
            if (data && typeof data.message === "string") {
                detail = data.message;
            }
        } catch {
            // JSON이 아닐 수도 있으니 조용히 무시
        }

        const baseMsg = `작성 요청 실패: ${res.status} ${res.statusText}`;
        throw new Error(detail ? `${baseMsg} - ${detail}` : baseMsg);
    }

    try {
        return await res.json();
    } catch {
        return {};
    }
}


function renderRoute() {
    const route = getCurrentRouteFromHash();

    if (route === "home") {
        if (currentItems.length === 0) {
            renderLoading();
            return;
        }
        renderHomeView();
    } else if (route === "search") {
        renderSearchView();
    } else if (route === "write") {
        renderWriteView();
    } else if (route === "profile") {
        renderProfileView();
    } else if (route === "postDetail") {
        const slug = extractPostSlugFromHash();
        renderPostDetailView(slug);
    } else if (route === "authCallback") {
        handleAuthCallbackRoute();
    }
}

function handleAuthCallbackRoute() {
    const token = extractTokenFromHash();

    if (token) {
        try {
            localStorage.setItem(JWT_STORAGE_KEY, token);
        } catch {
            // localStorage 차단된 경우 등
            console.error("Failed to save token to localStorage");
        }
    }

    // URL 정리하면서 write 화면으로 이동
    window.location.hash = "#/write";
}


async function bootstrap() {
    // 🔐 GitHub OAuth에서 되돌아온 #auth=토큰 처리
    consumeAuthFromHash();

    renderLoading();
    activeTab = "posts";

    try {
        const { page } = await loadInitialFeed(1);
        currentItems = page.items;
        renderRoute();
    } catch (error) {
        console.error(error);
        const message =
            error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
        renderError(message);
    }
}


function consumeAuthTokenFromHash() {
    const hash = window.location.hash || "";
    const m = hash.match(/auth=([^&]+)/);
    if (!m) return;

    const token = decodeURIComponent(m[1]);

    try {
        localStorage.setItem(JWT_STORAGE_KEY, token);
    } catch {
        // 로컬스토리지 막힌 브라우저는 그냥 무시
    }

    // URL에서 auth=... 제거 (깔끔하게)
    const base = window.location.href.split("#")[0];
    window.history.replaceState(null, "", base + "#/write");
}

consumeAuthTokenFromHash();
bootstrap();

window.addEventListener("hashchange", () => {
    if (getCurrentRouteFromHash() === "home" && currentItems.length === 0) {
        bootstrap();
    } else {
        renderRoute();
    }
});

bootstrapAuthFromHash();
bootstrap();
