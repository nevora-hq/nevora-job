// サイト公式マスコットキャラクターの設定。
// 対象ジャンル(プロジェクト直下のCLAUDE.mdが唯一の情報源)が今後広がった場合は
// CATEGORY_MASCOTSのキーを実際のカテゴリ名に合わせて追記すること
// (未登録カテゴリはnullを返し、マスコットは非表示になる)。
//
// ワーキーくんはサイト全体の案内役(メインマスコット)。
// 各カテゴリ担当キャラクターは、カテゴリのアイコン(lib/categoryMeta.js)と
// 同じモチーフを擬人化しており、色もcategoryMetaのcolorに揃えている。
const WAKII = {
  name: "ワーキーくん",
  role: "サイト全体の案内役(メインマスコット)",
  normalImage: "/images/mascot/wakii-normal.svg",
  researchImage: "/images/mascot/wakii-research.svg",
  comments: [
    "スキマ時間から始められる副業も多いから、無理なく探してみてね。",
    "始める前に、報酬の仕組みや口コミをよく確認するのが大事だよ。",
    "情報を集めて、自分に合った働き方を見つけよう。",
  ],
};

const PIISUKE = {
  name: "ピースケ",
  role: "「副業の種類」担当(モチーフ: パズルピース)",
  normalImage: "/images/mascot/piisuke-normal.svg",
  researchImage: "/images/mascot/piisuke-research.svg",
  comments: [
    "副業にはたくさんの種類があるから、自分の得意なことから探してみるといいよ。",
    "同じジャンルでも案件によって特徴が違うから、いくつか比べてみてね。",
    "興味のある分野から始めると、無理なく続けやすいよ。",
  ],
};

const ROKETTA = {
  name: "ロケッタ",
  role: "「副業の始め方」担当(モチーフ: ロケット)",
  normalImage: "/images/mascot/roketta-normal.svg",
  researchImage: "/images/mascot/roketta-research.svg",
  comments: [
    "始める前に、必要な準備や注意点を確認しておくと安心だよ。",
    "最初の一歩は小さくてOK、まずは登録から始めてみよう。",
    "本業とのバランスを考えながら、無理のない範囲で始めてね。",
  ],
};

const RENCHIRU = {
  name: "レンチル",
  role: "「副業スキル」担当(モチーフ: スパナ)",
  normalImage: "/images/mascot/renchiru-normal.svg",
  researchImage: "/images/mascot/renchiru-research.svg",
  comments: [
    "スキルは一度に完璧を目指さず、少しずつ身につけていけば大丈夫だよ。",
    "得意なスキルを一つ伸ばすと、案件の幅も広がりやすいよ。",
    "学んだスキルは実際の案件で使ってみると定着しやすいよ。",
  ],
};

const TSUNAGU = {
  name: "ツナグ",
  role: "「仕事・案件獲得」担当(モチーフ: 握手)",
  normalImage: "/images/mascot/tsunagu-normal.svg",
  researchImage: "/images/mascot/tsunagu-research.svg",
  comments: [
    "案件を探すときは、条件や口コミをしっかり確認しようね。",
    "ポートフォリオを整えておくと、案件獲得がスムーズになるよ。",
    "小さな案件からコツコツ実績を積むのがおすすめだよ。",
  ],
};

const CHARIN = {
  name: "チャリン",
  role: "「副業収入」担当(モチーフ: 貯金箱・コイン)",
  normalImage: "/images/mascot/charin-normal.svg",
  researchImage: "/images/mascot/charin-research.svg",
  comments: [
    "収入は人によって差があるから、無理のない目標から考えようね。",
    "報酬の仕組みや手数料も事前にきちんと確認しておこう。",
    "収入が増えてきたら、確定申告のことも忘れずにね。",
  ],
};

const FORUMII = {
  name: "フォルミー",
  role: "「副業の管理」担当(モチーフ: ファイルフォルダ)",
  normalImage: "/images/mascot/forumii-normal.svg",
  researchImage: "/images/mascot/forumii-research.svg",
  comments: [
    "本業との両立には、スケジュール管理が欠かせないよ。",
    "収支や案件の記録はこまめに整理しておくと安心だよ。",
    "税金や契約まわりのルールも、早めに確認しておこう。",
  ],
};

const MITEMII = {
  name: "ミテミー",
  role: "「副業サービス」担当(モチーフ: 虫眼鏡)",
  normalImage: "/images/mascot/mitemii-normal.svg",
  researchImage: "/images/mascot/mitemii-research.svg",
  comments: [
    "サービスによって特徴が違うから、じっくり比べてみようね。",
    "自分の目的に合ったサービスを選ぶのが失敗しないコツだよ。",
    "無料登録できるサービスも多いから、気軽に試してみてね。",
  ],
};

export const MAIN_MASCOT = WAKII;

const CATEGORY_MASCOTS = {
  "副業の種類": PIISUKE,
  "副業の始め方": ROKETTA,
  "副業スキル": RENCHIRU,
  "仕事・案件獲得": TSUNAGU,
  "副業収入": CHARIN,
  "副業の管理": FORUMII,
  "副業サービス": MITEMII,
};

function pickComment(mascot, seed) {
  const sum = String(seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return mascot.comments[sum % mascot.comments.length];
}

export function getCategoryMascot(categoryName, seed = categoryName, overrideComment = "") {
  const mascot = CATEGORY_MASCOTS[categoryName];
  if (!mascot) return null;
  return { ...mascot, comment: overrideComment || pickComment(mascot, seed) };
}
