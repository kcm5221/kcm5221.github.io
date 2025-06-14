"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('HeaderSearch');

    if (searchInput) {
        console.log("검색 입력란이 로드되었습니다.");

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                console.log("엔터 키가 눌렸습니다.");
                const query = searchInput.value.trim();
                if (query) {
                    console.log(`검색어: ${query}`);
                    // 검색 결과 페이지로 이동하며 쿼리 전달
                    window.location.href = `./search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    } else {
        console.error("검색 입력란을 찾을 수 없습니다!");
    }
});
