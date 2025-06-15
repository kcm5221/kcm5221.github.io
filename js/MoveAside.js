(() => {
    "use strict";

    /**
     * 목차(TOC)를 생성하여 aside 영역에 출력합니다.
     */
    const buildTableOfContents = () => {
        const main = document.querySelector("main");
        const aside = document.querySelector("aside");
        if (!main || !aside) return;

        aside.innerHTML = "";
        const toc = document.createElement("ul");

        main.querySelectorAll("h2, h3, h4, .profile th").forEach((heading, index) => {
            if (!heading.id) heading.id = `heading-${index}`;

            const link = document.createElement("a");
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.addEventListener("click", (e) => {
                e.preventDefault();
                document.getElementById(heading.id).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });

            const li = document.createElement("li");
            li.appendChild(link);
            toc.appendChild(li);
        });

        aside.appendChild(toc);
        highlightActiveSection();
    };

    /**
     * 스크롤 위치에 따라 목차에서 활성 항목을 표시합니다.
     */
    const highlightActiveSection = () => {
        const links = Array.from(document.querySelectorAll("aside a[href^='#']"));
        if (links.length === 0) return;

        const headings = links
            .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = headings.indexOf(entry.target);
                    if (idx !== -1 && entry.isIntersecting) {
                        links.forEach((l) => l.classList.remove("active"));
                        links[idx].classList.add("active");
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        );

        headings.forEach((h) => observer.observe(h));
    };

    document.addEventListener("componentsLoaded", buildTableOfContents);
})();
