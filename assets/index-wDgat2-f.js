(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const N="/data";async function R(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function K(){const e=`${N}/current.json`;return await R(e)}async function V(e,t){const s=`${N}/feed/page-${t}@${e}.json`;return await R(s)}async function J(e=1){const t=await K(),s=await V(t.sha,e);return{current:t,page:s}}const Z={},M=document.querySelector("#app");if(!M)throw new Error("#app element not found");const Y=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],Q=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],S={home:"Developer"},_=Z?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",f="devlog_jwt";function X(e){try{const t=e.split(".");if(t.length!==3)return null;const s=t[1].replace(/-/g,"+").replace(/_/g,"/"),o=atob(s);return JSON.parse(o)}catch{return null}}function O(){try{const e=localStorage.getItem(f);if(!e)return null;const t=X(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(f),null):e}catch{return null}}function ee(){return!!O()}function te(){const e=window.location.hash||"";if(!e.startsWith("#auth="))return;const t=decodeURIComponent(e.slice(6));if(t){try{localStorage.setItem(f,t),console.log("✅ JWT 저장 완료")}catch(s){console.error("JWT 저장 실패:",s)}window.location.hash="#/"}}function se(){const t=(window.location.hash||"").match(/^#\/?auth=(.+)$/);if(!t)return;const s=t[1];if(s){try{localStorage.setItem(f,s)}catch{}window.location.replace("#/write")}}const oe={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}]},ne={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},ae={home:`
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
    `,send:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 2 11 13" />
        <path d="m22 2-7 20-4-9-9-4Z" />
      </svg>
    `,smile:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </svg>
    `,close:`
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
    `};let u=[],A="posts",h=null,y=null;function W(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function ie(){const t=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!t)return null;try{return decodeURIComponent(t[1])}catch{return t[1]}}function re(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const s=e.slice(t+1);return new URLSearchParams(s).get("token")}function x(e,t){M.innerHTML=`
      <div class="app-shell">
        ${le(e)}
        <div class="main-area">
          ${de()}
          <div class="main-inner">${t}</div>
        </div>
        ${ue(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,je()}function le(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${Y.map(t=>ce(t,e)).join("")}
        </nav>
      </aside>
    `}function ce(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${m(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function de(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${m("chevron")}</div>
      </header>
    `}function ue(e){return`
      <nav class="bottom-nav">
        ${Q.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${m(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function I(){return document.querySelector("#post-detail-modal-root")}function pe(){const e=I();e&&(e.innerHTML="",e.classList.remove("is-active"),h&&(document.removeEventListener("keydown",h),h=null))}function U(){const e=I();if(!e)return;e.querySelectorAll("[data-close-modal='true']").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault(),window.location.hash="#/"})}),h&&document.removeEventListener("keydown",h),h=s=>{s.key==="Escape"&&(window.location.hash="#/")},document.addEventListener("keydown",h)}function D(e){const t=I();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${m("close")}
          </button>
          <div class="post-detail-empty">${r(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),U())}function m(e){return`<span class="icon">${ae[e]}</span>`}function L(e,t){return`
      <section class="profile-header">
        <div class="profile-avatar">
          <img src="/profile/profile.jpg" alt="Profile" loading="lazy" />
        </div>
        <div class="profile-details">
          <div class="profile-top-row">
            <h2 class="profile-username">Cheolmin Kim</h2>
          </div>
          <div class="profile-stat-row">
            ${e.map(s=>`
                      <div class="stat">
                        ${r(s.label)}
                        <span class="stat-value">${r(s.value)}</span>
                      </div>
                    `).join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${r(t)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `}function ve(){return`
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
    `}function he(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(ne).map(([e,t])=>{const s=e;return`
                  <button
                    class="tab-btn ${A===s?"is-active":""}"
                    role="tab"
                    data-tab="${s}"
                    type="button"
                  >
                    ${m(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function fe(){const e=me(u);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return y&&(t=e.find(s=>s.id===y)??null,t||(y=null)),t?ye(t):we(e)}function me(e){const t=new Map;return e.forEach(s=>{const o=s.collection?.trim()||"uncategorized",n=t.get(o)??[];n.push(s),t.set(o,n)}),Array.from(t.entries()).map(([s,o])=>({id:s,name:ge(s),posts:[...o].sort((n,a)=>{const i=new Date(n.created).getTime(),l=new Date(a.created).getTime();return isNaN(i)||isNaN(l)?0:l-i})})).sort((s,o)=>o.posts.length!==s.posts.length?o.posts.length-s.posts.length:s.name.localeCompare(o.name))}function ge(e){if(!e||e==="uncategorized")return"미분류";const t=e.split(/[-_]/).filter(Boolean).map(s=>s.charAt(0).toUpperCase()+s.slice(1));return t.length?t.join(" "):e}function we(e){return`
      <section class="saved-view saved-collections-view">
        <div class="saved-header">
          <div>
            <p>컬렉션 ${e.length}</p>
          </div>
          <button type="button" id="saved-new-collection-btn" class="saved-new-btn">+ 새 컬렉션</button>
        </div>
        <div class="saved-collections-grid">
          ${e.map(t=>be(t)).join("")}
        </div>
      </section>
    `}function be(e){const t=e.posts.find(i=>!!i.cover),s=!!t?.cover,o=`saved-collection-cover ${s?"":"is-fallback"}`.trim(),n=s?"":`style="background:${P(e.id)}"`,a=s?`<img src="${r(t.cover)}" alt="${r(e.name)}" loading="lazy" />`:`<span>${r(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${r(e.id)}">
        <span class="${o}" ${n}>
          ${a}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${r(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function ye(e){const t=e.posts[0];let s="";if(t){const n=new Date(t.created);isNaN(n.getTime())||(s=n.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const o=s?`게시물 ${e.posts.length} · 최근 업데이트 ${s}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${m("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${r(e.name)}</h3>
            <p>${r(o)}</p>
          </div>
        </div>
        ${F(e.posts)}
      </section>
    `}function F(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>ke(t)).join("")}
      </div>
    `}function ke(e){const t=e.tags.length?e.tags.map(a=>`#${r(a)}`).join(" "):"태그 없음",s=new Date(e.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),n=e.cover?`<img src="${r(e.cover)}" alt="${r(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${r(e.slug)}">
        <div class="post-media ${n?"":"is-fallback"}" ${n?"":`style="background:${P(e.slug)}"`}
        >
          ${n||`<span>${r(e.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${r(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${o}</p>
        </div>
      </article>
    `}function $e(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function P(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(e.split("").reduce((o,n)=>o+n.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[s]}, #fff)`}function Ce(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function Se(e){return`
      <section class="info-grid">
        ${e.map(t=>`
                  <article class="info-card">
                    <h3>${r(t.title)}</h3>
                    <ul>
                      ${t.lines.map(s=>`<li>${r(s)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
      </section>
    `}function T(){return[{label:"게시물",value:`${u.length}`}]}function C(){const e="home",t=u,s=T(),o=`
      ${L(s,S.home)}
      ${he()}
      ${A==="posts"?F(t):fe()}
    `;x(e,o),Ie()}function xe(){const e=T(),t=`
      ${L(e,S.home)}
      ${Se(oe.search)}
    `;x("search",t)}function Le(e){if(!e){D("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!u.length){D("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=u.find(d=>d.slug===e);if(!t){D(`슬러그가 '${r(e)}'인 글을 찾을 수 없습니다.`);return}const s=new Date(t.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),n=t.tags.length?t.tags.map(d=>`<span class="post-detail-tag">#${r(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',a=t.cover?`<img src="${r(t.cover)}" alt="${r(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${P(t.slug)}">
          <h2>${r(t.title)}</h2>
        </div>
      `,i=u.findIndex(d=>d.slug===t.slug),l=i>0?u[i-1]:null,c=i>=0&&i<u.length-1?u[i+1]:null,v=(d,p)=>{const k=`post-detail-nav-btn-${d}`,$=d==="prev"?"‹":"›",B=d==="prev"?"이전 게시물":"다음 게시물";return p?`
        <a class="post-detail-nav-btn ${k}" href="#/post/${encodeURIComponent(p.slug)}" aria-label="${B}" title="${r(Ce(p.title,48))}">
          <span aria-hidden="true">${$}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${k}" aria-disabled="true" aria-label="${B}"><span aria-hidden="true">${$}</span></span>`},g=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${v("prev",l)}
      </nav>
    `,E=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${v("next",c)}
      </nav>
    `,q=`
      <section class="post-detail" ${l?`data-prev-slug="${r(l.slug)}"`:""} ${c?`data-next-slug="${r(c.slug)}"`:""}>
        <div class="post-detail-frame">
          ${g}
          <div class="post-detail-container">
            <div class="post-detail-media">
              ${a}
            </div>
            <div class="post-detail-panel">
            <header class="post-detail-header">
              <div class="post-detail-author">
                <img src="/profile/profile.jpg" alt="Cheolmin Kim" loading="lazy" />
                <div>
                  <p>Cheolmin Kim</p>
                  <span>${o}</span>
                </div>
              </div>
              <div class="post-detail-header-actions">
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${m("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${r(t.title)}</h2>
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${o}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${r(t.collection??"지정 없음")}</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${n}
              </div>
              <div class="post-detail-body">
                <h4>본문</h4>
                <div id="post-body" class="post-detail-body-content">
                  <p>본문을 불러오는 중입니다...</p>
                </div>
              </div>
            </div>
          </div>
          ${E}
        </div>
      </section>
    `,w=I();w&&(w.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${q}
        </div>
      </div>
    `,w.classList.add("is-active"),requestAnimationFrame(()=>{w.querySelector(".post-detail-modal")?.classList.add("is-open")}),Be(),U(),Ee(t))}function Ee(e){const t=document.querySelector("#post-body");if(!t)return;const s=(e.summary??"").trim();if(!s){t.innerHTML="<p>본문이 비어 있습니다.</p>";return}const o=De(s);t.innerHTML=o||"<p>본문이 비어 있습니다.</p>"}function Be(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),o=document.querySelector("#post-save-btn");if(e&&t){const n=()=>{const a=e.value.trim().length>0;t.disabled=!a,t.classList.toggle("is-active",a)};e.addEventListener("input",n)}s&&s.addEventListener("click",()=>{const n=!s.classList.contains("is-active");s.classList.toggle("is-active",n),s.setAttribute("aria-pressed",n?"true":"false")}),o&&o.addEventListener("click",()=>{const n=!o.classList.contains("is-active");o.classList.toggle("is-active",n),o.setAttribute("aria-pressed",n?"true":"false")})}function Me(){const e=T(),t=`
      ${L(e,S.home)}
      ${ve()}
    `;x("profile",t)}function Ae(){const e=T();if(!ee()){const s=`
          ${L(e,S.home)}
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
        `;x("write",s),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${_}/auth/login`});return}const t=`
      ${L(e,S.home)}
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
    `;x("write",t),Te()}function Ie(){document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.tab;i&&(A=i,i!=="saved"&&(y=null),C())})}),document.querySelectorAll(".post-card[data-slug]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.slug;i&&(window.location.hash=`#/post/${encodeURIComponent(i)}`)})}),document.querySelectorAll(".saved-collection-card").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.collectionId;i&&(y=i,C())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{y=null,C()}),document.querySelector("#saved-new-collection-btn")?.addEventListener("click",()=>{alert("컬렉션 생성 기능은 곧 준비될 예정입니다.")})}function Te(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),s=e.querySelector("#write-slug"),o=e.querySelector("#write-tags"),n=e.querySelector("#write-collection"),a=e.querySelector("#write-body"),i=e.querySelector("#write-submit"),l=e.querySelector("#write-reset"),c=e.querySelector("#write-error");!t||!s||!o||!a||!i||!c||(t.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=$e(t.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),l?.addEventListener("click",()=>{e.reset(),s.dataset.userEdited="0",c.style.display="none",c.textContent=""}),e.addEventListener("submit",async v=>{v.preventDefault();const g=t.value.trim(),E=s.value.trim(),q=o.value,w=n?.value.trim()??"",d=a.value.trim(),p=[];g||p.push("제목을 입력해 주세요."),E||p.push("슬러그를 입력해 주세요.");const k=q.split(/[,\s]+/).map(b=>b.trim()).filter(Boolean);if(k.length===0&&p.push("태그를 한 개 이상 입력해 주세요."),d.length<10&&p.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+d.length+")"),p.length>0){c.textContent=p.join(" / "),c.style.display="block";return}c.style.display="none";const $={title:g,slug:E,summary:"",tags:k,collection:w||null,content:d};console.log("✏️ 새 글 작성 payload:",$),i.disabled=!0;const B=i.textContent;i.textContent="게시 중...";try{const b=await He($);console.log("✅ Worker 응답:",b),i.textContent="게시 완료",e.reset(),s.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(b){const G=b instanceof Error?b.message:"작성 중 알 수 없는 오류가 발생했습니다.";c.textContent=G,c.style.display="block",i.textContent=B,i.disabled=!1}}))}function je(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.route;s&&(s==="home"?window.location.hash="#/":s==="search"?window.location.hash="#/search":s==="profile"?window.location.hash="#/profile":s==="write"&&(window.location.hash="#/write"))})})}function H(){M.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function qe(e){M.innerHTML=`
      <div class="view-state">
        <p>${r(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{j()})}function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function De(e){const t=e.split(/\r?\n/);let s="",o=!1,n=!1;function a(){n&&(s+="</ul>",n=!1)}for(let i of t){const l=i.replace(/\s+$/,"");if(l.trim().startsWith("```")){o?(s+="</code></pre>",o=!1):(a(),s+="<pre><code>",o=!0);continue}if(o){s+=r(l)+`
`;continue}if(!l.trim()){a();continue}const c=l.match(/^(#{1,6})\s+(.*)$/);if(c){a();const v=c[1].length,g=r(c[2]);s+=`<h${v}>${g}</h${v}>`;continue}if(/^[-*]\s+/.test(l)){const v=r(l.replace(/^[-*]\s+/,""));n||(s+="<ul>",n=!0),s+=`<li>${v}</li>`;continue}else a();s+=`<p>${r(l)}</p>`}return a(),s}async function He(e){const t=O();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${_}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(s.status===401){try{localStorage.removeItem(f)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let o="";try{const a=await s.json();a&&typeof a.message=="string"&&(o=a.message)}catch{}const n=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(o?`${n} - ${o}`:n)}try{return await s.json()}catch{return{}}}function z(){const e=W();if(e!=="postDetail"&&pe(),e==="home"){if(u.length===0){H();return}C()}else if(e==="search")xe();else if(e==="write")Ae();else if(e==="profile")Me();else if(e==="postDetail"){if(u.length===0){H();return}C();const t=ie();Le(t)}else e==="authCallback"&&Pe()}function Pe(){const e=re();if(e)try{localStorage.setItem(f,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function j(){se(),H(),A="posts";try{const{page:e}=await J(1);u=e.items,z()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";qe(t)}}function Ne(){const t=(window.location.hash||"").match(/auth=([^&]+)/);if(!t)return;const s=decodeURIComponent(t[1]);try{localStorage.setItem(f,s)}catch{}const o=window.location.href.split("#")[0];window.history.replaceState(null,"",o+"#/write")}Ne();j();window.addEventListener("hashchange",()=>{W()==="home"&&u.length===0?j():z()});te();j();
