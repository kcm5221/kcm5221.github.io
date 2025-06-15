(() => {
    'use strict';

    const markIndexLinks = () => {
        document.querySelectorAll('.profile table a').forEach((link) => {
            link.addEventListener('click', () => {
                sessionStorage.setItem('fromIndex', 'true');
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', markIndexLinks);
    } else {
        markIndexLinks();
    }

    document.addEventListener('componentsLoaded', markIndexLinks);
})();
