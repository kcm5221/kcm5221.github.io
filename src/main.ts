// src/main.ts
import "./style.css";
import { loadInitialFeed } from "./api/feed";
import type { FeedItem } from "./types/Feed";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
    throw new Error("#app element not found");
}

// 라우트 타입
type Route = "home" | "search" | "write";

// 전역 상태
let currentItems: FeedItem[] = [];
let currentTag: string | null = null;
let currentCollection: string | null = null;

// 디버그용 로그
console.log(">>> DevLog Instagram-like layout version <<<");

/**
 * 현재 hash → Route
 */
function getCurrentRouteFromHash(): Route {
    const hash = window.location.hash || "#/";
    if (hash.startsWith("#/write")) return "write";
    if (hash.startsWith("#/search")) return "search";
    return "home";
}

/**
 * 왼쪽 네비 버튼
 */
function renderSideNavButton(label: string, route: Route, active: Route): string {
    const isActive = route === active;
    const base =
        "w-full flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium transition";
    const activeCls = "bg-slate-900 text-slate-50";
    const inactiveCls =
        "bg-transparent text-slate-700 hover:bg-slate-100";

    return `
    <button
      type="button"
      class="${base} ${isActive ? activeCls : inactiveCls}"
      data-nav="${route}"
    >
      <span class="w-5 h-5 rounded-full border border-slate-400 bg-white/40"></span>
      <span>${label}</span>
    </button>
  `;
}

/**
 * 공통 레이아웃
 * - 바깥은 흰 배경
 * - 안쪽은 max-width 1024px, 가운데 정렬
 * - 왼쪽 네비는 얇은 패널, 가운데는 피드 컬럼
 */
function renderAppShell(
    route: Route,
    mainContentHtml: string,
    filtersHtml: string | null
) {
    app!.innerHTML = `
    <div
      style="
        min-height: 100vh;
        background: #fafafa;
        color: #020617;
        padding: 1.5rem 0.75rem;
        box-sizing: border-box;
      "
    >
      <div
        style="
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
          align-items: flex-start;
        "
      >
        <!-- 왼쪽 네비게이션 -->
        <aside
          style="
            width: 220px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          "
        >
          <!-- 로고 영역 -->
          <div
            style="
              display:flex;
              align-items:center;
              gap:0.5rem;
              padding:0.75rem 0.5rem;
              box-sizing:border-box;
            "
          >
            <div
              style="
                width: 32px;
                height: 32px;
                border-radius: 8px;
                background: radial-gradient(circle at 30% 20%, #4f46e5, #ec4899);
              "
            ></div>
            <div style="font-size:1rem;font-weight:700;">DevLog</div>
          </div>

          <!-- 네비 버튼 카드 -->
          <div
            style="
              border-radius: 1rem;
              border: 1px solid #e5e7eb;
              background:#ffffff;
              padding:0.75rem 0.5rem;
              box-sizing:border-box;
              display:flex;
              flex-direction:column;
              gap:0.25rem;
            "
          >
            ${renderSideNavButton("홈", "home", route)}
            ${renderSideNavButton("검색", "search", route)}
            ${renderSideNavButton("작성", "write", route)}
          </div>

          <!-- 아래쪽 작은 정보 -->
          <div style="font-size:11px;color:#9ca3af;line-height:1.4;">
            GitHub + Cloudflare + Actions<br />
            인스타그램 느낌의 개발 로그 UI
          </div>
        </aside>

        <!-- 가운데 메인 컬럼 -->
        <div
          style="
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          "
        >
          <!-- 상단 헤더 / 필터 바 -->
          <header
            style="
              display:flex;
              flex-direction:column;
              gap:0.75rem;
            "
          >
            <div
              style="
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:0.75rem;
              "
            >
              <div>
                <div style="font-size:18px;font-weight:700;">타임라인</div>
                <div style="font-size:11px;color:#6b7280;">
                  최신 개발 로그가 시간 순으로 정렬됩니다.
                </div>
              </div>
              ${route === "home"
            ? `
              <button
                id="refresh-feed"
                style="
                  border-radius:9999px;
                  border:1px solid #e5e7eb;
                  background:#ffffff;
                  padding:0.35rem 0.9rem;
                  font-size:11px;
                  font-weight:500;
                  color:#111827;
                  cursor:pointer;
                "
              >
                새로고침
              </button>
              `
            : ""
        }
            </div>

            <!-- 상단 고정 필터 (전체 / 컬렉션 자리) -->
            <div
              style="
                display:flex;
                flex-wrap:wrap;
                gap:0.5rem;
                align-items:center;
              "
            >
              <button
                type="button"
                data-collection="__all"
                style="
                  border-radius:9999px;
                  border:1px solid #0ea5e9;
                  background:rgba(56,189,248,0.08);
                  padding:0.35rem 0.75rem;
                  font-size:11px;
                  font-weight:500;
                  color:#0369a1;
                  cursor:pointer;
                "
              >
                전체 보기
              </button>
              <button
                type="button"
                style="
                  border-radius:9999px;
                  border:1px solid #e5e7eb;
                  background:#ffffff;
                  padding:0.35rem 0.75rem;
                  font-size:11px;
                  font-weight:500;
                  color:#6b7280;
                  cursor:default;
                "
              >
                컬렉션 선택 (향후)
              </button>
            </div>

            <!-- 홈일 때만 태그 필터 등 -->
            ${filtersHtml ?? ""}
          </header>

          <!-- 메인 피드 컨텐츠 -->
          <main id="main-view" style="display:flex;flex-direction:column;gap:0.75rem;">
            ${mainContentHtml}
          </main>

          <!-- 하단 푸터 -->
          <footer
            style="
              margin-top:0.75rem;
              padding-top:0.75rem;
              border-top:1px solid #e5e7eb;
              font-size:11px;
              color:#9ca3af;
            "
          >
            ${route === "home"
            ? `
              태그 필터는 1페이지 범위에서만 적용 (임시).<br />
              나중에 여러 페이지 + 태그/컬렉션 라우팅으로 확장 예정.
            `
            : "DevLog UI prototype · GitHub Pages"
        }
          </footer>
        </div>
      </div>
    </div>
  `;

    setupNavigationHandlers(route);

    // 홈일 때만 새로고침 / 전체 컬렉션 버튼
    if (route === "home") {
        const refreshBtn = document.querySelector<HTMLButtonElement>("#refresh-feed");
        refreshBtn?.addEventListener("click", () => {
            bootstrap();
        });

        const allCollectionBtn = document.querySelector<HTMLButtonElement>(
            '[data-collection="__all"]'
        );
        allCollectionBtn?.addEventListener("click", () => {
            currentCollection = null;
            renderHomeView();
        });
    }
}

