import { SCRIPTS, getScript, allCharsInScript } from './data.js';
import {
  loadProfile,
  saveProfile,
  resetProfile,
  resetScriptProgress,
  storageAvailable,
} from './storage.js';

const MASTER_PASS = 2;
const MIX_GOAL = 12;
const MIX_NEED = 10;
const OPTION_COUNT = 6;
const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

let profile = loadProfile();
let canPersist = storageAvailable();
let quiz = null;
let quizTimer = 0;

const app = document.getElementById('app');

function parseHash() {
  const hash = (location.hash || '#/').replace(/^#/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts.length === 0) return { view: 'home' };
  const scriptId = parts[0];
  if (!getScript(scriptId)) return { view: 'home' };
  if (parts.length === 1) return { view: 'stages', scriptId };
  if (parts[1] === 'chart') return { view: 'chart', scriptId };
  const stageId = parts[1];
  const mode = parts[2] || 'learn';
  return { view: mode === 'quiz' || mode === 'done' ? mode : 'learn', scriptId, stageId };
}

function go(path) {
  location.hash = path;
}

function rememberRoute() {
  const h = location.hash || '#/';
  if (h === '#' || h === '#/' || h === '') return;
  if (profile.lastPath === h) return;
  profile.lastPath = h;
  persist();
}

function scriptState(scriptId) {
  return profile.scripts[scriptId];
}

function stageChars(scriptId, stage) {
  if (stage.mix) {
    const script = getScript(scriptId);
    const mixIndex = script.stages.findIndex((s) => s.id === stage.id);
    return uniqueChars(allCharsInScript(scriptId, mixIndex - 1));
  }
  return stage.chars;
}

function uniqueChars(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    if (seen.has(item.char)) continue;
    seen.add(item.char);
    out.push(item);
  }
  return out;
}

function stageIndex(scriptId, stageId) {
  return getScript(scriptId).stages.findIndex((s) => s.id === stageId);
}

function isPassed(scriptId, stageId) {
  return scriptState(scriptId).passedStageIds.includes(stageId);
}

function isUnlocked(scriptId, stageId) {
  const stages = getScript(scriptId).stages;
  const index = stages.findIndex((s) => s.id === stageId);
  if (index <= 0) return true;
  return isPassed(scriptId, stages[index - 1].id);
}

function isTaught(scriptId, stageId) {
  return scriptState(scriptId).taughtStageIds.includes(stageId);
}

function markTaught(scriptId, stageId) {
  const list = scriptState(scriptId).taughtStageIds;
  if (!list.includes(stageId)) {
    list.push(stageId);
    persist();
  }
}

function persist() {
  if (!canPersist) return false;
  return saveProfile(profile);
}

function masteryOf(scriptId, char) {
  return scriptState(scriptId).mastery[char] || 0;
}

function bumpMastery(scriptId, char, delta) {
  const mastery = scriptState(scriptId).mastery;
  const next = Math.max(0, Math.min(5, (mastery[char] || 0) + delta));
  mastery[char] = next;
}

function stageMasteredCount(scriptId, stage) {
  const chars = stageChars(scriptId, stage);
  return chars.filter((c) => masteryOf(scriptId, c.char) >= MASTER_PASS).length;
}

function maybePassStage(scriptId, stage, mixSession) {
  if (isPassed(scriptId, stage.id)) return true;
  if (stage.mix) {
    if (mixSession && mixSession.answered >= MIX_GOAL && mixSession.correct >= MIX_NEED) {
      scriptState(scriptId).passedStageIds.push(stage.id);
      persist();
      return true;
    }
    return false;
  }
  const chars = stageChars(scriptId, stage);
  const done = chars.every((c) => masteryOf(scriptId, c.char) >= MASTER_PASS);
  if (done) {
    scriptState(scriptId).passedStageIds.push(stage.id);
    persist();
    return true;
  }
  return false;
}

