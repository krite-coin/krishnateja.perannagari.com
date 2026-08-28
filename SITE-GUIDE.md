# Site Guide

## Purpose

The website presents Dr Krishna Teja Perannagari as an independent marketing consultant serving SMEs, start-ups and organisations through strategy, digital marketing, customer experience, analytics, applied AI and customised learning.

## Brand

- Public name: Dr Krishna Teja Perannagari
- Descriptor: Marketing Consultant · Strategy · Digital · Analytics · Applied AI
- Primary colour: deep blue-green `#102d35`
- Secondary colour: teal `#087f74`
- Accent: orange `#f47b3a`
- Background: warm white `#fffdf8`
- The external blog may be described as “Marketing & Beyond blog,” but it is not the consultancy-site identity.
- Do not introduce institutional affiliations or institutional logos.

## Architecture

`source/data/site.json` is the canonical source for the domain, email, phone, LinkedIn, blog, verification codes and analytics IDs.

`scripts/build.mjs` creates every HTML page, shared head, header, navigation, footer, structured data, analytics code, sitemap, robots file, CNAME and 404 page.

`dist/` is disposable generated output. GitHub Pages publishes it automatically.

## Adding a page

1. Add its metadata to `source/data/pages.json`.
2. Add its content branch to the `content()` function in `scripts/build.mjs`.
3. Add navigation only if the page is important enough for the main menu.
4. Run `npm test`.
5. Confirm the new page appears in `dist/sitemap.xml`.

## Adding images

1. Optimise photographs as WebP or AVIF; use SVG for simple logos and icons.
2. Place files under `source/assets/images/` in `profile`, `services`, `projects`, `insights`, `social` or `icons`.
3. Record the filename, alt text, dimensions and purpose in `source/data/images.json`.
4. Reference images from `/assets/images/...`.
5. Set explicit width and height to reduce page movement.
6. Add meaningful alt text; decorative images should use an empty alt attribute.
7. Run `npm test` before publishing.

## Future readiness

The project includes hooks for GA4 events, Clarity, verification codes, canonical URLs, structured data, sitemap, robots, 404 handling, custom domain, UTM-compatible links, enquiry fallbacks, accessibility and responsive design.

Before adding cookies, advertising pixels or additional personal-data collection, update the privacy notice and add an appropriate consent mechanism.
