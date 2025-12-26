(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const de="/data";async function ue(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function be(){const e=`${de}/current.json`;return await ue(e)}async function ye(e,t){const s=`${de}/feed/page-${t}@${e}.json`;return await ue(s)}async function pe(e=1){const t=await be(),s=await ye(t.sha,e);return{current:t,page:s}}const $e={},X=document.querySelector("#app");if(!X)throw new Error("#app element not found");const ke=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],Le=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],U={home:"Developer"},ve=$e?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",z="devlog_jwt";function xe(e){try{const t=e.split(".");if(t.length!==3)return null;const s=t[1].replace(/-/g,"+").replace(/_/g,"/"),i=atob(s);return JSON.parse(i)}catch{return null}}function he(){try{const e=localStorage.getItem(z);if(!e)return null;const t=xe(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(z),null):e}catch{return null}}function Ce(){return!!he()}function Ee(){const e=window.location.hash||"",t=e.match(/^#\/?auth=([^&]+)/),s=e.match(/auth=([^&]+)/),i=t?.[1]??s?.[1];if(!i)return;try{localStorage.setItem(z,decodeURIComponent(i))}catch{}const o=window.location.href.split("#")[0];window.history.replaceState(null,"",`${o}#/write`)}const Se={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},je={home:`
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
    `};let m=[],Y="posts",B=null,j=null,ce="",J="#/posts",H=[],G=[];function fe(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function Me(){const e=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!e)return null;try{return decodeURIComponent(e[1])}catch{return e[1]}}function qe(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const s=e.slice(t+1);return new URLSearchParams(s).get("token")}function W(e,t){X.innerHTML=`
      <div class="app-shell">
        ${Ae(e)}
        <div class="main-area">
          ${Ie()}
          <div class="main-inner">${t}</div>
        </div>
        ${De(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,st()}function Ae(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${ke.map(t=>Be(t,e)).join("")}
        </nav>
      </aside>
    `}function Be(e,t){return`
      <button
        class="sidebar-link ${e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${I(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function Ie(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${I("chevron")}</div>
      </header>
    `}function De(e){return`
      <nav class="bottom-nav">
        ${Le.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${I(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function V(){return document.querySelector("#post-detail-modal-root")}function Ne(){const e=V();e&&(e.innerHTML="",e.classList.remove("is-active"),B&&(document.removeEventListener("keydown",B),B=null))}function me(){const e=V();if(!e)return;const t=e.querySelectorAll("[data-close-modal='true']"),s=()=>{const i=J||"#/posts";window.location.hash=i};t.forEach(i=>{i.addEventListener("click",o=>{o.preventDefault(),s()})}),B&&document.removeEventListener("keydown",B),B=i=>{i.key==="Escape"&&s()},document.addEventListener("keydown",B)}function se(e){const t=V();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${I("close")}
          </button>
          <div class="post-detail-empty">${l(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),me())}function I(e){return`<span class="icon">${je[e]}</span>`}function K(e,t){return`
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
                        ${l(s.label)}
                        <span class="stat-value">${l(s.value)}</span>
                      </div>
                    `).join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${l(t)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `}function Te(){return`
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
    `}function Pe(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(Se).map(([e,t])=>{const s=e;return`
                  <button
                    class="tab-btn ${Y===s?"is-active":""}"
                    role="tab"
                    data-tab="${s}"
                    type="button"
                  >
                    ${I(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function Re(){const e=_e(m);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return j&&(t=e.find(s=>s.id===j)??null,t||(j=null)),t?ze(t):Oe(e)}function _e(e){const t=new Map;return e.forEach(s=>{const i=s.collection?.trim();if(!i)return;const o=t.get(i)??[];o.push(s),t.set(i,o)}),Array.from(t.entries()).map(([s,i])=>({id:s,name:ge(s),posts:[...i].sort((o,n)=>{const h=new Date(o.created).getTime(),u=new Date(n.created).getTime();return isNaN(h)||isNaN(u)?0:u-h})})).sort((s,i)=>i.posts.length!==s.posts.length?i.posts.length-s.posts.length:s.name.localeCompare(i.name))}function ge(e){const t=e.trim(),s=t.split(/[-_]/).filter(Boolean).map(i=>i.charAt(0).toUpperCase()+i.slice(1));return s.length?s.join(" "):t}function He(){const e=new Set;return m.forEach(t=>{const s=(t.collection??"").trim();s&&e.add(s)}),Array.from(e).sort((t,s)=>t.localeCompare(s))}function Oe(e){return`
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
    `}function Ue(e){const t=e.posts.find(h=>!!h.cover),s=!!t?.cover,i=`saved-collection-cover ${s?"":"is-fallback"}`.trim(),o=s?"":`style="background:${oe(e.id)}"`,n=s?`<img src="${l(t.cover)}" alt="${l(e.name)}" loading="lazy" />`:`<span>${l(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${l(e.id)}">
        <span class="${i}" ${o}>
          ${n}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${l(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function ze(e){const t=e.posts[0];let s="";if(t){const o=new Date(t.created);isNaN(o.getTime())||(s=o.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const i=s?`게시물 ${e.posts.length} · 최근 업데이트 ${s}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${I("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${l(e.name)}</h3>
            <p>${l(i)}</p>
          </div>
        </div>
        ${Z(e.posts)}
      </section>
    `}function Z(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>We(t)).join("")}
      </div>
    `}function We(e){const t=e.tags.length?e.tags.map(n=>`#${l(n)}`).join(" "):"태그 없음",s=new Date(e.created),i=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=e.cover?`<img src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${l(e.slug)}">
        <div class="post-media ${o?"":"is-fallback"}" ${o?"":`style="background:${oe(e.slug)}"`}
        >
                ${o||`<span class="post-fallback-title">${l(e.title)}</span>`}

        </div>
        <div class="post-overlay">
          <p class="overlay-title">${l(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${i}</p>
        </div>
      </article>
    `}function Ke(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function oe(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(e.split("").reduce((i,o)=>i+o.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[s]}, #fff)`}function Fe(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function Q(){return[{label:"게시물",value:`${m.length}`}]}function O(){const e="home",t=m,s=Q(),i=`
      ${K(s,U.home)}
      ${Pe()}
      ${Y==="posts"?Z(t):Re()}
    `;W(e,i),Qe()}function Ge(){const e=Q(),t=`
      ${K(e,U.home)}
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
          ${Z(m)}
        </div>
      </section>
    `;W("search",t),et()}function Xe(e){if(!e){se("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!m.length){se("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=m.find(p=>p.slug===e);if(!t){se(`슬러그가 '${l(e)}'인 글을 찾을 수 없습니다.`);return}const s=new Date(t.created),i=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=t.tags.length?t.tags.map(p=>`<span class="post-detail-tag">#${l(p)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',n=t.cover?`<img src="${l(t.cover)}" alt="${l(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${oe(t.slug)}">
          <h2>${l(t.title)}</h2>
        </div>
      `;let h=m;const u=G.map(p=>m.find(f=>f.slug===p)||null).filter(p=>p!==null);if(u.length&&u.some(p=>p.slug===t.slug))h=u;else if(j){const p=j,f=m.filter(w=>(w.collection??"").trim()===p);f.some(w=>w.slug===t.slug)&&(h=f)}else if(J.startsWith("#/search")&&H.length>0){const p=H.map(f=>m.find(w=>w.slug===f)||null).filter(f=>f!==null);p.some(f=>f.slug===t.slug)&&(h=p)}const g=h.findIndex(p=>p.slug===t.slug),c=g>0?h[g-1]:null,b=g>=0&&g<h.length-1?h[g+1]:null,r=(p,f)=>{const w=`post-detail-nav-btn-${p}`,T=p==="prev"?"‹":"›",P=p==="prev"?"이전 게시물":"다음 게시물";return f?`
        <a class="post-detail-nav-btn ${w}" href="#/post/${encodeURIComponent(f.slug)}" aria-label="${P}" title="${l(Fe(f.title,48))}">
          <span aria-hidden="true">${T}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${w}" aria-disabled="true" aria-label="${P}"><span aria-hidden="true">${T}</span></span>`},E=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${r("prev",c)}
      </nav>
    `,ee=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${r("next",b)}
      </nav>
    `,L=`
      <nav class="post-detail-mobile-nav" aria-label="게시물 이동">
        ${r("prev",c)}
        ${r("next",b)}
      </nav>
    `,F=`
      <section class="post-detail" ${c?`data-prev-slug="${l(c.slug)}"`:""} ${b?`data-next-slug="${l(b.slug)}"`:""}>
        <div class="post-detail-frame">
          ${E}
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
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${I("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${l(t.title)}</h2>
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${i}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${l(t.collection??"지정 없음")}</span>
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
        ${L}
      </section>
    `,M=V();M&&(M.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${F}
        </div>
      </div>
    `,M.classList.add("is-active"),requestAnimationFrame(()=>{M.querySelector(".post-detail-modal")?.classList.add("is-open")}),Je(),me(),Ye(t))}function Ye(e){const t=document.querySelector("#post-body");if(!t)return;const s=(e.summary??"").trim();if(!s){t.innerHTML="<p>본문이 비어 있습니다.</p>";return}const i=ot(s);t.innerHTML=i||"<p>본문이 비어 있습니다.</p>"}function Je(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),i=document.querySelector("#post-save-btn");if(e&&t){const o=()=>{const n=e.value.trim().length>0;t.disabled=!n,t.classList.toggle("is-active",n)};e.addEventListener("input",o)}s&&s.addEventListener("click",()=>{const o=!s.classList.contains("is-active");s.classList.toggle("is-active",o),s.setAttribute("aria-pressed",o?"true":"false")}),i&&i.addEventListener("click",()=>{const o=!i.classList.contains("is-active");i.classList.toggle("is-active",o),i.setAttribute("aria-pressed",o?"true":"false")})}function Ve(){const e=Q(),t=`
      ${K(e,U.home)}
      ${Te()}
    `;W("profile",t)}function Ze(){const e=Q();if(!Ce()){const s=`
          ${K(e,U.home)}
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
        `;W("write",s),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${ve}/auth/login`});return}const t=`
      ${K(e,U.home)}
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
      ${He().map(s=>`<option value="${l(s)}">${l(ge(s))}</option>`).join("")}
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
    `;W("write",t),tt()}function Qe(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;t&&(Y=t,t!=="saved"&&(j=null),O())})}),document.querySelectorAll(".post-card[data-slug]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slug;t&&(G=(j?m.filter(s=>(s.collection??"").trim()===j):m).map(s=>s.slug),J=window.location.hash||"#/posts",window.location.hash=`#/post/${encodeURIComponent(t)}`)})}),document.querySelectorAll(".saved-collection-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.collectionId;t&&(j=t,O())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{j=null,O()})}function et(){const e=document.querySelector("#search-input"),t=document.querySelector("#search-meta"),s=document.querySelector("#search-results");if(!e||!s)return;const i=e,o=s;i.value=ce;function n(u){const g=u.trim().toLowerCase();return g?m.filter(c=>[c.title,c.summary??"",c.collection??"",c.tags.join(" ")].join(" ").toLowerCase().includes(g)):m}function h(){const u=i.value;ce=u;const g=n(u);if(H=g.map(c=>c.slug),o.innerHTML=Z(g),t){const c=m.length,b=g.length;u.trim()?t.textContent=`${c}개 중 ${b}개 검색됨`:t.textContent=`${c}개 글`}o.querySelectorAll(".post-card[data-slug]").forEach(c=>{c.addEventListener("click",()=>{const b=c.dataset.slug;b&&(H.length>0?G=[...H]:G=m.map(r=>r.slug),J=window.location.hash||"#/search",window.location.hash=`#/post/${encodeURIComponent(b)}`)})})}i.addEventListener("input",()=>{h()}),h()}function tt(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),s=e.querySelector("#write-slug"),i=e.querySelector("#write-tags"),o=e.querySelector("#write-collection-select"),n=e.querySelector("#write-collection-new"),h=e.querySelector("#write-body"),u=e.querySelector("#write-submit"),g=e.querySelector("#write-reset"),c=e.querySelector("#write-error"),b=e.querySelector("#write-cover-file"),r=e.querySelector("#write-cover-canvas"),E=e.querySelector("#write-cover-zoom"),ee=e.querySelector("#write-cover-reset");if(!t||!s||!i||!h||!u||!c)return;t.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=Ke(t.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),g?.addEventListener("click",()=>{if(e.reset(),s.dataset.userEdited="0",c.style.display="none",c.textContent="",n&&(n.disabled=!0,n.value=""),r){const v=r.getContext("2d");v&&v.clearRect(0,0,r.width,r.height)}b&&(b.value=""),E&&(E.value="1")});let L=null,F=1,M=1,p=0,f=0,w=!1,T=0,P=0,re=0,le=0;const R=800,_=1e3,te=()=>{if(!r||!L)return;const v=r.getContext("2d");if(!v)return;r.width=R,r.height=_,v.clearRect(0,0,R,_);const y=F*M,x=L.width*y,S=L.height*y,C=(R-x)/2,d=(_-S)/2;let a=C+p,$=d+f;const q=R-x,A=0,D=_-S,k=0;a<q?(a=q,p=a-C):a>A&&(a=A,p=a-C),$<D?($=D,f=$-d):$>k&&($=k,f=$-d),v.drawImage(L,a,$,x,S)},we=v=>{if(!r)return;const y=new Image;y.onload=()=>{L=y;const x=R/y.width,S=_/y.height;F=Math.max(x,S),M=1,E&&(E.value="1"),p=0,f=0,te()},y.src=URL.createObjectURL(v)};if(r){r.style.touchAction="none";let v=null;const y=typeof r.setPointerCapture=="function"&&typeof r.releasePointerCapture=="function",x=(d,a)=>{if(!L||!r)return!1;w=!0;const $=r.getBoundingClientRect();return T=d-$.left,P=a-$.top,re=p,le=f,!0},S=(d,a)=>{if(!w||!L||!r)return;const $=r.getBoundingClientRect(),q=d-$.left,A=a-$.top,D=q-T,k=A-P;p=re+D,f=le+k,te()},C=()=>{w&&(w=!1,v=null)};if("PointerEvent"in window){r.addEventListener("pointerdown",a=>{if(L){if(y)try{r.setPointerCapture(a.pointerId)}catch{}a.preventDefault(),x(a.clientX,a.clientY)&&(v=a.pointerId)}},{passive:!1}),r.addEventListener("pointermove",a=>{w&&(v!==null&&a.pointerId!==v||(a.preventDefault(),S(a.clientX,a.clientY)))},{passive:!1});const d=a=>{w&&(v!==null&&a.pointerId!==v||(y&&r.hasPointerCapture(a.pointerId)&&r.releasePointerCapture(a.pointerId),C()))};r.addEventListener("pointerup",d),r.addEventListener("pointercancel",d),r.addEventListener("pointerleave",d)}else r.addEventListener("touchstart",d=>{if(!L)return;const a=d.touches[0];a&&(d.preventDefault(),x(a.clientX,a.clientY))},{passive:!1}),r.addEventListener("touchmove",d=>{if(!w)return;const a=d.touches[0];a&&(d.preventDefault(),S(a.clientX,a.clientY))},{passive:!1}),r.addEventListener("touchend",d=>{w&&(d.preventDefault(),C())},{passive:!1}),r.addEventListener("touchcancel",d=>{w&&(d.preventDefault(),C())},{passive:!1})}if(b?.addEventListener("change",v=>{const y=v.target.files?.[0];y&&we(y)}),E?.addEventListener("input",()=>{const v=parseFloat(E.value||"1");M=Number.isFinite(v)?v:1,te()}),ee?.addEventListener("click",()=>{if(L=null,r){const v=r.getContext("2d");v&&v.clearRect(0,0,r.width,r.height)}b&&(b.value=""),E&&(E.value="1"),p=0,f=0}),o&&n){const v=()=>{o.value==="__new__"?(n.disabled=!1,n.focus()):(n.disabled=!0,n.value="")};o.addEventListener("change",v),v()}e.addEventListener("submit",async v=>{v.preventDefault();const y=t.value.trim(),x=s.value.trim(),S=i.value,C=h.value.trim();let d=null;const a=[];if(o&&n){const k=o.value;if(!k)d=null;else if(k==="__new__"){const N=n.value.trim();N?d=N:a.push("새 컬렉션 이름을 입력해 주세요.")}else d=k;d&&(d.length<2||d.length>40)&&a.push("컬렉션 이름은 2~40자 사이여야 합니다.")}y||a.push("제목을 입력해 주세요."),x||a.push("슬러그를 입력해 주세요.");const $=S.split(/[,\s]+/).map(k=>k.trim()).filter(Boolean);if($.length===0&&a.push("태그를 한 개 이상 입력해 주세요."),C.length<10&&a.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+C.length+")"),a.length>0){c.textContent=a.join(" / "),c.style.display="block";return}c.style.display="none";let q=null;if(r&&L)try{q=r.toDataURL("image/jpeg",.8)}catch{q=null}const A={title:y,slug:x,summary:"",tags:$,collection:d,cover:q,content:C};console.log("✏️ 새 글 작성 payload:",A),u.disabled=!0;const D=u.textContent;u.textContent="게시 중...";try{const k=await nt(A);console.log("✅ Worker 응답:",k),u.textContent="게시 완료",e.reset(),s.dataset.userEdited="0";try{await at(),ne()}catch(N){console.error("새 피드 동기화 실패:",N)}window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(k){const N=k instanceof Error?k.message:"작성 중 알 수 없는 오류가 발생했습니다.";c.textContent=N,c.style.display="block",u.textContent=D,u.disabled=!1}})}function st(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.route;t&&(t==="home"?window.location.hash="#/":t==="search"?window.location.hash="#/search":t==="profile"?window.location.hash="#/profile":t==="write"&&(window.location.hash="#/write"))})})}function ie(){X.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function it(e){X.innerHTML=`
      <div class="view-state">
        <p>${l(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{ae()})}function l(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ot(e){const t=e.split(/\r?\n/);let s="",i=!1,o=!1;function n(){o&&(s+="</ul>",o=!1)}for(let h of t){const u=h.replace(/\s+$/,"");if(u.trim().startsWith("```")){i?(s+="</code></pre>",i=!1):(n(),s+="<pre><code>",i=!0);continue}if(i){s+=l(u)+`
`;continue}if(!u.trim()){n();continue}const g=u.match(/^(#{1,6})\s+(.*)$/);if(g){n();const c=g[1].length,b=l(g[2]);s+=`<h${c}>${b}</h${c}>`;continue}if(/^[-*]\s+/.test(u)){const c=l(u.replace(/^[-*]\s+/,""));o||(s+="<ul>",o=!0),s+=`<li>${c}</li>`;continue}else n();s+=`<p>${l(u)}</p>`}return n(),s}async function nt(e){const t=he();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${ve}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(s.status===401){try{localStorage.removeItem(z)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let i="";try{const n=await s.json();n&&typeof n.message=="string"&&(i=n.message)}catch{}const o=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(i?`${o} - ${i}`:o)}try{return await s.json()}catch{return{}}}async function at(){const{page:e}=await pe(1);m=e.items}function ne(){const e=fe();if(e!=="postDetail"&&Ne(),e==="home"){if(m.length===0){ie();return}O()}else if(e==="search")Ge();else if(e==="write")Ze();else if(e==="profile")Ve();else if(e==="postDetail"){if(m.length===0){ie();return}O();const t=Me();Xe(t)}else e==="authCallback"&&rt()}function rt(){const e=qe();if(e)try{localStorage.setItem(z,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function ae(){ie(),Y="posts";try{const{page:e}=await pe(1);m=e.items,ne()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";it(t)}}Ee();ae();window.addEventListener("hashchange",()=>{fe()==="home"&&m.length===0?ae():ne()});
