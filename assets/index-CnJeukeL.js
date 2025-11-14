(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const E="/data";async function B(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function F(){const e=`${E}/current.json`;return await B(e)}async function G(e,t){const o=`${E}/feed/page-${t}@${e}.json`;return await B(o)}async function V(e=1){const t=await F(),o=await G(t.sha,e);return{current:t,page:o}}const J={},g=document.querySelector("#app");if(!g)throw new Error("#app element not found");const U=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],z=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],p={home:"Developer"},L=J?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",m="devlog_jwt";function j(){try{return localStorage.getItem(m)}catch{return null}}function K(){const t=(window.location.hash||"").match(/^#auth=([^&]+)/);if(!t)return;const o=t[1];try{const s=decodeURIComponent(o);localStorage.setItem(m,s),console.log("✅ JWT 저장 완료")}catch(s){console.error("JWT 저장 실패",s)}window.location.hash="#/write"}function Z(){return!!j()}const Y={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}]},I={posts:{label:"Posts",icon:"grid"},saved:{label:"Saved",icon:"bookmark"}},Q={home:`
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
    `};let w=[],h="posts";function M(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":"home"}function X(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const o=e.slice(t+1);return new URLSearchParams(o).get("token")}function v(e,t){g.innerHTML=`
      <div class="app-shell">
        ${ee(e)}
        <div class="main-area">
          ${oe()}
          <div class="main-inner">${t}</div>
        </div>
        ${re(e)}
      </div>
    `,we()}function ee(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${U.map(t=>te(t,e)).join("")}
        </nav>
      </aside>
    `}function te(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${b(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function oe(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${b("chevron")}</div>
      </header>
    `}function re(e){return`
      <nav class="bottom-nav">
        ${z.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
              >
                ${b(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function b(e){return`<span class="icon">${Q[e]}</span>`}function f(e,t){return`
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
                        <span class="stat-value">${n(o.value)}</span>
                        ${n(o.label)}
                      </div>
                    `).join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${n(t)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `}function se(){return`
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
    `}function ie(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(I).map(([e,t])=>{const o=e;return`
                  <button
                    class="tab-btn ${h===o?"is-active":""}"
                    role="tab"
                    data-tab="${o}"
                    type="button"
                  >
                    ${b(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function ne(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>ae(t)).join("")}
      </div>
    `}function ae(e){const t=e.tags.length?e.tags.map(l=>`#${n(l)}`).join(" "):"태그 없음",o=new Date(e.created),s=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),r=100+(e.summary?.length??20),i=e.tags.length*5+12,a=e.cover?`<img src="${n(e.cover)}" alt="${n(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card">
        <div class="post-media ${a?"":"is-fallback"}" ${a?"":`style="background:${ce(e.slug)}"`}>
          ${a||`<span>${n(e.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${n(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <div class="overlay-meta">
            <span>❤️ ${r.toLocaleString()}</span>
            <span>💬 ${i}</span>
          </div>
          <p class="overlay-date">${s} · ${n(e.slug)}</p>
        </div>
      </article>
    `}function le(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function ce(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],o=Math.abs(e.split("").reduce((s,r)=>s+r.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[o]}, #fff)`}function de(e){return`
      <section class="info-grid">
        ${e.map(t=>`
                  <article class="info-card">
                    <h3>${n(t.title)}</h3>
                    <ul>
                      ${t.lines.map(o=>`<li>${n(o)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
      </section>
    `}function y(){return[{label:"posts",value:`${w.length}`}]}function T(){const e="home",t=w,o=y(),s=`
      ${f(o,p.home)}
      ${ie()}
      ${h==="posts"?ne(t):`<div class="empty-state">${I[h].label} 뷰는 준비 중입니다.</div>`}
    `;v(e,s),ve()}function ue(){const e=y(),t=`
      ${f(e,p.home)}
      ${de(Y.search)}
    `;v("search",t)}function pe(){const e=y(),t=`
      ${f(e,p.home)}
      ${se()}
    `;v("profile",t)}function he(){const e=y();if(!Z()){const o=`
          ${f(e,p.home)}
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
        `;v("write",o),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${L}/auth/login`});return}const t=`
      ${f(e,p.home)}
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
    `;v("write",t),fe()}function ve(){document.querySelectorAll("[data-tab]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.tab;o&&(h=o,T())})})}function fe(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),o=e.querySelector("#write-slug"),s=e.querySelector("#write-summary"),r=e.querySelector("#write-tags"),i=e.querySelector("#write-collection"),a=e.querySelector("#write-body"),l=e.querySelector("#write-submit"),q=e.querySelector("#write-reset"),c=e.querySelector("#write-error");!t||!o||!r||!a||!l||!c||(t.addEventListener("input",()=>{o.dataset.userEdited!=="1"&&(o.value=le(t.value))}),o.addEventListener("input",()=>{o.dataset.userEdited="1"}),q?.addEventListener("click",()=>{e.reset(),o.dataset.userEdited="0",c.style.display="none",c.textContent=""}),e.addEventListener("submit",async O=>{O.preventDefault();const x=t.value.trim(),C=o.value.trim(),_=s?.value.trim()??"",R=r.value,W=i?.value.trim()??"",$=a.value.trim(),d=[];x||d.push("제목을 입력해 주세요."),C||d.push("슬러그를 입력해 주세요.");const S=R.split(/[,\s]+/).map(u=>u.trim()).filter(Boolean);if(S.length===0&&d.push("태그를 한 개 이상 입력해 주세요."),$.length<10&&d.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+$.length+")"),d.length>0){c.textContent=d.join(" / "),c.style.display="block";return}c.style.display="none";const A={title:x,slug:C,summary:_,tags:S,collection:W||null,body:$};console.log("✏️ 새 글 작성 payload:",A),l.disabled=!0;const N=l.textContent;l.textContent="게시 중...";try{const u=await me(A);console.log("✅ Worker 응답:",u),l.textContent="게시 완료",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 피드에서 확인할 수 있습니다.`),window.location.hash="#/"}catch(u){const D=u instanceof Error?u.message:"작성 중 알 수 없는 오류가 발생했습니다.";c.textContent=D,c.style.display="block",l.textContent=N,l.disabled=!1}}))}function we(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.route;o&&(o==="home"?window.location.hash="#/":o==="search"?window.location.hash="#/search":o==="profile"?window.location.hash="#/profile":o==="write"&&(window.location.hash="#/write"))})})}function P(){g.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function ge(e){g.innerHTML=`
      <div class="view-state">
        <p>${n(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{k()})}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}async function me(e){const t=j();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const o=await fetch(`${L}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(!o.ok){let s="";try{const i=await o.json();i&&typeof i.message=="string"&&(s=i.message)}catch{}const r=`작성 요청 실패: ${o.status} ${o.statusText}`;throw new Error(s?`${r} - ${s}`:r)}try{return await o.json()}catch{return{}}}function H(){const e=M();if(e==="home"){if(w.length===0){P();return}T()}else e==="search"?ue():e==="write"?he():e==="profile"?pe():e==="authCallback"&&be()}function be(){const e=X();if(e)try{localStorage.setItem(m,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function k(){K(),P(),h="posts";try{const{page:e}=await V(1);w=e.items,H()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";ge(t)}}function ye(){const t=(window.location.hash||"").match(/auth=([^&]+)/);if(!t)return;const o=decodeURIComponent(t[1]);try{localStorage.setItem(m,o)}catch{}const s=window.location.href.split("#")[0];window.history.replaceState(null,"",s+"#/write")}ye();k();window.addEventListener("hashchange",()=>{M()==="home"&&w.length===0?k():H()});k();
