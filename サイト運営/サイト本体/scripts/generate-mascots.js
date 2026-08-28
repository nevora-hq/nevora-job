#!/usr/bin/env node
/**
 * カテゴリマスコット(NEVORAの「ミン」たち)のSVGを1つのテンプレートから生成する。
 *
 *   node scripts/generate-mascots.js
 *
 * 12カテゴリ + サイト全体の主役(ハジミン)の計13体を、それぞれ
 * normal(挨拶) / research(補足) / matome(振り返り) の3ポーズで書き出す。
 * 出力先: public/images/mascot/<key>-<pose>.svg
 *
 * 体の形はすべて共通で、カテゴリごとに変わるのは
 *   - アクセントカラー(輪郭・双葉・ほお・小物)
 *   - 頭の小物(sprout / spark / leaf)
 * だけ。新カテゴリを足すときは MASCOTS に1行追加して再実行する。
 *
 * 主役のハジミンは brand-assets の元画像にもなるため、
 * scripts/generate-brand-assets.js から参照される(そちらはPNG化して
 * logo / favicon / OGP を作る)。
 */
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "public", "images", "mascot");

// 体のベース色。アクセントカラーが変わっても地の色は共通にして、
// 12体が同じ「種族」に見えるようにする。
const BODY = "#fdf7ee";
const BODY_SHADE = "#f2e7d7";
const INK = "#3b3229";

// key: 出力ファイル名の接頭辞 / accent: 輪郭・双葉の色 / crown: 頭の小物
const MASCOTS = [
  { key: "hajimin", accent: "#8f4407", crown: "sprout" }, // 副業の始め方(主役)
  { key: "kakimin", accent: "#08684b", crown: "leaf" }, // Webライティング
  { key: "tsukumin", accent: "#983a08", crown: "spark" }, // デザイン・動画編集
  { key: "kodomin", accent: "#5938b9", crown: "spark" }, // プログラミング・IT
  { key: "urimin", accent: "#8e4407", crown: "leaf" }, // せどり・物販
  { key: "buromin", accent: "#854e00", crown: "sprout" }, // ブログ・アフィリエイト
  { key: "ukemin", accent: "#096272", crown: "leaf" }, // スキル販売・クラウドソーシング
  { key: "tamemin", accent: "#842b9a", crown: "spark" }, // ポイ活・すきま時間
  { key: "ouchimin", accent: "#a61919", crown: "leaf" }, // 在宅ワーク・働き方
  { key: "zeimin", accent: "#495057", crown: "leaf" }, // 税金・確定申告
  { key: "fuyamin", accent: "#20672e", crown: "sprout" }, // 投資・資産形成
  { key: "manamin", accent: "#501af4", crown: "spark" }, // 副業の基礎知識
];

const POSES = ["normal", "research", "matome"];

// ---- 部品 -------------------------------------------------------------

// どんぐり型の体。上がまるく、下が少し広がる。
const bodyPath =
  "M60 22c17 0 30 15 30 34 0 20-13 34-30 34S30 76 30 56c0-19 13-34 30-34z";

function crown(kind, accent) {
  if (kind === "sprout") {
    // 双葉。新しく何かを始める気配のモチーフ
    return `
    <path d="M60 24V13" stroke="${accent}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M60 15c-1-6-6-9-11-8-1 5 2 10 8 11 1 0 2 0 3-.4z" fill="${accent}" opacity="0.9"/>
    <path d="M60 15c1-6 6-9 11-8 1 5-2 10-8 11-1 0-2 0-3-.4z" fill="${accent}"/>`;
  }
  if (kind === "leaf") {
    // 一枚葉。落ち着いて続けるタイプのカテゴリに使う
    return `
    <path d="M60 24V14" stroke="${accent}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M60 16c2-7 9-10 15-8 0 7-5 12-12 12-1 0-2 0-3-.3z" fill="${accent}"/>`;
  }
  // spark: ひらめきの光。学習・技術系のカテゴリに使う
  return `
    <path d="M60 24V15" stroke="${accent}" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M60 4l2.6 6.4L69 13l-6.4 2.6L60 22l-2.6-6.4L51 13l6.4-2.6z" fill="${accent}"/>`;
}

