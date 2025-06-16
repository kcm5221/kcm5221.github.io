(() => {
    "use strict";

    /**
     * 현재 실행 중인 스크립트 경로를 기준으로 기본 경로를 계산합니다.
     * @param {string} scriptName 기준이 되는 스크립트 파일명
     */
    const getBasePath = (scriptName) => {
        const script =
            document.currentScript ||
            document.querySelector(`script[src*='${scriptName}']`);
        if (!script) return "";
        const rawSrc = script.getAttribute("src") || "";
        const path = rawSrc.replace(new RegExp(`js/${scriptName}.*$`), "");
        return path === "/" ? "" : path;
    };

    /**
     * 검색 입력란에서 엔터 키를 누르면 검색 결과 페이지로 이동합니다.
     * @param {HTMLInputElement|null} input 입력 요소
     * @param {string} basePath 검색 결과 페이지의 기본 경로
     */
    const initSearchInput = (input, basePath) => {
        if (!input) return;
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const q = input.value.trim();
                if (q) {
                    window.location.href = `${basePath}search.html?q=${encodeURIComponent(q)}`;
                }
            }
        });
    };

    window.utils = { getBasePath, initSearchInput };
})();
