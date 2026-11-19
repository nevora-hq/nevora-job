import SectionBand from "./SectionBand";

// 下層ページ冒頭の写真ヒーロー。トップの写真バンド(SectionBand)を使い、
// 小さな英語(eyebrow)→ h1 → 短い説明(lead)を重ねる。h1は1ページに1つ。
// Layout の hero に渡すと、直下の白パネルが少し上に重なる(CSS: .page-hero + .container)。
export default function PageHero({ eyebrow, title, lead, base, objectPosition }) {
  return (
    <SectionBand
      base={base}
      widths={[640, 1024, 1536]}
      objectPosition={objectPosition}
      className="page-hero"
    >
      {eyebrow ? <p className="page-hero-eyebrow">{eyebrow}</p> : null}
      <h1 className="page-hero-title">{title}</h1>
      {lead ? <p className="page-hero-lead">{lead}</p> : null}
    </SectionBand>
  );
}
