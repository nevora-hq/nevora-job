// 記事のパーマリンク台帳(2026-11-22 依頼者の決定)。
// 形式: /posts/<大項目>/<中項目>/<小項目>-<連番2桁>
//  - 大項目 = 記事の frontmatter category(13個)に1対1で対応する英小文字の固定語(下の MAJOR_SEGMENTS)
//  - 中項目 = その大項目の中の話題のまとまり、小項目 = 記事の題材。小項目の連番は、同じ「大/中/小」が複数あるときに
//    01, 02… と振って重複を避ける(1本だけなら 01)。
//  - この分類は URL にだけ使う。サイトの画面(カテゴリ一覧・パンくず・ナビなど)には出さない。
//    画面上のカテゴリは従来どおり frontmatter の category を使う。
//  - 記事を足したときは、PERMALINKS に slug(記事ファイル名から .md を除いたもの)を1行足す。
//    scripts/verify-permalinks.js が、未登録・重複・大項目と category の食い違い・書式の誤りを検出する。
//    未登録の記事は、旧形式の /posts/<slug> で出る(検査では不合格にする)。
//  - 記事ファイル名(slug)・画像パスは変えない。記事本文中の /posts/<slug> リンクは、描画時にこの台帳で新URLへ置き換える。
const MAJOR_SEGMENTS = {
  "副業の始め方": "start",
  "Webライティング": "writing",
  "デザイン・動画編集": "design-video",
  "プログラミング・IT": "programming",
  "せどり・物販": "resale",
  "ブログ・アフィリエイト": "blog-affiliate",
  "スキル販売・クラウドソーシング": "skill-market",
  "ポイ活・すきま時間": "poikatsu",
  "在宅ワーク・働き方": "work-style",
  "副業の基礎知識": "basics",
  "副業のトラブル対策": "trouble",
  "税金・確定申告": "tax",
  "投資・資産形成": "invest",
};

