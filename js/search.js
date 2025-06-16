
(() => {
    "use strict";

    // 현재 스크립트 경로를 기반으로 검색 페이지 경로의 기본값을 계산합니다.
    const basePath = window.utils
        ? window.utils.getBasePath('search.js')
        : (() => {
              const script =
                  document.currentScript ||
                  document.querySelector("script[src*='search.js']");
              if (!script) return "";
              const rawSrc = script.getAttribute("src") || "";
              const path = rawSrc.replace(/js\/search\.js.*$/, "");
              return path === "/" ? "" : path;
          })();

    /**
     * 검색 입력창에서 엔터 키 입력을 감지하여 검색 페이지로 이동합니다.
     */
    const initHeaderSearch = () => {
        const input = document.getElementById("HeaderSearch");
        if (window.utils) {
            window.utils.initSearchInput(input, basePath);
            return;
        }
        if (!input) {
            console.error("검색 입력란을 찾을 수 없습니다!");
            return;
        }
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const query = input.value.trim();
                if (query) {
                    window.location.href = `${basePath}search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    };

    // 헤더가 로드된 후 이벤트를 연결하고, 이미 존재하면 바로 초기화
    document.addEventListener("componentsLoaded", initHeaderSearch);
    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("HeaderSearch")) {
            initHeaderSearch();
        }
    });
})();
