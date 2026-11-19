import { CATEGORY_GENRES, GENRE_CIRCLE_MAX } from "../lib/categoryGenres";

// 24x24 の線画アイコン(外部ライブラリなし)。ジャンルの icon キーで選ぶ。
const ICON_PATHS = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4L16.5 4.5a2 2 0 013 3L8 19z" />
      <path d="M14 7l3 3" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z" />
      <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.2c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.8s1 1.6 2.5 2 2.5.9 2.5 2-1.1 1.8-2.5 1.8c-1.1 0-2-.4-2.5-1.2M12 6.5V8m0 8v1.5" />
    </>
  ),
};

function GenreIcon({ id }) {
  const paths = ICON_PATHS[id];
  if (!paths) return null;
  return (
    <svg
      className="genre-circle-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}

// ジャンルで絞り込む円形ナビ。selected=null が「すべて」。
// ジャンル数 n から配置・大きさを式で出す。隣の円の中心間距離÷直径≒0.7、リング外にはみ出さない。
export default function CategoryGenreNav({ selected, onSelect }) {
  const n = CATEGORY_GENRES.length;
  if (n < 2) return null;

  const hub = (
    <button
      type="button"
      className={`genre-hub${selected === null ? " is-active" : ""}`}
      aria-pressed={selected === null}
      aria-label="すべてのカテゴリを表示"
      onClick={() => onSelect(null)}
    >
      <img src="/images/logo-mark.png" alt="" width={36} height={36} className="genre-hub-mark" />
      <span className="genre-hub-name">NEVORA</span>
    </button>
  );

  // 7ジャンル以上は円が小さくなりすぎるので、チップ(横並びのボタン)にする。
  if (n > GENRE_CIRCLE_MAX) {
    return (
      <nav className="genre-nav genre-nav--chips" aria-label="ジャンルで絞り込む">
        <button
          type="button"
          className={`genre-chip${selected === null ? " is-active" : ""}`}
          aria-pressed={selected === null}
          onClick={() => onSelect(null)}
        >
          すべて
        </button>
        {CATEGORY_GENRES.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`genre-chip${selected === g.id ? " is-active" : ""}`}
            style={{ "--g-soft": g.soft, "--g-line": g.line }}
            aria-pressed={selected === g.id}
            onClick={() => onSelect(g.id)}
          >
            {g.label}
          </button>
        ))}
      </nav>
    );
  }

  const s = Math.sin(Math.PI / n);
  const R = 49.5 / (1 + s / 0.7);
  const D = (2 * R * s) / 0.7;

  return (
    <nav className="genre-nav" aria-label="ジャンルで絞り込む">
      <div className="genre-nav-ring">
        {CATEGORY_GENRES.map((g, i) => {
          const angle = ((-90 + (360 / n) * i) * Math.PI) / 180;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const active = selected === g.id;
          return (
            <button
              key={g.id}
              type="button"
              className={`genre-circle${active ? " is-active" : ""}`}
              style={{
                left: `${(50 + R * cos).toFixed(2)}%`,
                top: `${(50 + R * sin).toFixed(2)}%`,
                width: `${D.toFixed(2)}%`,
                "--ox": `${(cos * 14).toFixed(1)}%`,
                "--oy": `${(sin * 14).toFixed(1)}%`,
                "--g-soft": g.soft,
                "--g-line": g.line,
              }}
              aria-pressed={active}
              onClick={() => onSelect(g.id)}
            >
              <span className="genre-circle-body">
                <GenreIcon id={g.icon} />
                <span className="genre-circle-label">{g.label}</span>
                <span className="genre-circle-count">{g.categories.length}カテゴリ</span>
              </span>
            </button>
          );
        })}
        {hub}
      </div>
    </nav>
  );
}
