# Hosting on GitHub Pages

## 1. Create the repository

1. Sign in to GitHub.
2. Select **New repository**.
3. Name it `krishna-teja-website`.
4. Choose Public, unless your GitHub plan supports Pages from private repositories.
5. Create the repository without adding starter files.

## 2. Upload this package

Extract the ZIP on your computer. Upload the contents of the extracted `krishna-teja-static-site` folder to the repository. The repository root must directly contain:

```text
.github/
scripts/
source/
package.json
README.md
```

Do not upload only the `dist` folder. The included workflow builds it automatically.

## 3. Enable GitHub Pages

1. Open the repository.
2. Select **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Open the **Actions** tab and wait for “Build and deploy static website” to finish.
5. GitHub will provide an initial Pages address.

## 4. Add the custom domain

1. In **Settings → Pages**, enter `krishnateja.perannagari.com` under **Custom domain**.
2. Save it.
3. At the DNS provider for `perannagari.com`, add a CNAME record:

```text
Type: CNAME
Name/Host: krishnateja
Value/Target: YOUR-GITHUB-USERNAME.github.io
```

Replace `YOUR-GITHUB-USERNAME` with the account that owns the repository. Do not include `https://` or a path in the CNAME target.

4. Remove any conflicting A, AAAA or CNAME record for the same `krishnateja` host.
5. Wait for DNS verification.
6. Enable **Enforce HTTPS** in GitHub Pages settings when it becomes available.

The generated `dist/CNAME` file already contains `krishnateja.perannagari.com`.

## 5. Future updates

1. Edit the relevant source or data file.
2. Run `npm test` locally if possible.
3. Commit and push to `main`.
4. GitHub Actions rebuilds and publishes the website automatically.

## Analytics

Enter the GA4 and Clarity IDs in `source/data/site.json`, commit the change, and wait for the deployment workflow. Do not paste analytics scripts into individual HTML pages.

## Troubleshooting

- A failed deployment appears under the repository’s **Actions** tab.
- A custom-domain error usually means the DNS record is missing, duplicated or still propagating.
- If CSS or links fail, confirm the custom domain is configured and the repository contains the full project structure.
- GitHub Pages is public web hosting; do not commit passwords, tokens or private records.
