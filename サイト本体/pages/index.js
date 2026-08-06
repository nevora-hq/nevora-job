import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import HeroBanner from "../components/HeroBanner";
import ImageSlider from "../components/ImageSlider";
import Sidebar from "../components/Sidebar";
import { getAllPostsMeta, getAllCategories } from "../lib/posts";
import { getCategoryMeta } from "../lib/categoryMeta";
import { getCategoryMascot, MAIN_MASCOT } from "../lib/categoryMascot";
import Link from "next/link";

// トップページの「カテゴリで探す」で初期表示する人気カテゴリー(それ以外は
// アコーディオンの折りたたみ内に表示する)。カテゴリー自体はここで絞り込むだけで、
// カード要素の生成・記事データ取得ロジックには手を入れない。
const POPULAR_CATEGORY_NAMES = ["副業の始め方", "副業サービス", "副業スキル"];

// 「あなたの副業の悩みから探す」チップ。既存のカテゴリーページ・検索ページ・
// 比較ページ等、既存のURL構造のみにリンクする(新規ページは追加しない)。
const WORRY_GROUPS = [
  {
    heading: "始め方の悩み",
    chips: [
      { label: "副業の選び方", href: "/category/副業の始め方" },
      { label: "初めての案件獲得", href: "/category/仕事・案件獲得" },
      { label: "会社にバレたくない", href: "/search?q=会社にバレたくない" },
      { label: "開業・確定申告", href: "/category/副業の管理" },
      { label: "スキルがない", href: "/category/副業スキル" },
    ],
  },
  {
    heading: "働き方の悩み",
    chips: [
      { label: "在宅ワーク", href: "/search?q=在宅ワーク" },
      { label: "スキマ時間で稼ぐ", href: "/search?q=スキマ時間" },
      { label: "クラウドソーシング", href: "/category/副業サービス" },
      { label: "スキル販売", href: "/search?q=スキル販売" },
      { label: "単価アップ交渉", href: "/category/副業収入" },
    ],
  },
  {
    heading: "続け方の悩み",
    chips: [
      { label: "収入を増やしたい", href: "/category/副業収入" },
      { label: "時間管理", href: "/category/副業の管理" },
      { label: "本業との両立", href: "/search?q=本業との両立" },
      { label: "おすすめサービス比較", href: "/compare" },
      { label: "税金・確定申告", href: "/category/副業の管理" },
    ],
  },
];

// カテゴリごとの紹介画像(public/images/category/配下)。
// 新しいカテゴリを追加する場合はここに画像パスを追記する(未登録カテゴリは画像なしで表示)。
const CATEGORY_IMAGES = {
  "副業の種類": "/images/category/category-shubyou-shurui.png",
  "副業の始め方": "/images/category/category-hajimekata.png",
  "副業スキル": "/images/category/category-skill.png",
  "仕事・案件獲得": "/images/category/category-anken-kakutoku.png",
  "副業収入": "/images/category/category-shunyu.png",
  "副業の管理": "/images/category/category-kanri.png",
  "副業サービス": "/images/category/category-service.png",
};

// マスコットの吹き出しに表示する、カテゴリ紹介文(親しみやすい口調で統一)。
const CATEGORY_INTROS = {
  "副業の種類":
    "ライティングやデザイン、動画編集、SNS運用など、副業にもいろんな種類があるんだ。自分に合いそうなものをここでチェックしてみてね。",
  "副業の始め方":
    "副業を始めるときの準備や初めての案件の取り方、会社への申告のことまでまとめてるよ。",
  "副業スキル":
    "ライティングやデザイン、プログラミングなど、副業で役立つスキルをここで紹介してるよ。",
  "仕事・案件獲得":
    "クラウドソーシングでの案件の探し方や営業、ポートフォリオ作りのコツをまとめてるよ。",
  "副業収入":
    "収益化の方法や単価アップの交渉術、収入の目安をここで紹介してるよ。",
  "副業の管理":
    "本業との両立や時間・お金の管理、税金や確定申告のことをまとめてるよ。",
  "副業サービス":
    "クラウドソーシングやスキル販売サービスの比較・選び方をここで紹介してるよ。",
};

export async function getStaticProps() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  const categorySummaries = categories.map((c) => ({
    ...c,
    ...getCategoryMeta(c.name),
    image: CATEGORY_IMAGES[c.name] || "",
    intro: CATEGORY_INTROS[c.name] || "",
  }));

  const sliderSlides = categorySummaries
    .filter((c) => c.image)
    .map((c) => ({
      name: c.name,
      image: c.image,
      color: c.color,
      href: `/category/${encodeURIComponent(c.name)}`,
    }));

  return {
    props: {
      newPosts: posts.slice(0, 2),
      featuredPosts: posts.slice(0, 2),
      popularPosts: posts.slice(0, 5),
      categories,
      categorySummaries,
      sliderSlides,
    },
  };
}

