window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.profile table a').forEach((link) => {
        link.addEventListener('click', () => {
            sessionStorage.setItem('fromIndex', 'true');
        });
    });
});
