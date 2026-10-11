# run-local.js の self-test の停止と再開条件

## 今の決まり

- self-test の期待値は、今の `verify-article.js` の仕様に合わせておく。`node scripts/autonomy/self-test.js` は全件が合格する。
- `ledger-add-visual-check.js` は、検査用ビルドで `sync-content.js` を飛ばす形にしてある。追記まで完走することを確かめる。台帳の代行記録の手順そのものは、この文書では変えない。
- `run-local.js` 経由の記事の生成・修正を再び使うかどうかは、依頼者が決める。この文書は使えるようにする決定ではない。
- このサイトの期は、すべて運用期である(2026-10-10 の依頼者の決定。設計期はない)。

## 状態

(未記入)

## 不合格になる原因

(未記入)

## 再開条件

全記事見直し・ルール改修の期間が終わり、`run-local.js`(`start`・`--revise`とも)を記事の生成・修正の入口として再び使う際は、その前に以下を行う:

1. `scripts/autonomy/self-test.js`・`self-test-fixtures/`の期待値を、現在の`verify-article.js`の仕様に合わせて更新する
2. 更新後、`node scripts/autonomy/run-local.js start --revise <既存記事のパス>`等でself-testの全件が合格することを確認する

この2点が完了するまで、`run-local.js`経由での記事の生成・修正(自己テストを含む入口)は実行できない。この期間中の記事修正は「全記事見直し」の手順(`docs/pipeline/autonomy/FULL-REWRITE-PROCEDURE.md`、依頼者の目視確認+`scripts/ledger-add-visual-check.js`)を使う。

## 参照

- `docs/CONTRIBUTING.md` 40節
