(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const ce="/data";async function de(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function we(){const e=`${ce}/current.json`;return await de(e)}async function ye(e,t){const s=`${ce}/feed/page-${t}@${e}.json`;return await de(s)}async function be(e=1){const t=await we(),s=await ye(t.sha,e);return{current:t,page:s}}const $e={},J=document.querySelector("#app");if(!J)throw new Error("#app element not found");const ke=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],Le=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],D={home:"Developer"},ue=$e?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",H="devlog_jwt";function xe(e){try{const t=e.split(".");if(t.length!==3)return null;const s=t[1].replace(/-/g,"+").replace(/_/g,"/"),i=atob(s);return JSON.parse(i)}catch{return null}}function pe(){try{const e=localStorage.getItem(H);if(!e)return null;const t=xe(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(H),null):e}catch{return null}}function Se(){return!!pe()}function Ce(){const e=window.location.hash||"",t=e.match(/^#\/?auth=([^&]+)/),s=e.match(/auth=([^&]+)/),i=t?.[1]??s?.[1];if(!i)return;try{localStorage.setItem(H,decodeURIComponent(i))}catch{}const o=window.location.href.split("#")[0];window.history.replaceState(null,"",`${o}#/write`)}const Ee={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},Me={home:`
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
    `};let f=[],Z="posts",q=null,C=null,le="",V="#/posts",P=[],G=[];function ve(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function je(){const e=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!e)return null;try{return decodeURIComponent(e[1])}catch{return e[1]}}function qe(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const s=e.slice(t+1);return new URLSearchParams(s).get("token")}function U(e,t){J.innerHTML=`
      <div class="app-shell">
        ${Ae(e)}
        <div class="main-area">
          ${Be()}
          <div class="main-inner">${t}</div>
        </div>
        ${Oe(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,st()}function Ae(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${ke.map(t=>Ne(t,e)).join("")}
        </nav>
      </aside>
    `}function Ne(e,t){return`
      <button
        class="sidebar-link ${e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${A(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function Be(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${A("chevron")}</div>
      </header>
    `}function Oe(e){return`
      <nav class="bottom-nav">
        ${Le.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${A(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function X(){return document.querySelector("#post-detail-modal-root")}function Te(){const e=X();e&&(e.innerHTML="",e.classList.remove("is-active"),q&&(document.removeEventListener("keydown",q),q=null))}function fe(){const e=X();if(!e)return;const t=e.querySelectorAll("[data-close-modal='true']"),s=()=>{const i=V||"#/posts";window.location.hash=i};t.forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),s()})}),q&&document.removeEventListener("keydown",q),q=i=>{i.key==="Escape"&&s()},document.addEventListener("keydown",q)}function se(e){const t=X();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${A("close")}
          </button>
          <div class="post-detail-empty">${r(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),fe())}function A(e){return`<span class="icon">${Me[e]}</span>`}function z(e,t){return`
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
    `}function Ie(){return`
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
    `}function Re(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(Ee).map(([e,t])=>{const s=e;return`
                  <button
                    class="tab-btn ${Z===s?"is-active":""}"
                    role="tab"
                    data-tab="${s}"
                    type="button"
                  >
                    ${A(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function Pe(){const e=_e(f);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return C&&(t=e.find(s=>s.id===C)??null,t||(C=null)),t?ze(t):He(e)}function _e(e){const t=new Map;return e.forEach(s=>{const i=s.collection?.trim();if(!i)return;const o=t.get(i)??[];o.push(s),t.set(i,o)}),Array.from(t.entries()).map(([s,i])=>({id:s,name:he(s),posts:[...i].sort((o,n)=>{const p=new Date(o.created).getTime(),l=new Date(n.created).getTime();return isNaN(p)||isNaN(l)?0:l-p})})).sort((s,i)=>i.posts.length!==s.posts.length?i.posts.length-s.posts.length:s.name.localeCompare(i.name))}function he(e){const t=e.trim(),s=t.split(/[-_]/).filter(Boolean).map(i=>i.charAt(0).toUpperCase()+i.slice(1));return s.length?s.join(" "):t}function De(){const e=new Set;return f.forEach(t=>{const s=(t.collection??"").trim();s&&e.add(s)}),Array.from(e).sort((t,s)=>t.localeCompare(s))}function He(e){return`
      <section class="saved-view saved-collections-view">
        <div class="saved-header">
          <div>
            <p>컬렉션 ${e.length}</p>
          </div>
        </div>
        <div class="saved-collections-grid">
          ${e.map(t=>Ue(t)).join("")}
        </div>
      </section>
    `}function Ue(e){const t=e.posts.find(p=>!!p.cover),s=!!t?.cover,i=`saved-collection-cover ${s?"":"is-fallback"}`.trim(),o=s?"":`style="background:${oe(e.id)}"`,n=s?`<img src="${r(t.cover)}" alt="${r(e.name)}" loading="lazy" />`:`<span>${r(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${r(e.id)}">
        <span class="${i}" ${o}>
          ${n}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${r(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function ze(e){const t=e.posts[0];let s="";if(t){const o=new Date(t.created);isNaN(o.getTime())||(s=o.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const i=s?`게시물 ${e.posts.length} · 최근 업데이트 ${s}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${A("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${r(e.name)}</h3>
            <p>${r(i)}</p>
          </div>
        </div>
        ${Y(e.posts)}
      </section>
    `}function Y(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>Ke(t)).join("")}
      </div>
    `}function Ke(e){const t=e.tags.length?e.tags.map(n=>`#${r(n)}`).join(" "):"태그 없음",s=new Date(e.created),i=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=e.cover?`<img src="${r(e.cover)}" alt="${r(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${r(e.slug)}">
        <div class="post-media ${o?"":"is-fallback"}" ${o?"":`style="background:${oe(e.slug)}"`}
        >
                ${o||`<span class="post-fallback-title">${r(e.title)}</span>`}

        </div>
        <div class="post-overlay">
          <p class="overlay-title">${r(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${i}</p>
        </div>
      </article>
    `}function We(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function oe(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(e.split("").reduce((i,o)=>i+o.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[s]}, #fff)`}function Fe(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function Q(){return[{label:"게시물",value:`${f.length}`}]}function _(){const e="home",t=f,s=Q(),i=`
      ${z(s,D.home)}
      ${Re()}
      ${Z==="posts"?Y(t):Pe()}
    `;U(e,i),Qe()}function Ge(){const e=Q(),t=`
      ${z(e,D.home)}
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
          ${Y(f)}
        </div>
      </section>
    `;U("search",t),et()}function Je(e){if(!e){se("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!f.length){se("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=f.find(d=>d.slug===e);if(!t){se(`슬러그가 '${r(e)}'인 글을 찾을 수 없습니다.`);return}const s=new Date(t.created),i=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=t.tags.length?t.tags.map(d=>`<span class="post-detail-tag">#${r(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',n=t.cover?`<img src="${r(t.cover)}" alt="${r(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${oe(t.slug)}">
          <h2>${r(t.title)}</h2>
        </div>
      `;let p=f;const l=G.map(d=>f.find(v=>v.slug===d)||null).filter(d=>d!==null);if(l.length&&l.some(d=>d.slug===t.slug))p=l;else if(C){const d=C,v=f.filter(y=>(y.collection??"").trim()===d);v.some(y=>y.slug===t.slug)&&(p=v)}else if(V.startsWith("#/search")&&P.length>0){const d=P.map(v=>f.find(y=>y.slug===v)||null).filter(v=>v!==null);d.some(v=>v.slug===t.slug)&&(p=d)}const m=p.findIndex(d=>d.slug===t.slug),a=m>0?p[m-1]:null,g=m>=0&&m<p.length-1?p[m+1]:null,c=(d,v)=>{const y=`post-detail-nav-btn-${d}`,B=d==="prev"?"‹":"›",O=d==="prev"?"이전 게시물":"다음 게시물";return v?`
        <a class="post-detail-nav-btn ${y}" href="#/post/${encodeURIComponent(v.slug)}" aria-label="${O}" title="${r(Fe(v.title,48))}">
          <span aria-hidden="true">${B}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${y}" aria-disabled="true" aria-label="${O}"><span aria-hidden="true">${B}</span></span>`},L=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${c("prev",a)}
      </nav>
    `,ee=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${c("next",g)}
      </nav>
    `,k=`
      <nav class="post-detail-mobile-nav" aria-label="게시물 이동">
        ${c("prev",a)}
        ${c("next",g)}
      </nav>
    `,K=`
      <section class="post-detail" ${a?`data-prev-slug="${r(a.slug)}"`:""} ${g?`data-next-slug="${r(g.slug)}"`:""}>
        <div class="post-detail-frame">
          ${L}
          <div class="post-detail-container">
            <div class="post-detail-media">
              ${n}
            </div>
            <div class="post-detail-panel">
            <header class="post-detail-header">
              <div class="post-detail-author">
                <img src="/profile/profile.jpg" alt="Cheolmin Kim" loading="lazy" />
                <div>
                  <p>Cheolmin Kim</p>
                  <span>${i}</span>
                </div>
              </div>
              <div class="post-detail-header-actions">
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${A("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${r(t.title)}</h2>
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${i}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${r(t.collection??"지정 없음")}</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${o}
              </div>
              <div class="post-detail-body">
                <h4>본문</h4>
                <div id="post-body" class="post-detail-body-content">
                  <p>본문을 불러오는 중입니다...</p>
                </div>
              </div>
            </div>
          </div>
          ${ee}
        </div>
        ${k}
      </section>
    `,j=X();j&&(j.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${K}
        </div>
      </div>
    `,j.classList.add("is-active"),requestAnimationFrame(()=>{j.querySelector(".post-detail-modal")?.classList.add("is-open")}),Ve(),fe(),Ze(t))}function Ze(e){const t=document.querySelector("#post-body");if(!t)return;const s=(e.summary??"").trim();if(!s){t.innerHTML="<p>본문이 비어 있습니다.</p>";return}const i=ot(s);t.innerHTML=i||"<p>본문이 비어 있습니다.</p>"}function Ve(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),i=document.querySelector("#post-save-btn");if(e&&t){const o=()=>{const n=e.value.trim().length>0;t.disabled=!n,t.classList.toggle("is-active",n)};e.addEventListener("input",o)}s&&s.addEventListener("click",()=>{const o=!s.classList.contains("is-active");s.classList.toggle("is-active",o),s.setAttribute("aria-pressed",o?"true":"false")}),i&&i.addEventListener("click",()=>{const o=!i.classList.contains("is-active");i.classList.toggle("is-active",o),i.setAttribute("aria-pressed",o?"true":"false")})}function Xe(){const e=Q(),t=`
      ${z(e,D.home)}
      ${Ie()}
    `;U("profile",t)}function Ye(){const e=Q();if(!Se()){const s=`
          ${z(e,D.home)}
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
        `;U("write",s),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${ue}/auth/login`});return}const t=`
      ${z(e,D.home)}
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
      ${De().map(s=>`<option value="${r(s)}">${r(he(s))}</option>`).join("")}
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
    `;U("write",t),tt()}function Qe(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;t&&(Z=t,t!=="saved"&&(C=null),_())})}),document.querySelectorAll(".post-card[data-slug]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slug;t&&(G=(C?f.filter(s=>(s.collection??"").trim()===C):f).map(s=>s.slug),V=window.location.hash||"#/posts",window.location.hash=`#/post/${encodeURIComponent(t)}`)})}),document.querySelectorAll(".saved-collection-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.collectionId;t&&(C=t,_())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{C=null,_()})}function et(){const e=document.querySelector("#search-input"),t=document.querySelector("#search-meta"),s=document.querySelector("#search-results");if(!e||!s)return;const i=e,o=s;i.value=le;function n(l){const m=l.trim().toLowerCase();return m?f.filter(a=>[a.title,a.summary??"",a.collection??"",a.tags.join(" ")].join(" ").toLowerCase().includes(m)):f}function p(){const l=i.value;le=l;const m=n(l);if(P=m.map(a=>a.slug),o.innerHTML=Y(m),t){const a=f.length,g=m.length;l.trim()?t.textContent=`${a}개 중 ${g}개 검색됨`:t.textContent=`${a}개 글`}o.querySelectorAll(".post-card[data-slug]").forEach(a=>{a.addEventListener("click",()=>{const g=a.dataset.slug;g&&(P.length>0?G=[...P]:G=f.map(c=>c.slug),V=window.location.hash||"#/search",window.location.hash=`#/post/${encodeURIComponent(g)}`)})})}i.addEventListener("input",()=>{p()}),p()}function tt(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),s=e.querySelector("#write-slug"),i=e.querySelector("#write-tags"),o=e.querySelector("#write-collection-select"),n=e.querySelector("#write-collection-new"),p=e.querySelector("#write-body"),l=e.querySelector("#write-submit"),m=e.querySelector("#write-reset"),a=e.querySelector("#write-error"),g=e.querySelector("#write-cover-file"),c=e.querySelector("#write-cover-canvas"),L=e.querySelector("#write-cover-zoom"),ee=e.querySelector("#write-cover-reset");if(!t||!s||!i||!p||!l||!a)return;t.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=We(t.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),m?.addEventListener("click",()=>{if(e.reset(),s.dataset.userEdited="0",a.style.display="none",a.textContent="",n&&(n.disabled=!0,n.value=""),c){const u=c.getContext("2d");u&&u.clearRect(0,0,c.width,c.height)}g&&(g.value=""),L&&(L.value="1")});let k=null,K=1,j=1,d=0,v=0,y=!1,B=0,O=0,re=0,ae=0;const T=800,I=1e3,te=()=>{if(!c||!k)return;const u=c.getContext("2d");if(!u)return;c.width=T,c.height=I,u.clearRect(0,0,T,I);const h=K*j,x=k.width*h,E=k.height*h,M=(T-x)/2,b=(I-E)/2;let w=M+d,S=b+v;const N=T-x,R=0,W=I-E,$=0;w<N?(w=N,d=w-M):w>R&&(w=R,d=w-M),S<W?(S=W,v=S-b):S>$&&(S=$,v=S-b),u.drawImage(k,w,S,x,E)},ge=u=>{if(!c)return;const h=new Image;h.onload=()=>{k=h;const x=T/h.width,E=I/h.height;K=Math.max(x,E),j=1,L&&(L.value="1"),d=0,v=0,te()},h.src=URL.createObjectURL(u)};if(c&&(c.addEventListener("mousedown",u=>{if(!k)return;y=!0;const h=c.getBoundingClientRect();B=u.clientX-h.left,O=u.clientY-h.top,re=d,ae=v}),window.addEventListener("mousemove",u=>{if(!y||!k||!c)return;const h=c.getBoundingClientRect(),x=u.clientX-h.left,E=u.clientY-h.top,M=x-B,b=E-O;d=re+M,v=ae+b,te()}),window.addEventListener("mouseup",()=>{y=!1}),c.addEventListener("mouseleave",()=>{y=!1})),g?.addEventListener("change",u=>{const h=u.target.files?.[0];h&&ge(h)}),L?.addEventListener("input",()=>{const u=parseFloat(L.value||"1");j=Number.isFinite(u)?u:1,te()}),ee?.addEventListener("click",()=>{if(k=null,c){const u=c.getContext("2d");u&&u.clearRect(0,0,c.width,c.height)}g&&(g.value=""),L&&(L.value="1"),d=0,v=0}),o&&n){const u=()=>{o.value==="__new__"?(n.disabled=!1,n.focus()):(n.disabled=!0,n.value="")};o.addEventListener("change",u),u()}e.addEventListener("submit",async u=>{u.preventDefault();const h=t.value.trim(),x=s.value.trim(),E=i.value,M=p.value.trim();let b=null;const w=[];if(o&&n){const $=o.value;if(!$)b=null;else if($==="__new__"){const F=n.value.trim();F?b=F:w.push("새 컬렉션 이름을 입력해 주세요.")}else b=$;b&&(b.length<2||b.length>40)&&w.push("컬렉션 이름은 2~40자 사이여야 합니다.")}h||w.push("제목을 입력해 주세요."),x||w.push("슬러그를 입력해 주세요.");const S=E.split(/[,\s]+/).map($=>$.trim()).filter(Boolean);if(S.length===0&&w.push("태그를 한 개 이상 입력해 주세요."),M.length<10&&w.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+M.length+")"),w.length>0){a.textContent=w.join(" / "),a.style.display="block";return}a.style.display="none";let N=null;if(c&&k)try{N=c.toDataURL("image/jpeg",.8)}catch{N=null}const R={title:h,slug:x,summary:"",tags:S,collection:b,cover:N,content:M};console.log("✏️ 새 글 작성 payload:",R),l.disabled=!0;const W=l.textContent;l.textContent="게시 중...";try{const $=await nt(R);console.log("✅ Worker 응답:",$),l.textContent="게시 완료",e.reset(),s.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch($){const F=$ instanceof Error?$.message:"작성 중 알 수 없는 오류가 발생했습니다.";a.textContent=F,a.style.display="block",l.textContent=W,l.disabled=!1}})}function st(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.route;t&&(t==="home"?window.location.hash="#/":t==="search"?window.location.hash="#/search":t==="profile"?window.location.hash="#/profile":t==="write"&&(window.location.hash="#/write"))})})}function ie(){J.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function it(e){J.innerHTML=`
      <div class="view-state">
        <p>${r(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{ne()})}function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ot(e){const t=e.split(/\r?\n/);let s="",i=!1,o=!1;function n(){o&&(s+="</ul>",o=!1)}for(let p of t){const l=p.replace(/\s+$/,"");if(l.trim().startsWith("```")){i?(s+="</code></pre>",i=!1):(n(),s+="<pre><code>",i=!0);continue}if(i){s+=r(l)+`
`;continue}if(!l.trim()){n();continue}const m=l.match(/^(#{1,6})\s+(.*)$/);if(m){n();const a=m[1].length,g=r(m[2]);s+=`<h${a}>${g}</h${a}>`;continue}if(/^[-*]\s+/.test(l)){const a=r(l.replace(/^[-*]\s+/,""));o||(s+="<ul>",o=!0),s+=`<li>${a}</li>`;continue}else n();s+=`<p>${r(l)}</p>`}return n(),s}async function nt(e){const t=pe();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${ue}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(s.status===401){try{localStorage.removeItem(H)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let i="";try{const n=await s.json();n&&typeof n.message=="string"&&(i=n.message)}catch{}const o=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(i?`${o} - ${i}`:o)}try{return await s.json()}catch{return{}}}function me(){const e=ve();if(e!=="postDetail"&&Te(),e==="home"){if(f.length===0){ie();return}_()}else if(e==="search")Ge();else if(e==="write")Ye();else if(e==="profile")Xe();else if(e==="postDetail"){if(f.length===0){ie();return}_();const t=je();Je(t)}else e==="authCallback"&&rt()}function rt(){const e=qe();if(e)try{localStorage.setItem(H,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function ne(){ie(),Z="posts";try{const{page:e}=await be(1);f=e.items,me()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";it(t)}}Ce();ne();window.addEventListener("hashchange",()=>{ve()==="home"&&f.length===0?ne():me()});