function scriptProgress(scriptId) {
  const script = getScript(scriptId);
  const realStages = script.stages.filter((s) => !s.mix);
  const passed = realStages.filter((s) => isPassed(scriptId, s.id)).length;
  const chars = uniqueChars(allCharsInScript(scriptId));
  const mastered = chars.filter((c) => masteryOf(scriptId, c.char) >= MASTER_PASS).length;
  return { passed, total: realStages.length, mastered, charTotal: chars.length };
}

function liveStats() {
  let answered = 0;
  let correct = 0;
  for (const script of Object.values(profile.scripts)) {
    answered += script.answered || 0;
    correct += script.correct || 0;
  }
  return { answered, correct };
}

function stageHref(scriptId, stage) {
  if (!isTaught(scriptId, stage.id)) return `/${scriptId}/${stage.id}/learn`;
  return `/${scriptId}/${stage.id}/quiz`;
}

function continueLabelFor(scriptId, stage) {
  if (!isTaught(scriptId, stage.id) && stage.intro) return 'Start Stage 0';
  if (!isTaught(scriptId, stage.id)) return `Learn · ${stage.title}`;
  return `Continue · ${stage.title}`;
}

function continueInScript(scriptId) {
  const script = getScript(scriptId);
  for (const stage of script.stages) {
    if (isUnlocked(scriptId, stage.id) && !isPassed(scriptId, stage.id)) {
      return isTaught(scriptId, stage.id)
        ? `/${scriptId}/${stage.id}/quiz`
        : `/${scriptId}/${stage.id}/learn`;
    }
  }
  return `/${scriptId}`;
}

