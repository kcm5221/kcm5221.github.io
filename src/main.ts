import "./style.css";
import { loadInitialFeed } from "./api/feed";
import type { FeedItem } from "./types/Feed";

type Route = "home" | "search" | "write";
type Tab = "posts" | "saved" | "tagged";

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

interface HighlightItem {
    id: string;
    title: string;
    image: string;
}

interface InfoCard {
    title: string;
    lines: string[];
}

interface ProfileStat {
    label: string;
    value: string;
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
    | "chevron";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
    throw new Error("#app element not found");
}

const HIGHLIGHTS: HighlightItem[] = [
    {
        id: "travel",
        title: "Cloudflare",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200",
    },
    {
        id: "food",
        title: "GitHub",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200",
    },
    {
        id: "city",
        title: "Workers",
        image: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=200",
    },
    {
        id: "nature",
        title: "Actions",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200",
    },
    {
        id: "fitness",
        title: "Pages",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200",
    },
];

const SIDEBAR_ITEMS: SidebarItem[] = [
    { id: "home", label: "Home", icon: "home", route: "home" },
    { id: "search", label: "Search", icon: "search", route: "search" },
    { id: "explore", label: "Explore", icon: "compass" },
    { id: "reels", label: "Reels", icon: "film" },
    { id: "messages", label: "Messages", icon: "message" },
    { id: "notifications", label: "Notifications", icon: "heart" },
    { id: "create", label: "Create", icon: "plus", route: "write" },
    { id: "profile", label: "Profile", icon: "user" },
];

const BOTTOM_NAV: BottomNavItem[] = [
    { id: "home", icon: "home", route: "home" },
    { id: "search", icon: "search", route: "search" },
    { id: "reels", icon: "film" },
    { id: "create", icon: "plus", route: "write" },
    { id: "profile", icon: "user" },
];

const ROUTE_DESCRIPTIONS: Record<Route, string> = {
    home: "GitHub Pages + Cloudflare Workers + GitHub Actions 로 이어지는 개발 로그를 인스타그램 뷰로 묶었습니다.",
    search:
        "태그, 제목, 내용으로 DevLog 를 검색하는 전용 탐색 화면을 준비 중입니다. PKCE 기반 인증 완료 후 알파 기능이 열립니다.",
    write:
        "Cloudflare Worker 의 /content/commit 엔드포인트에 연결되는 작성 도구입니다. GitHub App 권한 확인 후 브라우저에서 바로 글을 발행합니다.",
};

