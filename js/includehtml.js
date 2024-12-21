document.addEventListener('DOMContentLoaded', function () {
    //header 삽입
    fetch('/header.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('header.html load fail', error));
    //footer 삽입
    fetch('/footer.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('footer.html load fail', error));
    //nav 삽입
    fetch('/nav.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        })
        .catch(error => console.error('nav.html load fail', error));
    //aside 삽입
    fetch('/aside.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('aside').innerHTML = data;
        })
        .catch(error => console.error('aside.html load fail', error));
});
