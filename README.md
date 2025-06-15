# kcm5221.github.io

Static site containing my blog posts and project notes.

## Folders
- **components/**: reusable HTML snippets (header, footer, navigation, sidebar)
- **css/**: shared stylesheets
- **html/**: main page contents organized by topic
- **image/**: site images
- **js/**: client side scripts
- **json/**: data used by JavaScript
- **OtherProject/**: external project files

All pages load common components through `js/includehtml.js`.
The loader resolves paths relative to the script location so pages work
whether served from the repository root or viewed locally.
The sidebar table of contents now highlights the section currently in view.
Link colors and other theme styles are controlled by CSS variables so dark mode
applies consistently across pages.