const PERMALINKS = {
  // 副業の始め方
  "2026-09-25_fukugyo-kaigyo-todoke-aoiro": "start/registration/business-start-notice-01",
  "2026-10-27_fukugyo-shoki-hiyo-ikura": "start/preparation/initial-cost-01",
  "2026-12-11_fukugyo-minaoshi-kijun": "start/review/continue-or-quit-01",
  "fukugyo-jinzu-data-hajimekata": "start/statistics/side-job-ratio-01",
  // 副業の基礎知識
  "2026-09-11_fukugyo-data-de-miru-genjo": "basics/statistics/headcount-trend-01",
  "fukugyo-kigyo-ninchi-wariai": "basics/company-rules/permission-rate-01",
  "fukugyo-shugyokisoku-kakunin": "basics/company-rules/work-rules-01",
  "2026-10-26_fukugyo-shinsei-sho-kakikata": "basics/company-rules/application-form-01",
  "2026-12-04_fukugyo-kyogyo-higyo-gyoshu": "basics/company-rules/competing-work-01",
  "fukugyo-fuyo-130man-kabe": "basics/dependents/wall-130-01",
  // 税金・確定申告
  "fukugyo-kakutei-shinkoku-20man": "tax/filing/threshold-01",
  "2027-01-01_fukugyo-sonekitsusan": "tax/filing/loss-offset-01",
  "fukugyo-juminzei-choshu-hoho": "tax/local-tax/payment-method-01",
  "2026-09-21_fukugyo-invoice-menzei-handan": "tax/withholding/invoice-01",
  "2026-10-11_fukugyo-hoshu-uketori-gensen": "tax/withholding/payment-shortfall-01",
  "2026-09-08_fukugyo-chobo-shorui-hozon": "tax/records/receipt-retention-01",
  "2026-09-29_fukugyo-keihi-kaji-anbun": "tax/expenses/home-ratio-01",
  "2026-12-25_fukugyo-shakai-hoken": "tax/insurance/side-job-enrollment-01",
  // 在宅ワーク・働き方
  "fukugyo-zaitaku-jikan-kenko": "work-style/working-hours/aggregation-01",
  "2026-09-22_fukugyo-jikan-nenshutsu": "work-style/time/finding-slots-01",
  "2026-12-01_fukugyo-jikyu-kansan": "work-style/time/hourly-rate-01",
  "2026-10-11_fukugyo-rosai-fukugyo-kega": "work-style/safety/workers-comp-01",
  "2026-10-16_fukugyo-kaisha-pc-shiyo": "work-style/company-property/pc-use-01",
  // Webライティング
  "fukugyo-webwriting-anken-kakutoku": "writing/getting-jobs/no-experience-01",
  "2026-11-06_fukugyo-webwriter-tanka-koushou": "writing/rates/negotiation-01",
  "2027-01-02_fukugyo-writer-shusei-hani": "writing/contract/revision-scope-01",
  // デザイン・動画編集
  "2026-09-15_fukugyo-design-jisseki-tsukurikata": "design-video/portfolio/publish-ok-01",
  "2026-11-14_fukugyo-design-chosakuken-nohin": "design-video/portfolio/publish-ok-02",
  "2026-09-19_fukugyo-douga-henshu-hajimekata": "design-video/video-editing/bgm-font-01",
  "2026-10-11_fukugyo-douga-henshu-noukin-made": "design-video/video-editing/first-job-01",
  "2026-11-17_fukugyo-douga-mitsumori": "design-video/video-editing/quote-01",
  // プログラミング・IT
  "fukugyo-programming-gakushu-roadmap": "programming/learning/roadmap-01",
  "2026-11-20_fukugyo-engineer-boshu-yoko": "programming/jobs/listing-01",
  "2026-11-21_fukugyo-engineer-nda-seika": "programming/contract/nda-01",
  "2026-11-03_fukugyo-ukeoi-jun-inin-chigai": "programming/contract/contract-type-01",
  // せどり・物販
  "2026-10-24_fukugyo-sedori-rieki-keisan": "resale/profit/calculation-01",
  "fukugyo-sedori-kobutsusho-kyoka": "resale/legal/antique-license-01",
  "2026-11-24_fukugyo-furima-shuppin-kinshi": "resale/legal/prohibited-items-01",
  "2026-12-22_fukugyo-sedori-kimatsu-zaiko": "resale/accounting/year-end-stock-01",
  // ブログ・アフィリエイト
  "fukugyo-blog-shunyuka-nagare": "blog-affiliate/disclosure/ad-label-01",
  "2026-10-10_fukugyo-asp-hikaku-shoshinsha": "blog-affiliate/asp/comparison-01",
  "2026-10-11_fukugyo-blog-affiliate-shikumi-okane": "blog-affiliate/asp/payment-flow-01",
  "2026-11-10_fukugyo-blog-keihi-server": "blog-affiliate/expenses/server-domain-01",
  // スキル販売・クラウドソーシング
  "fukugyo-freelance-ho-torihiki": "skill-market/law/freelance-act-01",
  "2026-10-13_fukugyo-coconala-tesuryo-tedori": "skill-market/fees/coconala-01",
  "2026-11-13_fukugyo-compe-mushu": "skill-market/risk/unpaid-contest-01",
  "2026-12-29_fukugyo-skill-chokusetsu-torihiki": "skill-market/risk/direct-dealing-01",
  "2026-10-02_fukugyo-shigoto-nyushu-keiro": "skill-market/getting-jobs/channels-01",
  // ポイ活・すきま時間
  "2026-10-11_fukugyo-poikatsu-point-zeikin": "poikatsu/tax/point-tax-01",
  "2026-10-24_fukugyo-point-site-koukan-shikko": "poikatsu/points/expiry-exchange-01",
  "2026-12-19_fukugyo-poikatsu-mihanei": "poikatsu/points/not-credited-01",
  "2026-12-18_fukugyo-poikatsu-app-kengen": "poikatsu/apps/permissions-01",
  "fukugyo-poikatsu-anzen-zeikin": "poikatsu/safety/suspicious-offers-01",
  // 副業のトラブル対策
  "fukugyo-task-soudan-kensu-suii": "trouble/scam/task-jobs-01",
  "2026-10-20_fukugyo-kouka-sapoto-cooling-off": "trouble/contract/cooling-off-01",
  "2026-12-08_fukugyo-mibarai-taiou": "trouble/payment/unpaid-01",
  // 投資・資産形成
  "fukugyo-shunyu-okiba-nisa": "invest/saving/nisa-allocation-01",
  "2026-12-15_fukugyo-nozei-shikin": "invest/saving/tax-reserve-01",
  "2026-11-27_fukugyo-ideco": "invest/pension/ideco-01",
  "2026-10-30_fukugyo-tokutei-koza-kakutei-shinkoku": "invest/stocks/specific-account-01",
};

// 記事slug(ファイル名から.mdを除いたもの)から、/posts/ 以下のパス(先頭スラッシュなし)を返す。未登録はslugそのもの。
function permalinkOf(slug) {
  return PERMALINKS[slug] || slug;
}

// 記事ページのURLパス(先頭スラッシュあり)。
function postPath(slug) {
  return "/posts/" + permalinkOf(slug);
}

// /posts/ 以下のパス(配列または文字列)から記事slugを引く。見つからなければ null。
function slugFromPermalink(pathParts) {
  const joined = Array.isArray(pathParts) ? pathParts.join("/") : String(pathParts || "");
  for (const [slug, p] of Object.entries(PERMALINKS)) {
    if (p === joined) return slug;
  }
  // 台帳に載っていない記事は、旧形式(slugそのもの)で届く
  return joined.includes("/") ? null : joined;
}

module.exports = { MAJOR_SEGMENTS, PERMALINKS, permalinkOf, postPath, slugFromPermalink };
