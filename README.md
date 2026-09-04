# JLPT drill

A static site for learning **hiragana**, **katakana**, and popular **kanji**.

Stage 0 is for people who have never seen Japanese characters. It teaches the mapping first (あ = a, then later rows such as ひ = hi, ふ = fu/hu, へ = he, ほ = ho). After the cards, you tap **A–F** to choose the matching character.

Progress is stored in this browser (`localStorage`). Use **Reset all progress** to start over. There is no account and no server.

## Run locally

Any static server works:

```bash
python3 -m http.server 4173
```

Open http://localhost:4173/

## GitHub Pages

1. Push this repo.
2. Settings → Pages → Deploy from branch `main` (root).
3. The app is a few static files: `index.html`, `styles.css`, `app.js`, `data.js`, `storage.js`.

If the site is served from `https://<user>.github.io/jlpt/`, keep using relative paths (already set).

## Product notes

See [PRD.md](./PRD.md).
