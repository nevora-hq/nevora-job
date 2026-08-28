#!/usr/bin/env node
/**
 * メインマスコット(ハジミン)のSVGから、サイトのブランド資産一式を生成する。
 *
 *   node scripts/generate-brand-assets.js     (npm run brand-assets)
 *
 * 入力(すべてリポジトリ内。scripts/generate-mascots.js が生成する):
 *   public/images/mascot/hajimin-normal.svg … 全身。logo.png と OGP合成に使う
 *   public/images/mascot/hajimin-face.svg   … 顔アップ。logo-mark.png と favicon一式に使う
 *
 * 出力(public配下):
 *   images/logo.png        512x512  構造化データのlogo・OGPのフォールバック
 *   images/logo-mark.png   128x128  ヘッダー左のマーク
 *   favicon-16/32/48.png, icon-192/512.png, apple-touch-icon.png, favicon.ico
 *   images/ogp.png         1200x630 ブランドカラーの背景+文字+マスコット
 *
 * **OGP(images/ogp.png)を書き出すのはこのスクリプトだけ**。
 * generate-site-images.js 側にOGPを持たせると、実行順によって
 * どちらの出力が残るかが変わってしまうため、ここに一本化している
 * (お金サイト c3af444 と同じ方針)。
 *
 * 絵柄を変えるときは scripts/generate-mascots.js を編集 →
 * `node scripts/generate-mascots.js` → このスクリプトの順で実行する。
 */
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const MASCOT_DIR = path.join(PUBLIC_DIR, "images", "mascot");
const FULL = path.join(MASCOT_DIR, "hajimin-normal.svg");
const FACE = path.join(MASCOT_DIR, "hajimin-face.svg");

// ブランドカラー。styles/globals.css の --color-primary 系と揃える。
const BRAND = "#8f4407";
const BRAND_DEEP = "#6f3405";
const TEXT_INK = "#3b3229";
const TEXT_SUB = "#6b5a49";

const OGP_TEXT = {
  eyebrow: "WEB MAGAZINE",
  lead: "副業の総合ガイド",
  brand: "NEVORA",
  tagline: "副業の始め方・案件獲得・税金の情報",
};

const JP_FONT = "'Yu Gothic UI','Yu Gothic','Meiryo','Noto Sans JP',sans-serif";
const EN_FONT = "'Segoe UI','Yu Gothic UI',Arial,sans-serif";

const out = (rel) => {
  const p = path.join(PUBLIC_DIR, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  return p;
};

// 余白を落としてから、指定サイズの正方形に「余白率 pad」で収める。
// trim()を挟むことで、原画ごとの余白量の差に影響されず見た目の大きさが揃う。
async function squareFit(srcPath, size, pad = 0.06, background = { r: 0, g: 0, b: 0, alpha: 0 }) {
  const raster = await sharp(srcPath, { density: 600 }).png().toBuffer();
  const trimmed = await sharp(raster).trim().png().toBuffer();
  const inner = Math.round(size * (1 - pad * 2));
  const fitted = await sharp(trimmed)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: fitted, gravity: "centre" }])
    .png()
    .toBuffer();
}

// PNGを内包するICO(Vista以降で標準的な形式)を自前で組み立てる。
// sharpは.icoを書き出せないため、ICONDIR/ICONDIRENTRYを手で作る。
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + count * 16;
  for (const { size, data } of pngBuffers) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.data)]);
}

