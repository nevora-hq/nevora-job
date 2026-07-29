// トップページの「カテゴリで探す」まとめセクション用の表示情報。
// 対象ジャンルはプロジェクト直下のCLAUDE.mdを唯一の情報源とし、
// カテゴリが増えた場合はここに追記する(未登録カテゴリはdefaultにフォールバック)。
const CATEGORY_META = {
  "副業": {
    icon: "💼",
    color: "#2f9e44",
    soft: "#e6f7ea",
    description:
      "スキマ時間から始められる副業や在宅ワークの選び方・始め方をまとめています。",
  },
  "クラウドソーシング": {
    icon: "🖥️",
    color: "#1c7ed6",
    soft: "#e7f5ff",
    description:
      "クラウドソーシングサービスの使い方や案件の探し方を紹介します。",
  },
  "スキルシェア": {
    icon: "🤝",
    color: "#e8590c",
    soft: "#ffe8d9",
    description:
      "自分のスキルを活かして収入を得る方法や始め方をまとめています。",
  },
  "フリーランス": {
    icon: "📈",
    color: "#7048e8",
    soft: "#ede6fd",
    description:
      "独立・フリーランスとして働く際に知っておきたい情報を紹介します。",
  },
};

const DEFAULT_META = {
  icon: "📁",
  color: "#495057",
  soft: "#f1f3f5",
  description: "このカテゴリに関する記事をまとめています。",
};

export function getCategoryMeta(name) {
  return CATEGORY_META[name] || DEFAULT_META;
}
