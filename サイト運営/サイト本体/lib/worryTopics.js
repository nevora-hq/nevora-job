// ホームの「あなたの副業の悩みから探す」チップの定義。
// 全15件が /worry/[slug] へ着地する。記事との紐付けは記事frontmatterの
// worry フィールド(明示付与、部分一致判定は使わない)のみで行う。
// 注意: このファイルは pages/index.js(クライアントバンドルに含まれる)からも
// importされるため、Node専用のlib/posts.js(fs使用)を絶対にimportしないこと。
// 記事一覧の絞り込み(getPostsByWorry相当)はpages/worry/[slug].jsのgetStaticProps側で行う。

import {
  HAJIMIN,
  KAKIMIN,
  UKEMIN,
  BUROMIN,
  TAMEMIN,
  OUCHIMIN,
  ZEIMIN,
  FUYAMIN,
  MANAMIN,
} from "./categoryMascot";

export const WORRY_GROUPS = [
  {
    heading: "始める前",
    items: [
      { slug: "what-to-start", label: "何から始めるか", primaryCategory: "副業の始め方", mascot: HAJIMIN },
      { slug: "no-skill", label: "スキルがない", primaryCategory: "副業の始め方", mascot: HAJIMIN },
      { slug: "no-time", label: "時間がない", primaryCategory: "在宅ワーク・働き方", mascot: OUCHIMIN },
      { slug: "company-rules", label: "会社の就業規則", primaryCategory: "副業の基礎知識", mascot: MANAMIN },
      { slug: "low-cost", label: "初期費用をかけたくない", primaryCategory: "ポイ活・すきま時間", mascot: TAMEMIN },
    ],
  },
  {
    heading: "稼ぐ",
    items: [
      { slug: "no-clients", label: "案件が取れない", primaryCategory: "スキル販売・クラウドソーシング", mascot: UKEMIN },
      { slug: "no-portfolio", label: "実績がない", primaryCategory: "スキル販売・クラウドソーシング", mascot: UKEMIN },
      { slug: "low-price", label: "単価が上がらない", primaryCategory: "Webライティング", mascot: KAKIMIN },
      { slug: "unstable-income", label: "収入が安定しない", primaryCategory: "副業の始め方", mascot: HAJIMIN },
      { slug: "cant-continue", label: "続けられない", primaryCategory: "ブログ・アフィリエイト", mascot: BUROMIN },
    ],
  },
  {
    heading: "お金・手続き",
    items: [
      { slug: "tax-return", label: "確定申告", primaryCategory: "税金・確定申告", mascot: ZEIMIN },
      { slug: "expenses", label: "経費の範囲", primaryCategory: "税金・確定申告", mascot: ZEIMIN },
      { slug: "resident-tax", label: "住民税・会社バレ", primaryCategory: "税金・確定申告", mascot: ZEIMIN },
      { slug: "scam", label: "怪しい案件を避けたい", primaryCategory: "副業の基礎知識", mascot: MANAMIN },
      { slug: "saving", label: "稼いだお金の使い道", primaryCategory: "投資・資産形成", mascot: FUYAMIN },
    ],
  },
];

// 全悩みチップをフラットな配列で取得(pages/index.js での描画用)。
export function getAllWorryItems() {
  return WORRY_GROUPS.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.heading }))
  );
}

// /worry/[slug] を生成する対象。現在は全15件。
export function getWorryPageItems() {
  return getAllWorryItems();
}

export function getWorryItemBySlug(slug) {
  return getAllWorryItems().find((item) => item.slug === slug) || null;
}

// 悩みのリンク先URL。全件 /worry/[slug] に統一。
export function getWorryHref(item) {
  return `/worry/${item.slug}`;
}
