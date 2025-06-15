
(() => {
    "use strict";

    /**
     * 검색 입력창에서 엔터 키 입력을 감지하여 검색 페이지로 이동합니다.
     */
    const initHeaderSearch = () => {
        const input = document.getElementById("HeaderSearch");
        if (!input) {
            console.error("검색 입력란을 찾을 수 없습니다!");
            return;
        }

        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const query = input.value.trim();
                if (query) {
                    window.location.href = `./search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    };

    // 이전 작업: 헤더가 로드된 후에만 이벤트를 연결하도록 대기
    document.addEventListener("componentsLoaded", initHeaderSearch);
})();
