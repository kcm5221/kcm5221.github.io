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

// 헤더 로드 후 비밀번호 확인
function postHeaderLoad() {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    if (!isAuthenticated) {
        document.getElementById("passwordPrompt").style.display = "flex";
    } else {
        document.getElementById("passwordPrompt").style.display = "none";
    }

    // 비밀번호 입력 처리
    const checkPasswordButton = document.querySelector("#passwordPrompt button");
    checkPasswordButton.addEventListener("click", () => {
        const enteredPassword = document.getElementById("passwordInput").value;
        if (enteredPassword === "Open") {
            sessionStorage.setItem("authenticated", "true");
            document.getElementById("passwordPrompt").style.display = "none";
        } else {
            alert("비밀번호가 틀렸습니다!");
        }
    });
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

function postHeaderLoad() {
    // 다크 모드 토글 버튼 가져오기
    const themeToggleButton = document.getElementById('toggleTheme');

    // 버튼이 제대로 로드되었는지 확인
    if (!themeToggleButton) {
        console.error("다크 모드 토글 버튼을 찾을 수 없습니다! HTML 구조를 확인하세요.");
        return;
    }

    console.log("다크 모드 토글 버튼이 로드되었습니다:", themeToggleButton);

    // 저장된 테마를 로드하여 설정
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.documentElement.setAttribute('theme', savedTheme);

    themeToggleButton.textContent = savedTheme === 'dark-mode' ? '라이트 모드' : '다크 모드';

    // 버튼 클릭 시 테마 변경
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('theme');
        const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';

        document.documentElement.setAttribute('theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeToggleButton.textContent = newTheme === 'dark-mode' ? '라이트 모드' : '다크 모드';
    });
}