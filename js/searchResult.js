
(() => {
    "use strict";

    /**
     * 검색 페이지 로드 시 검색어를 읽어 결과를 표시합니다.
     */
    const initSearchResults = () => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        if (!query) {
            document.getElementById("searchResults").innerHTML =
                "<p>검색어를 입력해주세요.</p>";
            return;
        }

        const basePath = window.utils
            ? window.utils.getBasePath('searchResult.js')
            : '';
        fetch(`${basePath}json/SearchData.json?${Date.now()}`)
            .then((r) => r.json())
            .then((data) => displayResults(filterResults(data, query), query))
            .catch((err) => console.error("검색 데이터 로드 실패:", err));
    };

    /**
     * 데이터에서 검색어와 일치하는 항목을 찾아 반환합니다.
     * @param {Array} data 검색 대상 데이터
     * @param {string} query 검색어
     */
    const filterResults = (data, query) => {
        const lower = query.toLowerCase().trim();
        return data.filter((item) => {
            const titleWords = item.title.toLowerCase().split(/\s+/);
            const contentWords = item.content.toLowerCase().split(/\s+/);
            return (
                titleWords.some((w) => w.includes(lower)) ||
                contentWords.some((w) => w.includes(lower))
            );
        });
    };

    /**
     * 결과 목록을 화면에 출력합니다.
     */
    const displayResults = (results, query) => {
        const container = document.getElementById("searchResults");
        if (results.length === 0) {
            container.innerHTML = "<p>검색 결과가 없습니다.</p>";
            return;
        }

        results.forEach((r) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <h2><a href="${r.url}">${highlightText(r.title, query)}</a></h2>
                <p>${highlightText(getSnippet(r.content, query), query)}</p>`;
            container.appendChild(div);
        });
    };

    /**
     * 텍스트에서 검색어 부분을 강조 표시합니다.
     */
    const highlightText = (text, query) => {
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    /**
     * 내용에서 검색어 주변의 일부만 추출합니다.
     */
    const getSnippet = (content, query) => {
        const index = content.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return "";
        const len = 50;
        const start = Math.max(0, index - len / 2);
        const end = Math.min(content.length, index + len / 2);
        return content.substring(start, end) + (end < content.length ? "..." : "");
    };

    document.addEventListener("DOMContentLoaded", initSearchResults);
})();
