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

## Setup

To preview the site locally you can use any static file server such as
[`live-server`](https://www.npmjs.com/package/live-server) or Python's
`http.server`:

```bash
npm install -g live-server
live-server
```

or

```bash
python3 -m http.server
```

Then open `http://localhost:8080` in your browser.

### Configuration

Site behaviour is controlled by `json/config.json`.

```json
{
  "password": "Open",
  "disableContextMenu": false
}
```

- **password** – required to access some pages.
- **disableContextMenu** – when `true`, right‑click and image dragging are
  disabled.

Scripts automatically resolve paths relative to their location so the search
page and configuration load correctly from subdirectories or local files.

### Updating search data

`json/SearchData.json` contains the index used by the search feature. Update it
whenever new pages are added.

### Contributing

1. Add your page under `html/` and reference images or scripts from their
   respective folders.
2. Update `SearchData.json` with a title, URL and short content snippet.
3. Run a local server to verify your changes before opening a pull request.

