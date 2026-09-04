# Product Requirements Document

**Japanese Character Quiz — Hiragana, Katakana, Kanji**

| Field | Value |
| --- | --- |
| Product | Staged quiz for kana, kanji, and popular JLPT N5–N3 words |
| Audience | Learners with zero Japanese, then progressing to popular kanji |
| Hosting | GitHub Pages at https://curuts-developer.github.io/jlpt/ |
| Persistence | `localStorage` on this browser; reset anytime |
| Primary interaction | Learn cards, then tap A–F for the matching character |

---

## 1. Problem

A complete beginner cannot start with a quiz. They have never seen あ or か. The first experience must **teach** the sound-to-character mapping (あ = **a**, ひ = **hi**, ふ = **fu / hu**, へ = **he**, ほ = **ho**) and only then ask them to tap the correct box.

---

## 2. Goals

1. **Stage 0** is a zero-knowledge lesson: show each character, its reading, and a spoken-English hint before any test.
2. After Stage 0, continue through **all hiragana**, **all katakana**, and **popular kanji** in difficulty stages.
3. Practice is **six tap targets labeled A–F** (one correct character).
4. Progress is saved in the browser and can be **reset** with one confirmed action.
5. Ship as a static site on GitHub Pages.

### Non-goals (v1)

- Accounts, cloud sync, handwriting, audio, or a backend.

---

## 3. Stage 0 (required)

Stage 0 exists on **every script**. It is unlocked on first visit.

### Hiragana Stage 0 — First sounds (あ行)

Teach, one card at a time:

| Character | Reading | Hint |
| --- | --- | --- |
| あ | a | Like “ah” in *father* |
| い | i | Like “ee” in *see* |
| う | u | Like “oo” in *food* |
| え | e | Like “e” in *get* |
| お | o | Like “o” in *or* |

Copy on the first card: these marks are **sounds**, not English letters. The learner must step through **every** card, then tap **Practice**.

The **は行** (ha, hi, fu/hu, he, ho) is a later stage with the same teach UI — not Stage 0 — so beginners start with the five vowels only.

### Katakana Stage 0

Same five vowels: ア イ ウ エ オ.

### Kanji Stage 0

Six pictographic / number characters with meaning + reading (e.g. 一二三人日月). Same teach-then-quiz pattern.

### Teach rules

- First visit to a stage **always** opens Learn, not Quiz.
- Stage 0 Learn cannot be skipped until every card is viewed.
- Later stages: a grid or card recap, then Practice.
- After a stage is passed, the learner may jump to Practice.

---

## 4. Later stages

### Hiragana / Katakana (after Stage 0)

Gojuon rows (か→わ/ん), dakuten, handakuten, yoon, then mixed review. Same row order as a standard kana chart.

### Kanji

Themed JLPT N5-style batches (numbers, nature, school, body/food, directions, remainder, mixed review).

---

## 5. Quiz (A–F)

- Prompt: reading (kana) or meaning + reading (kanji).
- Six large tiles, labels A–F, one correct glyph.
- Distractors from the same script; prefer the current stage, then earlier stages, then later glyphs if the stage has fewer than six characters.
- Correct: highlight and auto-advance. Wrong: show the right tile; learner taps Next.
- Mastery +1 / −1 per character. Stage passes when every character in the stage has mastery ≥ 2.
- Passing unlocks the next stage.

---

## 6. Profile

Key: `jlpt-progress-v1` in `localStorage` (survives refresh and tab close; still no server).

Reset on the home screen clears that key after confirmation. Each script also has its own reset on the stage list. A **Continue** button resumes the last unfinished stage. A **character chart** shows mastery per glyph.

---

## 7. Tech

Vanilla HTML, CSS, and ES modules. Character lists in `data.js`. Relative URLs. No build step.

Public site: **https://curuts-developer.github.io/jlpt/** (project Pages on `Curuts-Developer/jlpt`). GitHub Actions deploys `main` to Pages. A `/jlpt/` base tag is applied only on that host so CSS and JS resolve under the repo path.
