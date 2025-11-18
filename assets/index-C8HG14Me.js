(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}})();const N="/data";async function O(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function z(){const e=`${N}/current.json`;return await O(e)}async function Z(e,t){const o=`${N}/feed/page-${t}@${e}.json`;return await O(o)}async function Y(e=1){const t=await z(),o=await Z(t.sha,e);return{current:t,page:o}}const Q={},I=document.querySelector("#app");if(!I)throw new Error("#app element not found");const X=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],ee=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],x={home:"Developer"},_=Q?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",m="devlog_jwt";function te(e){try{const t=e.split(".");if(t.length!==3)return null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),s=atob(o);return JSON.parse(s)}catch{return null}}function W(){try{const e=localStorage.getItem(m);if(!e)return null;const t=te(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(m),null):e}catch{return null}}function oe(){return!!W()}function se(){const e=window.location.hash||"";if(!e.startsWith("#auth="))return;const t=decodeURIComponent(e.slice(6));if(t){try{localStorage.setItem(m,t),console.log("✅ JWT 저장 완료")}catch(o){console.error("JWT 저장 실패:",o)}window.location.hash="#/"}}function ie(){const t=(window.location.hash||"").match(/^#\/?auth=(.+)$/);if(!t)return;const o=t[1];if(o){try{localStorage.setItem(m,o)}catch{}window.location.replace("#/write")}}const ne={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}]},U={posts:{label:"Posts",icon:"grid"},saved:{label:"Saved",icon:"bookmark"}},re={home:`
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
    `};let d=[],S="posts",f=null;function F(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function ae(){const t=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!t)return null;try{return decodeURIComponent(t[1])}catch{return t[1]}}function le(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const o=e.slice(t+1);return new URLSearchParams(o).get("token")}function C(e,t){I.innerHTML=`
      <div class="app-shell">
        ${ce(e)}
        <div class="main-area">
          ${ue()}
          <div class="main-inner">${t}</div>
        </div>
        ${pe(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,Ee()}function ce(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${X.map(t=>de(t,e)).join("")}
        </nav>
      </aside>
    `}function de(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${b(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function ue(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${b("chevron")}</div>
      </header>
    `}function pe(e){return`
      <nav class="bottom-nav">
        ${ee.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${b(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function T(){return document.querySelector("#post-detail-modal-root")}function ve(){const e=T();e&&(e.innerHTML="",e.classList.remove("is-active"),f&&(document.removeEventListener("keydown",f),f=null))}function G(){const e=T();if(!e)return;e.querySelectorAll("[data-close-modal='true']").forEach(o=>{o.addEventListener("click",s=>{s.preventDefault(),window.location.hash="#/"})}),f&&document.removeEventListener("keydown",f),f=o=>{o.key==="Escape"&&(window.location.hash="#/")},document.addEventListener("keydown",f)}function H(e){const t=T();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${b("close")}
          </button>
          <div class="post-detail-empty">${r(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),G())}function b(e){return`<span class="icon">${re[e]}</span>`}function L(e,t){return`
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
                        <span class="stat-value">${r(o.value)}</span>
                        ${r(o.label)}
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
    `}function he(){return`
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
    `}function fe(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(U).map(([e,t])=>{const o=e;return`
                  <button
                    class="tab-btn ${S===o?"is-active":""}"
                    role="tab"
                    data-tab="${o}"
                    type="button"
                  >
                    ${b(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function me(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>we(t)).join("")}
      </div>
    `}function we(e){const t=e.tags.length?e.tags.map(n=>`#${r(n)}`).join(" "):"태그 없음",o=new Date(e.created),s=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),i=e.cover?`<img src="${r(e.cover)}" alt="${r(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${r(e.slug)}">
        <div class="post-media ${i?"":"is-fallback"}" ${i?"":`style="background:${J(e.slug)}"`}
        >
          ${i||`<span>${r(e.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${r(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${s}</p>
        </div>
      </article>
    `}function ge(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function J(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],o=Math.abs(e.split("").reduce((s,i)=>s+i.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[o]}, #fff)`}function D(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function be(e){return`
      <section class="info-grid">
        ${e.map(t=>`
                  <article class="info-card">
                    <h3>${r(t.title)}</h3>
                    <ul>
                      ${t.lines.map(o=>`<li>${r(o)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
      </section>
    `}function A(){return[{label:"posts",value:`${d.length}`}]}function q(){const e="home",t=d,o=A(),s=`
      ${L(o,x.home)}
      ${fe()}
      ${S==="posts"?me(t):`<div class="empty-state">${U[S].label} 뷰는 준비 중입니다.</div>`}
    `;C(e,s),Le()}function ye(){const e=A(),t=`
      ${L(e,x.home)}
      ${be(ne.search)}
    `;C("search",t)}function ke(e){if(!e){H("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!d.length){H("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=d.find(c=>c.slug===e);if(!t){H(`슬러그가 '${r(e)}'인 글을 찾을 수 없습니다.`);return}const o=new Date(t.created),s=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),i=(t.summary??"요약이 아직 작성되지 않았습니다.").trim(),n=D(i,140),p=t.tags.length?t.tags.map(c=>`<span class="post-detail-tag">#${r(c)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',a=t.cover?`<img src="${r(t.cover)}" alt="${r(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${J(t.slug)}">
          <span class="post-detail-collection-chip">${r(t.collection??"Gitstagram")}</span>
          <h2>${r(t.title)}</h2>
          <p>${r(n)}</p>
        </div>
      `,u=d.findIndex(c=>c.slug===t.slug),l=u>0?d[u-1]:null,h=u>=0&&u<d.length-1?d[u+1]:null,y=(c,v)=>{const k=`post-detail-nav-btn-${c}`,$=c==="prev"?"‹":"›",E=c==="prev"?"이전 게시물":"다음 게시물";return v?`
        <a class="post-detail-nav-btn ${k}" href="#/post/${encodeURIComponent(v.slug)}" aria-label="${E}" title="${r(D(v.title,48))}">
          <span aria-hidden="true">${$}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${k}" aria-disabled="true" aria-label="${E}"><span aria-hidden="true">${$}</span></span>`},M=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${y("prev",l)}
      </nav>
    `,j=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${y("next",h)}
      </nav>
    `,P=`
      <section class="post-detail" ${l?`data-prev-slug="${r(l.slug)}"`:""} ${h?`data-next-slug="${r(h.slug)}"`:""}>
        <div class="post-detail-frame">
          ${M}
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
                  <span>${s}</span>
                </div>
              </div>
              <div class="post-detail-header-actions">
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${b("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-summary">
                ${r(i)}
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${s}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${r(t.collection??"지정 없음")}</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${p}
              </div>
              <div class="post-detail-body">
                <h4>본문</h4>
                <div id="post-body" class="post-detail-body-content">
                  <p>본문을 불러오는 중입니다...</p>
                </div>
              </div>
            </div>
          </div>
          ${j}
        </div>
      </section>
    `,w=T();w&&(w.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${P}
        </div>
      </div>
    `,w.classList.add("is-active"),requestAnimationFrame(()=>{w.querySelector(".post-detail-modal")?.classList.add("is-open")}),xe(),G(),$e(t))}async function $e(e){const t=document.querySelector("#post-body");if(t)try{const o=await Ae(e),{body:s}=Be(o),i=je(s.trim());t.innerHTML=i||"<p>본문이 비어 있습니다.</p>"}catch(o){console.error(o),t.innerHTML="<p>본문을 불러오지 못했습니다. GitHub Pages 설정 또는 경로를 확인해 주세요.</p>"}}function xe(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),o=document.querySelector("#post-like-btn"),s=document.querySelector("#post-save-btn");if(e&&t){const i=()=>{const n=e.value.trim().length>0;t.disabled=!n,t.classList.toggle("is-active",n)};e.addEventListener("input",i)}o&&o.addEventListener("click",()=>{const i=!o.classList.contains("is-active");o.classList.toggle("is-active",i),o.setAttribute("aria-pressed",i?"true":"false")}),s&&s.addEventListener("click",()=>{const i=!s.classList.contains("is-active");s.classList.toggle("is-active",i),s.setAttribute("aria-pressed",i?"true":"false")})}function Se(){const e=A(),t=`
      ${L(e,x.home)}
      ${he()}
    `;C("profile",t)}function Ce(){const e=A();if(!oe()){const o=`
          ${L(e,x.home)}
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
        `;C("write",o),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${_}/auth/login`});return}const t=`
      ${L(e,x.home)}
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
    `;C("write",t),Me()}function Le(){document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.tab;s&&(S=s,q())})}),document.querySelectorAll(".post-card[data-slug]").forEach(o=>{o.addEventListener("click",()=>{const s=o.dataset.slug;s&&(window.location.hash=`#/post/${encodeURIComponent(s)}`)})})}function Me(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),o=e.querySelector("#write-slug"),s=e.querySelector("#write-summary"),i=e.querySelector("#write-tags"),n=e.querySelector("#write-collection"),p=e.querySelector("#write-body"),a=e.querySelector("#write-submit"),u=e.querySelector("#write-reset"),l=e.querySelector("#write-error");!t||!o||!i||!p||!a||!l||(t.addEventListener("input",()=>{o.dataset.userEdited!=="1"&&(o.value=ge(t.value))}),o.addEventListener("input",()=>{o.dataset.userEdited="1"}),u?.addEventListener("click",()=>{e.reset(),o.dataset.userEdited="0",l.style.display="none",l.textContent=""}),e.addEventListener("submit",async h=>{h.preventDefault();const y=t.value.trim(),M=o.value.trim(),j=s?.value.trim()??"",P=i.value,w=n?.value.trim()??"",c=p.value.trim(),v=[];y||v.push("제목을 입력해 주세요."),M||v.push("슬러그를 입력해 주세요.");const k=P.split(/[,\s]+/).map(g=>g.trim()).filter(Boolean);if(k.length===0&&v.push("태그를 한 개 이상 입력해 주세요."),c.length<10&&v.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+c.length+")"),v.length>0){l.textContent=v.join(" / "),l.style.display="block";return}l.style.display="none";const $={title:y,slug:M,summary:j,tags:k,collection:w||null,content:c};console.log("✏️ 새 글 작성 payload:",$),a.disabled=!0;const E=a.textContent;a.textContent="게시 중...";try{const g=await Pe($);console.log("✅ Worker 응답:",g),a.textContent="게시 완료",e.reset(),o.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(g){const V=g instanceof Error?g.message:"작성 중 알 수 없는 오류가 발생했습니다.";l.textContent=V,l.style.display="block",a.textContent=E,a.disabled=!1}}))}function Ee(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.route;o&&(o==="home"?window.location.hash="#/":o==="search"?window.location.hash="#/search":o==="profile"?window.location.hash="#/profile":o==="write"&&(window.location.hash="#/write"))})})}function R(){I.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function Ie(e){I.innerHTML=`
      <div class="view-state">
        <p>${r(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{B()})}function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Te(e){const t=new Date(e.created);if(!isNaN(t.getTime())){const o=t.getUTCFullYear(),s=String(t.getUTCMonth()+1).padStart(2,"0");return`/posts/${o}/${s}/${encodeURIComponent(e.slug)}.md`}return`/posts/${encodeURIComponent(e.slug)}.md`}async function Ae(e){const t=Te(e),o=await fetch(t,{cache:"no-store"});if(!o.ok)throw new Error(`Markdown 로드 실패: ${o.status} ${o.statusText} (${t})`);return await o.text()}function Be(e){if(!e.startsWith("---"))return{frontmatter:"",body:e};const t=e.split(/\r?\n/);if(t[0].trim()!=="---")return{frontmatter:"",body:e};let o=-1;for(let n=1;n<t.length;n++)if(t[n].trim()==="---"){o=n;break}if(o===-1)return{frontmatter:"",body:e};const s=t.slice(1,o).join(`
`),i=t.slice(o+1).join(`
`);return{frontmatter:s,body:i}}function je(e){const t=e.split(/\r?\n/);let o="",s=!1,i=!1;function n(){i&&(o+="</ul>",i=!1)}for(let p of t){const a=p.replace(/\s+$/,"");if(a.trim().startsWith("```")){s?(o+="</code></pre>",s=!1):(n(),o+="<pre><code>",s=!0);continue}if(s){o+=r(a)+`
`;continue}if(!a.trim()){n();continue}const u=a.match(/^(#{1,6})\s+(.*)$/);if(u){n();const l=u[1].length,h=r(u[2]);o+=`<h${l}>${h}</h${l}>`;continue}if(/^[-*]\s+/.test(a)){const l=r(a.replace(/^[-*]\s+/,""));i||(o+="<ul>",i=!0),o+=`<li>${l}</li>`;continue}else n();o+=`<p>${r(a)}</p>`}return n(),o}async function Pe(e){const t=W();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const o=await fetch(`${_}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(o.status===401){try{localStorage.removeItem(m)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!o.ok){let s="";try{const n=await o.json();n&&typeof n.message=="string"&&(s=n.message)}catch{}const i=`작성 요청 실패: ${o.status} ${o.statusText}`;throw new Error(s?`${i} - ${s}`:i)}try{return await o.json()}catch{return{}}}function K(){const e=F();if(e!=="postDetail"&&ve(),e==="home"){if(d.length===0){R();return}q()}else if(e==="search")ye();else if(e==="write")Ce();else if(e==="profile")Se();else if(e==="postDetail"){if(d.length===0){R();return}q();const t=ae();ke(t)}else e==="authCallback"&&He()}function He(){const e=le();if(e)try{localStorage.setItem(m,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function B(){ie(),R(),S="posts";try{const{page:e}=await Y(1);d=e.items,K()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";Ie(t)}}function qe(){const t=(window.location.hash||"").match(/auth=([^&]+)/);if(!t)return;const o=decodeURIComponent(t[1]);try{localStorage.setItem(m,o)}catch{}const s=window.location.href.split("#")[0];window.history.replaceState(null,"",s+"#/write")}qe();B();window.addEventListener("hashchange",()=>{F()==="home"&&d.length===0?B():K()});se();B();
