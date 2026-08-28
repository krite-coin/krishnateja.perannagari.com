# Instructions for AI coding assistants

Read `SITE-GUIDE.md` and `README.md` before editing.

1. Edit source files only. Never manually edit `dist/`.
2. Preserve the dependency-free Node.js build unless the user explicitly approves a framework migration.
3. Keep global business information in `source/data/site.json`.
4. Keep page metadata in `source/data/pages.json`.
5. Preserve clean custom-domain URLs beginning at `/`.
6. Do not add institutional names, logos or implied endorsements.
7. Preserve the LinkedIn and external-blog connections.
8. Record new images in `source/data/images.json`.
9. Do not activate analytics without IDs supplied by the owner.
10. Update privacy language when tracking or data collection changes.
11. Run `npm test` after every material change.
12. Confirm the generated `dist/` package, sitemap, CNAME and internal links before delivery.