export default function Home({
  newPosts,
  featuredPosts,
  popularPosts,
  categories,
  categorySummaries,
  sliderSlides,
}) {
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const popularCategorySummaries = categorySummaries.filter((c) =>
    POPULAR_CATEGORY_NAMES.includes(c.name)
  );
  const otherCategorySummaries = categorySummaries.filter(
    (c) => !POPULAR_CATEGORY_NAMES.includes(c.name)
  );

  const renderCategoryCard = (cat) => {
    const mascot = getCategoryMascot(cat.name, cat.name, cat.intro);
    const href = `/category/${encodeURIComponent(cat.name)}`;
    return (
      <div
        key={cat.name}
        className="category-summary-card"
        style={{ "--cat-color": cat.color, "--cat-soft": cat.soft }}
      >
        {cat.image && (
          <Link href={href} className="category-summary-image-link">
            <img
              src={cat.image}
              alt={cat.name}
              className="category-summary-image"
              loading="lazy"
            />
            <span className="category-summary-badge">
              <span className="category-summary-badge-icon" aria-hidden="true">
                {cat.icon}
              </span>
              <span className="category-summary-badge-name">{cat.name}</span>
            </span>
          </Link>
        )}

        {mascot && (
          <div className="category-summary-mascot-row">
            <img
              src={mascot.normalImage}
              alt={mascot.name}
              width={48}
              height={48}
              className="category-summary-mascot-img"
              loading="lazy"
            />
            <div className="category-summary-mascot-bubble">
              <span className="category-summary-mascot-name">{mascot.name}</span>
              <p className="category-summary-mascot-text">{mascot.comment}</p>
            </div>
          </div>
        )}

        <Link href={href} className="category-summary-more">
          {cat.name}の記事をすべて見る →
        </Link>
      </div>
    );
  };

  return (
    <Layout
      title="副業・在宅ワークの総合ガイド｜NEVORA｜クラウドソーシング・スキルシェアの情報"
      categories={categories}
      canonicalPath="/"
      hero={
        <>
          <HeroBanner />
          <ImageSlider slides={sliderSlides} />
        </>
      }
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="home-page">
        <div className="home-layout">
          <div className="home-main">
            <div className="mascot-comment mascot-comment-main">
              <img
                src={MAIN_MASCOT.normalImage}
                alt={MAIN_MASCOT.name}
                width={72}
                height={72}
                className="mascot-comment-img"
                loading="lazy"
              />
              <div className="mascot-comment-bubble">
                <span className="mascot-comment-name">{MAIN_MASCOT.name}</span>
                <p className="mascot-comment-text">
                  はじめまして、ワーキーくんだよ!このサイトでは副業・在宅ワークに役立つ情報を、カテゴリー担当のなかまたちと一緒に紹介しているよ。気になるジャンルから読んでみてね。
                </p>
              </div>
            </div>

            {WORRY_GROUPS.length > 0 && (
              <section className="worry-section">
                <h2 className="home-section-title">あなたの副業の悩みから探す</h2>
                <p className="home-section-lead">
                  気になる悩みをタップすると、関連する記事やページをまとめて見られます。
                </p>
                <div className="worry-groups">
                  {WORRY_GROUPS.map((group) => (
                    <div className="worry-group" key={group.heading}>
                      <h3 className="worry-group-heading">{group.heading}</h3>
                      <ul className="worry-chip-list">
                        {group.chips.map((chip) => (
                          <li key={chip.label}>
                            <Link href={chip.href} className="worry-chip">
                              {chip.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {categorySummaries.length > 0 && (
              <section className="category-summary-section">
                <h2 className="home-section-title">カテゴリで探す</h2>
                <p className="home-section-lead">
                  気になるテーマから、関連記事をまとめてチェックできます。
                </p>
                <div className="category-summary-grid">
                  {popularCategorySummaries.map(renderCategoryCard)}
                </div>

                {otherCategorySummaries.length > 0 && (
                  <>
                    <div
                      id="category-summary-more-grid"
                      className={
                        "category-summary-grid category-summary-grid-collapsible" +
                        (categoriesExpanded ? " is-expanded" : "")
                      }
                      aria-hidden={!categoriesExpanded}
                    >
                      {otherCategorySummaries.map(renderCategoryCard)}
                    </div>

                    <button
                      type="button"
                      className="category-summary-toggle"
                      aria-expanded={categoriesExpanded}
                      aria-controls="category-summary-more-grid"
                      onClick={() => setCategoriesExpanded((v) => !v)}
                    >
                      {categoriesExpanded
                        ? "− 副業カテゴリーを閉じる"
                        : "＋ すべての副業カテゴリーを見る"}
                    </button>
                  </>
                )}
              </section>
            )}

            <section className="home-featured-section">
              <h2 className="home-section-title">注目記事</h2>
              {featuredPosts.length === 0 ? (
                <p>まだ記事がありません。記事データを確定稿フォルダに追加してください。</p>
              ) : (
                <div className="post-list">
                  {featuredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} compact />
                  ))}
                </div>
              )}
            </section>

            <section className="home-new-section">
              <h2 className="home-section-title">新着記事</h2>
              <div className="post-list">
                {newPosts.map((post) => (
                  <PostCard key={post.slug} post={post} compact />
                ))}
              </div>
            </section>
          </div>

          <Sidebar popularPosts={popularPosts} categories={categories} />
        </div>
      </div>
    </Layout>
  );
}
