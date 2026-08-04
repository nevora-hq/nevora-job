export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <img
        src="/images/hero/home-hero.webp"
        alt=""
        className="hero-banner-img"
        fetchPriority="high"
      />
      <div className="hero-banner-overlay">
        <div className="container hero-banner-inner">
          <p className="hero-banner-eyebrow">WEB MAGAZINE</p>
          <h1 className="hero-banner-title">副業・在宅ワークの総合ガイド｜NEVORA</h1>
          <p className="hero-banner-lead">
            副業の始め方から収入アップまで、あなたに合うペースで進める総合ガイド
          </p>
        </div>
      </div>
    </section>
  );
}
