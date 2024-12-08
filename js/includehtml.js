document.addEventListener('DOMContentLoaded', function () {
    //header 삽입
    fetch('header.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('header.html load fail', error));
    //footer 삽입
    fetch('footer.html')
        .then(Response => Response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('footer.html load fail', error));
});
