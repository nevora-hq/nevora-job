/**
 * robots.txt / sitemap.xml の静的生成スクリプト
 *
 * 以前は pages/robots.txt.js と pages/sitemap.xml.js が getServerSideProps で
 * リクエストごとに組み立てていた(= Vercel上でFunctionになる)。
 * 公開ページをすべて静的にするため、ビルド前にこのスクリプトで public/ へ書き出す
 * (npm run prebuild / predev から、sync-content のあとに実行される)。
 * 出力内容は旧実装と同一。記事一覧などは lib/posts.js・lib/worryTopics.js をそのまま使う。
 *
 * 旧実装にあった「NEXT_PUBLIC_SITE_URL 未設定ならリクエストのホスト名で補う」挙動は、
 * リクエストが無いため使えない。本番ビルドでは未設定を next.config.js がエラーにしている。
 * `next dev` で未設定のときは http://localhost:3000 で代用する。
 *
 * 生成物 public/robots.txt・public/sitemap.xml は .gitignore 対象(毎ビルドで作り直す)。
 */
import { register } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// lib/ 配下は拡張子なしの相対importを使っている(Next.jsのバンドラ前提)ため、
// Node単体で読めるよう .js を補うリゾルバを登録する。
register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try { return await next(specifier, context); }
        catch (e) {
          if (specifier.startsWith(".") && !specifier.endsWith(".js")) {
            return next(specifier + ".js", context);
          }
          throw e;
        }
      }
    `),
  import.meta.url
);

const root = process.cwd();
const { getAllPostsMeta, getAllCategories } = await import(
  pathToFileURL(path.join(root, "lib", "posts.js")).href
);
const { getWorryPageItems } = await import(
  pathToFileURL(path.join(root, "lib", "worryTopics.js")).href
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function escapeXml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlEntry(loc, lastmod) {
  return `<url><loc>${escapeXml(loc)}</loc>${
    lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
  }</url>`;
}

function latestDate(posts) {
  const dates = posts
    .map((p) => p.updatedDate || p.date)
    .filter(Boolean)
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()));
  if (dates.length === 0) return undefined;
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  return latest.toISOString().slice(0, 10);
}

function buildSitemap() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const worryItems = getWorryPageItems();
  // /compareは掲載中のアフィリエイトリンクが0件の間は空ページ(noindex)のため載せない
  const hasCompareItems = posts.some((p) => p.affiliateLinks.length > 0);

  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    ...(hasCompareItems ? ["/compare"] : []),
    "/ranking",
    "/search",
    "/category",
  ];

  const entries = [
    ...staticPaths.map((p) => urlEntry(`${siteUrl}${p}`)),
    ...categories.map((c) => {
      const categoryPosts = posts.filter((p) => p.category === c.name);
      return urlEntry(
        `${siteUrl}/category/${encodeURIComponent(c.name)}`,
        latestDate(categoryPosts)
      );
    }),
    ...posts.map((p) =>
      urlEntry(
        `${siteUrl}/posts/${encodeURIComponent(p.slug)}`,
        p.updatedDate || p.date || undefined
      )
    ),
    urlEntry(`${siteUrl}/worry`),
    ...worryItems.map((item) => {
      const worryPosts = posts.filter(
        (p) => Array.isArray(p.worry) && p.worry.includes(item.slug)
      );
      return urlEntry(
        `${siteUrl}/worry/${encodeURIComponent(item.slug)}`,
        latestDate(worryPosts)
      );
    }),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join(
    ""
  )}</urlset>`;
}

function buildRobots() {
  // components/Layout.js のnoindexメタと同じフラグ(NEXT_PUBLIC_ALLOW_INDEX=1 で解除)
  const allowIndex = process.env.NEXT_PUBLIC_ALLOW_INDEX === "1";
  return allowIndex
    ? `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`
    : // 検索エンジンには拾わせないが、SNSのリンクプレビュー用クローラーだけは通す
      `User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Facebot
Allow: /

User-agent: Slackbot-LinkExpanding
Allow: /

User-agent: Discordbot
Allow: /

User-agent: LINE
Allow: /

User-agent: *
Disallow: /
`;
}

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), buildSitemap());
fs.writeFileSync(path.join(root, "public", "robots.txt"), buildRobots());
console.log("[generate-seo-files] public/robots.txt と public/sitemap.xml を生成しました");
