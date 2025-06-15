(() => {
    "use strict";

    /**
     * 현재 스크립트 경로를 기반으로 컴포넌트 경로의 기본값을 계산합니다.
     */
    const basePath = (() => {
        const script =
            document.currentScript ||
            document.querySelector("script[src*='includehtml.js']");
        if (!script) return "";

        const rawSrc = script.getAttribute("src") || "";
        const path = rawSrc.replace(/js\/includehtml\.js.*$/, "");
        return path === "/" ? "" : path;
    })();
    // 이전 작업: 스크립트 위치를 기준으로 경로를 계산하여 모든 페이지에서 동작

    /**
     * 저장된 테마를 문서에 적용합니다.
     */
    const applyStoredTheme = () => {
        document.documentElement.setAttribute(
            "theme",
            localStorage.getItem("theme") || "light-mode"
        );
    };

    /**
     * 주어진 URL의 HTML 조각을 특정 요소에 삽입합니다.
     * @param {string} url 불러올 파일 경로
     * @param {string} elementId 삽입할 대상 요소 ID
     * @param {Function} [callback] 로드 후 실행할 콜백
     */
    const loadComponent = (url, elementId, callback) =>
        new Promise((resolve) => {
            fetch(url)
                .then((r) => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.text();
                })
                .then((data) => {
                    const container = document.getElementById(elementId);
                    container.innerHTML = data;
                    container
                        .querySelectorAll("script")
                        .forEach((oldScript) => {
                            const newScript = document.createElement("script");
                            if (oldScript.src) newScript.src = oldScript.src;
                            if (oldScript.type) newScript.type = oldScript.type;
                            newScript.textContent = oldScript.textContent;
                            document.head.appendChild(newScript);
                            newScript.remove();
                        });
                    if (callback) callback();
                    resolve();
                })
                .catch((error) => {
                    console.error(`${url} 로드 실패:`, error);
                    // 이전 작업: 오류가 발생해도 다른 컴포넌트 로드를 계속 진행
                    resolve();
                });
        });

    /**
     * 모든 공통 컴포넌트를 비동기로 로드합니다.
     */
    const loadComponents = () =>
        Promise.all([
            loadComponent(`${basePath}components/header.html`, "header"),
            loadComponent(`${basePath}components/footer.html`, "footer"),
            loadComponent(`${basePath}components/nav.html`, "nav"),
            loadComponent(`${basePath}components/aside.html`, "aside"),
        ]);

    /**
     * 헤더 로드 후 초기화 작업을 수행합니다.
     */
    const initHeader = () => {
        initThemeToggle();
        initSearch();
        markProfileLinks();
    };

    const markProfileLinks = () => {
        document.querySelectorAll('.profile table a').forEach((link) => {
            link.addEventListener('click', () => {
                sessionStorage.setItem('fromProfile', 'true');
            });
        });
    };

    const markProfileLinks = () => {
        document.querySelectorAll('.profile table a').forEach((link) => {
            link.addEventListener('click', () => {
                sessionStorage.setItem('fromProfile', 'true');
            });
        });
    };

    /**
     * 프로필 테이블 링크 클릭 시 출처 플래그를 저장합니다.
     * 중복 선언을 방지하기 위해 함수 선언문을 사용합니다.
     */
    function markProfileLinks() {
        document.querySelectorAll(".profile table a").forEach((link) => {
            link.addEventListener("click", () => {
                sessionStorage.setItem("fromProfile", "true");
            });
        });
    }

    /**
     * 특정 페이지에 대한 비밀번호 입력을 처리합니다.
     */
    const initPasswordPrompt = () => {
        const currentPath = window.location.pathname;
        const fromProfile = sessionStorage.getItem("fromProfile");
        if (fromProfile) {
            const prompt = document.getElementById("passwordPrompt");
            if (prompt) prompt.style.display = "none";
            sessionStorage.removeItem("fromProfile");
        }

        const requirePassword = !(
            currentPath === "/" ||
            currentPath === "/index.html" ||
            currentPath.startsWith("/html/Projects/") ||
            currentPath === "/html/Etc/KimchiRun.html" ||
            fromProfile
        );

        if (!requirePassword) return;

        const passwordPrompt = document.getElementById("passwordPrompt");
        const button = document.querySelector("#passwordPrompt button");
        const input = document.getElementById("passwordInput");
        if (!passwordPrompt || !button || !input) return;

        if (!sessionStorage.getItem("authenticated")) {
            passwordPrompt.style.display = "flex";
        }

        const handleConfirm = () => {
            const value = input.value;
            if (value === "Open") {
                sessionStorage.setItem("authenticated", "true");
                passwordPrompt.style.display = "none";
                sessionStorage.removeItem("fromProfile");
            } else {
                alert("비밀번호가 틀렸습니다!");
            }
        };

        button.addEventListener("click", handleConfirm);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleConfirm();
        });
    };

    /**
     * 다크 모드 토글 버튼을 초기화합니다.
     */
    const initThemeToggle = () => {
        const btn = document.getElementById("toggleTheme");
        if (!btn) {
            console.error("다크 모드 토글 버튼을 찾을 수 없습니다!");
            return;
        }

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

    /**
     * 헤더 검색 입력란에 검색 기능을 연결합니다.
     */
    const initSearch = () => {
        const input = document.getElementById("HeaderSearch");
        if (!input) return;

        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const query = input.value.trim();
                if (query) {
                    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    };

    /**
     * 기본 앱 초기화 작업을 수행합니다.
     */
    const initializeApp = () => {
        preventContextMenu();
        preventImageDrag();
    };

    /**
     * 마우스 우클릭 메뉴를 비활성화합니다.
     */
    const preventContextMenu = () => {
        document.addEventListener("contextmenu", (e) => e.preventDefault());
    };

    /**
     * 이미지가 드래그되지 않도록 방지합니다.
     */
    const preventImageDrag = () => {
        document.addEventListener("dragstart", (e) => {
            if (e.target.tagName === "IMG") {
                e.preventDefault();
            }
        });
    };

    // ===== 부트스트랩 =====
    applyStoredTheme();
    document.addEventListener("DOMContentLoaded", () => {
        loadComponents()
            .then(() => {
                initializeApp();
                initHeader();
                initPasswordPrompt();
                markProfileLinks();
                document.dispatchEvent(new Event("componentsLoaded"));
            })
            .catch((error) => console.error("컴포넌트 로드 중 오류 발생:", error));
    });

    document.addEventListener("componentsLoaded", markProfileLinks);
})();

