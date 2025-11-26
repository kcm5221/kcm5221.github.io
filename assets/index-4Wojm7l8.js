(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const ce="/data";async function de(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function we(){const e=`${ce}/current.json`;return await de(e)}async function be(e,t){const s=`${ce}/feed/page-${t}@${e}.json`;return await de(s)}async function ye(e=1){const t=await we(),s=await be(t.sha,e);return{current:t,page:s}}const $e={},J=document.querySelector("#app");if(!J)throw new Error("#app element not found");const ke=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],Le=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],H={home:"Developer"},ue=$e?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",P="devlog_jwt";function xe(e){try{const t=e.split(".");if(t.length!==3)return null;const s=t[1].replace(/-/g,"+").replace(/_/g,"/"),o=atob(s);return JSON.parse(o)}catch{return null}}function pe(){try{const e=localStorage.getItem(P);if(!e)return null;const t=xe(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(P),null):e}catch{return null}}function Se(){return!!pe()}function Ee(){const e=window.location.hash||"",t=e.match(/^#\/?auth=([^&]+)/),s=e.match(/auth=([^&]+)/),o=t?.[1]??s?.[1];if(!o)return;try{localStorage.setItem(P,decodeURIComponent(o))}catch{}const i=window.location.href.split("#")[0];window.history.replaceState(null,"",`${i}#/write`)}const Ce={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},Me={home:`
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
    `};let h=[],Z="posts",q=null,E=null,le="",V="#/posts",_=[],G=[];function ve(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function je(){const e=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!e)return null;try{return decodeURIComponent(e[1])}catch{return e[1]}}function qe(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const s=e.slice(t+1);return new URLSearchParams(s).get("token")}function U(e,t){J.innerHTML=`
      <div class="app-shell">
        ${Ae(e)}
        <div class="main-area">
          ${Be()}
          <div class="main-inner">${t}</div>
        </div>
        ${Te(e)}
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
    `}function Te(e){return`
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
    `}function X(){return document.querySelector("#post-detail-modal-root")}function Ie(){const e=X();e&&(e.innerHTML="",e.classList.remove("is-active"),q&&(document.removeEventListener("keydown",q),q=null))}function he(){const e=X();if(!e)return;const t=e.querySelectorAll("[data-close-modal='true']"),s=()=>{const o=V||"#/posts";window.location.hash=o};t.forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),s()})}),q&&document.removeEventListener("keydown",q),q=o=>{o.key==="Escape"&&s()},document.addEventListener("keydown",q)}function se(e){const t=X();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${A("close")}
          </button>
          <div class="post-detail-empty">${a(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),he())}function A(e){return`<span class="icon">${Me[e]}</span>`}function z(e,t){return`
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
                        ${a(s.label)}
                        <span class="stat-value">${a(s.value)}</span>
                      </div>
                    `).join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${a(t)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `}function Oe(){return`
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
        ${Object.entries(Ce).map(([e,t])=>{const s=e;return`
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
    `}function _e(){const e=De(h);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return E&&(t=e.find(s=>s.id===E)??null,t||(E=null)),t?ze(t):Pe(e)}function De(e){const t=new Map;return e.forEach(s=>{const o=s.collection?.trim();if(!o)return;const i=t.get(o)??[];i.push(s),t.set(o,i)}),Array.from(t.entries()).map(([s,o])=>({id:s,name:fe(s),posts:[...o].sort((i,n)=>{const p=new Date(i.created).getTime(),l=new Date(n.created).getTime();return isNaN(p)||isNaN(l)?0:l-p})})).sort((s,o)=>o.posts.length!==s.posts.length?o.posts.length-s.posts.length:s.name.localeCompare(o.name))}function fe(e){const t=e.trim(),s=t.split(/[-_]/).filter(Boolean).map(o=>o.charAt(0).toUpperCase()+o.slice(1));return s.length?s.join(" "):t}function He(){const e=new Set;return h.forEach(t=>{const s=(t.collection??"").trim();s&&e.add(s)}),Array.from(e).sort((t,s)=>t.localeCompare(s))}function Pe(e){return`
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
    `}function Ue(e){const t=e.posts.find(p=>!!p.cover),s=!!t?.cover,o=`saved-collection-cover ${s?"":"is-fallback"}`.trim(),i=s?"":`style="background:${ie(e.id)}"`,n=s?`<img src="${a(t.cover)}" alt="${a(e.name)}" loading="lazy" />`:`<span>${a(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${a(e.id)}">
        <span class="${o}" ${i}>
          ${n}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${a(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function ze(e){const t=e.posts[0];let s="";if(t){const i=new Date(t.created);isNaN(i.getTime())||(s=i.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const o=s?`게시물 ${e.posts.length} · 최근 업데이트 ${s}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${A("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${a(e.name)}</h3>
            <p>${a(o)}</p>
          </div>
        </div>
        ${Y(e.posts)}
      </section>
    `}function Y(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>Ke(t)).join("")}
      </div>
    `}function Ke(e){const t=e.tags.length?e.tags.map(n=>`#${a(n)}`).join(" "):"태그 없음",s=new Date(e.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),i=e.cover?`<img src="${a(e.cover)}" alt="${a(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${a(e.slug)}">
        <div class="post-media ${i?"":"is-fallback"}" ${i?"":`style="background:${ie(e.slug)}"`}
        >
                ${i||`<span class="post-fallback-title">${a(e.title)}</span>`}

        </div>
        <div class="post-overlay">
          <p class="overlay-title">${a(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${o}</p>
        </div>
      </article>
    `}function We(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function ie(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(e.split("").reduce((o,i)=>o+i.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[s]}, #fff)`}function Fe(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function Q(){return[{label:"게시물",value:`${h.length}`}]}function D(){const e="home",t=h,s=Q(),o=`
      ${z(s,H.home)}
      ${Re()}
      ${Z==="posts"?Y(t):_e()}
    `;U(e,o),Qe()}function Ge(){const e=Q(),t=`
      ${z(e,H.home)}
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
          ${Y(h)}
        </div>
      </section>
    `;U("search",t),et()}function Je(e){if(!e){se("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!h.length){se("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=h.find(d=>d.slug===e);if(!t){se(`슬러그가 '${a(e)}'인 글을 찾을 수 없습니다.`);return}const s=new Date(t.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),i=t.tags.length?t.tags.map(d=>`<span class="post-detail-tag">#${a(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',n=t.cover?`<img src="${a(t.cover)}" alt="${a(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${ie(t.slug)}">
          <h2>${a(t.title)}</h2>
        </div>
      `;let p=h;const l=G.map(d=>h.find(v=>v.slug===d)||null).filter(d=>d!==null);if(l.length&&l.some(d=>d.slug===t.slug))p=l;else if(E){const d=E,v=h.filter(b=>(b.collection??"").trim()===d);v.some(b=>b.slug===t.slug)&&(p=v)}else if(V.startsWith("#/search")&&_.length>0){const d=_.map(v=>h.find(b=>b.slug===v)||null).filter(v=>v!==null);d.some(v=>v.slug===t.slug)&&(p=d)}const m=p.findIndex(d=>d.slug===t.slug),r=m>0?p[m-1]:null,g=m>=0&&m<p.length-1?p[m+1]:null,c=(d,v)=>{const b=`post-detail-nav-btn-${d}`,B=d==="prev"?"‹":"›",T=d==="prev"?"이전 게시물":"다음 게시물";return v?`
        <a class="post-detail-nav-btn ${b}" href="#/post/${encodeURIComponent(v.slug)}" aria-label="${T}" title="${a(Fe(v.title,48))}">
          <span aria-hidden="true">${B}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${b}" aria-disabled="true" aria-label="${T}"><span aria-hidden="true">${B}</span></span>`},L=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${c("prev",r)}
      </nav>
    `,ee=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${c("next",g)}
      </nav>
    `,k=`
      <nav class="post-detail-mobile-nav" aria-label="게시물 이동">
        ${c("prev",r)}
        ${c("next",g)}
      </nav>
    `,K=`
      <section class="post-detail" ${r?`data-prev-slug="${a(r.slug)}"`:""} ${g?`data-next-slug="${a(g.slug)}"`:""}>
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
                  <span>${o}</span>
                </div>
              </div>
              <div class="post-detail-header-actions">
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${A("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${a(t.title)}</h2>
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${o}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${a(t.collection??"지정 없음")}</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${i}
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
    `,j.classList.add("is-active"),requestAnimationFrame(()=>{j.querySelector(".post-detail-modal")?.classList.add("is-open")}),Ve(),he(),Ze(t))}function Ze(e){const t=document.querySelector("#post-body");if(!t)return;const s=(e.summary??"").trim();if(!s){t.innerHTML="<p>본문이 비어 있습니다.</p>";return}const o=it(s);t.innerHTML=o||"<p>본문이 비어 있습니다.</p>"}function Ve(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),o=document.querySelector("#post-save-btn");if(e&&t){const i=()=>{const n=e.value.trim().length>0;t.disabled=!n,t.classList.toggle("is-active",n)};e.addEventListener("input",i)}s&&s.addEventListener("click",()=>{const i=!s.classList.contains("is-active");s.classList.toggle("is-active",i),s.setAttribute("aria-pressed",i?"true":"false")}),o&&o.addEventListener("click",()=>{const i=!o.classList.contains("is-active");o.classList.toggle("is-active",i),o.setAttribute("aria-pressed",i?"true":"false")})}function Xe(){const e=Q(),t=`
      ${z(e,H.home)}
      ${Oe()}
    `;U("profile",t)}function Ye(){const e=Q();if(!Se()){const s=`
          ${z(e,H.home)}
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
      ${z(e,H.home)}
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
      ${He().map(s=>`<option value="${a(s)}">${a(fe(s))}</option>`).join("")}
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
    `;U("write",t),tt()}function Qe(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;t&&(Z=t,t!=="saved"&&(E=null),D())})}),document.querySelectorAll(".post-card[data-slug]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slug;t&&(G=(E?h.filter(s=>(s.collection??"").trim()===E):h).map(s=>s.slug),V=window.location.hash||"#/posts",window.location.hash=`#/post/${encodeURIComponent(t)}`)})}),document.querySelectorAll(".saved-collection-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.collectionId;t&&(E=t,D())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{E=null,D()})}function et(){const e=document.querySelector("#search-input"),t=document.querySelector("#search-meta"),s=document.querySelector("#search-results");if(!e||!s)return;const o=e,i=s;o.value=le;function n(l){const m=l.trim().toLowerCase();return m?h.filter(r=>[r.title,r.summary??"",r.collection??"",r.tags.join(" ")].join(" ").toLowerCase().includes(m)):h}function p(){const l=o.value;le=l;const m=n(l);if(_=m.map(r=>r.slug),i.innerHTML=Y(m),t){const r=h.length,g=m.length;l.trim()?t.textContent=`${r}개 중 ${g}개 검색됨`:t.textContent=`${r}개 글`}i.querySelectorAll(".post-card[data-slug]").forEach(r=>{r.addEventListener("click",()=>{const g=r.dataset.slug;g&&(_.length>0?G=[..._]:G=h.map(c=>c.slug),V=window.location.hash||"#/search",window.location.hash=`#/post/${encodeURIComponent(g)}`)})})}o.addEventListener("input",()=>{p()}),p()}function tt(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),s=e.querySelector("#write-slug"),o=e.querySelector("#write-tags"),i=e.querySelector("#write-collection-select"),n=e.querySelector("#write-collection-new"),p=e.querySelector("#write-body"),l=e.querySelector("#write-submit"),m=e.querySelector("#write-reset"),r=e.querySelector("#write-error"),g=e.querySelector("#write-cover-file"),c=e.querySelector("#write-cover-canvas"),L=e.querySelector("#write-cover-zoom"),ee=e.querySelector("#write-cover-reset");if(!t||!s||!o||!p||!l||!r)return;t.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=We(t.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),m?.addEventListener("click",()=>{if(e.reset(),s.dataset.userEdited="0",r.style.display="none",r.textContent="",n&&(n.disabled=!0,n.value=""),c){const u=c.getContext("2d");u&&u.clearRect(0,0,c.width,c.height)}g&&(g.value=""),L&&(L.value="1")});let k=null,K=1,j=1,d=0,v=0,b=!1,B=0,T=0,ae=0,re=0;const I=800,O=1e3,te=()=>{if(!c||!k)return;const u=c.getContext("2d");if(!u)return;c.width=I,c.height=O,u.clearRect(0,0,I,O);const f=K*j,x=k.width*f,C=k.height*f,M=(I-x)/2,y=(O-C)/2;let w=M+d,S=y+v;const N=I-x,R=0,W=O-C,$=0;w<N?(w=N,d=w-M):w>R&&(w=R,d=w-M),S<W?(S=W,v=S-y):S>$&&(S=$,v=S-y),u.drawImage(k,w,S,x,C)},ge=u=>{if(!c)return;const f=new Image;f.onload=()=>{k=f;const x=I/f.width,C=O/f.height;K=Math.max(x,C),j=1,L&&(L.value="1"),d=0,v=0,te()},f.src=URL.createObjectURL(u)};if(c&&(c.addEventListener("mousedown",u=>{if(!k)return;b=!0;const f=c.getBoundingClientRect();B=u.clientX-f.left,T=u.clientY-f.top,ae=d,re=v}),window.addEventListener("mousemove",u=>{if(!b||!k||!c)return;const f=c.getBoundingClientRect(),x=u.clientX-f.left,C=u.clientY-f.top,M=x-B,y=C-T;d=ae+M,v=re+y,te()}),window.addEventListener("mouseup",()=>{b=!1}),c.addEventListener("mouseleave",()=>{b=!1})),g?.addEventListener("change",u=>{const f=u.target.files?.[0];f&&ge(f)}),L?.addEventListener("input",()=>{const u=parseFloat(L.value||"1");j=Number.isFinite(u)?u:1,te()}),ee?.addEventListener("click",()=>{if(k=null,c){const u=c.getContext("2d");u&&u.clearRect(0,0,c.width,c.height)}g&&(g.value=""),L&&(L.value="1"),d=0,v=0}),i&&n){const u=()=>{i.value==="__new__"?(n.disabled=!1,n.focus()):(n.disabled=!0,n.value="")};i.addEventListener("change",u),u()}e.addEventListener("submit",async u=>{u.preventDefault();const f=t.value.trim(),x=s.value.trim(),C=o.value,M=p.value.trim();let y=null;const w=[];if(i&&n){const $=i.value;if(!$)y=null;else if($==="__new__"){const F=n.value.trim();F?y=F:w.push("새 컬렉션 이름을 입력해 주세요.")}else y=$;y&&(y.length<2||y.length>40)&&w.push("컬렉션 이름은 2~40자 사이여야 합니다.")}f||w.push("제목을 입력해 주세요."),x||w.push("슬러그를 입력해 주세요.");const S=C.split(/[,\s]+/).map($=>$.trim()).filter(Boolean);if(S.length===0&&w.push("태그를 한 개 이상 입력해 주세요."),M.length<10&&w.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+M.length+")"),w.length>0){r.textContent=w.join(" / "),r.style.display="block";return}r.style.display="none";let N=null;if(c&&k)try{N=c.toDataURL("image/jpeg",.8)}catch{N=null}const R={title:f,slug:x,summary:"",tags:S,collection:y,cover:N,content:M};console.log("✏️ 새 글 작성 payload:",R),l.disabled=!0;const W=l.textContent;l.textContent="게시 중...";try{const $=await nt(R);console.log("✅ Worker 응답:",$),l.textContent="게시 완료",e.reset(),s.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch($){const F=$ instanceof Error?$.message:"작성 중 알 수 없는 오류가 발생했습니다.";r.textContent=F,r.style.display="block",l.textContent=W,l.disabled=!1}})}function st(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.route;t&&(t==="home"?window.location.hash="#/":t==="search"?window.location.hash="#/search":t==="profile"?window.location.hash="#/profile":t==="write"&&(window.location.hash="#/write"))})})}function oe(){J.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function ot(e){J.innerHTML=`
      <div class="view-state">
        <p>${a(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{ne()})}function a(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function it(e){const t=e.split(/\r?\n/);let s="",o=!1,i=!1;function n(){i&&(s+="</ul>",i=!1)}for(let p of t){const l=p.replace(/\s+$/,"");if(l.trim().startsWith("```")){o?(s+="</code></pre>",o=!1):(n(),s+="<pre><code>",o=!0);continue}if(o){s+=a(l)+`
`;continue}if(!l.trim()){n();continue}const m=l.match(/^(#{1,6})\s+(.*)$/);if(m){n();const r=m[1].length,g=a(m[2]);s+=`<h${r}>${g}</h${r}>`;continue}if(/^[-*]\s+/.test(l)){const r=a(l.replace(/^[-*]\s+/,""));i||(s+="<ul>",i=!0),s+=`<li>${r}</li>`;continue}else n();s+=`<p>${a(l)}</p>`}return n(),s}async function nt(e){const t=pe();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${ue}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(s.status===401){try{localStorage.removeItem(P)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let o="";try{const n=await s.json();n&&typeof n.message=="string"&&(o=n.message)}catch{}const i=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(o?`${i} - ${o}`:i)}try{return await s.json()}catch{return{}}}function me(){const e=ve();if(e!=="postDetail"&&Ie(),e==="home"){if(h.length===0){oe();return}D()}else if(e==="search")Ge();else if(e==="write")Ye();else if(e==="profile")Xe();else if(e==="postDetail"){if(h.length===0){oe();return}D();const t=je();Je(t)}else e==="authCallback"&&at()}function at(){const e=qe();if(e)try{localStorage.setItem(P,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function ne(){oe(),Z="posts";try{const{page:e}=await ye(1);h=e.items,me()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";ot(t)}}Ee();ne();window.addEventListener("hashchange",()=>{ve()==="home"&&h.length===0?ne():me()});
