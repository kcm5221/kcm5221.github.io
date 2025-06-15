<<<<<<< HEAD
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
=======
document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("main");
    const asideContainer = document.querySelector("aside");

    if (mainContent && asideContainer) {
        // Fetch the aside.html content
        fetch("/aside.html")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load aside.html");
                }
                return response.text();
            })
            .then((html) => {
                // Load the fetched HTML into the aside container
                asideContainer.innerHTML = html;

                // Now proceed to generate the table of contents
                const headings = mainContent.querySelectorAll("h2, h3, h4, .profile th");
                const tocList = document.createElement("ul");

                headings.forEach((heading, index) => {
                    // Generate unique ID for each heading if not already present
                    if (!heading.id) {
                        heading.id = `heading-${index}`;
                    }

                    // Create list item with anchor link
                    const listItem = document.createElement("li");
                    const anchor = document.createElement("a");
                    anchor.href = `#${heading.id}`;
                    anchor.textContent = heading.textContent;

                    // Add event listener for smooth scroll
                    anchor.addEventListener("click", (event) => {
                        event.preventDefault();
                        document.getElementById(heading.id).scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    });

                    listItem.appendChild(anchor);
                    tocList.appendChild(listItem);
                });

                asideContainer.appendChild(tocList);
            })
            .catch((error) => {
                console.error("Error loading aside:", error);
>>>>>>> parent of ebe0c4a (Optimize component loading)
            });

<<<<<<< HEAD
        const li = document.createElement("li");
        li.appendChild(link);
        toc.appendChild(li);
    });

            const li = document.createElement("li");
            li.appendChild(link);
            toc.appendChild(li);
        });

        aside.appendChild(toc);
    };

    document.addEventListener("componentsLoaded", buildTableOfContents);
})();
=======
        // Fixed position for aside
        asideContainer.style.position = "fixed";
        asideContainer.style.top = "20px"; // Fixed position from the top of the viewport
    }
});
>>>>>>> parent of ebe0c4a (Optimize component loading)
