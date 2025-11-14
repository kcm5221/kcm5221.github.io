(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const $="/data";async function k(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function E(){const e=`${$}/current.json`;return await k(e)}async function L(e,t){const r=`${$}/feed/page-${t}@${e}.json`;return await k(r)}async function T(e=1){const t=await E(),r=await L(t.sha,e);return{current:t,page:r}}const u=document.querySelector("#app");if(!u)throw new Error("#app element not found");const P=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],H=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],p={home:"Developer"},y={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}],write:[{title:"작성 도구",lines:["제목 · 슬러그 · 요약 입력 UI","컬렉션/태그 선택 및 미리보기","Cloudflare Worker 로 커밋"]},{title:"보안 메모",lines:["PKCE + GitHub App 권한 확인","JWT 1시간 유효","Audit 로그 저장"]}]},C={posts:{label:"Posts",icon:"grid"},saved:{label:"Saved",icon:"bookmark"}},I={home:`
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
    `};let a=[],c=null,d="posts";function A(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":"home"}function v(e,t){u.innerHTML=`
      <div class="app-shell">
        ${O(e)}
        <div class="main-area">
          ${D()}
          <div class="main-inner">${t}</div>
        </div>
        ${N(e)}
      </div>
    `,Z()}function O(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${P.map(t=>_(t,e)).join("")}
        </nav>
      </aside>
    `}function _(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${f(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function D(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${f("chevron")}</div>
      </header>
    `}function N(e){return`
      <nav class="bottom-nav">
        ${H.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
              >
                ${f(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function f(e){return`<span class="icon">${I[e]}</span>`}function h(e,t){return`
      <section class="profile-header">
        <div class="profile-avatar">
          <img src="/profile/profile.jpg" alt="Profile" loading="lazy" />
        </div>
        <div class="profile-details">
          <div class="profile-top-row">
            <h2 class="profile-username">Cheolmin Kim</h2>
          </div>
          <div class="profile-stat-row">
            ${e.map(r=>`
                      <div class="stat">
                        <span class="stat-value">${i(r.value)}</span>
                        ${i(r.label)}
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
    `}function R(){return`
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
    `}function W(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(C).map(([e,t])=>{const r=e;return`
                  <button
                    class="tab-btn ${d===r?"is-active":""}"
                    role="tab"
                    data-tab="${r}"
                    type="button"
                  >
                    ${f(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function q(e){return`
      <div class="filter-rail">
        <div class="tag-rail">
          ${m("전체 태그",null,c)}
          ${e.map(t=>m(`#${t}`,t,c)).join("")}
        </div>
      </div>
    `}function m(e,t,r){return`
      <button class="tag-chip ${t===null&&r===null||t!==null&&t===r?"is-active":""}" data-tag="${t??"__all"}" type="button">
        ${i(e)}
      </button>
    `}function F(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>G(t)).join("")}
      </div>
    `}function G(e){const t=e.tags.length?e.tags.map(B=>`#${i(B)}`).join(" "):"태그 없음",r=new Date(e.created),s=isNaN(r.getTime())?"작성일 미정":r.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=100+(e.summary?.length??20),n=e.tags.length*5+12,l=e.cover?`<img src="${i(e.cover)}" alt="${i(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card">
        <div class="post-media ${l?"":"is-fallback"}" ${l?"":`style="background:${K(e.slug)}"`}>
          ${l||`<span>${i(e.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${i(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <div class="overlay-meta">
            <span>❤️ ${o.toLocaleString()}</span>
            <span>💬 ${n}</span>
          </div>
          <p class="overlay-date">${s} · ${i(e.slug)}</p>
        </div>
      </article>
    `}function K(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],r=Math.abs(e.split("").reduce((s,o)=>s+o.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[r]}, #fff)`}function x(e){return`
      <section class="info-grid">
        ${e.map(t=>`
                  <article class="info-card">
                    <h3>${i(t.title)}</h3>
                    <ul>
                      ${t.lines.map(r=>`<li>${i(r)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
      </section>
    `}function g(){const e=S(a);return[{label:"posts",value:`${a.length}`},{label:"tags",value:`${e.length}`}]}function b(){const e="home",t=c?a.filter(n=>n.tags.includes(c)):a,r=S(a),s=g(),o=`
      ${h(s,p.home)}
      ${W()}
      ${q(r)}
      ${d==="posts"?F(t):`<div class="empty-state">${C[d].label} 뷰는 준비 중입니다.</div>`}
    `;v(e,o),J()}function V(){const e=g(),t=`
      ${h(e,p.home)}
      ${x(y.search)}
    `;v("search",t)}function z(){const e=g(),t=`
      ${h(e,p.home)}
      ${R()}
    `;v("profile",t)}function U(){const e=g(),t=`
      ${h(e,p.home)}
      ${x(y.write)}
    `;v("write",t)}function J(){document.querySelectorAll("[data-tag]").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.tag??"__all";c=s==="__all"?null:s,b()})}),document.querySelectorAll("[data-tab]").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.tab;s&&(d=s,b())})})}function Z(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.route;r&&(r==="home"?window.location.hash="#/":r==="search"?window.location.hash="#/search":r==="profile"?window.location.hash="#/profile":r==="write"&&(window.location.hash="#/write"))})})}function S(e){const t=new Set;return e.forEach(r=>r.tags.forEach(s=>t.add(s))),Array.from(t).sort((r,s)=>r.localeCompare(s))}function M(){u.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function Q(e){u.innerHTML=`
      <div class="view-state">
        <p>${i(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{w()})}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function j(){const e=A();if(e==="home"){if(a.length===0){M();return}b()}else e==="search"?V():e==="write"?U():e==="profile"&&z()}async function w(){M(),c=null,d="posts";try{const{page:e}=await T(1);a=e.items,j()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";Q(t)}}window.addEventListener("hashchange",()=>{A()==="home"&&a.length===0?w():j()});w();
