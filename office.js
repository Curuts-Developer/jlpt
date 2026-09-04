/** Workplace Japanese: learn the word, then fill it into a sentence. */

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

export const OFFICE_SCRIPT = {
  office: {
    id: 'office',
    label: 'Office',
    kicker: 'Workplace Japanese',
    blurb: 'Meetings, email, and desk work. Learn each word, then fill it into a real office sentence.',
    kind: 'cloze',
    group: 'special',
    stages: [
      pack(
        'off-0',
        'Stage 0 · First office words',
        'Six desk words. See the sentence with the word in it, then pick A–F to fill the blank.',
        [
          ['会社', 'kaisha', 'company', '私は___で働いています。', 'I work at a company.'],
          ['仕事', 'shigoto', 'work / job', '今日は___が多いです。', 'I have a lot of work today.'],
          ['会議', 'kaigi', 'meeting', '___は三時からです。', 'The meeting starts at three.'],
          ['メール', 'meeru', 'email', '___を送ってください。', 'Please send the email.'],
          ['上司', 'joushi', 'boss / superior', '___に報告します。', 'I will report to my boss.'],
          ['残業', 'zangyou', 'overtime', '今日は___です。', 'Today is overtime.'],
        ],
        { intro: true }
      ),
      pack('off-1', 'Stage 1 · Meetings', 'Room, materials, presenting, joining.', [
        ['会議室', 'kaigishitsu', 'meeting room', '___を予約してください。', 'Please book the meeting room.'],
        ['資料', 'shiryou', 'materials / documents', '___を配ります。', 'I will hand out the materials.'],
        ['発表', 'happyou', 'presentation', '明日___があります。', 'There is a presentation tomorrow.'],
        ['参加', 'sanka', 'participation', '会議に___します。', 'I will join the meeting.'],
        ['予定', 'yotei', 'schedule / plan', '___を確認してください。', 'Please check the schedule.'],
        ['時間', 'jikan', 'time', '___がありません。', 'There is no time.'],
        ['議題', 'gidai', 'agenda', '今日の___はこれです。', 'This is today’s agenda.'],
        ['決める', 'kimeru', 'to decide', 'ここで___ましょう。', 'Let’s decide it here.'],
      ]),
      pack('off-2', 'Stage 2 · Email', 'Send, reply, attach, subject line.', [
        ['送信', 'soshin', 'send (transmit)', 'このメールを___してください。', 'Please send this email.'],
        ['返信', 'henshin', 'reply', 'すぐ___します。', 'I will reply right away.'],
        ['添付', 'tenpu', 'attachment', 'ファイルを___します。', 'I will attach the file.'],
        ['件名', 'kenmei', 'subject (email)', '___を書いてください。', 'Please write the subject.'],
        ['確認', 'kakunin', 'confirmation', '内容を___してください。', 'Please confirm the contents.'],
        ['削除', 'sakujo', 'delete', 'これを___してもいいですか。', 'May I delete this?'],
        ['受信', 'jushin', 'receive', 'メールを___しました。', 'I received the email.'],
        ['本文', 'honbun', 'body (of email)', '___を読んでください。', 'Please read the body.'],
      ]),
      pack('off-3', 'Stage 3 · People at work', 'Boss, colleague, customer, sales.', [
        ['部長', 'buchou', 'department manager', '___に聞いてください。', 'Please ask the department manager.'],
        ['課長', 'kachou', 'section chief', '___の席はあそこです。', 'The section chief’s desk is over there.'],
        ['同僚', 'douryou', 'colleague', '___と相談します。', 'I will talk it over with a colleague.'],
        ['部下', 'buka', 'subordinate', '___に仕事を頼みます。', 'I will ask a subordinate to do the work.'],
        ['お客様', 'okyakusama', 'customer (honorific)', '___が来ました。', 'A customer has arrived.'],
        ['担当', 'tantou', 'person in charge', '私は___です。', 'I am the person in charge.'],
        ['営業', 'eigyou', 'sales', '___の仕事をしています。', 'I do sales work.'],
        ['人事', 'jinji', 'HR / personnel', '___に連絡してください。', 'Please contact HR.'],
      ]),
      pack('off-4', 'Stage 4 · Tasks & deadlines', 'Submit, approve, progress, due date.', [
        ['締切', 'shimekiri', 'deadline', '___は金曜日です。', 'The deadline is Friday.'],
        ['報告書', 'houkokusho', 'written report', '___を書いてください。', 'Please write the report.'],
        ['提出', 'teishutsu', 'submission', '明日___します。', 'I will submit it tomorrow.'],
        ['進捗', 'shinchoku', 'progress', '___を教えてください。', 'Please tell me the progress.'],
        ['依頼', 'irai', 'request', '___があります。', 'I have a request.'],
        ['承認', 'shounin', 'approval', '___をお願いします。', 'Please approve this.'],
        ['作成', 'sakusei', 'create / prepare', '資料を___します。', 'I will prepare the materials.'],
        ['納期', 'nouki', 'delivery date', '___に間に合いますか。', 'Will we make the delivery date?'],
      ]),
      pack('off-5', 'Stage 5 · Office manners', 'Contact, consult, consider, be late.', [
        ['連絡', 'renraku', 'contact', '後で___します。', 'I will contact you later.'],
        ['相談', 'soudan', 'consultation', '少し___してもいいですか。', 'May I consult you for a moment?'],
        ['検討', 'kentou', 'consideration', '___します。', 'I will consider it.'],
        ['調整', 'chousei', 'adjustment / coordinate', '日程を___してください。', 'Please coordinate the schedule.'],
        ['報告', 'houkoku', 'report (to someone)', '結果を___します。', 'I will report the result.'],
        ['許可', 'kyoka', 'permission', '___をもらいました。', 'I got permission.'],
        ['遅刻', 'chikoku', 'lateness', '___してすみません。', 'Sorry for being late.'],
        ['休憩', 'kyuukei', 'break', '___の時間です。', 'It is break time.'],
      ]),
      pack(
        'off-mix',
        'Stage 6 · Office mixed review',
        'All office sentences, shuffled. Fill the blank.',
        [],
        { teach: 'grid', mix: true }
      ),
    ],
  },
};
