# JLPT Curuts

A static site for learning **hiragana**, **katakana**, **kanji**, popular **JLPT N5 / N4 / N3 words**, plus **Office** and **Home** (friends and neighbors) sentence fill-ins.

Live site: **https://curuts-developer.github.io/jlpt/**

Stage 0 is for people who have never seen Japanese characters. It teaches the mapping first (あ = a, then later ひ = hi, ふ = fu/hu, へ = he, ほ = ho). After the cards, you tap **A–F** to choose the matching character. Word tracks cover popular **N5 (~270)**, **N4 (~210)**, and **N3 (~210)** vocabulary.

Progress is stored in this browser (`localStorage`). Use **Reset all progress**, or reset one script from its stage list. There is no account and no server.

## Run locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173/

## GitHub Pages

The app is published as a project site on this repo:

**https://curuts-developer.github.io/jlpt/**

1. Merge to `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. The **GitHub Pages** workflow deploys the static files.

Relative asset URLs plus a `/jlpt/` base tag make the project path work. Localhost is unchanged (no base tag).

## Product notes

See [PRD.md](./PRD.md).
