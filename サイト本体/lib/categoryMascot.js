// カテゴリ別のマスコットキャラクター設定。
// 現状はジャンル(対象分野はプロジェクト直下のCLAUDE.mdが唯一の情報源)全体で
// 副業・在宅ワークブランチのみ「ワーキーくん」を割り当てている。
// 実際のカテゴリ名はキーワード調査・記事制作が進み次第確定するため、
// カテゴリページ設計時にCATEGORY_MASCOTSのキーを実際のカテゴリ名に合わせて追記・修正すること
// (未登録カテゴリはnullを返し、マスコットは非表示になる)。
const WAKII = {
  name: "ワーキーくん",
  normalImage: "/images/mascot/wakii-normal.svg",
  researchImage: "/images/mascot/wakii-research.svg",
  comments: [
    "スキマ時間から始められる副業も多いから、無理なく探してみてね。",
    "始める前に、報酬の仕組みや口コミをよく確認するのが大事だよ。",
    "情報を集めて、自分に合った働き方を見つけよう。",
  ],
};

const CATEGORY_MASCOTS = {
  "副業": WAKII,
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
