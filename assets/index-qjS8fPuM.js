(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const _="/data";async function O(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function V(){const e=`${_}/current.json`;return await O(e)}async function J(e,t){const o=`${_}/feed/page-${t}@${e}.json`;return await O(o)}async function Z(e=1){const t=await V(),o=await J(t.sha,e);return{current:t,page:o}}const Y={},T=document.querySelector("#app");if(!T)throw new Error("#app element not found");const Q=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],X=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],S={home:"Developer"},U=Y?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",g="devlog_jwt";function ee(e){try{const t=e.split(".");if(t.length!==3)return null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),s=atob(o);return JSON.parse(s)}catch{return null}}function W(){try{const e=localStorage.getItem(g);if(!e)return null;const t=ee(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(g),null):e}catch{return null}}function te(){return!!W()}function oe(){const e=window.location.hash||"";if(!e.startsWith("#auth="))return;const t=decodeURIComponent(e.slice(6));if(t){try{localStorage.setItem(g,t),console.log("✅ JWT 저장 완료")}catch(o){console.error("JWT 저장 실패:",o)}window.location.hash="#/"}}function se(){const t=(window.location.hash||"").match(/^#\/?auth=(.+)$/);if(!t)return;const o=t[1];if(o){try{localStorage.setItem(g,o)}catch{}window.location.replace("#/write")}}const ne={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}]},ae={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},ie={home:`
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
    `};let u=[],B="posts",m=null,y=null;function F(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function re(){const t=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!t)return null;try{return decodeURIComponent(t[1])}catch{return t[1]}}function le(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const o=e.slice(t+1);return new URLSearchParams(o).get("token")}function x(e,t){T.innerHTML=`
      <div class="app-shell">
        ${ce(e)}
        <div class="main-area">
          ${ue()}
          <div class="main-inner">${t}</div>
        </div>
        ${pe(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,je()}function ce(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${Q.map(t=>de(t,e)).join("")}
        </nav>
      </aside>
    `}function de(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${w(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function ue(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${w("chevron")}</div>
      </header>
    `}function pe(e){return`
      <nav class="bottom-nav">
        ${X.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${w(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function A(){return document.querySelector("#post-detail-modal-root")}function ve(){const e=A();e&&(e.innerHTML="",e.classList.remove("is-active"),m&&(document.removeEventListener("keydown",m),m=null))}function G(){const e=A();if(!e)return;e.querySelectorAll("[data-close-modal='true']").forEach(o=>{o.addEventListener("click",s=>{s.preventDefault(),window.location.hash="#/"})}),m&&document.removeEventListener("keydown",m),m=o=>{o.key==="Escape"&&(window.location.hash="#/")},document.addEventListener("keydown",m)}function D(e){const t=A();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${w("close")}
          </button>
          <div class="post-detail-empty">${i(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),G())}function w(e){return`<span class="icon">${ie[e]}</span>`}function L(e,t){return`
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
                        ${i(o.label)}
                        <span class="stat-value">${i(o.value)}</span>
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
        ${Object.entries(ae).map(([e,t])=>{const o=e;return`
                  <button
                    class="tab-btn ${B===o?"is-active":""}"
                    role="tab"
                    data-tab="${o}"
                    type="button"
                  >
                    ${w(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function me(){const e=ge(u);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return y&&(t=e.find(o=>o.id===y)??null,t||(y=null)),t?$e(t):be(e)}function ge(e){const t=new Map;return e.forEach(o=>{const s=o.collection?.trim()||"uncategorized",n=t.get(s)??[];n.push(o),t.set(s,n)}),Array.from(t.entries()).map(([o,s])=>({id:o,name:we(o),posts:[...s].sort((n,a)=>{const r=new Date(n.created).getTime(),c=new Date(a.created).getTime();return isNaN(r)||isNaN(c)?0:c-r})})).sort((o,s)=>s.posts.length!==o.posts.length?s.posts.length-o.posts.length:o.name.localeCompare(s.name))}function we(e){if(!e||e==="uncategorized")return"미분류";const t=e.split(/[-_]/).filter(Boolean).map(o=>o.charAt(0).toUpperCase()+o.slice(1));return t.length?t.join(" "):e}function be(e){return`
      <section class="saved-view saved-collections-view">
        <div class="saved-header">
          <div>
            <p>컬렉션 ${e.length}</p>
          </div>
          <button type="button" id="saved-new-collection-btn" class="saved-new-btn">+ 새 컬렉션</button>
        </div>
        <div class="saved-collections-grid">
          ${e.map(t=>ye(t)).join("")}
        </div>
      </section>
    `}function ye(e){const t=e.posts.find(r=>!!r.cover),o=!!t?.cover,s=`saved-collection-cover ${o?"":"is-fallback"}`.trim(),n=o?"":`style="background:${N(e.id)}"`,a=o?`<img src="${i(t.cover)}" alt="${i(e.name)}" loading="lazy" />`:`<span>${i(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${i(e.id)}">
        <span class="${s}" ${n}>
          ${a}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${i(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function $e(e){const t=e.posts[0];let o="";if(t){const n=new Date(t.created);isNaN(n.getTime())||(o=n.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const s=o?`게시물 ${e.posts.length} · 최근 업데이트 ${o}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${w("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${i(e.name)}</h3>
            <p>${i(s)}</p>
          </div>
        </div>
        ${z(e.posts)}
      </section>
    `}function z(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>ke(t)).join("")}
      </div>
    `}function ke(e){const t=e.tags.length?e.tags.map(a=>`#${i(a)}`).join(" "):"태그 없음",o=new Date(e.created),s=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),n=e.cover?`<img src="${i(e.cover)}" alt="${i(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${i(e.slug)}">
        <div class="post-media ${n?"":"is-fallback"}" ${n?"":`style="background:${N(e.slug)}"`}
        >
          ${n||`<span>${i(e.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${i(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${s}</p>
        </div>
      </article>
    `}function Ce(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function N(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],o=Math.abs(e.split("").reduce((s,n)=>s+n.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[o]}, #fff)`}function R(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function Se(e){return`
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
    `}function I(){return[{label:"게시물",value:`${u.length}`}]}function C(){const e="home",t=u,o=I(),s=`
      ${L(o,S.home)}
      ${fe()}
      ${B==="posts"?z(t):me()}
    `;x(e,s),Ae()}function xe(){const e=I(),t=`
      ${L(e,S.home)}
      ${Se(ne.search)}
    `;x("search",t)}function Le(e){if(!e){D("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!u.length){D("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=u.find(d=>d.slug===e);if(!t){D(`슬러그가 '${i(e)}'인 글을 찾을 수 없습니다.`);return}const o=new Date(t.created),s=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),n=(t.summary??"요약이 아직 작성되지 않았습니다.").trim(),a=R(n,140),r=t.tags.length?t.tags.map(d=>`<span class="post-detail-tag">#${i(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',c=t.cover?`<img src="${i(t.cover)}" alt="${i(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${N(t.slug)}">
          <span class="post-detail-collection-chip">${i(t.collection??"Gitstagram")}</span>
          <h2>${i(t.title)}</h2>
          <p>${i(a)}</p>
        </div>
      `,l=u.findIndex(d=>d.slug===t.slug),v=l>0?u[l-1]:null,f=l>=0&&l<u.length-1?u[l+1]:null,$=(d,b)=>{const E=`post-detail-nav-btn-${d}`,h=d==="prev"?"‹":"›",M=d==="prev"?"이전 게시물":"다음 게시물";return b?`
        <a class="post-detail-nav-btn ${E}" href="#/post/${encodeURIComponent(b.slug)}" aria-label="${M}" title="${i(R(b.title,48))}">
          <span aria-hidden="true">${h}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${E}" aria-disabled="true" aria-label="${M}"><span aria-hidden="true">${h}</span></span>`},q=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${$("prev",v)}
      </nav>
    `,P=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${$("next",f)}
      </nav>
    `,k=`
      <section class="post-detail" ${v?`data-prev-slug="${i(v.slug)}"`:""} ${f?`data-next-slug="${i(f.slug)}"`:""}>
        <div class="post-detail-frame">
          ${q}
          <div class="post-detail-container">
            <div class="post-detail-media">
              ${c}
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
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${w("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-summary">
                ${i(n)}
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${s}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${i(t.collection??"지정 없음")}</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${r}
              </div>
              <div class="post-detail-body">
                <h4>본문</h4>
                <div id="post-body" class="post-detail-body-content">
                  <p>본문을 불러오는 중입니다...</p>
                </div>
              </div>
            </div>
          </div>
          ${P}
        </div>
      </section>
    `,p=A();p&&(p.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${k}
        </div>
      </div>
    `,p.classList.add("is-active"),requestAnimationFrame(()=>{p.querySelector(".post-detail-modal")?.classList.add("is-open")}),Me(),G(),Ee(t))}async function Ee(e){const t=document.querySelector("#post-body");if(t)try{const o=await De(e),{body:s}=He(o),n=Ne(s.trim());t.innerHTML=n||"<p>본문이 비어 있습니다.</p>"}catch(o){console.error(o),t.innerHTML="<p>본문을 불러오지 못했습니다. GitHub Pages 설정 또는 경로를 확인해 주세요.</p>"}}function Me(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),o=document.querySelector("#post-like-btn"),s=document.querySelector("#post-save-btn");if(e&&t){const n=()=>{const a=e.value.trim().length>0;t.disabled=!a,t.classList.toggle("is-active",a)};e.addEventListener("input",n)}o&&o.addEventListener("click",()=>{const n=!o.classList.contains("is-active");o.classList.toggle("is-active",n),o.setAttribute("aria-pressed",n?"true":"false")}),s&&s.addEventListener("click",()=>{const n=!s.classList.contains("is-active");s.classList.toggle("is-active",n),s.setAttribute("aria-pressed",n?"true":"false")})}function Te(){const e=I(),t=`
      ${L(e,S.home)}
      ${he()}
    `;x("profile",t)}function Be(){const e=I();if(!te()){const o=`
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
        `;x("write",o),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${U}/auth/login`});return}const t=`
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
    `;x("write",t),Ie()}function Ae(){document.querySelectorAll("[data-tab]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.tab;r&&(B=r,r!=="saved"&&(y=null),C())})}),document.querySelectorAll(".post-card[data-slug]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.slug;r&&(window.location.hash=`#/post/${encodeURIComponent(r)}`)})}),document.querySelectorAll(".saved-collection-card").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.collectionId;r&&(y=r,C())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{y=null,C()}),document.querySelector("#saved-new-collection-btn")?.addEventListener("click",()=>{alert("컬렉션 생성 기능은 곧 준비될 예정입니다.")})}function Ie(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),o=e.querySelector("#write-slug"),s=e.querySelector("#write-tags"),n=e.querySelector("#write-collection"),a=e.querySelector("#write-body"),r=e.querySelector("#write-submit"),c=e.querySelector("#write-reset"),l=e.querySelector("#write-error");!t||!o||!s||!a||!r||!l||(t.addEventListener("input",()=>{o.dataset.userEdited!=="1"&&(o.value=Ce(t.value))}),o.addEventListener("input",()=>{o.dataset.userEdited="1"}),c?.addEventListener("click",()=>{e.reset(),o.dataset.userEdited="0",l.style.display="none",l.textContent=""}),e.addEventListener("submit",async v=>{v.preventDefault();const f=t.value.trim(),$=o.value.trim(),q=s.value,P=n?.value.trim()??"",k=a.value.trim(),p=[];f||p.push("제목을 입력해 주세요."),$||p.push("슬러그를 입력해 주세요.");const d=q.split(/[,\s]+/).map(h=>h.trim()).filter(Boolean);if(d.length===0&&p.push("태그를 한 개 이상 입력해 주세요."),k.length<10&&p.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+k.length+")"),p.length>0){l.textContent=p.join(" / "),l.style.display="block";return}l.style.display="none";const b={title:f,slug:$,summary:"",tags:d,collection:P||null,content:k};console.log("✏️ 새 글 작성 payload:",b),r.disabled=!0;const E=r.textContent;r.textContent="게시 중...";try{const h=await Re(b);console.log("✅ Worker 응답:",h),r.textContent="게시 완료",e.reset(),o.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(h){const M=h instanceof Error?h.message:"작성 중 알 수 없는 오류가 발생했습니다.";l.textContent=M,l.style.display="block",r.textContent=E,r.disabled=!1}}))}function je(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const o=t.dataset.route;o&&(o==="home"?window.location.hash="#/":o==="search"?window.location.hash="#/search":o==="profile"?window.location.hash="#/profile":o==="write"&&(window.location.hash="#/write"))})})}function H(){T.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function qe(e){T.innerHTML=`
      <div class="view-state">
        <p>${i(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{j()})}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pe(e){const t=new Date(e.created);if(!isNaN(t.getTime())){const o=t.getUTCFullYear(),s=String(t.getUTCMonth()+1).padStart(2,"0");return`/posts/${o}/${s}/${encodeURIComponent(e.slug)}.md`}return`/posts/${encodeURIComponent(e.slug)}.md`}async function De(e){const t=Pe(e),o=await fetch(t,{cache:"no-store"});if(!o.ok)throw new Error(`Markdown 로드 실패: ${o.status} ${o.statusText} (${t})`);return await o.text()}function He(e){if(!e.startsWith("---"))return{frontmatter:"",body:e};const t=e.split(/\r?\n/);if(t[0].trim()!=="---")return{frontmatter:"",body:e};let o=-1;for(let a=1;a<t.length;a++)if(t[a].trim()==="---"){o=a;break}if(o===-1)return{frontmatter:"",body:e};const s=t.slice(1,o).join(`
`),n=t.slice(o+1).join(`
`);return{frontmatter:s,body:n}}function Ne(e){const t=e.split(/\r?\n/);let o="",s=!1,n=!1;function a(){n&&(o+="</ul>",n=!1)}for(let r of t){const c=r.replace(/\s+$/,"");if(c.trim().startsWith("```")){s?(o+="</code></pre>",s=!1):(a(),o+="<pre><code>",s=!0);continue}if(s){o+=i(c)+`
`;continue}if(!c.trim()){a();continue}const l=c.match(/^(#{1,6})\s+(.*)$/);if(l){a();const v=l[1].length,f=i(l[2]);o+=`<h${v}>${f}</h${v}>`;continue}if(/^[-*]\s+/.test(c)){const v=i(c.replace(/^[-*]\s+/,""));n||(o+="<ul>",n=!0),o+=`<li>${v}</li>`;continue}else a();o+=`<p>${i(c)}</p>`}return a(),o}async function Re(e){const t=W();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const o=await fetch(`${U}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(o.status===401){try{localStorage.removeItem(g)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!o.ok){let s="";try{const a=await o.json();a&&typeof a.message=="string"&&(s=a.message)}catch{}const n=`작성 요청 실패: ${o.status} ${o.statusText}`;throw new Error(s?`${n} - ${s}`:n)}try{return await o.json()}catch{return{}}}function K(){const e=F();if(e!=="postDetail"&&ve(),e==="home"){if(u.length===0){H();return}C()}else if(e==="search")xe();else if(e==="write")Be();else if(e==="profile")Te();else if(e==="postDetail"){if(u.length===0){H();return}C();const t=re();Le(t)}else e==="authCallback"&&_e()}function _e(){const e=le();if(e)try{localStorage.setItem(g,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function j(){se(),H(),B="posts";try{const{page:e}=await Z(1);u=e.items,K()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";qe(t)}}function Oe(){const t=(window.location.hash||"").match(/auth=([^&]+)/);if(!t)return;const o=decodeURIComponent(t[1]);try{localStorage.setItem(g,o)}catch{}const s=window.location.href.split("#")[0];window.history.replaceState(null,"",s+"#/write")}Oe();j();window.addEventListener("hashchange",()=>{F()==="home"&&u.length===0?j():K()});oe();j();