const INFO_CARDS: Record<Exclude<Route, "home">, InfoCard[]> = {
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

const TAB_LABELS: Record<Tab, { label: string; icon: IconName }> = {
    posts: { label: "Posts", icon: "grid" },
    saved: { label: "Saved", icon: "bookmark" },
    tagged: { label: "Tagged", icon: "tagged" },
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
};

let currentItems: FeedItem[] = [];
let currentTag: string | null = null;
let activeTab: Tab = "posts";

function getCurrentRouteFromHash(): Route {
    const hash = window.location.hash || "#/";
    if (hash.startsWith("#/search")) return "search";
    if (hash.startsWith("#/write")) return "write";
    return "home";
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
        <div class="sidebar-logo">Instagram</div>
        <nav class="sidebar-nav">
          ${SIDEBAR_ITEMS.map((item) => renderSidebarButton(item, route)).join("")}
        </nav>
        <button class="sidebar-link" type="button">
          ${iconMarkup("menu")}
          <span>More</span>
        </button>
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
        <div class="mobile-username">devlog.feed ${iconMarkup("chevron")}</div>
        <div class="mobile-actions">
          <button class="icon-button" type="button">${iconMarkup("heart")}</button>
          <button class="icon-button" type="button">${iconMarkup("message")}</button>
        </div>
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
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300" alt="Profile" loading="lazy" />
        </div>
        <div class="profile-details">
          <div class="profile-top-row">
            <h2 class="profile-username">devlog.feed</h2>
            <div class="profile-actions">
              <button class="primary" type="button">Follow</button>
              <button class="secondary" type="button">Message</button>
              <button class="icon-button" type="button" aria-label="더보기">${iconMarkup("menu")}</button>
            </div>
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
            <p><strong>DevLog Studio</strong></p>
            <p>${escapeHtml(description)}</p>
            <p>✉️ contact@devlog.example</p>
          </div>
        </div>
      </section>
    `;
}

function renderHighlights(): string {
    return `
      <section class="highlights" aria-label="피드 하이라이트">
        ${HIGHLIGHTS.map(
            (item) => `
              <div class="highlight" data-highlight="${item.id}">
                <div class="highlight-ring">
                  <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" />
                </div>
                <span>${escapeHtml(item.title)}</span>
              </div>
            `
        ).join("")}
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

function renderFilterRail(tags: string[]): string {
    return `
      <div class="filter-rail">
        <button class="secondary" type="button" data-refresh>
          새로고침
        </button>
        <div class="tag-rail">
          ${renderTagChip("전체 태그", null, currentTag)}
          ${tags.map((tag) => renderTagChip(`#${tag}`, tag, currentTag)).join("")}
        </div>
      </div>
    `;
}

function renderTagChip(label: string, tag: string | null, activeTag: string | null): string {
    const isActive = (tag === null && activeTag === null) || (tag !== null && tag === activeTag);
    const dataTag = tag ?? "__all";
    return `
      <button class="tag-chip ${isActive ? "is-active" : ""}" data-tag="${dataTag}" type="button">
        ${escapeHtml(label)}
      </button>
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
    const tags = item.tags.length ? item.tags.map((tag) => `#${escapeHtml(tag)}`).join(" ") : "태그 없음";
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
    const cover = item.cover ? `<img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.title)}" loading="lazy" />` : "";

    return `
      <article class="post-card">
        <div class="post-media ${cover ? "" : "is-fallback"}" ${cover ? "" : `style="background:${fallbackGradient(item.slug)}"`}>
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

function fallbackGradient(seed: string): string {
    const colors = ["#fee2e2", "#dbeafe", "#ede9fe", "#dcfce7", "#fef3c7"];
    const index = Math.abs(seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
    return `linear-gradient(135deg, ${colors[index]}, #fff)`;
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

function renderHomeView() {
    const route: Route = "home";
    const visibleItems = currentTag
        ? currentItems.filter((item) => item.tags.includes(currentTag!))
        : currentItems;
    const allTags = getAllTags(currentItems);

    const stats: ProfileStat[] = [
        { label: "posts", value: `${currentItems.length}` },
        { label: "tags", value: `${allTags.length}` },
        { label: "filters", value: currentTag ? `#${currentTag}` : "전체" },
    ];

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.home)}
      ${renderHighlights()}
      ${renderTabStrip()}
      ${renderFilterRail(allTags)}
      ${activeTab === "posts"
          ? renderPostGrid(visibleItems)
          : `<div class="empty-state">${TAB_LABELS[activeTab].label} 뷰는 준비 중입니다.</div>`}
    `;

    renderAppShell(route, mainContent);
    bindHomeInteractions();
}

function renderSearchView() {
    const stats: ProfileStat[] = [
        { label: "버전", value: "v0.2" },
        { label: "상태", value: "개발" },
        { label: "릴리스", value: "Soon" },
    ];

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.search)}
      ${renderInfoCards(INFO_CARDS.search)}
    `;

    renderAppShell("search", mainContent);
}

function renderWriteView() {
    const stats: ProfileStat[] = [
        { label: "Worker", value: "연결" },
        { label: "JWT", value: "60분" },
        { label: "상태", value: "Prototype" },
    ];

    const mainContent = `
      ${renderProfileHeader(stats, ROUTE_DESCRIPTIONS.write)}
      ${renderInfoCards(INFO_CARDS.write)}
    `;

    renderAppShell("write", mainContent);
}

function bindHomeInteractions() {
    const tagButtons = document.querySelectorAll<HTMLButtonElement>("[data-tag]");
    tagButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tag = btn.dataset.tag ?? "__all";
            currentTag = tag === "__all" ? null : tag;
            renderHomeView();
        });
    });

    const tabButtons = document.querySelectorAll<HTMLButtonElement>("[data-tab]");
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab as Tab | undefined;
            if (!tab) return;
            activeTab = tab;
            renderHomeView();
        });
    });

    const refreshBtn = document.querySelector<HTMLButtonElement>("[data-refresh]");
    refreshBtn?.addEventListener("click", () => {
        bootstrap();
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
            } else if (target === "write") {
                window.location.hash = "#/write";
            }
        });
    });
}

function getAllTags(items: FeedItem[]): string[] {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
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
    }
}

async function bootstrap() {
    renderLoading();
    currentTag = null;
    activeTab = "posts";

    try {
        const { page } = await loadInitialFeed(1);
        currentItems = page.items;
        renderRoute();
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
        renderError(message);
    }
}

window.addEventListener("hashchange", () => {
    if (getCurrentRouteFromHash() === "home" && currentItems.length === 0) {
        bootstrap();
    } else {
        renderRoute();
    }
});

bootstrap();
