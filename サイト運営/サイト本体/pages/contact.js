import Layout from "../components/Layout";

const CONTACT_EMAIL = "nevora01123@gmail.com";
const MAIL_SUBJECT = "【副業の総合ガイド｜NEVORA】お問い合わせ";

// 問い合わせはメール直行に一本化している(2026-08-28)。
// フォーム配信サービス(Formspree)は有料化のリスクがあるため廃止し、
// 送信の可否がこちらの契約状況に左右されない形にした。
// 「送信 → 失敗 → メールで連絡してください」という遠回りの動線を作らないため、
// このページでは最初からメールアドレスとmailtoリンクを主動線として提示する。
const mailtoHref =
  `mailto:${CONTACT_EMAIL}` +
  `?subject=${encodeURIComponent(MAIL_SUBJECT)}` +
  `&body=${encodeURIComponent(
    "以下にお問い合わせ内容をご記入ください。\n\n" +
      "──────────────\n" +
      "お名前:\n" +
      "ご連絡先(返信が必要な場合):\n\n" +
      "お問い合わせ内容:\n\n" +
      "──────────────\n"
  )}`;

export default function Contact() {
  return (
    <Layout
      title="お問い合わせ | 副業の総合ガイド｜NEVORA"
      description="副業の総合ガイド｜NEVORAへのお問い合わせページです。メールにてご連絡ください。"
      canonicalPath="/contact"
    >
      <h1 className="page-title">お問い合わせ</h1>
      <div className="article-body">
        <p>
          記事内容へのご意見・ご指摘、掲載情報の訂正依頼、取材・お仕事のご依頼などは、
          下記のメールアドレス宛にご連絡ください。内容を確認のうえ、必要に応じて運営者よりご返信いたします。
        </p>

        <div className="contact-card">
          <p className="contact-card-label">メールアドレス</p>
          <p className="contact-card-address">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <a href={mailtoHref} className="affiliate-link-btn contact-card-btn">
            メールソフトで書き始める
          </a>
          <p className="contact-card-note">
            ボタンを押すと、お使いのメールソフトで宛先と件名が入った下書きが開きます。
            開かない場合は、上のアドレスをコピーしてお使いのメールサービスからお送りください。
          </p>
        </div>

        <h2>ご連絡いただく際のお願い</h2>
        <ul>
          <li>該当する記事がある場合は、記事のタイトルまたはURLを添えてください</li>
          <li>返信が必要な場合は、返信先のメールアドレスをご記入ください</li>
          <li>
            内容によっては返信までにお時間をいただく場合や、返信を差し控える場合があります
          </li>
          <li>
            個別の税務・法務・投資に関するご相談にはお答えできません。税務署・税理士等の
            専門機関にご相談ください
          </li>
        </ul>

        <p className="page-note" style={{ marginTop: 24, marginBottom: 0 }}>
          いただいたメールの内容・メールアドレスは、お問い合わせへの対応のみに利用します。詳しくは
          <a href="/privacy-policy">プライバシーポリシー</a>
          をご確認ください。
        </p>
      </div>
    </Layout>
  );
}
