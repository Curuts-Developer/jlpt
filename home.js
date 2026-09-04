/** Home, friends, and neighbors: learn the word, then fill it into a sentence. */

function pack(id, title, subtitle, items, extra = {}) {
  return {
    id,
    title,
    subtitle,
    teach: extra.teach || 'cards',
    intro: Boolean(extra.intro),
    mix: Boolean(extra.mix),
    chars: items.map(([char, romaji, meaning, sentence, sentenceEn]) => ({
      char,
      romaji,
      meaning,
      hint: '',
      sentence,
      sentenceEn,
    })),
  };
}

export const HOME_SCRIPT = {
  home: {
    id: 'home',
    label: 'Home',
    kicker: 'House · friends · neighbors',
    blurb: 'One topic: home life, friends, and the people next door. Fill the word into a sentence.',
    kind: 'cloze',
    group: 'special',
    stages: [
      pack(
        'home-0',
        'Stage 0 · First home words',
        'House, room, family, friend, neighbor. See the sentence, then fill the blank with A–F.',
        [
          ['家', 'ie', 'house / home', 'これは私の___です。', 'This is my house.'],
          ['部屋', 'heya', 'room', '私の___は二階です。', 'My room is on the second floor.'],
          ['家族', 'kazoku', 'family', '___と住んでいます。', 'I live with my family.'],
          ['友達', 'tomodachi', 'friend', '___が遊びに来ます。', 'A friend is coming over.'],
          ['隣人', 'rinjin', 'neighbor', '___にあいさつします。', 'I greet my neighbor.'],
          ['近所', 'kinjo', 'neighborhood', '___は静かです。', 'The neighborhood is quiet.'],
        ],
        { intro: true }
      ),
      pack('home-1', 'Stage 1 · The house', 'Entrance, kitchen, bath, keys, furniture.', [
        ['玄関', 'genkan', 'entrance / genkan', '靴は___で脱ぎます。', 'We take off shoes at the entrance.'],
        ['台所', 'daidokoro', 'kitchen', '母は___にいます。', 'Mom is in the kitchen.'],
        ['お風呂', 'ofuro', 'bath', '夜に___に入ります。', 'I take a bath at night.'],
        ['窓', 'mado', 'window', '___を開けてください。', 'Please open the window.'],
        ['ドア', 'doa', 'door', '___を閉めてください。', 'Please close the door.'],
        ['鍵', 'kagi', 'key', '___を忘れないでください。', 'Please don’t forget the key.'],
        ['家具', 'kagu', 'furniture', '新しい___を買いました。', 'I bought new furniture.'],
        ['二階', 'nikai', 'second floor', '寝室は___です。', 'The bedroom is on the second floor.'],
      ]),
      pack('home-2', 'Stage 2 · Home life', 'Clean, cook, laundry, live, go home.', [
        ['掃除', 'souji', 'cleaning', '今日は___をします。', 'I will clean today.'],
        ['洗濯', 'sentaku', 'laundry', '___が終わりました。', 'The laundry is finished.'],
        ['料理', 'ryouri', 'cooking / a dish', '___が好きです。', 'I like cooking.'],
        ['買い物', 'kaimono', 'shopping', 'スーパーで___します。', 'I shop at the supermarket.'],
        ['ごみ', 'gomi', 'trash', '___を出してください。', 'Please take out the trash.'],
        ['住む', 'sumu', 'to live (somewhere)', 'ここに___のが好きです。', 'I like living here.'],
        ['帰る', 'kaeru', 'to go home', '暗くなる前に___ほうがいいです。', 'You should go home before it gets dark.'],
        ['寝る', 'neru', 'to sleep', '早く___ことが大切です。', 'It is important to sleep early.'],
      ]),
      pack('home-3', 'Stage 3 · Friends', 'Hang out, meet, invite, hobbies.', [
        ['遊ぶ', 'asobu', 'to hang out / play', '一緒に___のが好きです。', 'I like hanging out together.'],
        ['会う', 'au', 'to meet', 'また___のが楽しみです。', 'I look forward to meeting again.'],
        ['誘う', 'sasou', 'to invite', '友だちを___のが好きです。', 'I like inviting friends.'],
        ['一緒', 'issho', 'together', '___に帰りましょう。', 'Let’s go home together.'],
        ['趣味', 'shumi', 'hobby', '___は何ですか。', 'What is your hobby?'],
        ['話す', 'hanasu', 'to talk', '夜まで___ことがあります。', 'We sometimes talk until night.'],
        ['約束', 'yakusoku', 'promise / appointment', '___を守りたいです。', 'I want to keep my promise.'],
        ['楽しい', 'tanoshii', 'fun / enjoyable', '友だちといると___です。', 'It is fun to be with friends.'],
      ]),
      pack('home-4', 'Stage 4 · Neighbors', 'Greet, borrow, quiet, noisy, moving.', [
        ['挨拶', 'aisatsu', 'greeting', '朝___をします。', 'I greet people in the morning.'],
        ['借りる', 'kariru', 'to borrow', '塩を___必要があります。', 'I need to borrow salt.'],
        ['貸す', 'kasu', 'to lend', '傘を___ことができます。', 'I can lend you an umbrella.'],
        ['うるさい', 'urusai', 'noisy', '上の階が___です。', 'The upstairs is noisy.'],
        ['静か', 'shizuka', 'quiet', '夜は___にしてください。', 'Please keep it quiet at night.'],
        ['助ける', 'tasukeru', 'to help', '友だちを___ことが大切です。', 'It is important to help friends.'],
        ['引っ越し', 'hikkoshi', 'moving house', '来月___します。', 'I will move next month.'],
        ['ペット', 'petto', 'pet', '___を飼っています。', 'I keep a pet.'],
      ]),
      pack(
        'home-mix',
        'Stage 5 · Home mixed review',
        'House, friends, and neighbors, shuffled. Fill the blank.',
        [],
        { teach: 'grid', mix: true }
      ),
    ],
  },
};
