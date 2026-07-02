import { fetchOne } from "../../lib/api";

export async function getServerSideProps({ params }) {
  const post = await fetchOne("posts", params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

export default function PostPage({ post }) {
  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
