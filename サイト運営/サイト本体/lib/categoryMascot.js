// カテゴリ別のマスコットキャラクター設定。
// NEVORA公式マスコット体系。大カテゴリ12種 + サイト全体のメインマスコット
// 「ネヴォミンちゃん」で構成する。
// 各キャラは normalImage(挨拶)/researchImage(補足)/matomeImage(振り返り)の
// 3ポーズを持つ。画像ファイル名は旧名(tsuyamin等)のまま流用しており、
// 表示名だけを副業サイト向けに付け直している。
// 新ジャンル追加時はこのファイルに追記するだけで拡張できる設計を維持する。

export const HAJIMIN = {
  name: "ハジミンちゃん",
  normalImage: "/images/mascot/tsuyamin-normal.svg",
  researchImage: "/images/mascot/tsuyamin-research.svg",
  matomeImage: "/images/mascot/tsuyamin-matome.svg",
  comments: [
    "向いている副業は人それぞれ。まずは小さく試してみてね。",
    "最初の1件が一番むずかしいから、そこだけ乗り越えよう。",
    "情報を集めて、自分の生活に合うやり方を見つけよう。",
  ],
  introComments: [
    "こんにちは、ハジミンだよ!今日は副業の始め方のお話をするね。",
    "やあ、ハジミン参上!一歩目を一緒に確認していこう。",
  ],
  outroComments: [
    "今日の内容、参考になったかな?自分のペースで進めてね。",
    "最後まで読んでくれてありがとう!また次の記事でね。",
  ],
};

const KAKIMIN = {
  name: "カキミンちゃん",
  normalImage: "/images/mascot/kiramin-normal.svg",
  researchImage: "/images/mascot/kiramin-research.svg",
  matomeImage: "/images/mascot/kiramin-matome.svg",
  comments: [
    "書く仕事は、実績が増えるほど条件がよくなっていくよ。",
    "最初の単価だけで判断せず、続けられるかどうかも見てみてね。",
  ],
  introComments: [
    "こんにちは、カキミンです。今日は書く仕事のお話をひも解いていきますね。",
    "カキミン、参上!案件の取り方を一緒に見てみよう。",
  ],
  outroComments: [
    "書く力は積み上がるものだから、焦らずいこうね。",
    "今日学んだこと、次の提案文に活かしてみてね。",
  ],
};

const TSUKUMIN = {
  name: "ツクミンちゃん",
  normalImage: "/images/mascot/iromin-normal.svg",
  researchImage: "/images/mascot/iromin-research.svg",
  matomeImage: "/images/mascot/iromin-matome.svg",
  comments: [
    "作ったものは、そのままポートフォリオになるよ。",
    "同じ道具でも仕上がりは人それぞれ。まずは1本作ってみよう。",
  ],
  introComments: [
    "こんにちは、ツクミンだよ!今日は制作系のお話をするね。",
    "ツクミン登場!手を動かすところまで一緒にいこう。",
  ],
  outroComments: [
    "1つ完成させると世界が変わるよ。試してみてね。",
    "読んでくれてありがとう!次はあなたの作品を作る番だよ。",
  ],
};

const KODOMIN = {
  name: "コドミンちゃん",
  normalImage: "/images/mascot/denmin-normal.svg",
  researchImage: "/images/mascot/denmin-research.svg",
  matomeImage: "/images/mascot/denmin-matome.svg",
  comments: [
    "全部を覚えてから始めなくて大丈夫。小さく作って動かそう。",
    "エラーは失敗じゃなくて、次のヒントだよ。",
  ],
  introComments: [
    "こんにちは、コドミンです。今日は技術まわりの話をしますね。",
    "コドミン参上!むずかしそうな部分をほぐしていこう。",
  ],
  outroComments: [
    "動くものが1つできたら、それがもう実績だよ。",
    "最後まで読んでくれてありがとう。手元でも試してみてね。",
  ],
};

const URIMIN = {
  name: "ウリミンちゃん",
  normalImage: "/images/mascot/mochimin-normal.svg",
  researchImage: "/images/mascot/mochimin-research.svg",
  matomeImage: "/images/mascot/mochimin-matome.svg",
  comments: [
    "仕入れる前に、手数料と送料まで含めて計算してみてね。",
    "売れる数より、残ったときのことを先に考えておこう。",
  ],
  introComments: [
    "こんにちは、ウリミンだよ!今日は物販のお話をするね。",
    "ウリミン参上!利益の計算から一緒に見ていこう。",
  ],
  outroComments: [
    "数字で判断できるようになると、ぐっと安定してくるよ。",
    "読んでくれてありがとう!無理のない規模から試してね。",
  ],
};

