document.addEventListener("componentsLoaded", buildToc);

function buildToc() {
    const mainContent = document.querySelector("main");
    const asideContainer = document.querySelector("aside");

    if (!(mainContent && asideContainer)) {
        return;
    }

    const headings = mainContent.querySelectorAll("h2, h3, h4, .profile th");
    const tocList = document.createElement("ul");

    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = `#${heading.id}`;
        anchor.textContent = heading.textContent;

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

    asideContainer.style.position = "fixed";
    asideContainer.style.top = "20px";
}
