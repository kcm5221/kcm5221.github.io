document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q');

    if (!query) {
        document.getElementById('searchResults').innerHTML = '<p>검색어를 입력해주세요.</p>';
        return;
    }

    fetch(`json/searchData.json?${Date.now()}`)
        .then(response => response.json())
        .then(data => {
            const lowerCaseQuery = query.toLowerCase().trim(); // 검색어 소문자로 변환 및 공백 제거

            const results = data.filter(item => {
                const titleWords = item.title.toLowerCase().split(/\s+/); // 제목을 단어로 나눔
                const contentWords = item.content.toLowerCase().split(/\s+/); // 내용도 단어로 나눔
                return titleWords.some(word => word.includes(lowerCaseQuery)) ||
                    contentWords.some(word => word.includes(lowerCaseQuery));
            });

            displayResults(results, query);
        })
        .catch(error => {
            console.error("검색 데이터 로드 실패:", error);
        });
});

function displayResults(results, query) {
    const searchResultsContainer = document.getElementById('searchResults');

    if (results.length > 0) {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
                <h2><a href="${result.url}">${highlightText(result.title, query)}</a></h2>
                <p>${highlightText(getSnippet(result.content, query), query)}</p>
            `;
            searchResultsContainer.appendChild(resultElement);
        });
    } else {
        searchResultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
    }
}

function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function getSnippet(content, query) {
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return '';
    const snippetLength = 50;
    const start = Math.max(0, index - snippetLength / 2);
    const end = Math.min(content.length, index + snippetLength / 2);
    return content.substring(start, end) + (end < content.length ? '...' : '');
}
