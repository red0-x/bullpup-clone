# Bullpup clone

Static clone of the Bullpup landing page and login screen from
<https://try-bullpup.emergent.host/>.

## Local preview

Run any static server from the repo root, for example:

```bash
python3 -m http.server 8099
```

Then open <http://localhost:8099/>.

Paths are relative, so the site also works from a subdirectory
(for example a GitHub Pages project site at `/<repo>/`).

## Deploy

GitHub Pages is configured to build from the `main` branch root. Pushing to
`main` republishes the site at <https://red0-x.github.io/bullpup-clone/>.

## Notes

- Login and signup are visual only. There is no backend in this clone.
- Third-party emergent.sh / Cloudflare logging scripts were stripped from
  the served HTML.
