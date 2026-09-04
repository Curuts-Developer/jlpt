/** Staged character data for hiragana, katakana, and popular kanji. */

import { VOCAB_SCRIPTS } from './vocab.js';
import { OFFICE_SCRIPT } from './office.js';

const VOWEL_HINTS = {
  a: 'Like “ah” in father',
  i: 'Like “ee” in see',
  u: 'Like “oo” in food',
  e: 'Like “e” in get',
  o: 'Like “o” in or',
};

function row(id, title, subtitle, pairs, extra = {}) {
  return {
    id,
    title,
    subtitle,
    teach: extra.teach || 'cards',
    intro: Boolean(extra.intro),
    mix: Boolean(extra.mix),
    chars: pairs.map(([char, romaji, hint, meaning]) => ({
      char,
      romaji,
      hint: hint || '',
      meaning: meaning || '',
    })),
  };
}

export const SCRIPTS = {
  hiragana: {
    id: 'hiragana',
    label: 'Hiragana',
    kicker: 'Stage 0 first',
    group: 'writing',
    blurb: 'The rounded phonetic alphabet. Start at Stage 0 if you have never seen these marks.',
    stages: [
      row(
        'h-0',
        'Stage 0 · First sounds',
        'You do not need any Japanese yet. Each mark is one sound. Learn あいうえお, then pick them from the boxes.',
        [
          ['あ', 'a', VOWEL_HINTS.a],
          ['い', 'i', VOWEL_HINTS.i],
          ['う', 'u', VOWEL_HINTS.u],
          ['え', 'e', VOWEL_HINTS.e],
          ['お', 'o', VOWEL_HINTS.o],
        ],
        { intro: true }
      ),
      row('h-k', 'Stage 1 · K row', 'かきくけこ — K sounds.', [
        ['か', 'ka'],
        ['き', 'ki'],
        ['く', 'ku'],
        ['け', 'ke'],
        ['こ', 'ko'],
      ]),
      row('h-s', 'Stage 2 · S row', 'さしすせそ — し is “shi”, not “si”.', [
        ['さ', 'sa'],
        ['し', 'shi', 'Usually written shi, not si'],
        ['す', 'su'],
        ['せ', 'se'],
        ['そ', 'so'],
      ]),
      row('h-t', 'Stage 3 · T row', 'たちつてと — ち is “chi”, つ is “tsu”.', [
        ['た', 'ta'],
        ['ち', 'chi', 'Usually written chi, not ti'],
        ['つ', 'tsu', 'Usually written tsu, not tu'],
        ['て', 'te'],
        ['と', 'to'],
      ]),
      row('h-n', 'Stage 4 · N row', 'なにぬねの', [
        ['な', 'na'],
        ['に', 'ni'],
        ['ぬ', 'nu'],
        ['ね', 'ne'],
        ['の', 'no'],
      ]),
      row(
        'h-h',
        'Stage 5 · H row',
        'は = ha, ひ = hi, ふ = fu / hu, へ = he, ほ = ho.',
        [
          ['は', 'ha', 'Like “ha” in hop'],
          ['ひ', 'hi', 'Like “hee”'],
          ['ふ', 'fu', 'Also written hu — a soft “fu”'],
          ['へ', 'he', 'Like “he” in help'],
          ['ほ', 'ho', 'Like “ho” in home'],
        ]
      ),
      row('h-m', 'Stage 6 · M row', 'まみむめも', [
        ['ま', 'ma'],
        ['み', 'mi'],
        ['む', 'mu'],
        ['め', 'me'],
        ['も', 'mo'],
      ]),
      row('h-y', 'Stage 7 · Y row', 'やゆよ — only three sounds.', [
        ['や', 'ya'],
        ['ゆ', 'yu'],
        ['よ', 'yo'],
      ]),
      row('h-r', 'Stage 8 · R row', 'らりるれろ — a light tap, not an English R.', [
        ['ら', 'ra'],
        ['り', 'ri'],
        ['る', 'ru'],
        ['れ', 're'],
        ['ろ', 'ro'],
      ]),
      row('h-w', 'Stage 9 · W row + n', 'わをん — を is “wo” / “o”; ん is the only lone consonant.', [
        ['わ', 'wa'],
        ['を', 'wo', 'Often sounds like o'],
        ['ん', 'n', 'The only consonant that stands alone'],
      ]),
      row(
        'h-dakuten',
        'Stage 10 · Voiced marks',
        'A ゛ turns K→G, S→Z, T→D, H→B.',
        [
          ['が', 'ga'],
          ['ぎ', 'gi'],
          ['ぐ', 'gu'],
          ['げ', 'ge'],
          ['ご', 'go'],
          ['ざ', 'za'],
          ['じ', 'ji'],
          ['ず', 'zu'],
          ['ぜ', 'ze'],
          ['ぞ', 'zo'],
          ['だ', 'da'],
          ['ぢ', 'ji', 'Rare; same sound as じ'],
          ['づ', 'zu', 'Rare; same sound as ず'],
          ['で', 'de'],
          ['ど', 'do'],
          ['ば', 'ba'],
          ['び', 'bi'],
          ['ぶ', 'bu'],
          ['べ', 'be'],
          ['ぼ', 'bo'],
        ],
        { teach: 'grid' }
      ),
      row(
        'h-p',
        'Stage 11 · P sounds',
        'A ゜ on the H row makes P: ぱぴぷぺぽ.',
        [
          ['ぱ', 'pa'],
          ['ぴ', 'pi'],
          ['ぷ', 'pu'],
          ['ぺ', 'pe'],
          ['ぽ', 'po'],
        ]
      ),
      row(
        'h-yoon',
        'Stage 12 · Combinations',
        'A small ゃゅょ glues a -i character to ya/yu/yo.',
        [
          ['きゃ', 'kya'],
          ['きゅ', 'kyu'],
          ['きょ', 'kyo'],
          ['しゃ', 'sha'],
          ['しゅ', 'shu'],
          ['しょ', 'sho'],
          ['ちゃ', 'cha'],
          ['ちゅ', 'chu'],
          ['ちょ', 'cho'],
          ['にゃ', 'nya'],
          ['にゅ', 'nyu'],
          ['にょ', 'nyo'],
          ['ひゃ', 'hya'],
          ['ひゅ', 'hyu'],
          ['ひょ', 'hyo'],
          ['みゃ', 'mya'],
          ['みゅ', 'myu'],
          ['みょ', 'myo'],
          ['りゃ', 'rya'],
          ['りゅ', 'ryu'],
          ['りょ', 'ryo'],
          ['ぎゃ', 'gya'],
          ['ぎゅ', 'gyu'],
          ['ぎょ', 'gyo'],
          ['じゃ', 'ja'],
          ['じゅ', 'ju'],
          ['じょ', 'jo'],
          ['びゃ', 'bya'],
          ['びゅ', 'byu'],
          ['びょ', 'byo'],
          ['ぴゃ', 'pya'],
          ['ぴゅ', 'pyu'],
          ['ぴょ', 'pyo'],
        ],
        { teach: 'grid' }
      ),
      row(
        'h-mix',
        'Stage 13 · Mixed review',
        'All hiragana you have unlocked, shuffled.',
        [],
        { teach: 'grid', mix: true }
      ),
    ],
  },
  katakana: {
    id: 'katakana',
    label: 'Katakana',
    kicker: 'Angular twin',
    group: 'writing',
    blurb: 'Same sounds as hiragana, sharper shapes. Used for loanwords and emphasis.',
    stages: [
      row(
        'k-0',
        'Stage 0 · First sounds',
        'Same five vowels as hiragana, new shapes: アイウエオ.',
        [
          ['ア', 'a', VOWEL_HINTS.a],
          ['イ', 'i', VOWEL_HINTS.i],
          ['ウ', 'u', VOWEL_HINTS.u],
          ['エ', 'e', VOWEL_HINTS.e],
          ['オ', 'o', VOWEL_HINTS.o],
        ],
        { intro: true }
      ),
      row('k-k', 'Stage 1 · K row', 'カキクケコ', [
        ['カ', 'ka'],
        ['キ', 'ki'],
        ['ク', 'ku'],
        ['ケ', 'ke'],
        ['コ', 'ko'],
      ]),
      row('k-s', 'Stage 2 · S row', 'サシスセソ — シ is “shi”.', [
        ['サ', 'sa'],
        ['シ', 'shi'],
        ['ス', 'su'],
        ['セ', 'se'],
        ['ソ', 'so'],
      ]),
      row('k-t', 'Stage 3 · T row', 'タチツテト — チ chi, ツ tsu.', [
        ['タ', 'ta'],
        ['チ', 'chi'],
        ['ツ', 'tsu'],
        ['テ', 'te'],
        ['ト', 'to'],
      ]),
      row('k-n', 'Stage 4 · N row', 'ナニヌネノ', [
        ['ナ', 'na'],
        ['ニ', 'ni'],
        ['ヌ', 'nu'],
        ['ネ', 'ne'],
        ['ノ', 'no'],
      ]),
      row('k-h', 'Stage 5 · H row', 'ハ = ha, ヒ = hi, フ = fu / hu, ヘ = he, ホ = ho.', [
        ['ハ', 'ha', 'Like “ha” in hop'],
        ['ヒ', 'hi', 'Like “hee”'],
        ['フ', 'fu', 'Also written hu'],
        ['ヘ', 'he', 'Like “he” in help'],
        ['ホ', 'ho', 'Like “ho” in home'],
      ]),
      row('k-m', 'Stage 6 · M row', 'マミムメモ', [
        ['マ', 'ma'],
        ['ミ', 'mi'],
        ['ム', 'mu'],
        ['メ', 'me'],
        ['モ', 'mo'],
      ]),
      row('k-y', 'Stage 7 · Y row', 'ヤユヨ', [
        ['ヤ', 'ya'],
        ['ユ', 'yu'],
        ['ヨ', 'yo'],
      ]),
      row('k-r', 'Stage 8 · R row', 'ラリルレロ', [
        ['ラ', 'ra'],
        ['リ', 'ri'],
        ['ル', 'ru'],
        ['レ', 're'],
        ['ロ', 'ro'],
      ]),
      row('k-w', 'Stage 9 · W row + n', 'ワヲン', [
        ['ワ', 'wa'],
        ['ヲ', 'wo'],
        ['ン', 'n'],
      ]),
      row(
        'k-dakuten',
        'Stage 10 · Voiced marks',
        'ガザダバ rows.',
        [
          ['ガ', 'ga'],
          ['ギ', 'gi'],
          ['グ', 'gu'],
          ['ゲ', 'ge'],
          ['ゴ', 'go'],
          ['ザ', 'za'],
          ['ジ', 'ji'],
          ['ズ', 'zu'],
          ['ゼ', 'ze'],
          ['ゾ', 'zo'],
          ['ダ', 'da'],
          ['ヂ', 'ji'],
          ['ヅ', 'zu'],
          ['デ', 'de'],
          ['ド', 'do'],
          ['バ', 'ba'],
          ['ビ', 'bi'],
          ['ブ', 'bu'],
          ['ベ', 'be'],
          ['ボ', 'bo'],
        ],
        { teach: 'grid' }
      ),
      row('k-p', 'Stage 11 · P sounds', 'パピプペポ', [
        ['パ', 'pa'],
        ['ピ', 'pi'],
        ['プ', 'pu'],
        ['ペ', 'pe'],
        ['ポ', 'po'],
      ]),
      row(
        'k-yoon',
        'Stage 12 · Combinations',
        'Small ャュョ combinations.',
        [
          ['キャ', 'kya'],
          ['キュ', 'kyu'],
          ['キョ', 'kyo'],
          ['シャ', 'sha'],
          ['シュ', 'shu'],
          ['ショ', 'sho'],
          ['チャ', 'cha'],
          ['チュ', 'chu'],
          ['チョ', 'cho'],
          ['ニャ', 'nya'],
          ['ニュ', 'nyu'],
          ['ニョ', 'nyo'],
          ['ヒャ', 'hya'],
          ['ヒュ', 'hyu'],
          ['ヒョ', 'hyo'],
          ['ミャ', 'mya'],
          ['ミュ', 'myu'],
          ['ミョ', 'myo'],
          ['リャ', 'rya'],
          ['リュ', 'ryu'],
          ['リョ', 'ryo'],
          ['ギャ', 'gya'],
          ['ギュ', 'gyu'],
          ['ギョ', 'gyo'],
          ['ジャ', 'ja'],
          ['ジュ', 'ju'],
          ['ジョ', 'jo'],
          ['ビャ', 'bya'],
          ['ビュ', 'byu'],
          ['ビョ', 'byo'],
          ['ピャ', 'pya'],
          ['ピュ', 'pyu'],
          ['ピョ', 'pyo'],
        ],
        { teach: 'grid' }
      ),
      row('k-mix', 'Stage 13 · Mixed review', 'All katakana you have unlocked.', [], {
        teach: 'grid',
        mix: true,
      }),
    ],
  },
  kanji: {
    id: 'kanji',
    label: 'Kanji',
    kicker: 'Meaning marks',
    group: 'writing',
    blurb: 'Popular beginner kanji (JLPT N5 style), taught in small meaning groups.',
    stages: [
      row(
        'kj-0',
        'Stage 0 · First kanji',
        'Kanji carry meaning. Learn six everyday marks: numbers, person, sun, moon.',
        [
          ['一', 'ichi', 'A single horizontal stroke', 'one'],
          ['二', 'ni', 'Two strokes', 'two'],
          ['三', 'san', 'Three strokes', 'three'],
          ['人', 'hito / jin', 'A person walking', 'person'],
          ['日', 'hi / nichi', 'The sun; also “day”', 'sun / day'],
          ['月', 'tsuki / getsu', 'The moon; also “month”', 'moon / month'],
        ],
        { intro: true }
      ),
      row('kj-1', 'Stage 1 · Numbers', '四 through 十, plus 百 and 千.', [
        ['四', 'shi / yon', '', 'four'],
        ['五', 'go', '', 'five'],
        ['六', 'roku', '', 'six'],
        ['七', 'shichi / nana', '', 'seven'],
        ['八', 'hachi', '', 'eight'],
        ['九', 'kyuu / ku', '', 'nine'],
        ['十', 'juu', '', 'ten'],
        ['百', 'hyaku', '', 'hundred'],
        ['千', 'sen', '', 'thousand'],
        ['万', 'man', '', 'ten thousand'],
      ]),
      row('kj-2', 'Stage 2 · Time', 'Days, years, and clock words.', [
        ['年', 'toshi / nen', '', 'year'],
        ['時', 'toki / ji', '', 'time / hour'],
        ['分', 'fun / bun', '', 'minute / part'],
        ['半', 'han', '', 'half'],
        ['今', 'ima / kon', '', 'now'],
        ['先', 'saki / sen', '', 'ahead / previous'],
        ['週', 'shuu', '', 'week'],
        ['午', 'go', '', 'noon'],
      ]),
      row('kj-3', 'Stage 3 · People & school', 'Family, friends, and class.', [
        ['男', 'otoko / dan', '', 'man'],
        ['女', 'onna / jo', '', 'woman'],
        ['子', 'ko / shi', '', 'child'],
        ['生', 'sei / nama', '', 'life / student'],
        ['書', 'ka(ku) / sho', '', 'write'],
        ['学', 'gaku / mana(bu)', '', 'study'],
        ['校', 'kou', '', 'school'],
        ['友', 'tomo / yuu', '', 'friend'],
        ['母', 'haha / bo', '', 'mother'],
        ['父', 'chichi / fu', '', 'father'],
      ]),
      row('kj-4', 'Stage 4 · Nature', 'Elements and weather.', [
        ['山', 'yama / san', '', 'mountain'],
        ['川', 'kawa / sen', '', 'river'],
        ['水', 'mizu / sui', '', 'water'],
        ['火', 'hi / ka', '', 'fire'],
        ['木', 'ki / moku', '', 'tree'],
        ['金', 'kane / kin', '', 'gold / money'],
        ['土', 'tsuchi / do', '', 'earth / soil'],
        ['雨', 'ame / u', '', 'rain'],
        ['天', 'ten', '', 'heaven / sky'],
        ['気', 'ki', '', 'spirit / air'],
      ]),
      row('kj-5', 'Stage 5 · Body & home', 'Body parts and daily life.', [
        ['口', 'kuchi / kou', '', 'mouth'],
        ['目', 'me / moku', '', 'eye'],
        ['耳', 'mimi / ji', '', 'ear'],
        ['手', 'te / shu', '', 'hand'],
        ['足', 'ashi / soku', '', 'foot / enough'],
        ['休', 'yasu(mi) / kyuu', '', 'rest'],
        ['食', 'ta(beru) / shoku', '', 'eat'],
        ['飲', 'no(mu) / in', '', 'drink'],
        ['本', 'hon', '', 'book / origin'],
        ['名', 'na / mei', '', 'name'],
      ]),
      row('kj-6', 'Stage 6 · Space & size', 'Directions and adjectives.', [
        ['上', 'ue / jou', '', 'up'],
        ['下', 'shita / ka', '', 'down'],
        ['左', 'hidari / sa', '', 'left'],
        ['右', 'migi / u', '', 'right'],
        ['中', 'naka / chuu', '', 'inside / middle'],
        ['外', 'soto / gai', '', 'outside'],
        ['大', 'oo(kii) / dai', '', 'big'],
        ['小', 'chii(sai) / shou', '', 'small'],
        ['長', 'naga(i) / chou', '', 'long'],
        ['高', 'taka(i) / kou', '', 'tall / expensive'],
      ]),
      row('kj-7', 'Stage 7 · Action & more N5', 'Common verbs and leftover beginners.', [
        ['見', 'mi(ru) / ken', '', 'see'],
        ['聞', 'ki(ku) / bun', '', 'hear / ask'],
        ['行', 'i(ku) / kou', '', 'go'],
        ['来', 'ku(ru) / rai', '', 'come'],
        ['出', 'de(ru) / shutsu', '', 'exit'],
        ['入', 'hai(ru) / nyuu', '', 'enter'],
        ['車', 'kuruma / sha', '', 'car'],
        ['電', 'den', '', 'electricity'],
        ['話', 'hana(su) / wa', '', 'talk'],
        ['語', 'go / kata(ru)', '', 'language'],
        ['何', 'nani / nan', '', 'what'],
        ['円', 'en', '', 'yen / circle'],
        ['白', 'shiro / haku', '', 'white'],
        ['安', 'yasu(i) / an', '', 'cheap / peace'],
        ['新', 'atara(shii) / shin', '', 'new'],
      ]),
    ],
  },
  ...VOCAB_SCRIPTS,
  ...OFFICE_SCRIPT,
};

export function getScript(scriptId) {
  return SCRIPTS[scriptId] || null;
}

export function getStage(scriptId, stageId) {
  const script = getScript(scriptId);
  if (!script) return null;
  return script.stages.find((s) => s.id === stageId) || null;
}

export function allCharsInScript(scriptId, upToStageIndex = Infinity) {
  const script = getScript(scriptId);
  if (!script) return [];
  const out = [];
  script.stages.forEach((stage, index) => {
    if (index > upToStageIndex) return;
    if (stage.id.endsWith('-mix')) return;
    out.push(...stage.chars);
  });
  return out;
}

function markMixStages() {
  for (const script of Object.values(SCRIPTS)) {
    for (const stage of script.stages) {
      if (stage.id.endsWith('-mix')) {
        stage.mix = true;
      }
    }
  }
}
markMixStages();
