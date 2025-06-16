(() => {
    "use strict";

    // 현재 스크립트 경로를 기반으로 컴포넌트 경로의 기본값을 계산합니다.
    const basePath = (() => {
        const script = document.currentScript || document.querySelector("script[src*='includehtml.js']");
        if (!script) return "";
        const rawSrc = script.getAttribute("src") || "";
        const path = rawSrc.replace(/js\/includehtml\.js.*$/, "");
        return path === "/" ? "" : path;
    })();

    // 공용 유틸 스크립트 로드 보장
    const ensureUtilsLoaded = () =>
        new Promise((resolve) => {
            if (window.utils) return resolve();
            const s = document.createElement("script");
            s.src = `${basePath}js/utils.js`;
            s.onload = resolve;
            s.onerror = resolve;
            document.head.appendChild(s);
        });

    // 저장된 테마를 문서에 적용합니다.
    const applyStoredTheme = () => {
        document.documentElement.setAttribute(
            "theme",
            localStorage.getItem("theme") || "light-mode"
        );
    };

    // 주어진 URL의 HTML 조각을 특정 요소에 삽입합니다.
    const loadComponent = (url, elementId) =>
        new Promise((resolve, reject) => {
            fetch(url)
                .then((r) => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.text();
                })
                .then((data) => {
                    const container = document.getElementById(elementId);
                    container.innerHTML = data;
                    // 포함된 <script> 태그 실행
                    container.querySelectorAll("script").forEach((oldScript) => {
                        const newScript = document.createElement("script");
                        if (oldScript.src) newScript.src = oldScript.src;
                        if (oldScript.type) newScript.type = oldScript.type;
                        newScript.textContent = oldScript.textContent;
                        document.head.appendChild(newScript);
                        newScript.remove();
                    });
                    resolve();
                })
                .catch((error) => {
                    console.error(`${url} 로드 실패:`, error);
                    reject(error);
                });
        });

    // 공통 컴포넌트 비동기 로드
    const loadComponents = () =>
        Promise.all([
            loadComponent(`${basePath}components/header.html`, "header"),
            loadComponent(`${basePath}components/nav.html`, "nav"),
            loadComponent(`${basePath}components/aside.html`, "aside"),
            loadComponent(`${basePath}components/footer.html`, "footer"),
        ]);

    let config = { password: "", disableContextMenu: false };

    const loadConfig = () =>
        fetch(`${basePath}json/config.json`)
            .then((r) => r.json())
            .then((data) => {
                config = data;
            })
            .catch((err) => console.error('설정 로드 실패:', err));

    // 다크 모드 토글 초기화
    const initThemeToggle = () => {
        const btn = document.getElementById("toggleTheme");
        if (!btn) return;
        const savedTheme = localStorage.getItem("theme") || "light-mode";
        document.documentElement.setAttribute("theme", savedTheme);
        btn.textContent = savedTheme === "dark-mode" ? "라이트 모드" : "다크 모드";
        btn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("theme");
            const next = current === "dark-mode" ? "light-mode" : "dark-mode";
            document.documentElement.setAttribute("theme", next);
            localStorage.setItem("theme", next);
            btn.textContent = next === "dark-mode" ? "라이트 모드" : "다크 모드";
        });
    };

    // 프로필 링크 클릭 시 플래그 설정
    function markProfileLinks() {
        document.querySelectorAll('.profile table a').forEach((link) => {
            link.addEventListener('click', () => {
                sessionStorage.setItem('fromProfile', 'true');
            });
        });
    }

    // 비밀번호 프롬프트 처리
    const initPasswordPrompt = () => {
        const fromProfile = sessionStorage.getItem('fromProfile');
        if (fromProfile) {
            const promptEl = document.getElementById('passwordPrompt');
            if (promptEl) promptEl.style.display = 'none';
            sessionStorage.removeItem('fromProfile');
        }
        const path = window.location.pathname;
        const needPwd = !(
            path === '/' || path.endsWith('/index.html') ||
            path.startsWith('/html/Projects/') ||
            fromProfile
        );
        if (!needPwd) return;
        const promptEl = document.getElementById('passwordPrompt');
        const form = document.getElementById('passwordForm');
        const input = document.getElementById('passwordInput');
        if (!promptEl || !form || !input) return;
        if (!sessionStorage.getItem('authenticated')) {
            promptEl.style.display = 'flex';
        }
        const handleSubmit = (e) => {
            e.preventDefault();
            if (input.value === config.password) {
                sessionStorage.setItem('authenticated', 'true');
                promptEl.style.display = 'none';
                sessionStorage.removeItem('fromProfile');
            } else {
                alert('비밀번호가 틀렸습니다!');
            }
        };
        form.addEventListener('submit', handleSubmit);
    };

    // 앱 초기화: 우클릭/이미지 드래그 방지
    const initializeApp = () => {
        if (config.disableContextMenu) {
            document.addEventListener('contextmenu', (e) => e.preventDefault());
            document.addEventListener('dragstart', (e) => {
                if (e.target.tagName === 'IMG') e.preventDefault();
            });
        }
    };

    // 부트스트랩
    document.addEventListener('DOMContentLoaded', () => {
        applyStoredTheme();
        ensureUtilsLoaded()
            .then(loadConfig)
            .then(loadComponents)
            .then(() => {
                document.dispatchEvent(new Event('componentsLoaded'));
                initializeApp();
                initThemeToggle();
                if (window.utils) {
                    window.utils.initSearchInput(
                        document.getElementById('HeaderSearch'),
                        basePath
                    );
                }
                initPasswordPrompt();
                markProfileLinks();
            })
            .catch((err) => console.error('컴포넌트 로드 중 오류:', err));
    });
})();
