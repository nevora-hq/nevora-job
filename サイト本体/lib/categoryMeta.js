// トップページの「カテゴリで探す」まとめセクション用の表示情報。
// 対象ジャンルはプロジェクト直下のCLAUDE.mdを唯一の情報源とし、
// カテゴリが増えた場合はここに追記する(未登録カテゴリはdefaultにフォールバック)。
const CATEGORY_META = {
  "アフィリエイト": {
    icon: "🔗",
    color: "#2f9e44",
    soft: "#e6f7ea",
    description:
      "アフィリエイトの始め方・仕組み・ASPの選び方など副業として取り組むための情報をまとめています。",
  },
  "AI自動化": {
    icon: "🤖",
    color: "#1c7ed6",
    soft: "#e7f5ff",
    description:
      "生成AIを活用したライティング・作業効率化・AI副業の始め方や案件獲得のコツを紹介します。",
  },
  "SNS": {
    icon: "📱",
    color: "#e8590c",
    soft: "#ffe8d9",
    description:
      "SNS運用代行やSNSを使った情報発信・集客で収入につなげる方法をまとめています。",
  },
  "物販": {
    icon: "📦",
    color: "#7048e8",
    soft: "#ede6fd",
    description:
      "せどり・輸入転売・ハンドメイド販売など物販ビジネスの始め方や注意点を紹介します。",
  },
};

// カテゴリの「枠」を常に用意しておくための基準カテゴリ名。
// 該当記事がまだ0件でも、トップページ・ヘッダーのカテゴリ一覧に表示し続けるために使う
// (lib/posts.js の getAllCategories 参照)。
export const BASE_CATEGORY_NAMES = Object.keys(CATEGORY_META);

const DEFAULT_META = {
  icon: "📁",
  color: "#495057",
  soft: "#f1f3f5",
  description: "このカテゴリに関する記事をまとめています。",
};

export function getCategoryMeta(name) {
  return CATEGORY_META[name] || DEFAULT_META;
}
