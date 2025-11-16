(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const L="/data";async function T(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function F(){const e=`${L}/current.json`;return await T(e)}async function G(e,t){const o=`${L}/feed/page-${t}@${e}.json`;return await T(o)}async function J(e=1){const t=await F(),o=await G(t.sha,e);return{current:t,page:o}}const V={},k=document.querySelector("#app");if(!k)throw new Error("#app element not found");const z=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],K=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],h={home:"Developer"},j=V?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",d="devlog_jwt";function Y(e){try{const t=e.split(".");if(t.length!==3)return null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),r=atob(o);return JSON.parse(r)}catch{return null}}function B(){try{const e=localStorage.getItem(d);if(!e)return null;const t=Y(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(d),null):e}catch{return null}}function Z(){return!!B()}function Q(){const e=window.location.hash||"";if(!e.startsWith("#auth="))return;const t=decodeURIComponent(e.slice(6));if(t){try{localStorage.setItem(d,t),console.log("✅ JWT 저장 완료")}catch(o){console.error("JWT 저장 실패:",o)}window.location.hash="#/"}}function X(){const t=(window.location.hash||"").match(/^#\/?auth=(.+)$/);if(!t)return;const o=t[1];if(o){try{localStorage.setItem(d,o)}catch{}window.location.replace("#/write")}}const ee={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}]},P={posts:{label:"Posts",icon:"grid"},saved:{label:"Saved",icon:"bookmark"}},te={home:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    `,search:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    `,compass:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    `,film:`
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
    `,message:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    `,heart:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    `,plus:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    `,user:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    `,menu:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    `,grid:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    `,bookmark:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    `,tagged:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 21a6 6 0 0 0-12 0" />
        <circle cx="12" cy="11" r="4" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    `,chevron:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    `};let u=[],g="posts";function H(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function oe(){const t=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!t)return null;try{return decodeURIComponent(t[1])}catch{return t[1]}}function re(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const o=e.slice(t+1);return new URLSearchParams(o).get("token")}function v(e,t){k.innerHTML=`
      <div class="app-shell">
        ${se(e)}
        <div class="main-area">
          ${ie()}
          <div class="main-inner">${t}</div>
        </div>
        ${ae(e)}
      </div>
    `,$e()}function se(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${z.map(t=>ne(t,e)).join("")}
        </nav>
      </aside>
    `}function ne(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${$(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function ie(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${$("chevron")}</div>
      </header>
    `}function ae(e){return`
      <nav class="bottom-nav">
        ${K.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
              >
                ${$(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function $(e){return`<span class="icon">${te[e]}</span>`}function w(e,t){return`
      <section class="profile-header">
        <div class="profile-avatar">
          <img src="/profile/profile.jpg" alt="Profile" loading="lazy" />
        </div>
        <div class="profile-details">
          <div class="profile-top-row">
            <h2 class="profile-username">Cheolmin Kim</h2>
          </div>
          <div class="profile-stat-row">
            ${e.map(o=>`
                      <div class="stat">
                        <span class="stat-value">${i(o.value)}</span>
                        ${i(o.label)}
                      </div>
                    `).join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${i(t)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `}function le(){return`
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
    `}function ce(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(P).map(([e,t])=>{const o=e;return`
                  <button
                    class="tab-btn ${g===o?"is-active":""}"
                    role="tab"
                    data-tab="${o}"
                    type="button"
                  >
                    ${$(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function de(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>ue(t)).join("")}
      </div>
    `}function ue(e){const t=e.tags.length?e.tags.map(a=>`#${i(a)}`).join(" "):"태그 없음",o=new Date(e.created),r=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),s=100+(e.summary?.length??20),n=e.tags.length*5+12,l=e.cover?`<img src="${i(e.cover)}" alt="${i(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${i(e.slug)}">
        <div class="post-media ${l?"":"is-fallback"}" ${l?"":`style="background:${fe(e.slug)}"`}
        >
          ${l||`<span>${i(e.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${i(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <div class="overlay-meta">
            <span>❤️ ${s.toLocaleString()}</span>
            <span>💬 ${n}</span>
          </div>
          <p class="overlay-date">${r} · ${i(e.slug)}</p>
        </div>
      </article>
    `}function pe(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function fe(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],o=Math.abs(e.split("").reduce((r,s)=>r+s.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[o]}, #fff)`}function he(e){return`
      <section class="info-grid">
        ${e.map(t=>`
                  <article class="info-card">
                    <h3>${i(t.title)}</h3>
                    <ul>
                      ${t.lines.map(o=>`<li>${i(o)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
      </section>
    `}function b(){return[{label:"posts",value:`${u.length}`}]}function q(){const e="home",t=u,o=b(),r=`
      ${w(o,h.home)}
      ${ce()}
      ${g==="posts"?de(t):`<div class="empty-state">${P[g].label} 뷰는 준비 중입니다.</div>`}
    `;v(e,r),ye()}function ve(){const e=b(),t=`
      ${w(e,h.home)}
      ${he(ee.search)}
    `;v("search",t)}function we(e){if(!e){y("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!u.length){y("아직 피드를 불러오지 못했습니다. 홈 화면을 한 번 연 뒤 다시 시도해 주세요.");return}const t=u.find(a=>a.slug===e);if(!t){y(`슬러그가 '${e}'인 글을 찾을 수 없습니다.`);return}const o=b(),r=t.tags.length?t.tags.map(a=>`#${i(a)}`).join(" "):"태그 없음",s=new Date(t.created),n=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),l=`
      ${w(o,h.home)}
      <section class="profile-section">
        <article class="info-card">
          <h3>${i(t.title)}</h3>
          <div class="profile-section-body">
            <div class="profile-row">
              <span class="profile-label">슬러그</span>
              <span class="profile-value">${i(t.slug)}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">작성일</span>
              <span class="profile-value">${n}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">태그</span>
              <span class="profile-value">${r}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">컬렉션</span>
              <span class="profile-value">${i(t.collection??"지정 없음")}</span>
            </div>
            ${t.cover?`
            <div class="profile-row">
              <span class="profile-label">커버</span>
              <span class="profile-value">
                <img src="${i(t.cover)}" alt="${i(t.title)}" loading="lazy" />
              </span>
            </div>
            `:""}
          </div>
        </article>

        <article class="info-card">
          <h3>본문</h3>
          <div id="post-body" class="post-body">
            <p>본문을 불러오는 중입니다...</p>
          </div>
        </article>
      </section>
    `;v("profile",l),me(t)}async function me(e){const t=document.querySelector("#post-body");if(t)try{const o=await Ce(e),{body:r}=Se(o),s=Ae(r.trim());t.innerHTML=s||"<p>본문이 비어 있습니다.</p>"}catch(o){console.error(o),t.innerHTML="<p>본문을 불러오지 못했습니다. GitHub Pages 설정 또는 경로를 확인해 주세요.</p>"}}function ge(){const e=b(),t=`
      ${w(e,h.home)}
      ${le()}
    `;v("profile",t)}function be(){const e=b();if(!Z()){const o=`
          ${w(e,h.home)}
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
        `;v("write",o),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${j}/auth/login`});return}const t=`
      ${w(e,h.home)}
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
    `;v("write",t),ke()}function ye(){document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.tab;r&&(g=r,q())})}),document.querySelectorAll(".post-card[data-slug]").forEach(o=>{o.addEventListener("click",()=>{const r=o.dataset.slug;r&&(window.location.hash=`#/post/${encodeURIComponent(r)}`)})})}function ke(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),o=e.querySelector("#write-slug"),r=e.querySelector("#write-summary"),s=e.querySelector("#write-tags"),n=e.querySelector("#write-collection"),l=e.querySelector("#write-body"),a=e.querySelector("#write-submit"),m=e.querySelector("#write-reset"),c=e.querySelector("#write-error");!t||!o||!s||!l||!a||!c||(t.addEventListener("input",()=>{o.dataset.userEdited!=="1"&&(o.value=pe(t.value))}),o.addEventListener("input",()=>{o.dataset.userEdited="1"}),m?.addEventListener("click",()=>{e.reset(),o.dataset.userEdited="0",c.style.display="none",c.textContent=""}),e.addEventListener("submit",async C=>{C.preventDefault();const A=t.value.trim(),E=o.value.trim(),_=r?.value.trim()??"",D=s.value,W=n?.value.trim()??"",S=l.value.trim(),p=[];A||p.push("제목을 입력해 주세요."),E||p.push("슬러그를 입력해 주세요.");const M=D.split(/[,\s]+/).map(f=>f.trim()).filter(Boolean);if(M.length===0&&p.push("태그를 한 개 이상 입력해 주세요."),S.length<10&&p.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+S.length+")"),p.length>0){c.textContent=p.join(" / "),c.style.display="block";return}c.style.display="none";const I={title:A,slug:E,summary:_,tags:M,collection:W||null,content:S};console.log("✏️ 새 글 작성 payload:",I),a.disabled=!0;const N=a.textContent;a.textContent="게시 중...";try{const f=await Ee(I);console.log("✅ Worker 응답:",f),a.textContent="게시 완료",e.reset(),o.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(f){const U=f instanceof Error?f.message:"작성 중 알 수 없는 오류가 발생했습니다.";c.textContent=U,c.style.display="block",a.textContent=N,a.disabled=!1}}))}function $e(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.route;o&&(o==="home"?window.location.hash="#/":o==="search"?window.location.hash="#/search":o==="profile"?window.location.hash="#/profile":o==="write"&&(window.location.hash="#/write"))})})}function R(){k.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function y(e){k.innerHTML=`
      <div class="view-state">
        <p>${i(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{x()})}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function xe(e){const t=new Date(e.created);if(!isNaN(t.getTime())){const o=t.getUTCFullYear(),r=String(t.getUTCMonth()+1).padStart(2,"0");return`/posts/${o}/${r}/${encodeURIComponent(e.slug)}.md`}return`/posts/${encodeURIComponent(e.slug)}.md`}async function Ce(e){const t=xe(e),o=await fetch(t,{cache:"no-store"});if(!o.ok)throw new Error(`Markdown 로드 실패: ${o.status} ${o.statusText} (${t})`);return await o.text()}function Se(e){if(!e.startsWith("---"))return{frontmatter:"",body:e};const t=e.split(/\r?\n/);if(t[0].trim()!=="---")return{frontmatter:"",body:e};let o=-1;for(let n=1;n<t.length;n++)if(t[n].trim()==="---"){o=n;break}if(o===-1)return{frontmatter:"",body:e};const r=t.slice(1,o).join(`
`),s=t.slice(o+1).join(`
`);return{frontmatter:r,body:s}}function Ae(e){const t=e.split(/\r?\n/);let o="",r=!1,s=!1;function n(){s&&(o+="</ul>",s=!1)}for(let l of t){const a=l.replace(/\s+$/,"");if(a.trim().startsWith("```")){r?(o+="</code></pre>",r=!1):(n(),o+="<pre><code>",r=!0);continue}if(r){o+=i(a)+`
`;continue}if(!a.trim()){n();continue}const m=a.match(/^(#{1,6})\s+(.*)$/);if(m){n();const c=m[1].length,C=i(m[2]);o+=`<h${c}>${C}</h${c}>`;continue}if(/^[-*]\s+/.test(a)){const c=i(a.replace(/^[-*]\s+/,""));s||(o+="<ul>",s=!0),o+=`<li>${c}</li>`;continue}else n();o+=`<p>${i(a)}</p>`}return n(),o}async function Ee(e){const t=B();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const o=await fetch(`${j}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(o.status===401){try{localStorage.removeItem(d)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!o.ok){let r="";try{const n=await o.json();n&&typeof n.message=="string"&&(r=n.message)}catch{}const s=`작성 요청 실패: ${o.status} ${o.statusText}`;throw new Error(r?`${s} - ${r}`:s)}try{return await o.json()}catch{return{}}}function O(){const e=H();if(e==="home"){if(u.length===0){R();return}q()}else if(e==="search")ve();else if(e==="write")be();else if(e==="profile")ge();else if(e==="postDetail"){const t=oe();we(t)}else e==="authCallback"&&Me()}function Me(){const e=re();if(e)try{localStorage.setItem(d,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function x(){X(),R(),g="posts";try{const{page:e}=await J(1);u=e.items,O()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";y(t)}}function Ie(){const t=(window.location.hash||"").match(/auth=([^&]+)/);if(!t)return;const o=decodeURIComponent(t[1]);try{localStorage.setItem(d,o)}catch{}const r=window.location.href.split("#")[0];window.history.replaceState(null,"",r+"#/write")}Ie();x();window.addEventListener("hashchange",()=>{H()==="home"&&u.length===0?x():O()});Q();x();
