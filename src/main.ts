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

interface ProfileStat {
    label: string;
    value: string;
}

interface SavedCollectionSummary {
    id: string;
    name: string;
    posts: FeedItem[];
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
    | "smile"
    | "close";

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

// 🔐 GitHub OAuth 해시에서 토큰 회수 (#auth=... 혹은 해시 내 auth 파라미터)
function captureAuthTokenFromHash(): void {
    const raw = window.location.hash || "";
    const directMatch = raw.match(/^#\/?auth=([^&]+)/);
    const queryMatch = raw.match(/auth=([^&]+)/);
    const token = directMatch?.[1] ?? queryMatch?.[1];

    if (!token) return;

    try {
        localStorage.setItem(JWT_STORAGE_KEY, decodeURIComponent(token));
    } catch {
        // localStorage 막힌 환경이면 무시
    }

    // 해시를 깔끔하게 정리하면서 작성 페이지로 이동
    const base = window.location.href.split("#")[0];
    window.history.replaceState(null, "", `${base}#/write`);
}



const TAB_LABELS: Record<Tab, { label: string; icon: IconName }> = {
    posts: { label: "게시물", icon: "grid" },
    saved: { label: "컬렉션", icon: "bookmark" },
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
    close: `
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
    `,
};

let currentItems: FeedItem[] = [];
let activeTab: Tab = "posts";
let modalEscapeHandler: ((event: KeyboardEvent) => void) | null = null;
let selectedCollectionId: string | null = null;
let lastSearchQuery = "";
let lastListHash: string = "#/posts";
let lastSearchFilteredSlugs: string[] = [];
let lastDetailNavSlugs: string[] = [];


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
        <div id="post-detail-modal-root" aria-live="polite"></div>
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

function getPostDetailModalRoot(): HTMLDivElement | null {
    return document.querySelector<HTMLDivElement>("#post-detail-modal-root");
}

function closePostDetailModal() {
    const modalRoot = getPostDetailModalRoot();
    if (!modalRoot) return;
    modalRoot.innerHTML = "";
    modalRoot.classList.remove("is-active");
    if (modalEscapeHandler) {
        document.removeEventListener("keydown", modalEscapeHandler);
        modalEscapeHandler = null;
    }
}

function setupModalCloseInteractions() {
    const modalRoot = getPostDetailModalRoot();
    if (!modalRoot) return;

    const closeTargets = modalRoot.querySelectorAll<HTMLElement>("[data-close-modal='true']");

    const goBackFromModal = () => {
        const target = lastListHash || "#/posts";
        window.location.hash = target;
    };

    closeTargets.forEach((target) => {
        target.addEventListener("click", (event) => {
            event.preventDefault();
            goBackFromModal();
        });
    });

    if (modalEscapeHandler) {
        document.removeEventListener("keydown", modalEscapeHandler);
    }
    modalEscapeHandler = (event) => {
        if (event.key === "Escape") {
            goBackFromModal();
        }
    };
    document.addEventListener("keydown", modalEscapeHandler);
}


function renderPostDetailMessage(message: string) {
    const modalRoot = getPostDetailModalRoot();
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${iconMarkup("close")}
          </button>
          <div class="post-detail-empty">${escapeHtml(message)}</div>
        </div>
      </div>
    `;

    modalRoot.classList.add("is-active");
    setupModalCloseInteractions();
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
                        ${escapeHtml(stat.label)}
                        <span class="stat-value">${escapeHtml(stat.value)}</span>
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

function renderSavedView(): string {
    const collections = buildSavedCollections(currentItems);
    if (collections.length === 0) {
        return `<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>`;
    }

    let selected: SavedCollectionSummary | null = null;
    if (selectedCollectionId) {
        selected = collections.find((col) => col.id === selectedCollectionId) ?? null;
        if (!selected) {
            selectedCollectionId = null;
        }
    }

    if (selected) {
        return renderSavedCollectionDetail(selected);
    }

    return renderSavedCollectionsGrid(collections);
}

function buildSavedCollections(items: FeedItem[]): SavedCollectionSummary[] {
    const groups = new Map<string, FeedItem[]>();

    items.forEach((item) => {
        const key = item.collection?.trim();
        // 컬렉션이 없으면 Saved 컬렉션 목록에서 제외
        if (!key) {
            return;
        }

        const list = groups.get(key) ?? [];
        list.push(item);
        groups.set(key, list);
    });

    return Array.from(groups.entries())
        .map(([id, posts]) => ({
            id,
            name: formatCollectionName(id),
            posts: [...posts].sort((a, b) => {
                const aTime = new Date(a.created).getTime();
                const bTime = new Date(b.created).getTime();
                if (isNaN(aTime) || isNaN(bTime)) {
                    return 0;
                }
                return bTime - aTime;
            }),
        }))
        .sort((a, b) => {
            if (b.posts.length !== a.posts.length) {
                return b.posts.length - a.posts.length;
            }
            return a.name.localeCompare(b.name);
        });
}


function formatCollectionName(id: string): string {
    const trimmed = id.trim();
    const words = trimmed
        .split(/[-_]/)
        .filter(Boolean)
        .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1));
    return words.length ? words.join(" ") : trimmed;
}

// 🆕 기존 피드에서 컬렉션 이름 목록 추출
function getExistingCollections(): string[] {
    const set = new Set<string>();

    currentItems.forEach((item) => {
        const col = (item.collection ?? "").trim();
        if (col) {
            set.add(col);
        }
    });

    return Array.from(set).sort((a, b) => a.localeCompare(b));
}


function renderSavedCollectionsGrid(collections: SavedCollectionSummary[]): string {
    return `
      <section class="saved-view saved-collections-view">
        <div class="saved-header">
          <div>
            <p>컬렉션 ${collections.length}</p>
          </div>
        </div>
        <div class="saved-collections-grid">
          ${collections.map((collection) => renderSavedCollectionCard(collection)).join("")}
        </div>
      </section>
    `;
}

function renderSavedCollectionCard(collection: SavedCollectionSummary): string {
    const coverItem = collection.posts.find((post) => !!post.cover);
    const hasCover = !!coverItem?.cover;
    const coverClass = `saved-collection-cover ${hasCover ? "" : "is-fallback"}`.trim();
    const fallbackStyle = hasCover ? "" : `style="background:${fallbackGradient(collection.id)}"`;
    const coverContent = hasCover
        ? `<img src="${escapeHtml(coverItem!.cover!)}" alt="${escapeHtml(collection.name)}" loading="lazy" />`
        : `<span>${escapeHtml(collection.name.charAt(0).toUpperCase())}</span>`;

    return `
      <button type="button" class="saved-collection-card" data-collection-id="${escapeHtml(collection.id)}">
        <span class="${coverClass}" ${fallbackStyle}>
          ${coverContent}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${escapeHtml(collection.name)}</span>
          <span class="saved-collection-count">게시물 ${collection.posts.length}</span>
        </span>
      </button>
    `;
}

function renderSavedCollectionDetail(collection: SavedCollectionSummary): string {
    const lastUpdated = collection.posts[0];
    let updatedLabel = "";
    if (lastUpdated) {
        const date = new Date(lastUpdated.created);
        if (!isNaN(date.getTime())) {
            updatedLabel = date.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
    }

    const subtitle = updatedLabel
        ? `게시물 ${collection.posts.length} · 최근 업데이트 ${updatedLabel}`
        : `게시물 ${collection.posts.length}`;

    return `
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${iconMarkup("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${escapeHtml(collection.name)}</h3>
            <p>${escapeHtml(subtitle)}</p>
          </div>
        </div>
        ${renderPostGrid(collection.posts)}
      </section>
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
    const cover = item.cover
        ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(
            item.title
        )}" loading="lazy" />`
        : "";

    return `
      <article class="post-card" data-slug="${escapeHtml(item.slug)}">
        <div class="post-media ${cover ? "" : "is-fallback"}" ${cover ? "" : `style="background:${fallbackGradient(item.slug)}"`}
        >
                ${cover || `<span class="post-fallback-title">${escapeHtml(item.title)}</span>`}

        </div>
        <div class="post-overlay">
          <p class="overlay-title">${escapeHtml(item.title)}</p>
          <p class="overlay-tags">${tags}</p>
          <p class="overlay-date">${createdLabel}</p>
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


function buildCommonProfileStats(): ProfileStat[] {
    return [{ label: "게시물", value: `${currentItems.length}` }];
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
            : renderSavedView()
        }
    `;

    renderAppShell(route, mainContent);
    bindHomeInteractions();
}

function renderSearchView() {
    const stats = buildCommonProfileStats();

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      <section class="search-page">
        <div class="search-bar-row">
          <input
            id="search-input"
            type="search"
            placeholder="제목, 태그, 본문 텍스트를 검색해 보세요"
            class="search-input"
          />
        </div>
        <div id="search-meta" class="search-meta"></div>
        <div id="search-results">
          ${renderPostGrid(currentItems)}
        </div>
      </section>
    `;

    renderAppShell("search", mainContent);
    bindSearchInteractions();
}


function renderPostDetailView(slug: string | null) {
    if (!slug) {
        renderPostDetailMessage("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");
        return;
    }

    if (!currentItems.length) {
        renderPostDetailMessage("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");
        return;
    }

    const item = currentItems.find((it) => it.slug === slug);
    if (!item) {
        renderPostDetailMessage(`슬러그가 '${escapeHtml(slug)}'인 글을 찾을 수 없습니다.`);
        return;
    }

    const createdDate = new Date(item.created);
    const createdLabel = isNaN(createdDate.getTime())
        ? "작성일 미정"
        : createdDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    const tags = item.tags.length
        ? item.tags.map((tag) => `<span class="post-detail-tag">#${escapeHtml(tag)}</span>`).join("")
        : '<span class="post-detail-tag is-empty">태그 없음</span>';

    const cover = item.cover
        ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.title)}" class="post-detail-cover" loading="lazy" />`
        : `
        <div class="post-detail-fallback" style="background:${fallbackGradient(item.slug)}">
          <h2>${escapeHtml(item.title)}</h2>
        </div>
      `;


    // 컬렉션 상세에서 들어온 경우에는 해당 컬렉션 내부에서만 이전/다음을 이동한다.
    let navItems: FeedItem[] = currentItems;

    const navFromLastDetail = lastDetailNavSlugs
        .map((slug) => currentItems.find((it) => it.slug === slug) || null)
        .filter((it): it is FeedItem => it !== null);
    if (navFromLastDetail.length && navFromLastDetail.some((it) => it.slug === item.slug)) {
        navItems = navFromLastDetail;
    }

    // 1) 컬렉션에서 온 경우: 해당 컬렉션 내부만 사용
    else if (selectedCollectionId) {
        const colId = selectedCollectionId;
        const withinCollection = currentItems.filter(
            (it) => (it.collection ?? "").trim() === colId
        );
        if (withinCollection.some((it) => it.slug === item.slug)) {
            navItems = withinCollection;
        }
    }
    // 2) 컬렉션이 아니라, 검색에서 온 경우: 검색 결과 목록만 사용
    else if (lastListHash.startsWith("#/search") && lastSearchFilteredSlugs.length > 0) {
        const fromSearch: FeedItem[] = lastSearchFilteredSlugs
            .map((slug) => currentItems.find((it) => it.slug === slug) || null)
            .filter((it): it is FeedItem => it !== null);

        if (fromSearch.some((it) => it.slug === item.slug)) {
            navItems = fromSearch;
        }
    }

    const index = navItems.findIndex((it) => it.slug === item.slug);
    const prevItem = index > 0 ? navItems[index - 1] : null;
    const nextItem =
        index >= 0 && index < navItems.length - 1 ? navItems[index + 1] : null;



    const buildNavBtn = (direction: "prev" | "next", target: FeedItem | null) => {
        const dirClass = `post-detail-nav-btn-${direction}`;
        const arrow = direction === "prev" ? "‹" : "›";
        const label = direction === "prev" ? "이전 게시물" : "다음 게시물";
        if (!target) {
            return `<span class="post-detail-nav-btn is-disabled ${dirClass}" aria-disabled="true" aria-label="${label}"><span aria-hidden="true">${arrow}</span></span>`;
        }
        return `
        <a class="post-detail-nav-btn ${dirClass}" href="#/post/${encodeURIComponent(target.slug)}" aria-label="${label}" title="${escapeHtml(truncateText(target.title, 48))}">
          <span aria-hidden="true">${arrow}</span>
        </a>
      `;
    };

    const prevNav = `
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${buildNavBtn("prev", prevItem)}
      </nav>
    `;

    const nextNav = `
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${buildNavBtn("next", nextItem)}
      </nav>
    `;

    const mobileNav = `
      <nav class="post-detail-mobile-nav" aria-label="게시물 이동">
        ${buildNavBtn("prev", prevItem)}
        ${buildNavBtn("next", nextItem)}
      </nav>
    `;

    const sectionContent = `
      <section class="post-detail" ${prevItem ? `data-prev-slug="${escapeHtml(prevItem.slug)}"` : ""} ${nextItem
            ? `data-next-slug="${escapeHtml(nextItem.slug)}"`
            : ""}>
        <div class="post-detail-frame">
          ${prevNav}
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
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${iconMarkup("chevron") }</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${escapeHtml(item.title)}</h2>
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
            </div>
          </div>
          ${nextNav}
        </div>
        ${mobileNav}
      </section>
    `;

    const modalRoot = getPostDetailModalRoot();
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${sectionContent}
        </div>
      </div>
    `;

    modalRoot.classList.add("is-active");
    requestAnimationFrame(() => {
        const modal = modalRoot.querySelector<HTMLElement>(".post-detail-modal");
        modal?.classList.add("is-open");
    });

    bindPostDetailInteractions();
    setupModalCloseInteractions();
    loadAndRenderPostBody(item);
}

function loadAndRenderPostBody(item: FeedItem) {
    const container = document.querySelector<HTMLDivElement>("#post-body");
    if (!container) return;

    // 지금은 summary 필드에 실제 본문이 들어 있다고 보고 사용합니다.
    const raw = (item.summary ?? "").trim();

    if (!raw) {
        container.innerHTML = "<p>본문이 비어 있습니다.</p>";
        return;
    }

    // markdown 형식으로 작성하셨다면 그대로 렌더
    const html = renderMarkdown(raw);
    container.innerHTML = html || "<p>본문이 비어 있습니다.</p>";
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
                  GitHub OAuth로 소유자 계정 확인 후, 글을 작성할 수 있습니다.
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
    <select
      id="write-collection-select"
      class="write-input"
    >
      <option value="">컬렉션 선택 안 함</option>
      ${getExistingCollections()
            .map(
                (name) =>
                    `<option value="${escapeHtml(name)}">${escapeHtml(
                        formatCollectionName(name)
                    )}</option>`
            )
            .join("")}
      <option value="__new__">+ 새 컬렉션 직접 입력</option>
    </select>
    <input
      id="write-collection-new"
      type="text"
      placeholder="새 컬렉션 이름을 입력하세요 (2~40자)"
      class="write-input"
      disabled
    />
    <p class="write-hint">
      기존 컬렉션을 선택하거나, <strong>“+ 새 컬렉션 직접 입력”</strong>을 선택해 새 이름을 만들 수 있습니다.
    </p>
  </div>
</div>

              <!-- 커버 이미지 -->
              <div class="profile-row">
                <div class="profile-label">커버 이미지</div>
                <div class="profile-value">
                  <div class="write-cover-editor">
                    <input
                      id="write-cover-file"
                      type="file"
                      accept="image/*"
                    />
                    <div class="write-cover-canvas-wrapper">
                      <canvas
                        id="write-cover-canvas"
                        class="write-cover-canvas"
                      ></canvas>
                    </div>
                    <div class="write-cover-controls">
                      <label for="write-cover-zoom" class="write-hint">확대</label>
                      <input
                        id="write-cover-zoom"
                        type="range"
                        min="1"
                        max="2"
                        step="0.01"
                        value="1"
                      />
                      <button
                        type="button"
                        id="write-cover-reset"
                        class="secondary"
                      >
                        이미지 제거
                      </button>
                    </div>
                    <p class="write-hint">
                      4:5 비율로 잘라서 저장됩니다. (이미지를 선택하지 않으면 커버 없이 저장)
                    </p>
                  </div>
                </div>
              </div>


              <!-- 본문 -->
              <div class="profile-row">
                <div class="profile-label">본문 *</div>
                <div class="profile-value">
                  <textarea
                    id="write-body"
                    rows="10"
                    placeholder="본문을 작성해 주세요."
                    class="write-textarea"
                  ></textarea>
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
            if (tab !== "saved") {
                selectedCollectionId = null;
            }
            renderHomeView();
        });
    });

    // ✅ 게시물 카드 클릭 → 상세 페이지로 이동
    const postCards = document.querySelectorAll<HTMLElement>(".post-card[data-slug]");
    postCards.forEach((card) => {
        card.addEventListener("click", () => {
            const slug = card.dataset.slug;
            if (!slug) return;

            const navSource = selectedCollectionId
                ? currentItems.filter((it) => (it.collection ?? "").trim() === selectedCollectionId)
                : currentItems;
            lastDetailNavSlugs = navSource.map((item) => item.slug);

            // ✅ 상세 들어가기 전에, 현재 목록 화면 hash 기억
            lastListHash = window.location.hash || "#/posts";

            window.location.hash = `#/post/${encodeURIComponent(slug)}`;
        });
    });


    const savedCards = document.querySelectorAll<HTMLButtonElement>(".saved-collection-card");
    savedCards.forEach((card) => {
        card.addEventListener("click", () => {
            const id = card.dataset.collectionId;
            if (!id) return;
            selectedCollectionId = id;
            renderHomeView();
        });
    });

    const savedBackBtn = document.querySelector<HTMLButtonElement>("#saved-back-button");
    savedBackBtn?.addEventListener("click", () => {
        selectedCollectionId = null;
        renderHomeView();
    });
}
function bindSearchInteractions() {
    const input = document.querySelector<HTMLInputElement>("#search-input");
    const meta = document.querySelector<HTMLDivElement>("#search-meta");
    const results = document.querySelector<HTMLDivElement>("#search-results");

    // 여기서 한 번 걸러주고
    if (!input || !results) return;

    // ✅ 이후에는 절대 null 아님을 보장하는 새 변수로 재할당
    const searchInput = input;
    const searchResults = results;

    // 화면 진입 시, 마지막 검색어를 인풋에 복원
    searchInput.value = lastSearchQuery;

    function filterItems(q: string): FeedItem[] {
        const query = q.trim().toLowerCase();
        if (!query) return currentItems;

        return currentItems.filter((item) => {
            const bucket = [
                item.title,
                item.summary ?? "",
                item.collection ?? "",
                item.tags.join(" "),
            ]
                .join(" ")
                .toLowerCase();

            return bucket.includes(query);
        });
    }

    function update() {
        const q = searchInput.value;

        // 마지막 검색어 저장
        lastSearchQuery = q;

        const filtered = filterItems(q);

        lastSearchFilteredSlugs = filtered.map((item) => item.slug);

        // ✅ 여기서도 searchResults 사용
        searchResults.innerHTML = renderPostGrid(filtered);

        if (meta) {
            const total = currentItems.length;
            const count = filtered.length;
            if (q.trim()) {
                meta.textContent = `${total}개 중 ${count}개 검색됨`;
            } else {
                meta.textContent = `${total}개 글`;
            }
        }

        const cards = searchResults.querySelectorAll<HTMLElement>(".post-card[data-slug]");
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                const slug = card.dataset.slug;
                if (!slug) return;

                if (lastSearchFilteredSlugs.length > 0) {
                    lastDetailNavSlugs = [...lastSearchFilteredSlugs];
                } else {
                    lastDetailNavSlugs = currentItems.map((item) => item.slug);
                }

                // ✅ 검색 화면에서 상세로 갈 때도 현재 hash 기억
                lastListHash = window.location.hash || "#/search";

                window.location.hash = `#/post/${encodeURIComponent(slug)}`;
            });
        });

    }

    searchInput.addEventListener("input", () => {
        update();
    });

    // 처음 진입 시에도 기존 검색어 기준으로 한 번 필터링
    update();
}




