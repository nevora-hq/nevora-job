// トップページ「カテゴリで探す」の円形ナビ用ジャンル定義。
// 大カテゴリ(lib/categoryMeta.js の MAJOR_CATEGORIES)をジャンルにまとめる。
// カテゴリを増減したら、ここの categories を直すだけで円形ナビが描き直される。
// ルール: 全カテゴリが必ずどれか1つのジャンルに入ること(漏れると「すべて」以外で出なくなる)。
// ジャンル数は3〜6が見やすい(ナビ側で円の配置と大きさを個数から計算する)。
// soft(円の薄い背景)・line(選択時の枠色)は、カテゴリ色(categoryMeta.js)の系統に揃えている。
export const CATEGORY_GENRES = [
  {
    id: "start",
    label: "始める・守る",
    icon: "compass",
    soft: "#e3f1fd",
    line: "#145997",
    categories: ["副業の始め方", "副業の基礎知識", "副業のトラブル対策"],
  },
  {
    id: "skill",
    label: "スキルで稼ぐ",
    icon: "pen",
    soft: "#fdede3",
    line: "#983a08",
    categories: [
      "Webライティング",
      "デザイン・動画編集",
      "プログラミング・IT",
      "スキル販売・クラウドソーシング",
    ],
  },
  {
    id: "sell",
    label: "売る・発信する",
    icon: "box",
    soft: "#fdf5e3",
    line: "#854e00",
    categories: ["せどり・物販", "ブログ・アフィリエイト"],
  },
  {
    id: "life",
    label: "暮らしと両立",
    icon: "home",
    soft: "#f5e4fb",
    line: "#842b9a",
    categories: ["ポイ活・すきま時間", "在宅ワーク・働き方"],
  },
  {
    id: "money",
    label: "お金の手続き",
    icon: "coin",
    soft: "#e8f8ec",
    line: "#20672e",
    categories: ["税金・確定申告", "投資・資産形成"],
  },
];

// ジャンルが7以上になったら円ではなくチップ表示に切り替える境目。
export const GENRE_CIRCLE_MAX = 6;