/**
 * 왼쪽 네비 버튼 이벤트
 */
function setupNavigationHandlers(_currentRoute: Route) {
    const navButtons = document.querySelectorAll<HTMLButtonElement>("[data-nav]");
    navButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.nav as Route | undefined;
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

/**
 * 로딩 화면 (레이아웃 없이)
 */
function renderLoading() {
    app!.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fafafa;color:#374151;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
        <div style="height:32px;width:32px;border-radius:9999px;border:2px solid #9ca3af;border-top-color:transparent;animation:spin 1s linear infinite;"></div>
        <p style="font-size:0.875rem;color:#6b7280;">피드를 불러오는 중입니다...</p>
      </div>
    </div>
  `;
}

/**
 * 에러 화면 (레이아웃 없이)
 */
function renderError(message: string) {
    app!.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fafafa;color:#111827;padding:1rem;">
      <div style="max-width:384px;width:100%;border-radius:1rem;background:#ffffff;border:1px solid rgba(248,113,113,0.4);padding:1.25rem;box-sizing:border-box;">
        <h1 style="font-size:1.125rem;font-weight:600;color:#b91c1c;margin-bottom:0.5rem;">문제가 발생했어요</h1>
        <p style="font-size:0.875rem;color:#374151;">${message}</p>
        <button
          id="reload-btn"
          style="margin-top:0.75rem;border-radius:0.75rem;border:1px solid #d1d5db;background:#111827;padding:0.375rem 0.75rem;font-size:0.875rem;font-weight:500;color:#f9fafb;cursor:pointer;">
          다시 시도
        </button>
      </div>
    </div>
  `;

    const btn = document.querySelector<HTMLButtonElement>("#reload-btn");
    btn?.addEventListener("click", () => {
        bootstrap();
    });
}

/**
 * 모든 태그 집합 만들기
 */
function getAllTags(items: FeedItem[]): string[] {
    const set = new Set<string>();
    for (const item of items) {
        for (const t of item.tags) {
            set.add(t);
        }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * 태그 chip
 */
function renderTagChip(label: string, tag: string | null, activeTag: string | null): string {
    const isActive =
        (tag === null && activeTag === null) || (tag !== null && tag === activeTag);

    const baseClasses =
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium whitespace-nowrap transition";

    const activeClasses = "border-sky-400 bg-sky-500/10 text-sky-600";
    const inactiveClasses =
        "border-slate-200 bg-white text-slate-600 hover:bg-slate-100";

    const cls = isActive ? activeClasses : inactiveClasses;
    const dataTag = tag === null ? "__all" : tag;

    return `
    <button
      class="${baseClasses} ${cls}"
      data-tag="${escapeHtml(dataTag)}"
      type="button"
    >
      ${escapeHtml(label)}
    </button>
  `;
}

/**
 * 카드 하나 (인스타 카드 느낌으로 약간 여백/그림자)
 */
function renderFeedCard(item: FeedItem): string {
    const createdDate = new Date(item.created);
    const createdLabel = isNaN(createdDate.getTime())
        ? ""
        : createdDate.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    const tagsLabel =
        item.tags.length > 0 ? item.tags.map((t) => `#${t}`).join(" ") : "";

    return `
    <article
      style="
        border-radius:1rem;
        border:1px solid #e5e7eb;
        background:#ffffff;
        padding:0.9rem 1rem;
        box-sizing:border-box;
        box-shadow:0 1px 2px rgba(15,23,42,0.04);
      "
    >
      <!-- 카드 상단: 제목 / 날짜 -->
      <div
        style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:0.5rem;
          margin-bottom:0.35rem;
        "
      >
        <div
          style="
            font-size:13px;
            font-weight:600;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          "
        >
          ${escapeHtml(item.title)}
        </div>
        ${createdLabel
            ? `<div style="font-size:11px;color:#9ca3af;white-space:nowrap;">${createdLabel}</div>`
            : ""
        }
      </div>

      <!-- 요약 -->
      ${item.summary
            ? `<p style="font-size:12px;color:#4b5563;line-height:1.5;margin-bottom:0.35rem;">
               ${escapeHtml(item.summary)}
             </p>`
            : ""
        }

      <!-- 태그 / 컬렉션 -->
      <div
        style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:0.5rem;
          margin-top:0.25rem;
        "
      >
        <div style="font-size:11px;color:#0ea5e9;">
          ${tagsLabel ? escapeHtml(tagsLabel) : ""}
        </div>
        ${item.collection
            ? `<div
                 style="
                   font-size:10px;
                   padding:0.15rem 0.45rem;
                   border-radius:9999px;
                   background:#f3f4f6;
                   color:#4b5563;
                   border:1px solid #e5e7eb;
                 "
               >
                 ${escapeHtml(item.collection)}
               </div>`
            : ""
        }
      </div>
    </article>
  `;
}

/**
 * 홈 화면
 */
function renderHomeView() {
    const route: Route = "home";

    const afterCollection = currentCollection
        ? currentItems.filter((item) => item.collection === currentCollection)
        : currentItems;

    const afterTag = currentTag
        ? afterCollection.filter((item) => item.tags.includes(currentTag!))
        : afterCollection;

    const allTags = getAllTags(afterCollection);

    const filtersHtml = `
    <div class="flex items-center gap-2 overflow-x-auto scrollbar-none pr-1">
      ${renderTagChip("전체 태그", null, currentTag)}
      ${allTags.map((tag) => renderTagChip(tag, tag, currentTag)).join("")}
    </div>
  `;

    const mainContentHtml =
        afterTag.length === 0
            ? `<p style="font-size:13px;color:#6b7280;">해당 조건에 맞는 글이 없습니다.</p>`
            : afterTag.map((item) => renderFeedCard(item)).join("");

    renderAppShell(route, mainContentHtml, filtersHtml);

    const tagButtons = document.querySelectorAll<HTMLButtonElement>("[data-tag]");
    tagButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tag = btn.dataset.tag || null;
            currentTag = tag === "__all" ? null : tag;
            renderHomeView();
        });
    });
}

