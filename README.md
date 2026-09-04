# JLPT Curuts

A static site for learning **hiragana**, **katakana**, and popular **kanji**.

Stage 0 is for people who have never seen Japanese characters. It teaches the mapping first (あ = a, then later ひ = hi, ふ = fu/hu, へ = he, ほ = ho). After the cards, you tap **A–F** to choose the matching character.

Progress is stored in this browser (`localStorage`). Use **Reset all progress**, or reset one script from its stage list. There is no account and no server.

Intended public URL after you rename / transfer the repo:

**https://jlpt-curuts.github.io**

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173/

## Publish on GitHub Pages

This repo is static files plus a Pages workflow. To serve it at `https://jlpt-curuts.github.io`:

1. Create a GitHub organization (or user) named **`jlpt-curuts`**.
2. Rename or transfer this repository to **`jlpt-curuts/jlpt-curuts.github.io`**.
3. Settings → Pages → Source: **GitHub Actions**.
4. Merge to `main` (or run the **GitHub Pages** workflow).

Until that org exists, you can still enable Pages on the current repo. The project URL would be:

`https://curuts-developer.github.io/jlpt/`

Renaming only the current repo to `jlpt-curuts.github.io` (keeping owner `Curuts-Developer`) does **not** produce `https://jlpt-curuts.github.io`. That hostname requires the GitHub user/org `jlpt-curuts`.

Do not add a `CNAME` file unless you have a custom domain. `*.github.io` is already GitHub’s host.

## Product notes

See [PRD.md](./PRD.md).