function continueInfo() {
  const last = (profile.lastPath || '').replace(/^#/, '');
  const lastParts = last.split('/').filter(Boolean);
  if (lastParts[0] && getScript(lastParts[0])) {
    const script = getScript(lastParts[0]);
    if (lastParts[1] === 'chart') {
      return { path: `/${script.id}/chart`, label: `${script.label} chart` };
    }
    const stage = script.stages.find((s) => s.id === lastParts[1]);
    if (stage && isUnlocked(script.id, stage.id) && !isPassed(script.id, stage.id)) {
      const path = isTaught(script.id, stage.id)
        ? `/${script.id}/${stage.id}/quiz`
        : `/${script.id}/${stage.id}/learn`;
      return { path, label: continueLabelFor(script.id, stage) };
    }
  }
  for (const script of Object.values(SCRIPTS)) {
    for (const stage of script.stages) {
      if (isUnlocked(script.id, stage.id) && !isPassed(script.id, stage.id)) {
        const path = isTaught(script.id, stage.id)
          ? `/${script.id}/${stage.id}/quiz`
          : `/${script.id}/${stage.id}/learn`;
        return { path, label: continueLabelFor(script.id, stage) };
      }
    }
  }
  return { path: '/hiragana', label: 'Open hiragana' };
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickQuestion(scriptId, stage) {
  const chars = stageChars(scriptId, stage);
  const weighted = [];
  for (const item of chars) {
    const weight = Math.max(1, 6 - masteryOf(scriptId, item.char));
    for (let i = 0; i < weight; i += 1) weighted.push(item);
  }
  const correct = weighted[Math.floor(Math.random() * weighted.length)];
  const idx = stageIndex(scriptId, stage.id);
  const nearby = uniqueChars(allCharsInScript(scriptId, Number.isFinite(idx) ? idx : 0)).filter(
    (c) => c.char !== correct.char
  );
  const rest = uniqueChars(allCharsInScript(scriptId)).filter((c) => c.char !== correct.char);
  const pool = nearby.length >= OPTION_COUNT - 1 ? nearby : uniqueChars([...nearby, ...rest]);
  const distractors = shuffle(pool).slice(0, OPTION_COUNT - 1);
  const options = shuffle([correct, ...distractors]);
  return { correct, options };
}

function promptText(item, scriptId) {
  if (scriptId === 'kanji') {
    return {
      eyebrow: 'Which character means',
      main: item.meaning,
      sub: item.romaji,
    };
  }
  return {
    eyebrow: 'Which character is',
    main: item.romaji,
    sub: item.hint || 'Tap the matching kana',
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function render() {
  const route = parseHash();
  if (route.view !== 'home') rememberRoute();
  if (route.view === 'home') {
    app.innerHTML = renderHome();
    bindHome();
    return;
  }
  const script = getScript(route.scriptId);
  if (!script) {
    go('/');
    return;
  }
  if (route.view === 'stages') {
    app.innerHTML = renderStages(script);
    bindStages(script);
    return;
  }
  if (route.view === 'chart') {
    app.innerHTML = renderChart(script);
    bindChart(script);
    return;
  }
  const stage = script.stages.find((s) => s.id === route.stageId);
  if (!stage || !isUnlocked(script.id, stage.id)) {
    go(`/${script.id}`);
    return;
  }
  if (route.view === 'done') {
    app.innerHTML = renderDone(script, stage);
    bindDone(script, stage);
    return;
  }
  if (route.view === 'quiz') {
    if (!isTaught(script.id, stage.id) && stage.intro) {
      go(`/${script.id}/${stage.id}/learn`);
      return;
    }
    if (!quiz || quiz.scriptId !== script.id || quiz.stageId !== stage.id) {
      quiz = startQuiz(script.id, stage);
    }
    app.innerHTML = renderQuiz(script, stage);
    bindQuiz(script, stage);
    return;
  }
  app.innerHTML = renderLearn(script, stage);
  bindLearn(script, stage);
}

function renderHome() {
  const cards = Object.values(SCRIPTS)
    .map((script) => {
      const p = scriptProgress(script.id);
      return `
        <button class="script-card" data-script="${script.id}">
          <span class="kicker">${escapeHtml(script.kicker)}</span>
          <span class="script-name">${escapeHtml(script.label)}</span>
          <span class="script-blurb">${escapeHtml(script.blurb)}</span>
          <span class="meter">
            <span class="meter-fill" style="width:${p.total ? (p.passed / p.total) * 100 : 0}%"></span>
          </span>
          <span class="script-meta">${p.passed} / ${p.total} stages · ${p.mastered} / ${p.charTotal} mastered</span>
        </button>
      `;
    })
    .join('');

  const saveNote = canPersist
    ? 'Progress is saved in this browser until you reset it.'
    : 'This browser blocked local saving. You can still practice, but progress will not stick.';
  const info = continueInfo();
  const { answered, correct } = liveStats();
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  return `
    <header class="top">
      <p class="brand">JLPT Curuts</p>
      <h1>Learn the marks before you test them.</h1>
      <p class="lede">Stage 0 is for zero Japanese. See あ = a, then ひ = hi, ふ = fu / hu, へ = he, ほ = ho in later rows. Practice is six boxes: A B C D E F.</p>
      <div class="continue-row">
        <button class="btn primary" id="continue-btn" type="button">${escapeHtml(info.label)}</button>
        ${answered ? `<p class="save-note">${answered} ${answered === 1 ? 'answer' : 'answers'} · ${accuracy}% correct</p>` : ''}
      </div>
    </header>
    <section class="script-grid">${cards}</section>
    <footer class="home-foot">
      <p class="save-note">${saveNote}</p>
      <button class="btn ghost danger" id="reset-btn" type="button">Reset all progress</button>
    </footer>
  `;
}

function bindHome() {
  app.querySelectorAll('[data-script]').forEach((btn) => {
    btn.addEventListener('click', () => go(`/${btn.dataset.script}`));
  });
  app.querySelector('#continue-btn').addEventListener('click', () => go(continueInfo().path));
  app.querySelector('#reset-btn').addEventListener('click', () => {
    const ok = window.confirm('Erase all saved progress on this device? Stage 0 will start over.');
    if (!ok) return;
    profile = resetProfile();
    quiz = null;
    render();
  });
}

function renderStages(script) {
  const p = scriptProgress(script.id);
  const currentPath = continueInScript(script.id);
  const items = script.stages
    .map((stage, index) => {
      const unlocked = isUnlocked(script.id, stage.id);
      const passed = isPassed(script.id, stage.id);
      const chars = stageChars(script.id, stage);
      const mastered = stage.mix ? null : stageMasteredCount(script.id, stage);
      const current = currentPath.includes(`/${stage.id}/`);
      const status = passed ? 'Passed' : unlocked ? (index === 0 ? 'Start here' : current ? 'Continue' : 'Unlocked') : 'Locked';
      const count = stage.mix ? `${chars.length} review` : `${mastered} / ${chars.length} mastered`;
      return `
        <button class="stage-row ${unlocked ? '' : 'is-locked'} ${passed ? 'is-passed' : ''} ${stage.intro ? 'is-zero' : ''} ${current && !passed ? 'is-current' : ''}"
          data-stage="${stage.id}" ${unlocked ? '' : 'disabled'}>
          <span class="stage-index">${stage.intro ? '0' : index}</span>
          <span class="stage-copy">
            <strong>${escapeHtml(stage.title)}</strong>
            <em>${escapeHtml(stage.subtitle)}</em>
          </span>
          <span class="stage-status">
            <span>${status}</span>
            <span>${count}</span>
          </span>
        </button>
      `;
    })
    .join('');

  return `
    <header class="subhead">
      <button class="btn ghost" data-back type="button">Home</button>
      <div>
        <p class="brand">${escapeHtml(script.label)}</p>
        <h1>${script.id === 'hiragana' ? 'Begin at Stage 0.' : escapeHtml(script.label)}</h1>
        <p class="lede">${escapeHtml(script.blurb)} ${p.passed} of ${p.total} core stages passed.</p>
      </div>
    </header>
    <div class="stage-tools">
      <button class="btn primary" data-continue type="button">Continue</button>
      <button class="btn ghost" data-chart type="button">Character chart</button>
      <button class="btn ghost danger" data-reset-script type="button">Reset ${escapeHtml(script.label)}</button>
    </div>
    <section class="stage-list">${items}</section>
  `;
}

function bindStages(script) {
  app.querySelector('[data-back]').addEventListener('click', () => go('/'));
  app.querySelector('[data-continue]').addEventListener('click', () => go(continueInScript(script.id)));
  app.querySelector('[data-chart]').addEventListener('click', () => go(`/${script.id}/chart`));
  app.querySelector('[data-reset-script]').addEventListener('click', () => {
    const ok = window.confirm(`Erase ${script.label} progress on this device? Other scripts stay.`);
    if (!ok) return;
    resetScriptProgress(profile, script.id);
    quiz = null;
    persist();
    render();
  });
  app.querySelectorAll('[data-stage]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stage = script.stages.find((s) => s.id === btn.dataset.stage);
      go(stageHref(script.id, stage));
    });
  });
}

function renderChart(script) {
  const sections = script.stages
    .filter((stage) => !stage.mix)
    .map((stage) => {
      const unlocked = isUnlocked(script.id, stage.id);
      const tiles = stage.chars
        .map((c) => {
          const m = masteryOf(script.id, c.char);
          const mastered = m >= MASTER_PASS;
          return `
            <li class="${mastered ? 'is-mastered' : ''} ${unlocked ? '' : 'is-dim'}">
              <span class="glyph">${escapeHtml(c.char)}</span>
              <span class="read">${escapeHtml(c.romaji)}</span>
              ${c.meaning ? `<span class="mean">${escapeHtml(c.meaning)}</span>` : ''}
              <span class="pip-row" aria-label="mastery ${m} of 5">${'●'.repeat(m)}${'○'.repeat(5 - m)}</span>
            </li>`;
        })
        .join('');
      return `
        <section class="chart-block">
          <h2>${escapeHtml(stage.title)}${unlocked ? '' : ' · locked'}</h2>
          <ul class="teach-grid">${tiles}</ul>
        </section>`;
    })
    .join('');

  return `
    <header class="subhead">
      <button class="btn ghost" data-back type="button">Stages</button>
      <div>
        <p class="brand">${escapeHtml(script.label)}</p>
        <h1>Character chart</h1>
        <p class="lede">Filled marks are mastered. Locked stages are dimmed until you pass the one before.</p>
      </div>
    </header>
    ${sections}
  `;
}

function bindChart(script) {
  app.querySelector('[data-back]').addEventListener('click', () => go(`/${script.id}`));
}

function renderLearn(script, stage) {
  const chars = stageChars(script, stage);
  const forced = stage.intro && !isTaught(script.id, stage.id);
  const mode = stage.teach === 'grid' || stage.mix || chars.length > 8 ? 'grid' : 'cards';

  if (mode === 'grid') {
    const tiles = chars
      .map(
        (c) => `
        <li>
          <span class="glyph">${escapeHtml(c.char)}</span>
          <span class="read">${escapeHtml(c.romaji)}</span>
          ${c.meaning ? `<span class="mean">${escapeHtml(c.meaning)}</span>` : ''}
        </li>`
      )
      .join('');
    return `
      ${learnChrome(script, stage, forced)}
      <ul class="teach-grid">${tiles}</ul>
      <div class="learn-actions">
        <button class="btn primary" id="start-practice" type="button">Practice A–F</button>
      </div>
    `;
  }

  return `
    ${learnChrome(script, stage, forced)}
    <div class="teach-deck" data-deck data-index="0" data-max="${chars.length}">
      ${chars
        .map(
          (c, i) => `
        <article class="flash ${i === 0 ? 'is-on' : ''}" data-card="${i}">
          ${i === 0 && stage.intro ? `<p class="zero-note">Zero knowledge is expected. This mark is a sound, not an English letter.</p>` : ''}
          <p class="flash-kicker">Card ${i + 1} of ${chars.length}</p>
          <p class="flash-glyph">${escapeHtml(c.char)}</p>
          <p class="flash-read">${escapeHtml(c.romaji)}</p>
          ${c.meaning ? `<p class="flash-mean">${escapeHtml(c.meaning)}</p>` : ''}
          ${c.hint ? `<p class="flash-hint">${escapeHtml(c.hint)}</p>` : ''}
        </article>`
        )
        .join('')}
    </div>
    <div class="learn-actions">
      <button class="btn ghost" id="prev-card" type="button" disabled>Back</button>
      ${forced ? '' : '<button class="btn ghost" id="skip-practice" type="button">Practice A–F</button>'}
      <button class="btn primary" id="next-card" type="button">Next character</button>
    </div>
  `;
}

function learnChrome(script, stage, forced) {
  return `
    <header class="subhead">
      <button class="btn ghost" data-back type="button">Stages</button>
      <div>
        <p class="brand">${escapeHtml(script.label)}</p>
        <h1>${escapeHtml(stage.title)}</h1>
        <p class="lede">${escapeHtml(stage.subtitle)}</p>
        ${forced ? '<p class="must-learn">Stage 0: view every card before the quiz unlocks.</p>' : ''}
      </div>
    </header>
  `;
}

function bindLearn(script, stage) {
  app.querySelector('[data-back]').addEventListener('click', () => go(`/${script.id}`));
  const start = () => {
    markTaught(script.id, stage.id);
    quiz = startQuiz(script.id, stage);
    go(`/${script.id}/${stage.id}/quiz`);
  };
  const startBtn = app.querySelector('#start-practice');
  if (startBtn) {
    startBtn.addEventListener('click', start);
    return;
  }

  const chars = stageChars(script, stage);
  const deck = app.querySelector('[data-deck]');
  const prev = app.querySelector('#prev-card');
  const next = app.querySelector('#next-card');

  const show = (index) => {
    deck.dataset.index = String(index);
    deck.querySelectorAll('[data-card]').forEach((card) => {
      card.classList.toggle('is-on', Number(card.dataset.card) === index);
    });
    prev.disabled = index === 0;
    const last = index >= chars.length - 1;
    next.textContent = last ? 'Practice A–F' : 'Next character';
  };

  prev.addEventListener('click', () => show(Math.max(0, Number(deck.dataset.index) - 1)));
  next.addEventListener('click', () => {
    const index = Number(deck.dataset.index);
    if (index >= chars.length - 1) {
      start();
      return;
    }
    show(index + 1);
  });
  const skip = app.querySelector('#skip-practice');
  if (skip) skip.addEventListener('click', start);
}

function startQuiz(scriptId, stage) {
  return {
    scriptId,
    stageId: stage.id,
    mixSession: { answered: 0, correct: 0 },
    current: pickQuestion(scriptId, stage),
    locked: false,
    lastChoice: null,
  };
}

function renderQuiz(script, stage) {
  const { correct, options } = quiz.current;
  const prompt = promptText(correct, script.id);
  const chars = stageChars(script.id, stage);
  const mastered = stage.mix
    ? `${quiz.mixSession.correct} / ${quiz.mixSession.answered} this review · ${MIX_NEED}/${MIX_GOAL} to pass`
    : `${stageMasteredCount(script.id, stage)} / ${chars.length} mastered`;
  const weak = stage.mix
    ? []
    : chars.filter((c) => masteryOf(script.id, c.char) < MASTER_PASS);
  const weakLine = stage.mix
    ? 'Keys A–F work too.'
    : weak.length
      ? `Still need: ${weak.map((c) => c.char).join(' ')} · keys A–F`
      : 'All mastered · keys A–F';
  const pips =
    !stage.mix && chars.length <= 16
      ? `<p class="pips">${chars
          .map((c) => {
            const m = masteryOf(script.id, c.char);
            return `<span class="pip ${m >= MASTER_PASS ? 'is-on' : ''}" title="${escapeHtml(c.char)} ${m}"></span>`;
          })
          .join('')}</p>`
      : '';
  const tiles = options
    .map((opt, i) => {
      const label = LABELS[i];
      let extra = '';
      if (quiz.locked) {
        if (opt.char === correct.char) extra = 'is-right';
        else if (quiz.lastChoice === opt.char) extra = 'is-wrong';
      }
      const reveal =
        quiz.locked && opt.char === correct.char
          ? `<span class="choice-read">${escapeHtml(correct.romaji)}</span>`
          : '';
      return `
        <button class="choice ${extra}" data-char="${escapeHtml(opt.char)}" ${quiz.locked ? 'disabled' : ''} type="button" aria-label="Option ${label}: ${escapeHtml(opt.char)}">
          <span class="choice-key">${label}</span>
          <span class="choice-glyph">${escapeHtml(opt.char)}</span>
          ${reveal}
        </button>
      `;
    })
    .join('');

  const feedback = quiz.locked
    ? quiz.lastChoice === correct.char
      ? '<p class="feedback ok">Correct</p>'
      : `<p class="feedback no">The character for <strong>${escapeHtml(prompt.main)}</strong> is ${escapeHtml(correct.char)}</p>`
    : '<p class="feedback">&nbsp;</p>';

  const nextBtn =
    quiz.locked && quiz.lastChoice !== correct.char
      ? '<button class="btn primary" id="next-q" type="button">Next</button>'
      : '';

  return `
    <header class="subhead">
      <button class="btn ghost" data-back type="button">Exit</button>
      <div>
        <p class="brand">${escapeHtml(script.label)} · ${escapeHtml(stage.title)}</p>
        <p class="quiz-progress">${mastered}</p>
        ${pips}
        <p class="prompt-sub">${escapeHtml(weakLine)}</p>
      </div>
    </header>
    <section class="prompt">
      <p class="eyebrow">${escapeHtml(prompt.eyebrow)}</p>
      <p class="prompt-main">${escapeHtml(prompt.main)}</p>
      <p class="prompt-sub">${escapeHtml(prompt.sub)}</p>
    </section>
    <section class="choices">${tiles}</section>
    ${feedback}
    <div class="learn-actions">${nextBtn}</div>
  `;
}

function bindQuiz(script, stage) {
  app.querySelector('[data-back]').addEventListener('click', () => {
    window.clearTimeout(quizTimer);
    quiz = null;
    go(`/${script.id}`);
  });
  app.querySelectorAll('.choice').forEach((btn) => {
    btn.addEventListener('click', () => answer(script, stage, btn.dataset.char));
  });
  const next = app.querySelector('#next-q');
  if (next) next.addEventListener('click', () => advance(script, stage));
}

function answer(script, stage, chosen) {
  if (!quiz || quiz.locked) return;
  const { correct } = quiz.current;
  const ok = chosen === correct.char;
  quiz.locked = true;
  quiz.lastChoice = chosen;
  bumpMastery(script.id, correct.char, ok ? 1 : -1);
  const st = scriptState(script.id);
  st.answered = (st.answered || 0) + 1;
  if (ok) st.correct = (st.correct || 0) + 1;
  profile.stats.totalAnswered += 1;
  if (ok) profile.stats.totalCorrect += 1;
  quiz.mixSession.answered += 1;
  if (ok) quiz.mixSession.correct += 1;
  persist();
  const passed = maybePassStage(script.id, stage, quiz.mixSession);
  render();
  if (passed) {
    quizTimer = window.setTimeout(() => {
      quiz = null;
      go(`/${script.id}/${stage.id}/done`);
    }, 700);
    return;
  }
  if (ok) {
    quizTimer = window.setTimeout(() => advance(script, stage), 700);
  }
}

function advance(script, stage) {
  window.clearTimeout(quizTimer);
  if (maybePassStage(script.id, stage, quiz?.mixSession)) {
    quiz = null;
    go(`/${script.id}/${stage.id}/done`);
    return;
  }
  quiz.current = pickQuestion(script.id, stage);
  quiz.locked = false;
  quiz.lastChoice = null;
  render();
}

function renderDone(script, stage) {
  const stages = script.stages;
  const index = stages.findIndex((s) => s.id === stage.id);
  const next = stages[index + 1];
  return `
    <header class="done-panel">
      <p class="brand">Stage passed</p>
      <h1>${escapeHtml(stage.title)}</h1>
      <p class="lede">Saved in this browser. Open the chart anytime to see what you know.</p>
      <div class="learn-actions">
        ${next ? `<button class="btn primary" data-next type="button">${escapeHtml(next.title)}</button>` : ''}
        <button class="btn ghost" data-again type="button">Practice this stage again</button>
        <button class="btn ghost" data-chart type="button">Character chart</button>
        <button class="btn ghost" data-home type="button">All stages</button>
      </div>
    </header>
  `;
}

function bindDone(script, stage) {
  const stages = script.stages;
  const index = stages.findIndex((s) => s.id === stage.id);
  const next = stages[index + 1];
  app.querySelector('[data-again]').addEventListener('click', () => {
    quiz = startQuiz(script.id, stage);
    go(`/${script.id}/${stage.id}/quiz`);
  });
  app.querySelector('[data-home]').addEventListener('click', () => go(`/${script.id}`));
  app.querySelector('[data-chart]').addEventListener('click', () => go(`/${script.id}/chart`));
  const nextBtn = app.querySelector('[data-next]');
  if (nextBtn && next) {
    nextBtn.addEventListener('click', () => go(`/${script.id}/${next.id}/learn`));
  }
}

function onKey(event) {
  const route = parseHash();
  if (route.view !== 'quiz' || !quiz || quiz.locked) return;
  const index = LABELS.indexOf(event.key.toUpperCase());
  if (index < 0) return;
  const option = quiz.current.options[index];
  if (!option) return;
  event.preventDefault();
  const script = getScript(route.scriptId);
  const stage = script.stages.find((s) => s.id === route.stageId);
  answer(script, stage, option.char);
}

window.addEventListener('hashchange', render);
window.addEventListener('keydown', onKey);
render();
