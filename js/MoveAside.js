"use strict";

document.addEventListener("componentsLoaded", () => {
    const main = document.querySelector("main");
    const aside = document.querySelector("aside");

    if (!main || !aside) return;

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
});
