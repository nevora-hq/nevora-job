# NEVORA 公開済み記事ステータス一覧

`サイト運営/記事データ/確定稿`・`公開済み` → (`npm run sync-content`) → `サイト運営/サイト本体/content/articles`
に存在する全記事について、専用実装(lib)・使用中のchart type・画像枚数・
`scripts/verify-article.js`による9項目検証の結果をまとめる。

- 生成日: (集計を実施したときに書く)
- 対象: 下表は `サイト運営/記事データ/確定稿/`(12本)・`公開済み/`(13本)の計25本。
  確定稿の12本はどれも `publishAt` を持たないので、`サイト本体/README.md` の公開キューの決まりでは公開対象。
  `2026-10-10_fukugyo-asp-hikaku-shoshinsha` は `content/articles/` にまだ同期されていないので、同期されるまでサイトには出ない。`npm run sync-content` 実行直後の `content/articles/*.md` で数え直すこと
- 検証コマンド: `node scripts/verify-article.js <記事Markdownパス>`
- 表の並び順: frontmatterの`date`昇順(公開日が無い記事は先頭)

## 列の定義

- **専用libファイル**: その記事のためだけに作られた`lib/*.js`(記事名を含むコメントで
  「〇〇記事専用」と明記されているファイル)。汎用実装(`bar`/`stat`/`pie`・`donut`/
  `prosCons`/`quadrant`/`steps`/`checklist`/`summaryCard`/`compareCards`等、`lib/posts.js`
  本体に実装されている汎用chart type)のみを使う記事は「なし」
- **使用中のchart type**: frontmatterの`charts[].type`のユニーク一覧(重複除去、出現順)。
  `type`省略時はサイト側の実装で棒グラフとして描画されるため`bar`と表記する
- **画像枚数(サムネ/本文)**: `thumbnail`フィールドの有無(0/1)と、本文中の
  Markdown画像記法`![alt](path)`の出現数(HTMLコメント内は除外)
- **9項目検証の結果**: `Yes`=9項目すべて合格。`No(n,m,...)`=Noだった項目番号
  (項目の意味は下記「9項目の定義」を参照)

## 9項目の定義(`scripts/verify-article.js`)

| # | 項目名 |
|---|---|
| 1 | afterHeadingの見出し一致 |
| 2 | アコーディオンの本文重複 |
| 3 | chartsの数(2件以上) |
| 4 | 装飾要素の合計使用数(6件以上) |
| 5 | NEVORAポイントの文字数(80字以内) |
| 6 | NEVORAポイント内のハイライト |
| 7 | 連続プレーンテキストの上限(200字以内) |
| 8 | H2セクションごとの視覚要素 |
| 9 | 未変換の装飾記号(2026-08-09追加) |

---

## 記事一覧

slug(ファイル名から`.md`を除いたもの)・公開日(frontmatterの`date`)は記事ファイルから取った実際の値。専用libファイルは、記事専用の `lib/*Widgets.js`・`*Extras.js` が無ければ「なし」。
それ以外の列は集計したときに書く(それまでは「未集計」)。

