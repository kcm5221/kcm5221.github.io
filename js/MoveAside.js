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
                const headings = mainContent.querySelectorAll("h2, h3, h4");
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
            });

        // Fixed position for aside
        asideContainer.style.position = "fixed";
        asideContainer.style.top = "20px"; // Fixed position from the top of the viewport
    }
});
