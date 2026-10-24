# Bullpen

A modern, hand-built static redesign of the Bullpen landing page and login screen.
Original concept from <https://try-bullpup.emergent.host/>.

Design: warm coffee palette, Bricolage Grotesque display type (same family as the
original concept), Onest body, Instrument Serif italic emphasis, IBM Plex Mono labels. Bullpen mascot art, soft rounded cards,
and scroll-driven reveals without gradient soup.

## Local preview

```bash
python3 -m http.server 8099
```

Open <http://localhost:8099/>.

Paths are relative, so the site also works from a subdirectory
(for example a GitHub Pages project site at `/<repo>/`).

## Structure

- `index.html` - landing page
- `login/index.html` - login and create-account screen
- `assets/css/site.css` - full design system, responsive and reduced-motion aware
- `assets/js/site.js` - scroll reveal
- `assets/js/auth.js` - login/register mode toggle and demo submit notice
- `assets/fonts/` - self-hosted latin subsets, no external font requests

## Deploy

GitHub Pages builds from the `main` branch root. Pushing to `main` republishes
the site at <https://red0-x.github.io/bullpup-clone/>.

## Notes

- Login and signup are visual only. There is no backend in this clone.
- Demo data is made up. The clone sends no messages and makes no network calls.
