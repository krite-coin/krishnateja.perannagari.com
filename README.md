# Krishna Teja Consultancy Website

A dependency-free static website for `krishnateja.perannagari.com`. The editable source is maintained once and compiled into GitHub Pages-ready files.

## Quick start

1. Install Node.js 22 or later.
2. Open a terminal in this folder.
3. Run `npm test`.
4. Open `dist/index.html` through a local web server, not by double-clicking it.

Example local server:

```bash
npx serve dist
```

## Files to edit

- Business details, domain and analytics IDs: `source/data/site.json`
- Page titles and descriptions: `source/data/pages.json`
- Image information: `source/data/images.json`
- Page content and shared layout: `scripts/build.mjs`
- Design: `source/assets/css/styles.css`
- Enquiry behaviour: `source/assets/js/contact.js`
- Health Check: `source/assets/js/health-check.js`

Never manually edit `dist/`. It is recreated by `npm run build`.

## Google Analytics and Microsoft Clarity

Add only the IDs to `source/data/site.json`:

```json
"googleAnalyticsId": "G-XXXXXXXXXX",
"microsoftClarityId": "abcdefghij"
```

Run `npm test`. The build inserts the correct scripts into every generated page.

Review the privacy page and consent requirements before activating tracking.

## GitHub Pages

The included `.github/workflows/pages.yml` builds, validates and publishes `dist/` whenever the `main` branch changes.

See `GITHUB-PAGES-GUIDE.md` for the complete setup.
