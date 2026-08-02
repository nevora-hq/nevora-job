// トップページの「カテゴリで探す」まとめセクション用の表示情報。
// 対象ジャンルはプロジェクト直下のCLAUDE.mdを唯一の情報源とし、
// カテゴリが増えた場合はここに追記する(未登録カテゴリはdefaultにフォールバック)。
const CATEGORY_META = {
  "副業の種類": {
    icon: "🧩",
    color: "#0ca678",
    soft: "#e3fcef",
    description:
      "Web系副業・クリエイティブ副業・SNS運用・販売系副業・情報発信・在宅ワークなど、副業の種類ごとの特徴を紹介します。",
  },
  "副業の始め方": {
    icon: "🚀",
    color: "#f08c00",
    soft: "#fff3bf",
    description:
      "初心者向けの副業選びから開始準備、初案件の取り方、会社への申告など始め方の手順をまとめています。",
  },
  "副業スキル": {
    icon: "🛠️",
    color: "#e64980",
    soft: "#ffe3ee",
    description:
      "ライティング・デザイン・動画編集・プログラミング・マーケティングなど副業に役立つスキルを紹介します。",
  },
  "仕事・案件獲得": {
    icon: "🤝",
    color: "#1971c2",
    soft: "#d0ebff",
    description:
      "クラウドソーシングでの案件の探し方・営業・ポートフォリオ作成・SNS集客・リピーター獲得のコツをまとめています。",
  },
  "副業収入": {
    icon: "💰",
    color: "#2f9e44",
    soft: "#ebfbee",
    description:
      "収益化の方法や単価アップの交渉術、月収別・職種別の副業収入例を紹介します。",
  },
  "副業の管理": {
    icon: "🗂️",
    color: "#495057",
    soft: "#e9ecef",
    description:
      "本業との両立や時間管理、お金の管理、税金・確定申告、契約や著作権など副業を続ける上での管理術をまとめています。",
  },
  "副業サービス": {
    icon: "🔍",
    color: "#7048e8",
    soft: "#ede6fd",
    description:
      "クラウドソーシングやスキル販売サービス、求人サービス、学習サービスの比較・選び方を紹介します。",
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
