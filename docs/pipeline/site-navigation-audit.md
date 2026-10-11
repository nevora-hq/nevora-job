# サイトレベル整合性監査

対象: `サイト運営/サイト本体/`
方針: 検出・一覧化のみ。コード編集は行わない。

このサイトの公開URLは `https://nevora-job.vercel.app/` で、独自ドメインへの移行は未確定。§4 は独自ドメインへ移行したときに行う。

## 1. ユーザー動線チェック(index → posts/[slug] → about → contact)

確認観点: トップ → 記事 → about → contact の導線のリンクが、すべて実在ページ・動的ルートに対応しているか(`pages/index.js`・`pages/posts/[slug].js`・`pages/about.js`・`pages/contact.js`)。

判定: (未記入)

## 2. ヘッダー/フッター/共通コンポーネントの全内部リンク生存確認

確認観点: ヘッダー・フッター(about・privacy-policy・terms・contact)・管理画面メニュー・サイドバー等の全リンクが実在するか。管理画面は`noindex, nofollow`か(`components/Header.js`・`Footer.js`・`AdminLayout.js` ほか)。外部リンクは、出典URL(動的・記事データ側で管理)と、`rel`の付け方を見る。

判定: (未記入)

## 3. 404ページの品質確認 (`pages/404.js`)

確認観点: (a) 主要導線への誘導リンク (b) 状況説明 (c) noindex。

判定: (未記入)

## 4. 旧ドメイン表記(vercel.app)の残存確認

確認観点: 独自ドメインへ移行したあと、サイトのコード・公開記事に旧 `vercel.app` のハードコードが残っていないか(URL は `NEXT_PUBLIC_SITE_URL` で一元管理)。調査メモ・作業ログ・移行記録は対象外。

| ファイル | 内容 | 判定 |
|---|---|---|
| | | |

## まとめ

| 分類 | 件数 |
|---|---|
| 重大(審査リスク) | |
| 中(修正推奨) | |
| 軽微 | |
