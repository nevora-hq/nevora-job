import Link from "next/link";
import Layout from "../../components/Layout";
import PageHero from "../../components/PageHero";
import { WORRY_GROUPS } from "../../lib/worryTopics";
import { getWorryContent } from "../../lib/worryContent";
import { getAllPostsMeta } from "../../lib/posts";
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from "../../lib/structuredData";

export async function getStaticProps() {
  const allPosts = getAllPostsMeta();

  const groups = WORRY_GROUPS.map((group) => ({
    heading: group.heading,
    items: group.items.map((item) => {
      const content = getWorryContent(item.slug);
      const count = allPosts.filter(
        (post) => Array.isArray(post.worry) && post.worry.includes(item.slug)
      ).length;
      return {
        slug: item.slug,
        label: item.label,
        summary: content ? content.summary : "",
        count,
      };
    }),
  }));

  return { props: { groups } };
}

function buildWorryHubJsonLd(groups, siteUrl) {
  if (!siteUrl) return [];
  const breadcrumb = buildBreadcrumbJsonLd(siteUrl, [
    { name: "トップ", url: siteUrl },
    { name: "悩みから探す", url: `${siteUrl}/worry` },
  ]);
  const allItems = groups.flatMap((group) => group.items);
  const itemList = buildItemListJsonLd(
    allItems.map((item) => ({ name: item.label, url: `${siteUrl}/worry/${item.slug}` }))
  );
  return [breadcrumb, itemList].filter(Boolean);
}

// グループごとの色(白地で6:1以上)と英語の添え字。グループが増えたら色は順に繰り返す。
const GROUP_COLORS = ["#145997", "#983a08", "#20672e"];
const GROUP_EN = ["Before", "Earn", "Money"];

export default function WorryHubPage({ groups }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <Layout
      panel
      hero={
        <PageHero
          eyebrow="Worry"
          title="あなたの副業の悩みから探す"
          lead="悩みを選ぶと、原因・セルフチェック・対策のページへ進めます。"
          base="/images/band/band-01"
          objectPosition="50% 34%"
        />
      }
      title="あなたの副業の悩みから探す｜副業の総合ガイド｜NEVORA"
      description="何から始めるか、時間がない、案件が取れない、続かない、確定申告——15の副業の悩みから、原因の整理やセルフチェック、今日からできる対策がまとまった記事ページを探せます。"
      canonicalPath="/worry"
      ogImage="/images/logo.png"
      jsonLd={buildWorryHubJsonLd(groups, siteUrl)}
    >
      <nav className="breadcrumb" aria-label="パンくずリスト">
        <Link href="/">トップ</Link>
        <span className="sep">/</span>
        <span className="current">悩みから探す</span>
      </nav>

      <p className="home-section-lead">
        気になる悩みを選ぶと、原因の整理からセルフチェック、今日からできる対策までをまとめた専用ページに移動します。
      </p>

      {groups.map((group, gi) => (
        <section
          className="article-section worry-hub-group"
          key={group.heading}
          style={{ "--wg": GROUP_COLORS[gi % GROUP_COLORS.length] }}
        >
          <h2 className="worry-hub-group-title">
            {group.heading}
            <span className="worry-hub-group-en" aria-hidden="true">
              {GROUP_EN[gi] || ""}
            </span>
          </h2>
          <div className="worry-hub-grid">
            {group.items.map((item) => (
              <Link key={item.slug} href={`/worry/${item.slug}`} className="worry-hub-card">
                <span className="worry-hub-card-label">{item.label}</span>
                <span className="worry-hub-card-summary">{item.summary}</span>
                <span className="worry-hub-card-count">{item.count}件の記事</span>
                <span className="worry-hub-card-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
}
