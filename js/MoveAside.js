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
    };

    document.addEventListener("componentsLoaded", buildTableOfContents);
})();