function setupWriteViewInteractions() {
    const form = document.querySelector<HTMLFormElement>("#write-form");
    if (!form) return;

    const titleInput = form.querySelector<HTMLInputElement>("#write-title");
    const slugInput = form.querySelector<HTMLInputElement>("#write-slug");
    const tagsInput = form.querySelector<HTMLInputElement>("#write-tags");
    const collectionSelect = form.querySelector<HTMLSelectElement>("#write-collection-select");
    const collectionNewInput = form.querySelector<HTMLInputElement>("#write-collection-new");
    const bodyInput = form.querySelector<HTMLTextAreaElement>("#write-body");
    const submitBtn = form.querySelector<HTMLButtonElement>("#write-submit");
    const resetBtn = form.querySelector<HTMLButtonElement>("#write-reset");
    const errorBox = form.querySelector<HTMLDivElement>("#write-error");
    const coverFileInput = form.querySelector<HTMLInputElement>("#write-cover-file");
    const coverCanvas = form.querySelector<HTMLCanvasElement>("#write-cover-canvas");
    const coverZoomInput = form.querySelector<HTMLInputElement>("#write-cover-zoom");
    const coverResetBtn = form.querySelector<HTMLButtonElement>("#write-cover-reset");


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

        // 컬렉션 입력칸 초기화
        if (collectionNewInput) {
            collectionNewInput.disabled = true;
            collectionNewInput.value = "";
        }

        // 🖼 커버 이미지 초기화
        if (coverCanvas) {
            const ctx = coverCanvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
            }
        }
        if (coverFileInput) {
            coverFileInput.value = "";
        }
        if (coverZoomInput) {
            coverZoomInput.value = "1";
        }
    });
    // 🖼 커버 이미지 편집 상태 (4:5 비율, 800x1000 기준)
    let coverImage: HTMLImageElement | null = null;
    let coverScaleBase = 1;
    let coverZoom = 1;
    let coverOffsetX = 0;
    let coverOffsetY = 0;
    let isDraggingCover = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartOffsetX = 0;
    let dragStartOffsetY = 0;


    const COVER_WIDTH = 800;
    const COVER_HEIGHT = 1000;

    const drawCover = () => {
        if (!coverCanvas || !coverImage) return;
        const ctx = coverCanvas.getContext("2d");
        if (!ctx) return;

        // 캔버스 크기 고정 (4:5)
        coverCanvas.width = COVER_WIDTH;
        coverCanvas.height = COVER_HEIGHT;

        ctx.clearRect(0, 0, COVER_WIDTH, COVER_HEIGHT);

        const scale = coverScaleBase * coverZoom;
        const drawW = coverImage.width * scale;
        const drawH = coverImage.height * scale;

        const baseDx = (COVER_WIDTH - drawW) / 2;
        const baseDy = (COVER_HEIGHT - drawH) / 2;

        // 사용자가 드래그로 이동한 오프셋 적용
        let dx = baseDx + coverOffsetX;
        let dy = baseDy + coverOffsetY;

        // 이미지가 캔버스를 벗어나서 빈 여백이 보이지 않도록 클램프
        const minX = COVER_WIDTH - drawW;
        const maxX = 0;
        const minY = COVER_HEIGHT - drawH;
        const maxY = 0;

        if (dx < minX) {
            dx = minX;
            coverOffsetX = dx - baseDx;
        } else if (dx > maxX) {
            dx = maxX;
            coverOffsetX = dx - baseDx;
        }

        if (dy < minY) {
            dy = minY;
            coverOffsetY = dy - baseDy;
        } else if (dy > maxY) {
            dy = maxY;
            coverOffsetY = dy - baseDy;
        }

        ctx.drawImage(coverImage, dx, dy, drawW, drawH);
    };


    const loadCoverFile = (file: File) => {
        if (!coverCanvas) return;
        const img = new Image();
        img.onload = () => {
            coverImage = img;
            // 이미지가 캔버스를 완전히 덮도록 기본 스케일 계산
            const scaleX = COVER_WIDTH / img.width;
            const scaleY = COVER_HEIGHT / img.height;
            coverScaleBase = Math.max(scaleX, scaleY);
            coverZoom = 1;
            if (coverZoomInput) {
                coverZoomInput.value = "1";
            }
            coverOffsetX = 0;
            coverOffsetY = 0;
            drawCover();

        };
        img.src = URL.createObjectURL(file);
    };

    // 🖱🖐 Pointer 이벤트 기반 커버 이미지 드래그 (PC + 모바일 공통)
    if (coverCanvas) {
        let activePointerId: number | null = null;

        const startDrag = (clientX: number, clientY: number) => {
            if (!coverImage || !coverCanvas) return false;

            isDraggingCover = true;

            const rect = coverCanvas.getBoundingClientRect();
            dragStartX = clientX - rect.left;
            dragStartY = clientY - rect.top;
            dragStartOffsetX = coverOffsetX;
            dragStartOffsetY = coverOffsetY;

            return true;
        };

        const moveDrag = (clientX: number, clientY: number) => {
            if (!isDraggingCover || !coverImage || !coverCanvas) return;

            const rect = coverCanvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const dx = x - dragStartX;
            const dy = y - dragStartY;

            coverOffsetX = dragStartOffsetX + dx;
            coverOffsetY = dragStartOffsetY + dy;
            drawCover();
        };

        const endDrag = () => {
            if (!isDraggingCover) return;
            isDraggingCover = false;
            activePointerId = null;
        };

        if ("PointerEvent" in window) {
            coverCanvas.addEventListener("pointerdown", (event: PointerEvent) => {
                if (!coverImage) return;

                // 이 포인터(손가락/마우스) 캔버스에 캡처
                coverCanvas.setPointerCapture(event.pointerId);

                if (!startDrag(event.clientX, event.clientY)) return;
                activePointerId = event.pointerId;
            });

            coverCanvas.addEventListener("pointermove", (event: PointerEvent) => {
                if (!isDraggingCover) return;
                if (activePointerId !== null && event.pointerId !== activePointerId) return;

                moveDrag(event.clientX, event.clientY);
            });

            const endPointerDrag = (event: PointerEvent) => {
                if (!isDraggingCover) return;
                if (activePointerId !== null && event.pointerId !== activePointerId) return;

                if (coverCanvas.hasPointerCapture(event.pointerId)) {
                    coverCanvas.releasePointerCapture(event.pointerId);
                }
                endDrag();
            };

            coverCanvas.addEventListener("pointerup", endPointerDrag);
            coverCanvas.addEventListener("pointercancel", endPointerDrag);
            coverCanvas.addEventListener("pointerleave", endPointerDrag);
        } else {
            // PointerEvent 미지원 환경(iOS 구형 브라우저 등)을 위한 터치 전용 핸들러
            coverCanvas.addEventListener(
                "touchstart",
                (event: TouchEvent) => {
                    if (!coverImage) return;
                    const touch = event.touches[0];
                    if (!touch) return;
                    event.preventDefault();
                    startDrag(touch.clientX, touch.clientY);
                },
                { passive: false }
            );

            coverCanvas.addEventListener(
                "touchmove",
                (event: TouchEvent) => {
                    if (!isDraggingCover) return;
                    const touch = event.touches[0];
                    if (!touch) return;
                    event.preventDefault();
                    moveDrag(touch.clientX, touch.clientY);
                },
                { passive: false }
            );

            coverCanvas.addEventListener(
                "touchend",
                (event: TouchEvent) => {
                    if (!isDraggingCover) return;
                    event.preventDefault();
                    endDrag();
                },
                { passive: false }
            );

            coverCanvas.addEventListener(
                "touchcancel",
                (event: TouchEvent) => {
                    if (!isDraggingCover) return;
                    event.preventDefault();
                    endDrag();
                },
                { passive: false }
            );
        }
    }



    // 파일 선택 시 커버 로드
    coverFileInput?.addEventListener("change", (event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        loadCoverFile(file);
    });

    // 확대 슬라이더
    coverZoomInput?.addEventListener("input", () => {
        const val = parseFloat(coverZoomInput.value || "1");
        coverZoom = Number.isFinite(val) ? val : 1;
        drawCover();
    });

    // 이미지 제거 버튼
    coverResetBtn?.addEventListener("click", () => {
        coverImage = null;
        if (coverCanvas) {
            const ctx = coverCanvas.getContext("2d");
            if (ctx) {
                ctx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
            }
        }
        if (coverFileInput) {
            coverFileInput.value = "";
        }
        if (coverZoomInput) {
            coverZoomInput.value = "1";
        }
        coverOffsetX = 0;
        coverOffsetY = 0;

    });


    // 🆕 컬렉션 선택/새로 입력 동기화
    if (collectionSelect && collectionNewInput) {
        const syncCollectionInputs = () => {
            const value = collectionSelect.value;

            if (value === "__new__") {
                collectionNewInput.disabled = false;
                collectionNewInput.focus();
            } else {
                collectionNewInput.disabled = true;
                collectionNewInput.value = "";
            }
        };

        collectionSelect.addEventListener("change", syncCollectionInputs);
        // 초기 상태도 한 번 동기화
        syncCollectionInputs();
    }


    // 폼 제출
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = titleInput.value.trim();
        const slug = slugInput.value.trim();
        const tagsRaw = tagsInput.value;
        const body = bodyInput.value.trim();
        let finalCollection: string | null = null;

        const errors: string[] = [];

        // 🆕 컬렉션 최종 값 결정
        if (collectionSelect && collectionNewInput) {
            const sel = collectionSelect.value;

            if (!sel) {
                // "선택 안 함" → null
                finalCollection = null;
            } else if (sel === "__new__") {
                const name = collectionNewInput.value.trim();
                if (!name) {
                    errors.push("새 컬렉션 이름을 입력해 주세요.");
                } else {
                    finalCollection = name;
                }
            } else {
                // 기존 컬렉션 선택
                finalCollection = sel;
            }

            if (finalCollection) {
                if (finalCollection.length < 2 || finalCollection.length > 40) {
                    errors.push("컬렉션 이름은 2~40자 사이여야 합니다.");
                }
            }
        }


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

        // 🖼 커버 이미지 dataURL 생성 (있을 때만)
        let cover: string | null = null;
        if (coverCanvas && coverImage) {
            try {
                cover = coverCanvas.toDataURL("image/jpeg", 0.8);
            } catch {
                cover = null;
            }
        }


        // ✅ Worker가 기대하는 필드 이름에 맞게 body → content 로 변경
        const payload: CommitPayload = {
            title,
            slug,
            summary: "",
            tags,
            collection: finalCollection,
            cover, 
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
    cover: string | null;
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

    if (route !== "postDetail") {
        closePostDetailModal();
    }

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
        if (currentItems.length === 0) {
            renderLoading();
            return;
        }
        renderHomeView();
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

captureAuthTokenFromHash();
bootstrap();

window.addEventListener("hashchange", () => {
    if (getCurrentRouteFromHash() === "home" && currentItems.length === 0) {
        bootstrap();
    } else {
        renderRoute();
    }
});
