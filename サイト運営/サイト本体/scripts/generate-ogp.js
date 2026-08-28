#!/usr/bin/env node
/**
 * SNSシェア用のOGP画像(public/images/ogp.png、1200×630)を生成する。
 *
 *   node scripts/generate-ogp.js
 *
 * 文言を変えたいときは下のTEXTを書き換えて再実行する。
 * マスコット(public/images/logo.png)を右側に重ねるため、ロゴを差し替えた場合も
 * 再実行すればOGPに反映される。
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const OUT = path.join(PUBLIC_DIR, "images", "ogp.png");
const LOGO = path.join(PUBLIC_DIR, "images", "logo.png");

const W = 1200;
const H = 630;

const TEXT = {
  eyebrow: "WEB MAGAZINE",
  lead: "副業の総合ガイド",
  brand: "NEVORA",
  tagline: "副業の始め方・案件獲得・税金の情報",
};

// 日本語が確実に出るWindows標準フォントを優先し、無い環境向けに汎用名を続ける
const JP_FONT = "'Yu Gothic UI','Yu Gothic','Meiryo','Noto Sans JP',sans-serif";
const EN_FONT = "'Segoe UI','Yu Gothic UI',Arial,sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf3f6"/>
      <stop offset="55%" stop-color="#fbf6f2"/>
      <stop offset="100%" stop-color="#f3f1fb"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- 右側の装飾(マスコットの背後に敷く光の円) -->
  <circle cx="960" cy="315" r="250" fill="url(#halo)"/>
  <circle cx="960" cy="315" r="212" fill="none" stroke="#e9d9e4" stroke-width="2"/>
  <circle cx="960" cy="315" r="248" fill="none" stroke="#efe2ea" stroke-width="1.5" stroke-dasharray="5 9"/>

  <!-- 小さな装飾ドット -->
  <circle cx="742" cy="152" r="7" fill="#f0d9e4"/>
  <circle cx="1128" cy="196" r="5" fill="#e6dcf5"/>
  <circle cx="700" cy="520" r="6" fill="#f3e2d5"/>
  <circle cx="1080" cy="512" r="8" fill="#f2dfe9"/>

  <!-- テキスト -->
  <text x="88" y="196" font-family="${EN_FONT}" font-size="26" font-weight="700"
        letter-spacing="7" fill="#c2477e">${TEXT.eyebrow}</text>

  <text x="88" y="278" font-family="${JP_FONT}" font-size="58" font-weight="700"
        letter-spacing="2" fill="#3c3238">${TEXT.lead}</text>

  <text x="88" y="392" font-family="${EN_FONT}" font-size="96" font-weight="700"
        letter-spacing="6" fill="#3c3238">${TEXT.brand}</text>

  <rect x="90" y="432" width="470" height="3" rx="1.5" fill="#e2b7cd"/>

  <text x="88" y="496" font-family="${JP_FONT}" font-size="30" font-weight="500"
        letter-spacing="1" fill="#6b5f66">${TEXT.tagline}</text>
</svg>`;

async function main() {
  if (!fs.existsSync(LOGO)) {
    console.error(`ロゴが見つかりません: ${LOGO}`);
    process.exit(1);
  }

  const mascot = await sharp(LOGO).resize({ width: 300 }).toBuffer();
  const mascotMeta = await sharp(mascot).metadata();

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: mascot,
        left: 960 - Math.round(mascotMeta.width / 2),
        top: 315 - Math.round(mascotMeta.height / 2),
      },
    ])
    .png()
    .toFile(OUT);

  const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
  console.log(`生成しました: ${path.relative(PUBLIC_DIR, OUT).replace(/\\/g, "/")} (${W}x${H}, ${kb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