function face(pose, accent) {
  // matomeだけ、やりきった表情(にっこり閉じ目)にする
  const eyes =
    pose === "matome"
      ? `<path d="M45 58c2-3 6-3 8 0" stroke="${INK}" stroke-width="3" stroke-linecap="round" fill="none"/>
         <path d="M67 58c2-3 6-3 8 0" stroke="${INK}" stroke-width="3" stroke-linecap="round" fill="none"/>`
      : `<ellipse cx="49" cy="58" rx="3.6" ry="4.4" fill="${INK}"/>
         <ellipse cx="71" cy="58" rx="3.6" ry="4.4" fill="${INK}"/>
         <circle cx="50.4" cy="56.3" r="1.3" fill="#fff"/>
         <circle cx="72.4" cy="56.3" r="1.3" fill="#fff"/>`;
  const mouth =
    pose === "research"
      ? `<ellipse cx="60" cy="69" rx="3.4" ry="4" fill="${INK}" opacity="0.85"/>`
      : `<path d="M55 68c2.6 3.4 7.4 3.4 10 0" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`;
  return `
    ${eyes}
    <ellipse cx="42" cy="66" rx="5" ry="3.4" fill="${accent}" opacity="0.22"/>
    <ellipse cx="78" cy="66" rx="5" ry="3.4" fill="${accent}" opacity="0.22"/>
    ${mouth}`;
}

function limbs(pose, accent) {
  const legs = `
    <path d="M50 90v7" stroke="${accent}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M70 90v7" stroke="${accent}" stroke-width="3.4" stroke-linecap="round"/>`;
  if (pose === "normal") {
    // 右手を上げて挨拶
    return `
    <path d="M31 66c-5 2-8 6-9 11" stroke="${accent}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M89 62c5-3 8-8 8-14" stroke="${accent}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    ${legs}`;
  }
  if (pose === "research") {
    // 虫めがねを持って調べている
    return `
    <path d="M31 68c-5 2-8 6-9 11" stroke="${accent}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M89 66c4 1 7 3 9 6" stroke="${accent}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <circle cx="97" cy="52" r="10" fill="#fff" fill-opacity="0.85" stroke="${accent}" stroke-width="3.4"/>
    <path d="M90 60l-6 7" stroke="${accent}" stroke-width="3.4" stroke-linecap="round"/>
    ${legs}`;
  }
  // matome: メモを抱えて振り返り
  return `
    <path d="M33 72c-4 1-7 4-8 8" stroke="${accent}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M87 72c4 1 7 4 8 8" stroke="${accent}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <rect x="45" y="72" width="30" height="22" rx="4" fill="#fff" stroke="${accent}" stroke-width="3"/>
    <path d="M52 80h16M52 86h11" stroke="${accent}" stroke-width="2.6" stroke-linecap="round"/>
    ${legs}`;
}

function svg({ accent, crown: crownKind }, pose) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img">
  <ellipse cx="60" cy="103" rx="26" ry="5" fill="${accent}" opacity="0.12"/>
  ${crown(crownKind, accent)}
  <path d="${bodyPath}" fill="${BODY}" stroke="${accent}" stroke-width="3.6" stroke-linejoin="round"/>
  <path d="M60 90c-13 0-24-8-28-20 6 14 17 22 28 22s22-8 28-22c-4 12-15 20-28 20z" fill="${BODY_SHADE}" opacity="0.7"/>
  ${face(pose, accent)}
  ${limbs(pose, accent)}
</svg>
`;
}

// 主役の顔アップ。ファビコン・ヘッダーのマークに使うため、頭部だけを切り出した
// viewBoxで書き出す(小さいサイズでも表情が潰れないようにする)。
function faceSvg(m) {
  const full = svg(m, "normal");
  return full
    .replace('viewBox="0 0 120 120" width="120" height="120"', 'viewBox="26 6 68 68" width="120" height="120"');
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let n = 0;
  for (const m of MASCOTS) {
    for (const pose of POSES) {
      fs.writeFileSync(path.join(OUT_DIR, `${m.key}-${pose}.svg`), svg(m, pose));
      n++;
    }
  }
  const main0 = MASCOTS[0];
  fs.writeFileSync(path.join(OUT_DIR, `${main0.key}-face.svg`), faceSvg(main0));
  n++;
  console.log(`マスコットSVGを${n}点書き出しました: ${path.relative(process.cwd(), OUT_DIR)}`);
}

main();
