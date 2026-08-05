import Link from "next/link";

// compact: ホームページの新着・注目記事セクション向けの簡易表示。
// サムネイル・カテゴリー・タイトルのみを表示し、カード全体を1つのリンクにする。
// list: カテゴリー/検索ページ向けの横並び表示(左サムネ・右タイトル+サマリー)。
// アフィリエイトを想起させないよう、タグ(ハッシュタグ)は表示しない。
export default function PostCard({ post, compact = false, list = false }) {
  if (compact) {
    return (
      <Link href={`/posts/${post.slug}`} className="post-card post-card-compact">
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            loading="lazy"
            className="post-card-thumb"
          />
        )}
        <div className="post-card-body">
          <span className="category-badge">{post.category}</span>
          <h2>{post.title}</h2>
        </div>
      </Link>
    );
  }

  if (list) {
    return (
      <Link href={`/posts/${post.slug}`} className="post-card post-card-list">
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            loading="lazy"
            className="post-card-list-thumb"
          />
        )}
        <div className="post-card-body">
          <span className="category-badge">{post.category}</span>
          <h2>{post.title}</h2>
          <p className="excerpt">{post.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="post-card">
      {post.thumbnail && (
        <Link href={`/posts/${post.slug}`} className="post-card-thumb-link">
          <img
            src={post.thumbnail}
            alt={post.title}
            loading="lazy"
            className="post-card-thumb"
          />
        </Link>
      )}
      <div className="post-card-body">
        <span className="category-badge">{post.category}</span>
        <h2>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="excerpt">{post.excerpt}</p>
        {post.tags?.length > 0 && (
          <p className="tags">{post.tags.map((t) => `#${t}`).join(" ")}</p>
        )}
      </div>
    </div>
  );
}
