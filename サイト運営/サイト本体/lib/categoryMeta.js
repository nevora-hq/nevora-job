// トップページの「カテゴリで探す」まとめセクション用の表示情報。
// 対象ジャンルはプロジェクト直下のCLAUDE.mdを唯一の情報源とし、
// カテゴリが増えた場合はここに追記する(未登録カテゴリはdefaultにフォールバック)。
// imageは任意項目。カテゴリ用のイメージ画像を用意したら
// image: "/images/category/xxx.webp" を追加すると、トップページのカテゴリ
// カルーセルに画像付きで並ぶ(未設定のカテゴリはテキストカードで表示される)。
const CATEGORY_META = {
  "副業の始め方": {
    icon: "🚀",
    color: "#145997",
    soft: "#e3f1fd",
    image: "/images/category/start.webp",
    description:
      "何から手をつければいいのか、どう選べばいいのか。副業をゼロから始めるための手順と考え方をまとめています。",
    shortSummary:
      "何から始めるか、どう選ぶか。副業をゼロから始める手順と考え方。",
  },
  "Webライティング": {
    icon: "✍️",
    color: "#08684b",
    soft: "#e7f9f2",
    image: "/images/category/writing.webp",
    description:
      "未経験から案件を取るまでの流れ、単価の上げ方、書き方のコツなど、Webライティングで稼ぐための情報を紹介します。",
    shortSummary:
      "未経験から案件獲得まで。単価の上げ方と書き方のコツ。",
  },
  "デザイン・動画編集": {
    icon: "🎨",
    color: "#983a08",
    soft: "#fdede3",
    image: "/images/category/design.webp",
    description:
      "バナー制作・サムネイル・動画編集など、制作スキルを副収入につなげる方法と必要なツールをまとめています。",
    shortSummary:
      "バナー・サムネイル・動画編集。制作スキルを副収入につなげる方法。",
  },
  "プログラミング・IT": {
    icon: "💻",
    color: "#5938b9",
    soft: "#eae3fd",
    image: "/images/category/programming.webp",
    description:
      "学習ロードマップから小さな受託案件の取り方まで、IT・プログラミング系の副業に必要な情報を紹介します。",
    shortSummary:
      "学習ロードマップから受託案件の取り方まで。IT系副業の始め方。",
  },
  "せどり・物販": {
    icon: "📦",
    color: "#8e4407",
    soft: "#fdefe3",
    image: "/images/category/resale.webp",
    description:
      "仕入れ・出品・発送の流れ、利益計算、在庫リスクとの付き合い方など、物販で失敗しないための知識をまとめています。",
    shortSummary:
      "仕入れから発送まで。利益計算と在庫リスクとの付き合い方。",
  },
  "ブログ・アフィリエイト": {
    icon: "📝",
    color: "#854e00",
    soft: "#fdf5e3",
    image: "/images/category/blog.webp",
    description:
      "サイトの立ち上げ方、記事の書き方、ASPの選び方まで。時間はかかるが積み上がる副業の進め方を紹介します。",
    shortSummary:
      "サイト立ち上げ・記事の書き方・ASP選び。積み上がる副業の進め方。",
  },
  "スキル販売・クラウドソーシング": {
    icon: "🤝",
    color: "#096272",
    soft: "#e6f6f9",
    image: "/images/category/skill-market.webp",
    description:
      "クラウドソーシングやスキルマーケットで、自分の得意を売るための出品のコツと、トラブルを避ける立ち回りをまとめています。",
    shortSummary:
      "得意を売るための出品のコツと、トラブルを避ける立ち回り。",
  },
  "ポイ活・すきま時間": {
    icon: "🎁",
    color: "#842b9a",
    soft: "#f5e4fb",
    image: "/images/category/points.webp",
    description:
      "アンケート・ポイントサイト・アプリなど、通勤中や家事の合間にコツコツ積める小さな収入源を紹介します。",
    shortSummary:
      "アンケート・ポイントサイト・アプリ。すきま時間で積める収入源。",
  },
  "投資・資産形成": {
    icon: "📈",
    color: "#20672e",
    soft: "#e8f8ec",
    image: "/images/category/invest.webp",
    description:
      "副業で得たお金をどう置いておくか。NISAや積立など、無理のない資産形成の考え方を整理しています。",
    shortSummary:
      "稼いだお金の置き場所。NISA・積立など無理のない資産形成の考え方。",
  },
  "税金・確定申告": {
    icon: "🧾",
    color: "#495057",
    soft: "#eef0f1",
    image: "/images/category/tax.webp",
    description:
      "いくらから申告が必要か、経費はどこまで認められるか、住民税や会社バレの話まで。副業のお金まわりの手続きをまとめています。",
    shortSummary:
      "申告ラインと経費の範囲、住民税の扱い。副業のお金まわりの手続き。",
  },
  "在宅ワーク・働き方": {
    icon: "🏠",
    color: "#a61919",
    soft: "#fde5e5",
    image: "/images/category/remote-work.webp",
    description:
      "本業と両立するための時間の使い方、在宅で働く環境づくり、続けるためのペース配分を紹介します。",
    shortSummary:
      "本業との両立、在宅の環境づくり、続けるためのペース配分。",
  },
  "副業の基礎知識": {
    icon: "📚",
    color: "#501af4",
    soft: "#ede6fd",
    image: "/images/category/basics.webp",
    description:
      "就業規則・契約・報酬の仕組みなど、始める前に知っておきたい副業の土台になる知識を幅広く扱います。",
    shortSummary:
      "就業規則・契約・報酬の仕組み。始める前に知っておきたい土台の知識。",
  },
};

// ホームページで常時表示する大カテゴリ12種(CLAUDE.mdの対象分野を唯一の情報源とする
// 分類表に基づく表示順)。記事の有無に関わらずこの並び順で表示する。
export const MAJOR_CATEGORIES = [
  "副業の始め方",
  "Webライティング",
  "デザイン・動画編集",
  "プログラミング・IT",
  "せどり・物販",
  "ブログ・アフィリエイト",
  "スキル販売・クラウドソーシング",
  "ポイ活・すきま時間",
  "在宅ワーク・働き方",
  "税金・確定申告",
  "投資・資産形成",
  "副業の基礎知識",
];

const DEFAULT_META = {
  icon: "📁",
  color: "#495057",
  soft: "#f1f3f5",
  description: "このカテゴリに関する記事をまとめています。",
  shortSummary: "このカテゴリに関する記事をまとめています。",
};

export function getCategoryMeta(name) {
  return CATEGORY_META[name] || DEFAULT_META;
}
