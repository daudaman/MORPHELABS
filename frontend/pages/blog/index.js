import Link from "next/link";
import { fetchList } from "../../lib/api";

export async function getServerSideProps() {
  const posts = await fetchList("posts");
  return { props: { posts } };
}

export default function Blog({ posts }) {
  return (
    <div className="container">
      <h1>Blog</h1>
      {posts.map((p) => (
        <div className="card" key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.content.slice(0, 140)}...</p>
          <Link className="readmore" href={`/blog/${p.slug}`}>Read more →</Link>
        </div>
      ))}
      {posts.length === 0 && <p>No posts yet.</p>}
    </div>
  );
}