/**
 * 검색 화면 (임시)
 */
function renderSearchView() {
    const route: Route = "search";

    const mainContentHtml = `
    <section style="display:flex;flex-direction:column;gap:0.75rem;">
      <div
        style="
          border-radius:1rem;
          border:1px solid #e5e7eb;
          background:#ffffff;
          padding:0.9rem 1rem;
          box-sizing:border-box;
        "
      >
        <h2 style="font-size:13px;font-weight:600;margin-bottom:0.25rem;">검색 화면 준비 중</h2>
        <p style="font-size:12px;color:#4b5563;line-height:1.5;">
          /search 에서는 태그, 제목, 내용 등을 기준으로 글을 검색하는 UI를 구현할 예정입니다.
        </p>
      </div>
    </section>
  `;

    renderAppShell(route, mainContentHtml, null);
}

/**
 * 작성 화면 (임시)
 */
function renderWriteView() {
    const route: Route = "write";

    const mainContentHtml = `
    <section style="display:flex;flex-direction:column;gap:0.75rem;">
      <div
        style="
          border-radius:1rem;
          border:1px solid #e5e7eb;
          background:#ffffff;
          padding:0.9rem 1rem;
          box-sizing:border-box;
        "
      >
        <h2 style="font-size:13px;font-weight:600;margin-bottom:0.25rem;">작성 화면 준비 중</h2>
        <p style="font-size:12px;color:#4b5563;line-height:1.5;">
          /write 에서는 제목, 슬러그, 태그, 컬렉션, 본문을 입력하고 Worker /content/commit 으로 전송하는
          작성 UI를 이 영역에 구현할 예정입니다.
        </p>
      </div>
    </section>
  `;

    renderAppShell(route, mainContentHtml, null);
}

/**
 * 단순 escape
 */
function escapeHtml(str: string): string {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * 라우터
 */
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

/**
 * 초기 부트스트랩
 */
async function bootstrap() {
    renderLoading();
    currentTag = null;
    currentCollection = null;

    try {
        const { current, page } = await loadInitialFeed(1);
        console.log("✅ current:", current);
        console.log("✅ page:", page);

        currentItems = page.items;
        renderRoute();
    } catch (err) {
        console.error(err);
        renderError(
            err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
    }
}

// hash 변경 시
window.addEventListener("hashchange", () => {
    if (getCurrentRouteFromHash() === "home" && currentItems.length === 0) {
        bootstrap();
    } else {
        renderRoute();
    }
});

// 시작
bootstrap();
