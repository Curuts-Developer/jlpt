const KEY = 'jlpt-progress-v1';

function emptyScript() {
  return { passedStageIds: [], taughtStageIds: [], mastery: {} };
}

function emptyProfile() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    lastPath: '#/',
    scripts: {
      hiragana: emptyScript(),
      katakana: emptyScript(),
      kanji: emptyScript(),
    },
    stats: { totalAnswered: 0, totalCorrect: 0 },
  };
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyProfile();
    const data = JSON.parse(raw);
    if (!data || data.version !== 1 || !data.scripts) return emptyProfile();
    for (const id of ['hiragana', 'katakana', 'kanji']) {
      data.scripts[id] = { ...emptyScript(), ...data.scripts[id] };
    }
    data.stats = { totalAnswered: 0, totalCorrect: 0, ...data.stats };
    data.lastPath = data.lastPath || '#/';
    return data;
  } catch {
    return emptyProfile();
  }
}

export function saveProfile(profile) {
  profile.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

export function resetProfile() {
  localStorage.removeItem(KEY);
  return emptyProfile();
}

export function resetScriptProgress(profile, scriptId) {
  profile.scripts[scriptId] = emptyScript();
  return profile;
}

export function storageAvailable() {
  try {
    const probe = '__jlpt_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
