# Thomas Fairyland

A bilingual research and photography portfolio for Donghua Liu.

## Preview locally

Run a static server in this directory:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Update content

All editable site content is in `content.js`:

- Add or edit papers in `PUBLICATIONS`.
- Add or edit gallery entries in `PHOTOS`.
- Change bilingual interface copy in `I18N`.

Place optimized WebP photos in `assets/photos/`, then add the filename to `PHOTOS`. Keep individual images below 1 MB when possible and use a longest edge of about 1600-2000 pixels.

## Publish with GitHub Pages

1. Create a repository named `thomas-fairyland` under `liudonghua701-crypto`.
2. Push this directory to the repository's `main` branch.
3. In **Settings > Pages > Build and deployment**, select **GitHub Actions**.
4. The included workflow publishes the site after each push to `main`.

Expected URL: `https://liudonghua701-crypto.github.io/thomas-fairyland/`

## Notes

- Publication metadata was checked against Crossref using the supplied DOI values.
- Donghua Liu is highlighted in each author list.
- The original photography files are not modified or included.
