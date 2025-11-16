(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const H="/data";async function q(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Request failed: ${e.status} ${e.statusText} (${t})`);return await e.json()}async function z(){const t=`${H}/current.json`;return await q(t)}async function K(t,e){const s=`${H}/feed/page-${e}@${t}.json`;return await q(s)}async function V(t=1){const e=await z(),s=await K(e.sha,t);return{current:e,page:s}}const Z={},A=document.querySelector("#app");if(!A)throw new Error("#app element not found");const Y=[{id:"home",label:"Home",icon:"home",route:"home"},{id:"search",label:"Search",icon:"search",route:"search"},{id:"profile",label:"Profile",icon:"user",route:"profile"},{id:"create",label:"Create",icon:"plus",route:"write"}],Q=[{id:"home",icon:"home",route:"home"},{id:"search",icon:"search",route:"search"},{id:"profile",icon:"user",route:"profile"},{id:"create",icon:"plus",route:"write"}],g={home:"Developer"},_=Z?.VITE_API_BASE??"https://blog-auth-worker.kimcm5221.workers.dev",m="devlog_jwt";function X(t){try{const e=t.split(".");if(e.length!==3)return null;const s=e[1].replace(/-/g,"+").replace(/_/g,"/"),o=atob(s);return JSON.parse(o)}catch{return null}}function O(){try{const t=localStorage.getItem(m);if(!t)return null;const e=X(t);return!e||typeof e.exp!="number"?t:Math.floor(Date.now()/1e3)>e.exp?(localStorage.removeItem(m),null):t}catch{return null}}function tt(){return!!O()}function et(){const t=window.location.hash||"";if(!t.startsWith("#auth="))return;const e=decodeURIComponent(t.slice(6));if(e){try{localStorage.setItem(m,e),console.log("✅ JWT 저장 완료")}catch(s){console.error("JWT 저장 실패:",s)}window.location.hash="#/"}}function st(){const e=(window.location.hash||"").match(/^#\/?auth=(.+)$/);if(!e)return;const s=e[1];if(s){try{localStorage.setItem(m,s)}catch{}window.location.replace("#/write")}}const ot={search:[{title:"검색 화면 준비 중",lines:["태그, 제목, 요약을 동시에 검색하는 통합 입력창","기간과 컬렉션 필터, 즐겨찾기 저장","PKCE 기반 GitHub OAuth 로 권한 제어"]},{title:"릴리스 계획",lines:["v0.2 - 전체 검색 API 연결","v0.3 - 저장된 검색 & 공유","v1.0 - Cloudflare Worker 확장"]}]},j=[{id:"1",username:"dev_mode",avatar:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150",text:"깊이 있는 글 감사합니다. 구조가 한눈에 들어오네요!",likes:18,timeAgo:"2시간 전"},{id:"2",username:"infra_lab",avatar:"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?w=150",text:"Cloudflare Worker 설정 참고해서 따라 해볼게요.",likes:11,timeAgo:"1시간 전"},{id:"3",username:"frontend_flow",avatar:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150",text:"UI 디테일 너무 좋아요. JSON feed 연결도 기대됩니다!",likes:7,timeAgo:"45분 전"},{id:"4",username:"cloudworker",avatar:"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150",text:"Rate limit 처리 팁 공유 부탁드려요 🙌",likes:5,timeAgo:"30분 전"}],R={posts:{label:"Posts",icon:"grid"},saved:{label:"Saved",icon:"bookmark"}},nt={home:`
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
    `};let u=[],k="posts";function D(){const t=window.location.hash||"#/";return t.startsWith("#/search")?"search":t.startsWith("#/profile")?"profile":t.startsWith("#/write")?"write":t.startsWith("#/auth/callback")?"authCallback":t.startsWith("#/post/")?"postDetail":"home"}function at(){const e=(window.location.hash||"").match(/^#\/post\/([^/?#]+)/);if(!e)return null;try{return decodeURIComponent(e[1])}catch{return e[1]}}function it(){const t=window.location.hash,e=t.indexOf("?");if(e===-1)return null;const s=t.slice(e+1);return new URLSearchParams(s).get("token")}function w(t,e){A.innerHTML=`
      <div class="app-shell">
        ${rt(t)}
        <div class="main-area">
          ${ct()}
          <div class="main-inner">${e}</div>
        </div>
        ${dt(t)}
      </div>
    `,Mt()}function rt(t){return`
      <aside class="left-sidebar">
        <div class="sidebar-logo">Gitstagram</div>
        <nav class="sidebar-nav">
          ${Y.map(e=>lt(e,t)).join("")}
        </nav>
      </aside>
    `}function lt(t,e){return`
      <button
        class="sidebar-link ${!!t.route&&t.route===e?"is-active":""}"
        type="button"
        ${t.route?`data-route="${t.route}"`:""}
      >
        ${p(t.icon)}
        <span>${t.label}</span>
      </button>
    `}function ct(){return`
      <header class="mobile-header">
        <div class="mobile-username">Cheolmin Kim${p("chevron")}</div>
      </header>
    `}function dt(t){return`
      <nav class="bottom-nav">
        ${Q.map(e=>`
              <button
                type="button"
                class="bottom-nav-btn ${!!e.route&&e.route===t?"is-active":""}"
                ${e.route?`data-route="${e.route}"`:""}
              >
                ${p(e.icon)}
              </button>
            `).join("")}
      </nav>
    `}function p(t){return`<span class="icon">${nt[t]}</span>`}function y(t,e){return`
      <section class="profile-header">
        <div class="profile-avatar">
          <img src="/profile/profile.jpg" alt="Profile" loading="lazy" />
        </div>
        <div class="profile-details">
          <div class="profile-top-row">
            <h2 class="profile-username">Cheolmin Kim</h2>
          </div>
          <div class="profile-stat-row">
            ${t.map(s=>`
                      <div class="stat">
                        <span class="stat-value">${i(s.value)}</span>
                        ${i(s.label)}
                      </div>
                    `).join("")}
          </div>
          <div class="profile-bio">
            <p><strong>김철민</strong></p>
            <p>${i(e)}</p>
            <p>✉️ kimcm5221@naver.com</p>
          </div>
        </div>
      </section>
    `}function ut(){return`
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
    `}function pt(){return`
      <div class="tab-strip" role="tablist">
        ${Object.entries(R).map(([t,e])=>{const s=t;return`
                  <button
                    class="tab-btn ${k===s?"is-active":""}"
                    role="tab"
                    data-tab="${s}"
                    type="button"
                  >
                    ${p(e.icon)}
                    <span>${e.label}</span>
                  </button>
                `}).join("")}
      </div>
    `}function ht(t){return t.length===0?'<div class="empty-state">조건에 맞는 글이 없습니다.</div>':`
      <div class="post-grid">
        ${t.map(e=>vt(e)).join("")}
      </div>
    `}function vt(t){const e=t.tags.length?t.tags.map(r=>`#${i(r)}`).join(" "):"태그 없음",s=new Date(t.created),o=isNaN(s.getTime())?"작성일 미정":s.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),n=100+(t.summary?.length??20),a=t.tags.length*5+12,c=t.cover?`<img src="${i(t.cover)}" alt="${i(t.title)}" loading="lazy" />`:"";return`
      <article class="post-card" data-slug="${i(t.slug)}">
        <div class="post-media ${c?"":"is-fallback"}" ${c?"":`style="background:${N(t.slug)}"`}
        >
          ${c||`<span>${i(t.title.charAt(0).toUpperCase())}</span>`}
        </div>
        <div class="post-overlay">
          <p class="overlay-title">${i(t.title)}</p>
          <p class="overlay-tags">${e}</p>
          <div class="overlay-meta">
            <span>❤️ ${n.toLocaleString()}</span>
            <span>💬 ${a}</span>
          </div>
          <p class="overlay-date">${o} · ${i(t.slug)}</p>
        </div>
      </article>
    `}function ft(t){return t.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-")}function N(t){const e=["#fee2e2","#dbeafe","#ede9fe","#dcfce7","#fef3c7"],s=Math.abs(t.split("").reduce((o,n)=>o+n.charCodeAt(0),0))%e.length;return`linear-gradient(135deg, ${e[s]}, #fff)`}function P(t,e=48){return t.length<=e?t:`${t.slice(0,e-1)}…`}function mt(t){return`
      <section class="info-grid">
        ${t.map(e=>`
                  <article class="info-card">
                    <h3>${i(e.title)}</h3>
                    <ul>
                      ${e.lines.map(s=>`<li>${i(s)}</li>`).join("")}
                    </ul>
                  </article>
                `).join("")}
      </section>
    `}function bt(){return j.length?j.map(t=>`
      <article class="post-detail-comment">
        <img src="${i(t.avatar)}" alt="${i(t.username)}" loading="lazy" />
        <div class="post-detail-comment-content">
          <div class="post-detail-comment-body">
            <span class="comment-author">${i(t.username)}</span>
            ${i(t.text)}
          </div>
          <div class="post-detail-comment-meta">
            <span>${i(t.timeAgo)}</span>
            <button type="button">좋아요 ${t.likes}</button>
            <button type="button">답글</button>
          </div>
        </div>
        <button type="button" class="post-detail-comment-like" aria-label="댓글 좋아요">
          ${p("heart")}
        </button>
      </article>
    `).join(""):'<p class="post-detail-comment-empty">준비 중인 댓글 더미입니다.</p>'}function x(){return[{label:"posts",value:`${u.length}`}]}function W(){const t="home",e=u,s=x(),o=`
      ${y(s,g.home)}
      ${pt()}
      ${k==="posts"?ht(e):`<div class="empty-state">${R[k].label} 뷰는 준비 중입니다.</div>`}
    `;w(t,o),St()}function gt(){const t=x(),e=`
      ${y(t,g.home)}
      ${mt(ot.search)}
    `;w("search",e)}function wt(t){if(!t){L("잘못된 주소입니다. 슬러그를 찾을 수 없습니다.");return}if(!u.length){L("아직 피드를 불러오지 못했습니다. 홈 화면을 한 번 연 뒤 다시 시도해 주세요.");return}const e=u.find(d=>d.slug===t);if(!e){L(`슬러그가 '${t}'인 글을 찾을 수 없습니다.`);return}const s=x(),o=new Date(e.created),n=isNaN(o.getTime())?"작성일 미정":o.toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),a=(e.summary??"요약이 아직 작성되지 않았습니다.").trim(),c=P(a,140),r=Math.max(2,Math.round((a.length+e.title.length*6)/220)),f=Math.max(320,120+e.title.length*12+e.tags.length*8),l=e.tags.length?e.tags.map(d=>`<span class="post-detail-tag">#${i(d)}</span>`).join(""):'<span class="post-detail-tag is-empty">태그 없음</span>',$=e.cover?`<img src="${i(e.cover)}" alt="${i(e.title)}" class="post-detail-cover" loading="lazy" />`:`
        <div class="post-detail-fallback" style="background:${N(e.slug)}">
          <span class="post-detail-collection-chip">${i(e.collection??"Gitstagram")}</span>
          <h2>${i(e.title)}</h2>
          <p>${i(c)}</p>
        </div>
      `,v=u.findIndex(d=>d.slug===e.slug),S=v>0?u[v-1]:null,E=v>=0&&v<u.length-1?u[v+1]:null,C=(d,h)=>{if(!h)return`<span class="post-detail-nav-btn is-disabled">${d==="prev"?"첫 글입니다":"마지막 글입니다"}</span>`;const M=d==="prev"?"←":"→";return`
        <a class="post-detail-nav-btn" href="#/post/${encodeURIComponent(h.slug)}">
          ${M} ${i(P(h.title,28))}
        </a>
      `},T=`
      ${y(s,g.home)}
      <section class="post-detail">
        <div class="post-detail-container">
          <div class="post-detail-media">
            ${$}
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
                <button type="button" class="post-detail-action-btn" aria-label="모든 메뉴">${p("menu")}</button>
              </div>
            </header>
            <div class="post-detail-nav">
              ${C("prev",S)}
              ${C("next",E)}
            </div>
            <div class="post-detail-scroll">
              <div class="post-detail-summary">
                ${i(a)}
              </div>
              <div class="post-detail-meta">
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">작성일</span>
                  <span class="post-detail-meta-value">${n}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">컬렉션</span>
                  <span class="post-detail-meta-value">${i(e.collection??"지정 없음")}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">슬러그</span>
                  <span class="post-detail-meta-value">${i(e.slug)}</span>
                </div>
                <div class="post-detail-meta-row">
                  <span class="post-detail-meta-label">예상 읽기</span>
                  <span class="post-detail-meta-value">${r}분</span>
                </div>
              </div>
              <div class="post-detail-tags">
                ${l}
              </div>
              <div class="post-detail-body">
                <h4>본문</h4>
                <div id="post-body" class="post-detail-body-content">
                  <p>본문을 불러오는 중입니다...</p>
                </div>
              </div>
              <div class="post-detail-comments">
                <h4>최근 메모</h4>
                ${bt()}
              </div>
            </div>
            <div class="post-detail-footer">
              <div class="post-detail-actions">
                <div class="post-detail-action-buttons">
                  <button type="button" id="post-like-btn" class="post-detail-action-btn" aria-label="좋아요" aria-pressed="false">${p("heart")}</button>
                  <button type="button" class="post-detail-action-btn" aria-label="댓글">${p("message")}</button>
                  <button type="button" class="post-detail-action-btn" aria-label="공유">${p("send")}</button>
                </div>
                <button type="button" id="post-save-btn" class="post-detail-action-btn" aria-label="저장" aria-pressed="false">${p("bookmark")}</button>
              </div>
              <div class="post-detail-likes">${f.toLocaleString()}명이 이 글을 읽었어요</div>
              <div class="post-detail-timestamp">${n} · ${i(e.slug)}</div>
              <div class="post-detail-comment-input">
                <button type="button" class="post-detail-emoji-btn" aria-label="이모지">${p("smile")}</button>
                <input type="text" id="post-comment-input" placeholder="느낀점을 남겨주세요" />
                <button type="button" id="post-comment-submit" class="post-detail-submit-btn" disabled>게시</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;w("profile",T),$t(),yt(e)}async function yt(t){const e=document.querySelector("#post-body");if(e)try{const s=await At(t),{body:o}=It(s),n=Et(o.trim());e.innerHTML=n||"<p>본문이 비어 있습니다.</p>"}catch(s){console.error(s),e.innerHTML="<p>본문을 불러오지 못했습니다. GitHub Pages 설정 또는 경로를 확인해 주세요.</p>"}}function $t(){const t=document.querySelector("#post-comment-input"),e=document.querySelector("#post-comment-submit"),s=document.querySelector("#post-like-btn"),o=document.querySelector("#post-save-btn");if(t&&e){const n=()=>{const a=t.value.trim().length>0;e.disabled=!a,e.classList.toggle("is-active",a)};t.addEventListener("input",n)}s&&s.addEventListener("click",()=>{const n=!s.classList.contains("is-active");s.classList.toggle("is-active",n),s.setAttribute("aria-pressed",n?"true":"false")}),o&&o.addEventListener("click",()=>{const n=!o.classList.contains("is-active");o.classList.toggle("is-active",n),o.setAttribute("aria-pressed",n?"true":"false")})}function kt(){const t=x(),e=`
      ${y(t,g.home)}
      ${ut()}
    `;w("profile",e)}function xt(){const t=x();if(!tt()){const s=`
          ${y(t,g.home)}
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
        `;w("write",s),document.querySelector("#write-login-btn")?.addEventListener("click",()=>{window.location.href=`${_}/auth/login`});return}const e=`
      ${y(t,g.home)}
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
    `;w("write",e),Ct()}function St(){document.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.tab;o&&(k=o,W())})}),document.querySelectorAll(".post-card[data-slug]").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.slug;o&&(window.location.hash=`#/post/${encodeURIComponent(o)}`)})})}function Ct(){const t=document.querySelector("#write-form");if(!t)return;const e=t.querySelector("#write-title"),s=t.querySelector("#write-slug"),o=t.querySelector("#write-summary"),n=t.querySelector("#write-tags"),a=t.querySelector("#write-collection"),c=t.querySelector("#write-body"),r=t.querySelector("#write-submit"),f=t.querySelector("#write-reset"),l=t.querySelector("#write-error");!e||!s||!n||!c||!r||!l||(e.addEventListener("input",()=>{s.dataset.userEdited!=="1"&&(s.value=ft(e.value))}),s.addEventListener("input",()=>{s.dataset.userEdited="1"}),f?.addEventListener("click",()=>{t.reset(),s.dataset.userEdited="0",l.style.display="none",l.textContent=""}),t.addEventListener("submit",async $=>{$.preventDefault();const v=e.value.trim(),S=s.value.trim(),E=o?.value.trim()??"",C=n.value,T=a?.value.trim()??"",d=c.value.trim(),h=[];v||h.push("제목을 입력해 주세요."),S||h.push("슬러그를 입력해 주세요.");const M=C.split(/[,\s]+/).map(b=>b.trim()).filter(Boolean);if(M.length===0&&h.push("태그를 한 개 이상 입력해 주세요."),d.length<10&&h.push("본문을 10자 이상 작성해 주세요. (현재 글자 수: "+d.length+")"),h.length>0){l.textContent=h.join(" / "),l.style.display="block";return}l.style.display="none";const B={title:v,slug:S,summary:E,tags:M,collection:T||null,content:d};console.log("✏️ 새 글 작성 payload:",B),r.disabled=!0;const G=r.textContent;r.textContent="게시 중...";try{const b=await Tt(B);console.log("✅ Worker 응답:",b),r.textContent="게시 완료",t.reset(),s.dataset.userEdited="0",window.alert(`작성 요청이 성공적으로 전송되었습니다.
잠시 후 private 저장소에 커밋이 반영됩니다.`),window.location.hash="#/"}catch(b){const J=b instanceof Error?b.message:"작성 중 알 수 없는 오류가 발생했습니다.";l.textContent=J,l.style.display="block",r.textContent=G,r.disabled=!1}}))}function Mt(){document.querySelectorAll("[data-route]").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.route;s&&(s==="home"?window.location.hash="#/":s==="search"?window.location.hash="#/search":s==="profile"?window.location.hash="#/profile":s==="write"&&(window.location.hash="#/write"))})})}function U(){A.innerHTML=`
      <div class="view-state">
        <div class="loader"></div>
        <p>피드를 불러오는 중입니다...</p>
      </div>
    `}function L(t){A.innerHTML=`
      <div class="view-state">
        <p>${i(t)}</p>
        <button class="primary" id="reload" type="button">다시 시도</button>
      </div>
    `,document.querySelector("#reload")?.addEventListener("click",()=>{I()})}function i(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Lt(t){const e=new Date(t.created);if(!isNaN(e.getTime())){const s=e.getUTCFullYear(),o=String(e.getUTCMonth()+1).padStart(2,"0");return`/posts/${s}/${o}/${encodeURIComponent(t.slug)}.md`}return`/posts/${encodeURIComponent(t.slug)}.md`}async function At(t){const e=Lt(t),s=await fetch(e,{cache:"no-store"});if(!s.ok)throw new Error(`Markdown 로드 실패: ${s.status} ${s.statusText} (${e})`);return await s.text()}function It(t){if(!t.startsWith("---"))return{frontmatter:"",body:t};const e=t.split(/\r?\n/);if(e[0].trim()!=="---")return{frontmatter:"",body:t};let s=-1;for(let a=1;a<e.length;a++)if(e[a].trim()==="---"){s=a;break}if(s===-1)return{frontmatter:"",body:t};const o=e.slice(1,s).join(`
`),n=e.slice(s+1).join(`
`);return{frontmatter:o,body:n}}function Et(t){const e=t.split(/\r?\n/);let s="",o=!1,n=!1;function a(){n&&(s+="</ul>",n=!1)}for(let c of e){const r=c.replace(/\s+$/,"");if(r.trim().startsWith("```")){o?(s+="</code></pre>",o=!1):(a(),s+="<pre><code>",o=!0);continue}if(o){s+=i(r)+`
`;continue}if(!r.trim()){a();continue}const f=r.match(/^(#{1,6})\s+(.*)$/);if(f){a();const l=f[1].length,$=i(f[2]);s+=`<h${l}>${$}</h${l}>`;continue}if(/^[-*]\s+/.test(r)){const l=i(r.replace(/^[-*]\s+/,""));n||(s+="<ul>",n=!0),s+=`<li>${l}</li>`;continue}else a();s+=`<p>${i(r)}</p>`}return a(),s}async function Tt(t){const e=O();if(!e)throw new Error("로그인 정보가 없습니다. 먼저 로그인 후 다시 시도해 주세요.");const s=await fetch(`${_}/content/commit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)});if(s.status===401){try{localStorage.removeItem(m)}catch{}throw alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요."),window.location.hash="#/write",new Error("인증이 만료되었습니다.")}if(!s.ok){let o="";try{const a=await s.json();a&&typeof a.message=="string"&&(o=a.message)}catch{}const n=`작성 요청 실패: ${s.status} ${s.statusText}`;throw new Error(o?`${n} - ${o}`:n)}try{return await s.json()}catch{return{}}}function F(){const t=D();if(t==="home"){if(u.length===0){U();return}W()}else if(t==="search")gt();else if(t==="write")xt();else if(t==="profile")kt();else if(t==="postDetail"){const e=at();wt(e)}else t==="authCallback"&&Bt()}function Bt(){const t=it();if(t)try{localStorage.setItem(m,t)}catch{console.error("Failed to save token to localStorage")}window.location.hash="#/write"}async function I(){st(),U(),k="posts";try{const{page:t}=await V(1);u=t.items,F()}catch(t){console.error(t);const e=t instanceof Error?t.message:"알 수 없는 오류가 발생했습니다.";L(e)}}function jt(){const e=(window.location.hash||"").match(/auth=([^&]+)/);if(!e)return;const s=decodeURIComponent(e[1]);try{localStorage.setItem(m,s)}catch{}const o=window.location.href.split("#")[0];window.history.replaceState(null,"",o+"#/write")}jt();I();window.addEventListener("hashchange",()=>{D()==="home"&&u.length===0?I():F()});et();I();