const BUROMIN = {
  name: "ブロミンちゃん",
  normalImage: "/images/mascot/saramin-normal.svg",
  researchImage: "/images/mascot/saramin-research.svg",
  matomeImage: "/images/mascot/saramin-matome.svg",
  comments: [
    "すぐには伸びないけれど、書いた分だけ残っていくよ。",
    "誰に向けて書くかを決めると、内容がぶれにくくなるよ。",
  ],
  introComments: [
    "こんにちは、ブロミンです。今日は積み上げ型の副業の話をしますね。",
    "ブロミン参上!続けるためのコツを一緒に見ていこう。",
  ],
  outroComments: [
    "半年後の自分のために、今日1本書いてみようね。",
    "最後まで読んでくれてありがとう。焦らず続けていこう。",
  ],
};

const UKEMIN = {
  name: "ウケミンちゃん",
  normalImage: "/images/mascot/utsumin-normal.svg",
  researchImage: "/images/mascot/utsumin-research.svg",
  matomeImage: "/images/mascot/utsumin-matome.svg",
  comments: [
    "できることを細かく書くほど、依頼側は選びやすくなるよ。",
    "条件のすり合わせは、着手前にきちんと文字で残しておこう。",
  ],
  introComments: [
    "こんにちは、ウケミンだよ!今日は受注まわりのお話をするね。",
    "ウケミン参上!出品と提案のコツを見ていこう。",
  ],
  outroComments: [
    "はじめの数件を丁寧にこなすと、評価が味方してくれるよ。",
    "読んでくれてありがとう!よい依頼に出会えますように。",
  ],
};

const TAMEMIN = {
  name: "タメミンちゃん",
  normalImage: "/images/mascot/kurumin-normal.svg",
  researchImage: "/images/mascot/kurumin-research.svg",
  matomeImage: "/images/mascot/kurumin-matome.svg",
  comments: [
    "小さな金額でも、続けると意外とまとまるよ。",
    "個人情報の扱いだけは、登録前に確認しておこうね。",
  ],
  introComments: [
    "こんにちは、タメミンだよ!今日はすきま時間のお話をするね。",
    "タメミン参上!コツコツ派のやり方を見ていこう。",
  ],
  outroComments: [
    "無理なく続けられる範囲でやるのが一番だよ。",
    "読んでくれてありがとう!今日の分から始めてみてね。",
  ],
};

const FUYAMIN = {
  name: "フヤミンちゃん",
  normalImage: "/images/mascot/hikamin-normal.svg",
  researchImage: "/images/mascot/hikamin-research.svg",
  matomeImage: "/images/mascot/hikamin-matome.svg",
  comments: [
    "増やす前に、減らさない工夫から始めてみてね。",
    "値動きのある商品は、余裕資金の範囲で付き合おう。",
  ],
  introComments: [
    "こんにちは、フヤミンです。今日はお金の置き場所の話をしますね。",
    "フヤミン参上!無理のない範囲で一緒に考えよう。",
  ],
  outroComments: [
    "焦って大きく動かさないのが、長続きのコツだよ。",
    "最後まで読んでくれてありがとう。自分のペースでね。",
  ],
};

const ZEIMIN = {
  name: "ゼイミンちゃん",
  normalImage: "/images/mascot/karumin-normal.svg",
  researchImage: "/images/mascot/karumin-research.svg",
  matomeImage: "/images/mascot/karumin-matome.svg",
  comments: [
    "領収書は、あとで困らないように今のうちに残しておこう。",
    "判断に迷う金額は、税務署や税理士に確認するのが確実だよ。",
  ],
  introComments: [
    "こんにちは、ゼイミンだよ!今日は手続きまわりのお話をするね。",
    "ゼイミン参上!むずかしい制度をやさしく整理していこう。",
  ],
  outroComments: [
    "早めに準備しておくと、申告の時期がぐっと楽になるよ。",
    "読んでくれてありがとう!具体的な判断は専門家にも相談してね。",
  ],
};

