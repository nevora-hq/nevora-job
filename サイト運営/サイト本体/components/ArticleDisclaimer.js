// 収入・税金・契約に関わる内容を含みうる記事末尾に表示する注記。
// スタイルは記事本文中の注意ボックス(lib/posts.jsのblockquote変換)と同じ
// .warning-box系を流用し、既存の見た目のトーンと統一する。
//
// opt-out方式: 全記事デフォルト表示とし、frontmatterに `disclaimer: none` が
// 明示されている記事のみ非表示にする。カテゴリのallowlist方式は対象漏れが
// 起きる構造的欠陥があるため採用しない。
export function shouldShowArticleDisclaimer(disclaimer) {
  return disclaimer !== "none";
}

export default function ArticleDisclaimer() {
  return (
    <div className="warning-box">
      <span className="warning-box-icon" aria-hidden="true">
        ⚠️
      </span>
      <div className="warning-box-body">
        <p className="warning-box-label">注意</p>
        <p>
          本記事は一般的な情報提供を目的としており、税務・法務・投資に関する個別の助言ではありません。収入や成果には個人差があり、記載の内容が同じ結果を保証するものではありません。税金・契約・勤務先の規定に関わる判断は、公的機関の公表情報を確認のうえ、必要に応じて税理士等の専門家にご相談ください。
        </p>
      </div>
    </div>
  );
}
