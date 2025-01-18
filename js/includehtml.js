document.addEventListener('DOMContentLoaded', function () {
    // 모든 컴포넌트 로드
    Promise.all([
        loadComponent('/header.html', 'header', postHeaderLoad),
        loadComponent('/footer.html', 'footer'),
        loadComponent('/nav.html', 'nav'),
        loadComponent('/aside.html', 'aside'),
    ])
        .then(() => {
            console.log("모든 컴포넌트 로드 완료");
            initializeApp(); // 초기화 함수 실행
        })
        .catch(error => {
            console.error("컴포넌트 로드 중 오류 발생:", error);
        });
});

// 컴포넌트 로드 함수
function loadComponent(url, elementId, callback) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback();
                resolve();
            })
            .catch(error => {
                console.error(`${url} 로드 실패:`, error);
                reject(error);
            });
    });
}

// 헤더 로드 후 초기화 작업
function postHeaderLoad() {

    const currentPath = window.location.pathname; // 현재 경로 확인
    if (currentPath === "/html/Etc/KimchiRun.html") {
        // 특정 HTML 페이지에서 비밀번호 확인 없이 진행
        console.log("비밀번호 확인이 비활성화되었습니다.");
    } else {

        // 비밀번호 확인 로직
        const isAuthenticated = sessionStorage.getItem("authenticated");
        const passwordPrompt = document.getElementById("passwordPrompt");
        if (!isAuthenticated) {
            passwordPrompt.style.display = "flex"; // 비밀번호 입력 창 표시
        } else {
            passwordPrompt.style.display = "none"; // 숨기기
        }

        // 비밀번호 입력 처리
        const checkPasswordButton = document.querySelector("#passwordPrompt button");
        if (checkPasswordButton) {
            checkPasswordButton.addEventListener("click", () => {
                const enteredPassword = document.getElementById("passwordInput").value;
                if (enteredPassword === "Open") {
                    sessionStorage.setItem("authenticated", "true");
                    passwordPrompt.style.display = "none";
                } else {
                    alert("비밀번호가 틀렸습니다!");
                }
            });
        }
    }

    // 다크 모드 토글 로직
    const themeToggleButton = document.getElementById('toggleTheme');
    if (themeToggleButton) {
        console.log("다크 모드 토글 버튼이 로드되었습니다:", themeToggleButton);

        // 저장된 테마 로드
        const savedTheme = localStorage.getItem('theme') || 'light-mode';
        document.documentElement.setAttribute('theme', savedTheme);

        themeToggleButton.textContent = savedTheme === 'dark-mode' ? '라이트 모드' : '다크 모드';

        // 테마 변경
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('theme');
            const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';

            document.documentElement.setAttribute('theme', newTheme);
            localStorage.setItem('theme', newTheme);

            themeToggleButton.textContent = newTheme === 'dark-mode' ? '라이트 모드' : '다크 모드';
        });
    } else {
        console.error("다크 모드 토글 버튼을 찾을 수 없습니다! HTML 구조를 확인하세요.");
    }

    // 검색 기능 초기화
    const searchInput = document.getElementById('HeaderSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    // 검색 결과 페이지로 이동하며 쿼리 전달
                    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
        console.log("검색 기능 초기화 완료");
    } else {
        console.error("검색 입력란을 찾을 수 없습니다!");
    }
}

// 초기화 함수
function initializeApp() {
    console.log("애플리케이션 초기화");
    preventContextMenu();
    preventImageDrag();
}

// 오른쪽 클릭 방지
function preventContextMenu() {
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

// 이미지 드래그 방지
function preventImageDrag() {
    document.addEventListener("dragstart", (event) => {
        if (event.target.tagName === "IMG") {
            event.preventDefault();
        }
    });
}
