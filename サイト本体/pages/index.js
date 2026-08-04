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
    "ライティングやデザイン、動画編集、SNS運用など、副業にもいろんな種類があるんだ。自分に合いそうなものをここでチェックしてみてね。気になる方は、上の画像をタップして記事を見てみてね。",
  "副業の始め方":
    "副業を始めるときの準備や初めての案件の取り方、会社への申告のことまでまとめてるよ。気になる方は、上の画像をタップして記事を見てみてね。",
  "副業スキル":
    "ライティングやデザイン、プログラミングなど、副業で役立つスキルをここで紹介してるよ。気になる方は、上の画像をタップして記事を見てみてね。",
  "仕事・案件獲得":
    "クラウドソーシングでの案件の探し方や営業、ポートフォリオ作りのコツをまとめてるよ。気になる方は、上の画像をタップして記事を見てみてね。",
  "副業収入":
    "収益化の方法や単価アップの交渉術、収入の目安をここで紹介してるよ。気になる方は、上の画像をタップして記事を見てみてね。",
  "副業の管理":
    "本業との両立や時間・お金の管理、税金や確定申告のことをまとめてるよ。気になる方は、上の画像をタップして記事を見てみてね。",
  "副業サービス":
    "クラウドソーシングやスキル販売サービスの比較・選び方をここで紹介してるよ。気になる方は、上の画像をタップして記事を見てみてね。",
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

            {categorySummaries.length > 0 && (
              <section className="category-summary-section">
                <h2 className="home-section-title">カテゴリで探す</h2>
                <p className="home-section-lead">
                  気になるテーマから、関連記事をまとめてチェックできます。
                </p>
                <div className="category-summary-grid">
                  {categorySummaries.map((cat) => {
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
                  })}
                </div>
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