const OUCHIMIN = {
  name: "オウチミンちゃん",
  normalImage: "/images/mascot/nemumin-normal.svg",
  researchImage: "/images/mascot/nemumin-research.svg",
  matomeImage: "/images/mascot/nemumin-matome.svg",
  comments: [
    "がんばりすぎない設計にしておくと、長く続けられるよ。",
    "作業する時間を先に決めてしまうと、迷わなくなるよ。",
  ],
  introComments: [
    "こんにちは、オウチミンだよ!今日は働き方のお話をするね。",
    "オウチミン参上!両立のコツを一緒に考えよう。",
  ],
  outroComments: [
    "休むことも作業のうちだよ。無理せずいこうね。",
    "最後まで読んでくれてありがとう。今日はゆっくり休んでね。",
  ],
};

const MANAMIN = {
  name: "マナミンちゃん",
  normalImage: "/images/mascot/manamin-normal.svg",
  researchImage: "/images/mascot/manamin-research.svg",
  matomeImage: "/images/mascot/manamin-matome.svg",
  comments: [
    "仕組みを知っておくと、迷ったときの判断が早くなるよ。",
    "用語がわかると、募集要項の意味も見えてくるよ。",
  ],
  introComments: [
    "こんにちは、マナミンです。今日は基礎から整理していきますね。",
    "マナミン参上!前提になる知識を一緒に確認しよう。",
  ],
  outroComments: [
    "土台がわかると、次の一歩が選びやすくなるよ。",
    "読んでくれてありがとう。気になる用語は調べてみてね。",
  ],
};

// サイト全体のメインマスコット。カテゴリを横断する案内・ホームページで使用する。
export const NEVOMIN = {
  name: "ネヴォミンちゃん",
  normalImage: "/images/mascot/nevomin-normal.svg",
  researchImage: "/images/mascot/nevomin-research.svg",
  matomeImage: "/images/mascot/nevomin-matome.svg",
  comments: [
    "気になるテーマは、カテゴリからも探せるよ。",
    "迷ったときは、担当のミンたちに聞いてみてね。",
  ],
  introComments: [
    "こんにちは、ネヴォミンです。NEVORAへようこそ。",
    "ようこそ、NEVORAへ。ここでは色んな「ミン」たちが案内役をしていますよ。",
  ],
  outroComments: [
    "気になるカテゴリがあれば、担当のミンたちが待っていますよ。",
    "また会いましょう。今日も読んでくれてありがとう。",
  ],
  // ホームページ冒頭専用の自己紹介コメント(トップページのみで使用)。
  homeComment:
    "はじめまして、ネヴォミンだよ!このサイトでは副業に役立つ情報を、カテゴリー担当のなかまたちと一緒に紹介しているよ。気になるジャンルから読んでみてね。",
};

const CATEGORY_MASCOTS = {
  "副業の始め方": HAJIMIN,
  "Webライティング": KAKIMIN,
  "デザイン・動画編集": TSUKUMIN,
  "プログラミング・IT": KODOMIN,
  "せどり・物販": URIMIN,
  "ブログ・アフィリエイト": BUROMIN,
  "スキル販売・クラウドソーシング": UKEMIN,
  "ポイ活・すきま時間": TAMEMIN,
  "在宅ワーク・働き方": OUCHIMIN,
  "税金・確定申告": ZEIMIN,
  "投資・資産形成": FUYAMIN,
  "副業の基礎知識": MANAMIN,
};

export {
  KAKIMIN,
  TSUKUMIN,
  KODOMIN,
  URIMIN,
  BUROMIN,
  UKEMIN,
  TAMEMIN,
  FUYAMIN,
  ZEIMIN,
  OUCHIMIN,
  MANAMIN,
};

function pickFrom(list, seed) {
  if (!Array.isArray(list) || list.length === 0) return "";
  const sum = String(seed)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return list[sum % list.length];
}

function pickComment(mascot, seed) {
  return pickFrom(mascot.comments, seed);
}

export function getCategoryMascot(categoryName, seed = categoryName, overrideComment = "") {
  const mascot = CATEGORY_MASCOTS[categoryName];
  if (!mascot) return null;
  return { ...mascot, comment: overrideComment || pickComment(mascot, seed) };
}

// 記事冒頭の挨拶コメント(normalポーズ)を取得する。
export function getMascotIntroComment(mascot, seed) {
  return pickFrom(mascot.introComments, seed);
}

// 記事末尾の振り返りコメント(matomeポーズ)を取得する。
export function getMascotOutroComment(mascot, seed) {
  return pickFrom(mascot.outroComments, seed);
}
