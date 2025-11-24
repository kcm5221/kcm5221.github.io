(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const _="/data";async function G(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Request failed: ${t.status} ${t.statusText} (${e})`);return await t.json()}async function X(){const e=`${_}/current.json`;return await G(e)}async function Y(e,t){const s=`${_}/feed/page-${t}@${e}.json`;return await G(s)}async function ee(e=1){const t=await X(),s=await Y(t.sha,e);return{current:t,page:s}}const te={},A=document.querySelector("#app");if(!A)throw new Error("#app element not found");const se=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],oe=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],C={home:"Developer"},J=te?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",$="devlog_jwt";function ie(e){try{const t=e.split(".");if(t.length!==3)return null;const s=t[1].replace(/-/g,"+").replace(/_/g,"/"),o=atob(s);return JSON.parse(o)}catch{return null}}function F(){try{const e=localStorage.getItem($);if(!e)return null;const t=ie(e);return!t||typeof t.exp!="number"?e:Math.floor(Date.now()/1e3)>t.exp?(localStorage.removeItem($),null):e}catch{return null}}function ae(){return!!F()}function ne(){const e=window.location.hash||"";if(!e.startsWith("#auth="))return;const t=decodeURIComponent(e.slice(6));if(t){try{localStorage.setItem($,t),console.log("✅ JWT 저장 완료")}catch(s){console.error("JWT 저장 실패:",s)}window.location.hash="#/"}}function re(){const e=(window.location.hash||"").match(/^#\/?auth=(.+)$/);if(!e)return;const t=e[1];if(t){try{localStorage.setItem($,t)}catch{}window.location.replace("#/write")}}const le={posts:{label:"게시물",icon:"grid"},saved:{label:"컬렉션",icon:"bookmark"}},ce={home:`
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
    `};let p=[],T="posts",y=null,m=null,K="",B="#/posts",L=[],q=[];function Z(){const e=window.location.hash||"#/";return e.startsWith("#/search")?"search":e.startsWith("#/profile")?"profile":e.startsWith("#/write")?"write":e.startsWith("#/auth/callback")?"authCallback":e.startsWith("#/post/")?"postDetail":"home"}function de(){const e=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!e)return null;try{return decodeURIComponent(e[1])}catch{return e[1]}}function ue(){const e=window.location.hash,t=e.indexOf("?");if(t===-1)return null;const s=e.slice(t+1);return new URLSearchParams(s).get("token")}function E(e,t){A.innerHTML=`
      <div class="app-shell">
        ${pe(e)}
        <div class="main-area">
          ${he()}
          <div class="main-inner">${t}</div>
        </div>
        ${fe(e)}
        <div id="post-detail-modal-root" aria-live="polite"></div>
      </div>
    `,De()}function pe(e){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${se.map(t=>ve(t,e)).join("")}
        </nav>
      </aside>
    `}function ve(e,t){return`
      <button
        class="sidebar-link ${e.route&&e.route===t?"is-active":""}"
        type="button"
        ${e.route?`data-route="${e.route}"`:""}
      >
        ${k(e.icon)}
        <span>${e.label}</span>
      </button>
    `}function he(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${k("chevron")}</div>
      </header>
    `}function fe(e){return`
      <nav class="bottom-nav">
        ${oe.map(t=>`
              <button
                type="button"
                class="bottom-nav-btn ${t.route&&t.route===e?"is-active":""}"
                ${t.route?`data-route="${t.route}"`:""}
            >
                ${k(t.icon)}
              </button>
            `).join("")}
      </nav>
    `}function I(){return document.querySelector("#post-detail-modal-root")}function me(){const e=I();e&&(e.innerHTML="",e.classList.remove("is-active"),y&&(document.removeEventListener("keydown",y),y=null))}function V(){const e=I();if(!e)return;const t=e.querySelectorAll("[data-close-modal='true']"),s=()=>{const o=B||"#/posts";window.location.hash=o};t.forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),s()})}),y&&document.removeEventListener("keydown",y),y=o=>{o.key==="Escape"&&s()},document.addEventListener("keydown",y)}function W(e){const t=I();t&&(t.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          <button type="button" class="post-detail-close" aria-label="게시물 닫기" data-close-modal="true">
            ${k("close")}
          </button>
          <div class="post-detail-empty">${n(e)}</div>
        </div>
      </div>
    `,t.classList.add("is-active"),V())}function k(e){return`<span class="icon">${ce[e]}</span>`}function M(e,t){return`
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
                        ${n(s.label)}
                        <span class="stat-value">${n(s.value)}</span>
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
    `}function ge(){return`
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
    `}function we(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(le).map(([e,t])=>{const s=e;return`
                  <button
                    class="tab-btn ${T===s?"is-active":""}"
                    role="tab"
                    data-tab="${s}"
                    type="button"
                  >
                    ${k(t.icon)}
                    <span>${t.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function be(){const e=ye(p);if(e.length===0)return'<div class="empty-state">저장된 컬렉션이 아직 없습니다.</div>';let t=null;return m&&(t=e.find(s=>s.id===m)??null,t||(m=null)),t?Le(t):ke(e)}function ye(e){const t=new Map;return e.forEach(s=>{const o=s.collection?.trim();if(!o)return;const i=t.get(o)??[];i.push(s),t.set(o,i)}),Array.from(t.entries()).map(([s,o])=>({id:s,name:$e(s),posts:[...o].sort((i,a)=>{const r=new Date(i.created).getTime(),u=new Date(a.created).getTime();return isNaN(r)||isNaN(u)?0:u-r})})).sort((s,o)=>o.posts.length!==s.posts.length?o.posts.length-s.posts.length:s.name.localeCompare(o.name))}function $e(e){const t=e.trim(),s=t.split(/[-_]/).filter(Boolean).map(o=>o.charAt(0).toUpperCase()+o.slice(1));return s.length?s.join(" "):t}function ke(e){return`
      <section class="saved-view saved-collections-view">
        <div class="saved-header">
          <div>
            <p>컬렉션 ${e.length}</p>
          </div>
          <button type="button" id="saved-new-collection-btn" class="saved-new-btn">+ 새 컬렉션</button>
        </div>
        <div class="saved-collections-grid">
          ${e.map(t=>xe(t)).join("")}
        </div>
      </section>
    `}function xe(e){const t=e.posts.find(r=>!!r.cover),s=!!t?.cover,o=`saved-collection-cover ${s?"":"is-fallback"}`.trim(),i=s?"":`style="background:${U(e.id)}"`,a=s?`<img src="${n(t.cover)}" alt="${n(e.name)}" loading="lazy" />`:`<span>${n(e.name.charAt(0).toUpperCase())}</span>`;return`
      <button type="button" class="saved-collection-card" data-collection-id="${n(e.id)}">
        <span class="${o}" ${i}>
          ${a}
        </span>
        <span class="saved-collection-overlay">
          <span class="saved-collection-name">${n(e.name)}</span>
          <span class="saved-collection-count">게시물 ${e.posts.length}</span>
        </span>
      </button>
    `}function Le(e){const t=e.posts[0];let s="";if(t){const i=new Date(t.created);isNaN(i.getTime())||(s=i.toLocaleDateString("ko-KR",{year:"numeric",month:"short",day:"numeric"}))}const o=s?`게시물 ${e.posts.length} · 최근 업데이트 ${s}`:`게시물 ${e.posts.length}`;return`
      <section class="saved-view saved-collection-detail">
        <div class="saved-detail-header">
          <button type="button" id="saved-back-button" class="saved-back-btn">
            ${k("chevron")}
            <span>컬렉션</span>
          </button>
          <div class="saved-detail-meta">
            <h3>${n(e.name)}</h3>
            <p>${n(o)}</p>
          </div>
        </div>
        ${N(e.posts)}
      </section>
    `}function N(e){return e.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${e.map(t=>Se(t)).join("")}
      </div>
    `}function Se(e){const t=e.tags.length?e.tags.map(a=>`#${n(a)}`).join(" "):"태그 없음",s=new Date(e.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),i=e.cover?`<img src="${n(e.cover)}" alt="${n(e.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${n(e.slug)}">
        <div class="post-media ${i?"":"is-fallback"}" ${i?"":`style="background:${U(e.slug)}"`}
        >
                ${i||`<span class="post-fallback-title">${n(e.title)}</span>`}

        </div>
        <div class="post-overlay">
          <p class="overlay-title">${n(e.title)}</p>
          <p class="overlay-tags">${t}</p>
          <p class="overlay-date">${o}</p>
        </div>
      </article>
    `}function Ce(e){return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function U(e){const t=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(e.split("").reduce((o,i)=>o+i.charCodeAt(0),0))%t.length;return`linear-gradient(135deg, ${t[s]}, #fff)`}function Ee(e,t=48){return e.length<=t?e:`${e.slice(0,t-1)}…`}function H(){return[{label:"게시물",value:`${p.length}`}]}function S(){const e="home",t=p,s=H(),o=`
      ${M(s,C.home)}
      ${we()}
      ${T==="posts"?N(t):be()}
    `;E(e,o),Ie()}function Me(){const e=H(),t=`
      ${M(e,C.home)}
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
          ${N(p)}
        </div>
      </section>
    `;E("search",t),Ne()}function je(e){if(!e){W("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!p.length){W("아직 피드를 불러오지 못했습니다. 홈 화면을 연 뒤 다시 시도해 주세요.");return}const t=p.find(d=>d.slug===e);if(!t){W(`슬러그가 '${n(e)}'인 글을 찾을 수 없습니다.`);return}const s=new Date(t.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),i=t.tags.length?t.tags.map(d=>`<span class="post-detail-tag">#${n(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',a=t.cover?`<img src="${n(t.cover)}" alt="${n(t.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${U(t.slug)}">
          <h2>${n(t.title)}</h2>
        </div>
      `;let r=p;const u=q.map(d=>p.find(v=>v.slug===d)||null).filter(d=>d!==null);if(u.length&&u.some(d=>d.slug===t.slug))r=u;else if(m){const d=m,v=p.filter(h=>(h.collection??"").trim()===d);v.some(h=>h.slug===t.slug)&&(r=v)}else if(B.startsWith("#/search")&&L.length>0){const d=L.map(v=>p.find(h=>h.slug===v)||null).filter(v=>v!==null);d.some(v=>v.slug===t.slug)&&(r=d)}const l=r.findIndex(d=>d.slug===t.slug),c=l>0?r[l-1]:null,f=l>=0&&l<r.length-1?r[l+1]:null,g=(d,v)=>{const h=`post-detail-nav-btn-${d}`,j=d==="prev"?"‹":"›",z=d==="prev"?"이전 게시물":"다음 게시물";return v?`
        <a class="post-detail-nav-btn ${h}" href="#/post/${encodeURIComponent(v.slug)}" aria-label="${z}" title="${n(Ee(v.title,48))}">
          <span aria-hidden="true">${j}</span>
        </a>
      `:`<span class="post-detail-nav-btn is-disabled ${h}" aria-disabled="true" aria-label="${z}"><span aria-hidden="true">${j}</span></span>`},O=`
      <nav class="post-detail-nav post-detail-nav-prev" aria-label="이전 게시물">
        ${g("prev",c)}
      </nav>
    `,P=`
      <nav class="post-detail-nav post-detail-nav-next" aria-label="다음 게시물">
        ${g("next",f)}
      </nav>
    `,x=`
      <div class="post-detail-mobile-nav" aria-label="게시물 이동">
        ${g("prev",c)}
        ${g("next",f)}
      </div>
    `,w=`
      <section class="post-detail" ${c?`data-prev-slug="${n(c.slug)}"`:""} ${f?`data-next-slug="${n(f.slug)}"`:""}>
        <div class="post-detail-frame">
          ${O}
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
                <button type="button" class="post-detail-action-btn" aria-label="닫기" data-close-modal="true">${k("chevron")}</button>
              </div>
            </header>
            <div class="post-detail-scroll">
              <div class="post-detail-title-block">
                <h2 class="post-detail-title">${n(t.title)}</h2>
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${o}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${n(t.collection??"지정 없음")}</span>
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
          ${P}
        </div>
        ${x}
      </section>
    `,b=I();b&&(b.innerHTML=`
      <div class="post-detail-modal is-visible" role="dialog" aria-modal="true">
        <div class="post-detail-modal-backdrop" data-close-modal="true"></div>
        <div class="post-detail-modal-surface">
          ${w}
        </div>
      </div>
    `,b.classList.add("is-active"),requestAnimationFrame(()=>{b.querySelector(".post-detail-modal")?.classList.add("is-open")}),Ae(),V(),qe(t))}function qe(e){const t=document.querySelector("#post-body");if(!t)return;const s=(e.summary??"").trim();if(!s){t.innerHTML="<p>본문이 비어 있습니다.</p>";return}const o=Pe(s);t.innerHTML=o||"<p>본문이 비어 있습니다.</p>"}function Ae(){const e=document.querySelector("#post-comment-input"),t=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),o=document.querySelector("#post-save-btn");if(e&&t){const i=()=>{const a=e.value.trim().length>0;t.disabled=!a,t.classList.toggle("is-active",a)};e.addEventListener("input",i)}s&&s.addEventListener("click",()=>{const i=!s.classList.contains("is-active");s.classList.toggle("is-active",i),s.setAttribute("aria-pressed",i?"true":"false")}),o&&o.addEventListener("click",()=>{const i=!o.classList.contains("is-active");o.classList.toggle("is-active",i),o.setAttribute("aria-pressed",i?"true":"false")})}function Te(){const e=H(),t=`
      ${M(e,C.home)}
      ${ge()}
    `;E("profile",t)}function Be(){const e=H();if(!ae()){const s=`
          ${M(e,C.home)}
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
        `;E("write",s),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${J}/auth/login`});return}const t=`
      ${M(e,C.home)}
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
    `;E("write",t),He()}function Ie(){document.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;t&&(T=t,t!=="saved"&&(m=null),S())})}),document.querySelectorAll(".post-card[data-slug]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.slug;t&&(q=(m?p.filter(s=>(s.collection??"").trim()===m):p).map(s=>s.slug),B=window.location.hash||"#/posts",window.location.hash=`#/post/${encodeURIComponent(t)}`)})}),document.querySelectorAll(".saved-collection-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.collectionId;t&&(m=t,S())})}),document.querySelector("#saved-back-button")?.addEventListener("click",()=>{m=null,S()}),document.querySelector("#saved-new-collection-btn")?.addEventListener("click",()=>{alert("컬렉션 생성 기능은 곧 준비될 예정입니다.")})}function Ne(){const e=document.querySelector("#search-input"),t=document.querySelector("#search-meta"),s=document.querySelector("#search-results");if(!e||!s)return;const o=e,i=s;o.value=K;function a(u){const l=u.trim().toLowerCase();return l?p.filter(c=>[c.title,c.summary??"",c.collection??"",c.tags.join(" ")].join(" ").toLowerCase().includes(l)):p}function r(){const u=o.value;K=u;const l=a(u);if(L=l.map(c=>c.slug),i.innerHTML=N(l),t){const c=p.length,f=l.length;u.trim()?t.textContent=`${c}개 중 ${f}개 검색됨`:t.textContent=`${c}개 글`}i.querySelectorAll(".post-card[data-slug]").forEach(c=>{c.addEventListener("click",()=>{const f=c.dataset.slug;f&&(L.length>0?q=[...L]:q=p.map(g=>g.slug),B=window.location.hash||"#/search",window.location.hash=`#/post/${encodeURIComponent(f)}`)})})}o.addEventListener("input",()=>{r()}),r()}function He(){const e=document.querySelector("#write-form");if(!e)return;const t=e.querySelector("#write-title"),s=e.querySelector("#write-slug"),o=e.querySelector("#write-tags"),i=e.querySelector("#write-collection"),a=e.querySelector("#write-body"),r=e.querySelector("#write-submit"),u=e.querySelector("#write-reset"),l=e.querySelector("#write-error");!t||!s||!o||!a||!r||!l||(t.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=Ce(t.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),u?.addEventListener("click",()=>{e.reset(),s.dataset.userEdited="0",l.style.display="none",l.textContent=""}),e.addEventListener("submit",async c=>{c.preventDefault();const f=t.value.trim(),g=s.value.trim(),O=o.value,P=i?.value.trim()??"",x=a.value.trim(),w=[];f||w.push("제목을 입력해 주세요."),g||w.push("슬러그를 입력해 주세요.");const b=O.split(/[,\s]+/).map(h=>h.trim()).filter(Boolean);if(b.length===0&&w.push("태그를 한 개 이상 입력해 주세요."),x.length<10&&w.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+x.length+")"),w.length>0){l.textContent=w.join(" / "),l.style.display="block";return}l.style.display="none";const d={title:f,slug:g,summary:"",tags:b,collection:P||null,content:x};console.log("✏️ 새 글 작성 payload:",d),r.disabled=!0;const v=r.textContent;r.textContent="게시 중...";try{const h=await We(d);console.log("✅ Worker 응답:",h),r.textContent="게시 완료",e.reset(),s.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(h){const j=h instanceof Error?h.message:"작성 중 알 수 없는 오류가 발생했습니다.";l.textContent=j,l.style.display="block",r.textContent=v,r.disabled=!1}}))}function De(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.route;t&&(t==="home"?window.location.hash="#/":t==="search"?window.location.hash="#/search":t==="profile"?window.location.hash="#/profile":t==="write"&&(window.location.hash="#/write"))})})}function R(){A.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function Oe(e){A.innerHTML=`
      <div class="view-state">
        <p>${n(e)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{D()})}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pe(e){const t=e.split(/\r?\n/);let s="",o=!1,i=!1;function a(){i&&(s+="</ul>",i=!1)}for(let r of t){const u=r.replace(/\s+$/,"");if(u.trim().startsWith("```")){o?(s+="</code></pre>",o=!1):(a(),s+="<pre><code>",o=!0);continue}if(o){s+=n(u)+`
`;continue}if(!u.trim()){a();continue}const l=u.match(/^(#{1,6})\s+(.*)$/);if(l){a();const c=l[1].length,f=n(l[2]);s+=`<h${c}>${f}</h${c}>`;continue}if(/^[-*]\s+/.test(u)){const c=n(u.replace(/^[-*]\s+/,""));i||(s+="<ul>",i=!0),s+=`<li>${c}</li>`;continue}else a();s+=`<p>${n(u)}</p>`}return a(),s}async function We(e){const t=F();if(!t)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${J}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(s.status===401){try{localStorage.removeItem($)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let o="";try{const a=await s.json();a&&typeof a.message=="string"&&(o=a.message)}catch{}const i=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(o?`${i} - ${o}`:i)}try{return await s.json()}catch{return{}}}function Q(){const e=Z();if(e!=="postDetail"&&me(),e==="home"){if(p.length===0){R();return}S()}else if(e==="search")Me();else if(e==="write")Be();else if(e==="profile")Te();else if(e==="postDetail"){if(p.length===0){R();return}S();const t=de();je(t)}else e==="authCallback"&&Re()}function Re(){const e=ue();if(e)try{localStorage.setItem($,e)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function D(){re(),R(),T="posts";try{const{page:e}=await ee(1);p=e.items,Q()}catch(e){console.error(e);const t=e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다.";Oe(t)}}function Ue(){const e=(window.location.hash||"").match(/auth=([^&]+)/);if(!e)return;const t=decodeURIComponent(e[1]);try{localStorage.setItem($,t)}catch{}const s=window.location.href.split("#")[0];window.history.replaceState(null,"",s+"#/write")}Ue();D();window.addEventListener("hashchange",()=>{Z()==="home"&&p.length===0?D():Q()});ne();D();