| 記事slug | 公開日 | 専用libファイル | 使用中のchart type | 画像枚数(サムネ/本文) | 9項目検証の結果 |
|---|---|---|---|---|---|
| fukugyo-kakutei-shinkoku-20man | 2026-08-28 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-jinzu-data-hajimekata | 2026-08-29 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-juminzei-choshu-hoho | 2026-08-29 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-shugyokisoku-kakunin | 2026-08-29 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-programming-gakushu-roadmap | 2026-08-30 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-sedori-kobutsusho-kyoka | 2026-08-30 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-webwriting-anken-kakutoku | 2026-08-30 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-freelance-ho-torihiki | 2026-08-31 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-poikatsu-anzen-zeikin | 2026-08-31 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-zaitaku-jikan-kenko | 2026-08-31 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-shunyu-okiba-nisa | 2026-09-01 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-kigyo-ninchi-wariai | 2026-09-02 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-blog-shunyuka-nagare | 2026-09-04 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-08_fukugyo-chobo-shorui-hozon | 2026-09-08 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-task-soudan-kensu-suii | 2026-09-08 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-11_fukugyo-data-de-miru-genjo | 2026-09-11 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-15_fukugyo-design-jisseki-tsukurikata | 2026-09-15 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-19_fukugyo-douga-henshu-hajimekata | 2026-09-19 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-21_fukugyo-invoice-menzei-handan | 2026-09-21 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-22_fukugyo-jikan-nenshutsu | 2026-09-22 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-25_fukugyo-kaigyo-todoke-aoiro | 2026-09-25 | なし | 未集計 | 未集計 | 未実行 |
| 2026-09-29_fukugyo-keihi-kaji-anbun | 2026-09-29 | なし | 未集計 | 未集計 | 未実行 |
| 2026-10-02_fukugyo-shigoto-nyushu-keiro | 2026-10-02 | なし | 未集計 | 未集計 | 未実行 |
| fukugyo-fuyo-130man-kabe | 2026-10-07 | なし | 未集計 | 未集計 | 未実行 |
| 2026-10-10_fukugyo-asp-hikaku-shoshinsha(content/articles に未同期) | 2026-10-10 | なし | 未集計 | 未集計 | 未実行 |

---

## 集計

- **専用lib実装の記事数: 0本**

  **見出しごとに背景や枠を切り替える設定(frontmatter の `sectionAlternate`)は使わない(2026-10-11 依頼者の決定。依頼者の原文:「メリットを感じられないので、このようにしないようにお願いしたいです。4サイト共通です。」)。新しい記事は `sectionAlternate: false` にする(`true` にしない)。判定する側は、`sectionAlternate: true` の記事を、形の指摘として直させる。** 以下の注意は、`true` のまま残る記事を扱うときのもの。

  **注意**: `lib/posts.js`にslug固有のH2セクション背景交互化ラッパー(`wrapXxxSections`)を持つ記事に
  frontmatterの汎用`sectionAlternate: true`を追加すると、二重ラップでHTML構造が破綻する
  (詳細は`.claude/agents/writer.md`・`nevora-pipeline-verifier.md`参照)。
  slug固有のラッパーを足した場合は、その記事をここに書くこと。

- **9項目すべてYesの記事数**: 未集計

- **No項目数ごとの記事数**

  | No項目数 | 記事数 |
  |---|---|
  | 0(Yes) | 未集計 |
  | 1個 | 未集計 |
  | 2個 | 未集計 |
  | 3個 | 未集計 |
  | 4個 | 未集計 |
  | 5個 | 未集計 |
  | 6個以上 | 未集計 |

- **項目別No集計(該当記事数)**

  | 項目 | 該当記事数 |
  |---|---|
  | 1. afterHeading一致 | 未集計 |
  | 2. アコーディオン本文重複 | 未集計 |
  | 3. chartsの数 | 未集計 |
  | 4. 装飾要素の合計使用数 | 未集計 |
  | 5. NEVORAポイント文字数 | 未集計 |
  | 6. NEVORAポイント内ハイライト | 未集計 |
  | 7. 連続プレーンテキストの上限 | 未集計 |
  | 8. H2セクションごとの視覚要素 | 未集計 |
  | 9. 未変換の装飾記号 | 未集計 |

- **診断・セルフチェックからリンクされている記事**: 診断・セルフチェックの部品(`components/WorrySelfCheck.js`)から `/posts/` への記事slugの直書きリンクを足したときは、リンク先の記事と検証結果をここに書く。

## 補足・既知の注意点

- **date欠落の記事**: `date` が無い記事がある場合は、`(dateなし)` と表記して記録する(`docs/pipeline/README.md` 決定事項#8:「修正しない・記録のみ」)。

- 本表を集計するときは`npm run sync-content`を実行して`content/articles/`を
  `記事データ/確定稿`・`公開済み`と同期させたうえで集計する。`content/articles/`は
  生成物であり直接編集しないこと(`scripts/sync-content.js`のコメント参照)。
- `fukugyo-task-soudan-kensu-suii` の category「副業のトラブル対策」は `lib/categoryMeta.js` の
  `MAJOR_CATEGORIES` に登録されていない暫定名。集計時はこの扱いを決めてから数える。
- 前回版との差分: (未記入)
