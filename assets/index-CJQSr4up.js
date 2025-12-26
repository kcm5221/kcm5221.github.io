(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const v of i.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&n(v)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const de="/data";async function ue(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function be(){const e=`${de}/current.json`;return await ue(e)}async function ye(e,t){const s=`${de}/feed/page-${t}@${e}.json`;return await ue(s)}async function pe(e=1){const t=await be(),s=await ye(t.sha,e);return{current:t,page:s}}const $e={},G=document.querySelector("#app");if(!G)throw new Error("#app element not found");const ke=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],Ce=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],F={home:"Developer"},ve=$e?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",W="devlog_jwt";function Se(e){try{const t=e.split(".");if(t.length!==3)return null;const s=t[1].replace(/-/g,"+").replace(/_/g,"/"),n=atob(s);return JSON.parse(n)}catch{return null}}function fe(){try{const e=localStorage.getItem(W);if(!e)return null;const t=Se(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem(W),null):e}catch{return null}}function xe(){return!!fe()}function Le(){const e=window.location.hash||"",t=e.match(/^#\/?auth=([^&]+)/),s=e.match(/auth=([^&]+)/),n=t?.[1]??s?.[1];if(!n)return;try{localStorage.setItem(W,decodeURIComponent(n))}catch{}const o=window.location.href.split("#")[0];window.history.replaceState(null,"",`${o}#/write`)}const Ee={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},Ie={home:`
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
    `};let m=[],X="posts",D=null,I=null,ce="",K="#/posts",N=[],Y=[];function he(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function Me(){const t=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!t)return null;try{return decodeURIComponent(t[1])}catch{return t[1]}}function Be(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const s=e.slice(t+1);return new URLSearchParams(s).get("token")}function U(e,t){G.innerHTML=`
      <div class="app-shell">
        ${Ae(e)}
        <div class="main-area">
          ${Te()}
          <div class="main-inner">${t}</div>
        </div>
        ${je(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,st()}function Ae(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${ke.map(t=>De(t,e)).join("")}
        </nav>
      </aside>
    `}function De(e,t){return`
      <button
        class="sidebar-link ${!!e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${T(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function Te(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${T("chevron")}</div>
      </header>
    `}function je(e){return`
      <nav class="bottom-nav">
        ${Ce.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${T(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function J(){return document.querySelector("#post-detail-modal-root")}function qe(){const e=J();e&&(e.innerHTML="",e.classList.remove("is-active"),D&&(document.removeEventListener("keydown",D),D=null))}function me(){const e=J();if(!e)return;const t=e.querySelectorAll("[data-close-modal='true']"),s=()=>{const n=K||"#/posts";window.location.hash=n};t.forEach(n=>{n.addEventListener("click",o=>{o.preventDefault(),s()})}),D&&document.removeEventListener("keydown",D),D=n=>{n.key==="Escape"&&s()},document.addEventListener("keydown",D)}function se(e){const t=J();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${T("close")}
          </button>
          <div class="post-detail-empty">${l(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),me())}function T(e){return`<span class="icon">${Ie[e]}</span>`}function z(e,t){return`
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
    `}function Re(){return`
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
        ${Object.entries(Ee).map(([e,t])=>{const s=e;return`
                  <button
                    class="tab-btn ${X===s?"is-active":""}"
                    role="tab"
                    data-tab="${s}"
                    type="button"
                  >
                    ${T(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function _e(){const e=He(m);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return I&&(t=e.find(s=>s.id===I)??null,t||(I=null)),t?We(t):Oe(e)}function He(e){const t=new Map;return e.forEach(s=>{const n=s.collection?.trim();if(!n)return;const o=t.get(n)??[];o.push(s),t.set(n,o)}),Array.from(t.entries()).map(([s,n])=>({id:s,name:ge(s),posts:[...n].sort((o,i)=>{const v=new Date(o.created).getTime(),c=new Date(i.created).getTime();return isNaN(v)||isNaN(c)?0:c-v})})).sort((s,n)=>n.posts.length!==s.posts.length?n.posts.length-s.posts.length:s.name.localeCompare(n.name))}function ge(e){const t=e.trim(),s=t.split(/[-_]/).filter(Boolean).map(n=>n.charAt(0).toUpperCase()+n.slice(1));return s.length?s.join(" "):t}function Ne(){const e=new Set;return m.forEach(t=>{const s=(t.collection??"").trim();s&&e.add(s)}),Array.from(e).sort((t,s)=>t.localeCompare(s))}function Oe(e){return`
      <section class="saved-view saved-collections-view">
        <div class="saved-header">
          <div>
            <p>컬렉션 ${e.length}</p>
          </div>
        </div>
        <div class="saved-collections-grid">
          ${e.map(t=>Fe(t)).join("")}
        </div>
      </section>
    `}function Fe(e){const t=e.posts.find(v=>!!v.cover),s=!!t?.cover,n=`saved-collection-cover ${s?"":"is-fallback"}`.trim(),o=s?"":`style="background:${ne(e.id)}"`,i=s?`<img src="${l(t.cover)}" alt="${l(e.name)}" loading="lazy" />`:`<span>${l(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${l(e.id)}">
        <span class="${n}" ${o}>
          ${i}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${l(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function We(e){const t=e.posts[0];let s="";if(t){const o=new Date(t.created);isNaN(o.getTime())||(s=o.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const n=s?`게시물 ${e.posts.length} · 최근 업데이트 ${s}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${T("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${l(e.name)}</h3>
            <p>${l(n)}</p>
          </div>
        </div>
        ${Z(e.posts)}
      </section>
    `}function Z(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>Ue(t)).join("")}
      </div>
    `}function Ue(e){const t=e.tags.length?e.tags.map(i=>`#${l(i)}`).join(" "):"태그 없음",s=new Date(e.created),n=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=e.cover?`<img src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${l(e.slug)}">
        <div
          class="post-media ${o?"":"is-fallback"}"
          ${o?"":`style="background:${ne(e.slug)}"`}
        >
          ${o||`<span class="post-fallback-title">${l(e.title)}</span>`}
        </div>

        <div class="post-overlay">
          <div class="post-overlay-content">
            <p class="overlay-title">${l(e.title)}</p>
            <p class="overlay-tags">${t}</p>
            <p class="overlay-date">${n}</p>
          </div>
        </div>
      </article>
    `}function ze(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function ne(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(e.split("").reduce((n,o)=>n+o.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[s]}, #fff)`}function Ve(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function Q(){return[{label:"게시물",value:`${m.length}`}]}function O(){const e="home",t=m,s=Q(),n=`
      ${z(s,F.home)}
      ${Pe()}
      ${X==="posts"?Z(t):_e()}
    `;U(e,n),Qe()}function Ye(){const e=Q(),t=`
      ${z(e,F.home)}
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
    `;U("search",t),et()}function Ge(e){if(!e){se("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!m.length){se("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=m.find(d=>d.slug===e);if(!t){se(`슬러그가 '${l(e)}'인 글을 찾을 수 없습니다.`);return}const s=new Date(t.created),n=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),o=t.tags.length?t.tags.map(d=>`<span class="post-detail-tag">#${l(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',i=t.cover?`<img src="${l(t.cover)}" alt="${l(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${ne(t.slug)}">
          <h2>${l(t.title)}</h2>
        </div>
      `;let v=m;const c=Y.map(d=>m.find(h=>h.slug===d)||null).filter(d=>d!==null);if(c.length&&c.some(d=>d.slug===t.slug))v=c;else if(I){const d=I,h=m.filter(b=>(b.collection??"").trim()===d);h.some(b=>b.slug===t.slug)&&(v=h)}else if(K.startsWith("#/search")&&N.length>0){const d=N.map(h=>m.find(b=>b.slug===h)||null).filter(h=>h!==null);d.some(h=>h.slug===t.slug)&&(v=d)}const w=v.findIndex(d=>d.slug===t.slug),f=w>0?v[w-1]:null,g=w>=0&&w<v.length-1?v[w+1]:null,a=(d,h)=>{const b=`post-detail-nav-btn-${d}`,R=d==="prev"?"‹":"›",P=d==="prev"?"이전 게시물":"다음 게시물";return h?`
        <a class="post-detail-nav-btn ${b}" href="#/post/${encodeURIComponent(h.slug)}" aria-label="${P}" title="${l(Ve(h.title,48))}">
          <span aria-hidden="true">${R}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${b}" aria-disabled="true" aria-label="${P}"><span aria-hidden="true">${R}</span></span>`},x=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${a("prev",f)}
      </nav>
    `,ee=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${a("next",g)}
      </nav>
    `,S=`
      <nav class="post-detail-mobile-nav" aria-label="게시물 이동">
        ${a("prev",f)}
        ${a("next",g)}
      </nav>
    `,V=`
      <section class="post-detail" ${f?`data-prev-slug="${l(f.slug)}"`:""} ${g?`data-next-slug="${l(g.slug)}"`:""}>
        <div class="post-detail-frame">
          ${x}
          <div class="post-detail-container">
            <div class="post-detail-media">
              ${i}
            </div>
            <div class="post-detail-panel">
            <header class="post-detail-header">
              <div class="post-detail-author">
                <img src="/profile/profile.jpg" alt="Cheolmin Kim" loading="lazy" />
                <div>
                  <p>Cheolmin Kim</p>
                  <span>${n}</span>
                </div>
              </div>
              <div class="post-detail-header-actions">
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${T("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${l(t.title)}</h2>
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${n}</span>
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
        ${S}
      </section>
    `,M=J();M&&(M.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${V}
        </div>
      </div>
    `,M.classList.add("is-active"),requestAnimationFrame(()=>{M.querySelector(".post-detail-modal")?.classList.add("is-open")}),Ke(),me(),Xe(t))}function Xe(e){const t=document.querySelector("#post-body");if(!t)return;const s=(e.summary??"").trim();if(!s){t.innerHTML="<p>본문이 비어 있습니다.</p>";return}const n=nt(s);t.innerHTML=n||"<p>본문이 비어 있습니다.</p>"}function Ke(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),n=document.querySelector("#post-save-btn");if(e&&t){const o=()=>{const i=e.value.trim().length>0;t.disabled=!i,t.classList.toggle("is-active",i)};e.addEventListener("input",o)}s&&s.addEventListener("click",()=>{const o=!s.classList.contains("is-active");s.classList.toggle("is-active",o),s.setAttribute("aria-pressed",o?"true":"false")}),n&&n.addEventListener("click",()=>{const o=!n.classList.contains("is-active");n.classList.toggle("is-active",o),n.setAttribute("aria-pressed",o?"true":"false")})}function Je(){const e=Q(),t=`
      ${z(e,F.home)}
      ${Re()}
    `;U("profile",t)}function Ze(){const e=Q();if(!xe()){const s=`
          ${z(e,F.home)}
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
        `;U("write",s),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${ve}/auth/login`});return}const t=`
      ${z(e,F.home)}
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
      ${Ne().map(s=>`<option value="${l(s)}">${l(ge(s))}</option>`).join("")}
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
    `;U("write",t),tt()}function Qe(){document.querySelectorAll("[data-tab]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.tab;i&&(X=i,i!=="saved"&&(I=null),O())})}),document.querySelectorAll(".post-card[data-slug]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.slug;if(!i)return;Y=(I?m.filter(c=>(c.collection??"").trim()===I):m).map(c=>c.slug),K=window.location.hash||"#/posts",window.location.hash=`#/post/${encodeURIComponent(i)}`})}),document.querySelectorAll(".saved-collection-card").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.collectionId;i&&(I=i,O())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{I=null,O()})}function et(){const e=document.querySelector("#search-input"),t=document.querySelector("#search-meta"),s=document.querySelector("#search-results");if(!e||!s)return;const n=e,o=s;n.value=ce;function i(c){const w=c.trim().toLowerCase();return w?m.filter(f=>[f.title,f.summary??"",f.collection??"",f.tags.join(" ")].join(" ").toLowerCase().includes(w)):m}function v(){const c=n.value;ce=c;const w=i(c);if(N=w.map(g=>g.slug),o.innerHTML=Z(w),t){const g=m.length,a=w.length;c.trim()?t.textContent=`${g}개 중 ${a}개 검색됨`:t.textContent=`${g}개 글`}o.querySelectorAll(".post-card[data-slug]").forEach(g=>{g.addEventListener("click",()=>{const a=g.dataset.slug;a&&(N.length>0?Y=[...N]:Y=m.map(x=>x.slug),K=window.location.hash||"#/search",window.location.hash=`#/post/${encodeURIComponent(a)}`)})})}n.addEventListener("input",()=>{v()}),v()}function tt(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),s=e.querySelector("#write-slug"),n=e.querySelector("#write-tags"),o=e.querySelector("#write-collection-select"),i=e.querySelector("#write-collection-new"),v=e.querySelector("#write-body"),c=e.querySelector("#write-submit"),w=e.querySelector("#write-reset"),f=e.querySelector("#write-error"),g=e.querySelector("#write-cover-file"),a=e.querySelector("#write-cover-canvas"),x=e.querySelector("#write-cover-zoom"),ee=e.querySelector("#write-cover-reset");if(!t||!s||!n||!v||!c||!f)return;t.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=ze(t.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),w?.addEventListener("click",()=>{if(e.reset(),s.dataset.userEdited="0",f.style.display="none",f.textContent="",i&&(i.disabled=!0,i.value=""),a){const p=a.getContext("2d");p&&p.clearRect(0,0,a.width,a.height)}g&&(g.value=""),x&&(x.value="1")});let S=null,V=1,M=1,d=0,h=0,b=!1,R=0,P=0,re=0,le=0;const _=800,H=1e3,te=()=>{if(!a||!S)return;const p=a.getContext("2d");if(!p)return;a.width=_,a.height=H,p.clearRect(0,0,_,H);const y=V*M,C=S.width*y,E=S.height*y,L=(_-C)/2,u=(H-E)/2;let r=L+d,$=u+h;const B=_-C,A=0,j=H-E,k=0;r<B?(r=B,d=r-L):r>A&&(r=A,d=r-L),$<j?($=j,h=$-u):$>k&&($=k,h=$-u),p.drawImage(S,r,$,C,E)},we=p=>{if(!a)return;const y=new Image;y.onload=()=>{S=y;const C=_/y.width,E=H/y.height;V=Math.max(C,E),M=1,x&&(x.value="1"),d=0,h=0,te()},y.src=URL.createObjectURL(p)};if(a){a.style.touchAction="none";let p=null;const y=typeof a.setPointerCapture=="function"&&typeof a.releasePointerCapture=="function",C=(u,r)=>{if(!S||!a)return!1;b=!0;const $=a.getBoundingClientRect();return R=u-$.left,P=r-$.top,re=d,le=h,!0},E=(u,r)=>{if(!b||!S||!a)return;const $=a.getBoundingClientRect(),B=u-$.left,A=r-$.top,j=B-R,k=A-P;d=re+j,h=le+k,te()},L=()=>{b&&(b=!1,p=null)};if("PointerEvent"in window){a.addEventListener("pointerdown",r=>{if(S){if(y)try{a.setPointerCapture(r.pointerId)}catch{}r.preventDefault(),C(r.clientX,r.clientY)&&(p=r.pointerId)}},{passive:!1}),a.addEventListener("pointermove",r=>{b&&(p!==null&&r.pointerId!==p||(r.preventDefault(),E(r.clientX,r.clientY)))},{passive:!1});const u=r=>{b&&(p!==null&&r.pointerId!==p||(y&&a.hasPointerCapture(r.pointerId)&&a.releasePointerCapture(r.pointerId),L()))};a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u),a.addEventListener("pointerleave",u)}else a.addEventListener("touchstart",u=>{if(!S)return;const r=u.touches[0];r&&(u.preventDefault(),C(r.clientX,r.clientY))},{passive:!1}),a.addEventListener("touchmove",u=>{if(!b)return;const r=u.touches[0];r&&(u.preventDefault(),E(r.clientX,r.clientY))},{passive:!1}),a.addEventListener("touchend",u=>{b&&(u.preventDefault(),L())},{passive:!1}),a.addEventListener("touchcancel",u=>{b&&(u.preventDefault(),L())},{passive:!1})}if(g?.addEventListener("change",p=>{const C=p.target.files?.[0];C&&we(C)}),x?.addEventListener("input",()=>{const p=parseFloat(x.value||"1");M=Number.isFinite(p)?p:1,te()}),ee?.addEventListener("click",()=>{if(S=null,a){const p=a.getContext("2d");p&&p.clearRect(0,0,a.width,a.height)}g&&(g.value=""),x&&(x.value="1"),d=0,h=0}),o&&i){const p=()=>{o.value==="__new__"?(i.disabled=!1,i.focus()):(i.disabled=!0,i.value="")};o.addEventListener("change",p),p()}e.addEventListener("submit",async p=>{p.preventDefault();const y=t.value.trim(),C=s.value.trim(),E=n.value,L=v.value.trim();let u=null;const r=[];if(o&&i){const k=o.value;if(!k)u=null;else if(k==="__new__"){const q=i.value.trim();q?u=q:r.push("새 컬렉션 이름을 입력해 주세요.")}else u=k;u&&(u.length<2||u.length>40)&&r.push("컬렉션 이름은 2~40자 사이여야 합니다.")}y||r.push("제목을 입력해 주세요."),C||r.push("슬러그를 입력해 주세요.");const $=E.split(/[,\s]+/).map(k=>k.trim()).filter(Boolean);if($.length===0&&r.push("태그를 한 개 이상 입력해 주세요."),L.length<10&&r.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+L.length+")"),r.length>0){f.textContent=r.join(" / "),f.style.display="block";return}f.style.display="none";let B=null;if(a&&S)try{B=a.toDataURL("image/jpeg",.8)}catch{B=null}const A={title:y,slug:C,summary:"",tags:$,collection:u,cover:B,content:L};console.log("✏️ 새 글 작성 payload:",A),c.disabled=!0;const j=c.textContent;c.textContent="게시 중...";try{const k=await it(A);console.log("✅ Worker 응답:",k),c.textContent="게시 완료",e.reset(),s.dataset.userEdited="0";try{await at(),ie()}catch(q){console.error("새 피드 동기화 실패:",q)}window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(k){const q=k instanceof Error?k.message:"작성 중 알 수 없는 오류가 발생했습니다.";f.textContent=q,f.style.display="block",c.textContent=j,c.disabled=!1}})}function st(){document.querySelectorAll("[data-route]").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.route;s&&(s==="home"?window.location.hash="#/":s==="search"?window.location.hash="#/search":s==="profile"?window.location.hash="#/profile":s==="write"&&(window.location.hash="#/write"))})})}function oe(){G.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function ot(e){G.innerHTML=`
      <div class="view-state">
        <p>${l(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{ae()})}function l(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function nt(e){const t=e.split(/\r?\n/);let s="",n=!1,o=!1;function i(){o&&(s+="</ul>",o=!1)}for(let v of t){const c=v.replace(/\s+$/,"");if(c.trim().startsWith("```")){n?(s+="</code></pre>",n=!1):(i(),s+="<pre><code>",n=!0);continue}if(n){s+=l(c)+`
`;continue}if(!c.trim()){i();continue}const w=c.match(/^(#{1,6})\s+(.*)$/);if(w){i();const f=w[1].length,g=l(w[2]);s+=`<h${f}>${g}</h${f}>`;continue}if(/^[-*]\s+/.test(c)){const f=l(c.replace(/^[-*]\s+/,""));o||(s+="<ul>",o=!0),s+=`<li>${f}</li>`;continue}else i();s+=`<p>${l(c)}</p>`}return i(),s}async function it(e){const t=fe();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${ve}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(s.status===401){try{localStorage.removeItem(W)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let n="";try{const i=await s.json();i&&typeof i.message=="string"&&(n=i.message)}catch{}const o=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(n?`${o} - ${n}`:o)}try{return await s.json()}catch{return{}}}async function at(){const{page:e}=await pe(1);m=e.items}function ie(){const e=he();if(e!=="postDetail"&&qe(),e==="home"){if(m.length===0){oe();return}O()}else if(e==="search")Ye();else if(e==="write")Ze();else if(e==="profile")Je();else if(e==="postDetail"){if(m.length===0){oe();return}O();const t=Me();Ge(t)}else e==="authCallback"&&rt()}function rt(){const e=Be();if(e)try{localStorage.setItem(W,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function ae(){oe(),X="posts";try{const{page:e}=await pe(1);m=e.items,ie()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";ot(t)}}Le();ae();window.addEventListener("hashchange",()=>{he()==="home"&&m.length===0?ae():ie()});
