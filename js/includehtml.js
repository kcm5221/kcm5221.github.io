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