function ogpBackgroundSvg(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf6ee"/>
      <stop offset="60%" stop-color="#fbf3ea"/>
      <stop offset="100%" stop-color="#f6ece0"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="960" cy="315" r="250" fill="url(#halo)"/>
  <circle cx="960" cy="315" r="212" fill="none" stroke="#ecdcc8" stroke-width="2"/>
  <circle cx="960" cy="315" r="248" fill="none" stroke="#f2e5d5" stroke-width="1.5" stroke-dasharray="5 9"/>
  <circle cx="742" cy="152" r="7" fill="#f0dcc4"/>
  <circle cx="1128" cy="196" r="5" fill="#eadfd0"/>
  <circle cx="700" cy="520" r="6" fill="#f3e2d0"/>
  <circle cx="1080" cy="512" r="8" fill="#f2e0c9"/>
  <text x="88" y="196" font-family="${EN_FONT}" font-size="26" font-weight="700"
        letter-spacing="7" fill="${BRAND}">${OGP_TEXT.eyebrow}</text>
  <text x="88" y="278" font-family="${JP_FONT}" font-size="58" font-weight="700"
        letter-spacing="2" fill="${TEXT_INK}">${OGP_TEXT.lead}</text>
  <text x="88" y="392" font-family="${EN_FONT}" font-size="96" font-weight="700"
        letter-spacing="6" fill="${BRAND_DEEP}">${OGP_TEXT.brand}</text>
  <rect x="90" y="432" width="470" height="3" rx="1.5" fill="${BRAND}" opacity="0.5"/>
  <text x="88" y="496" font-family="${JP_FONT}" font-size="30" font-weight="500"
        letter-spacing="1" fill="${TEXT_SUB}">${OGP_TEXT.tagline}</text>
</svg>`;
}

async function main() {
  for (const f of [FULL, FACE]) {
    if (!fs.existsSync(f)) {
      console.error(`  [NG] 元画像が見つかりません: ${f}`);
      console.error("       先に node scripts/generate-mascots.js を実行してください。");
      process.exit(1);
    }
  }

  const written = [];

  // ---- ロゴ ----
  fs.writeFileSync(out("images/logo.png"), await squareFit(FULL, 512, 0.06));
  written.push("images/logo.png");
  fs.writeFileSync(out("images/logo-mark.png"), await squareFit(FACE, 128, 0.02));
  written.push("images/logo-mark.png");

  // ---- ファビコン(顔アップ。小サイズでも潰れないよう余白は最小) ----
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const size of [...icoSizes, 192, 512]) {
    const buf = await squareFit(FACE, size, 0.02);
    const name = size <= 48 ? `favicon-${size}.png` : `icon-${size}.png`;
    fs.writeFileSync(out(name), buf);
    written.push(name);
    if (icoSizes.includes(size)) icoPngs.push({ size, data: buf });
  }
  fs.writeFileSync(out("favicon.ico"), buildIco(icoPngs));
  written.push("favicon.ico");

  // apple-touch-iconは透過を持てない(iOSが黒で埋める)ため白背景で焼き込む。
  fs.writeFileSync(
    out("apple-touch-icon.png"),
    await sharp(await squareFit(FACE, 180, 0.08)).flatten({ background: "#ffffff" }).png().toBuffer()
  );
  written.push("apple-touch-icon.png");

  // ---- OGP(左に文字、右にマスコット) ----
  const OGP_W = 1200;
  const OGP_H = 630;
  const bg = await sharp(Buffer.from(ogpBackgroundSvg(OGP_W, OGP_H))).png().toBuffer();
  const mascotH = Math.round(OGP_H * 0.52);
  const mascot = await sharp(await sharp(FULL, { density: 600 }).png().toBuffer())
    .trim()
    .resize({ height: mascotH, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const mw = (await sharp(mascot).metadata()).width;
  fs.writeFileSync(
    out("images/ogp.png"),
    await sharp(bg)
      .composite([
        {
          input: mascot,
          left: Math.round(960 - mw / 2),
          top: Math.round((OGP_H - mascotH) / 2),
        },
      ])
      .png()
      .toBuffer()
  );
  written.push("images/ogp.png");

  let total = 0;
  for (const rel of written) {
    const kb = fs.statSync(path.join(PUBLIC_DIR, rel)).size / 1024;
    total += kb;
    console.log(`  ${rel.padEnd(28)} ${kb.toFixed(1)} KB`);
  }
  console.log(`\n合計 ${written.length}点 / ${total.toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
