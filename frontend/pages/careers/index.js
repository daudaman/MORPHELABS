import { fetchList } from "../../lib/api";

export async function getServerSideProps() {
  const careers = await fetchList("careers");
  return { props: { careers } };
}

export default function Careers({ careers }) {
  return (
    <div className="container">
      <h1>Careers</h1>
      {careers.map((c) => (
        <div className="card" key={c.id}>
          <h3>{c.title}</h3>
          <p>{c.department} {c.location ? `— ${c.location}` : ""}</p>
          <p>{c.description}</p>
        </div>
      ))}
      {careers.length === 0 && <p>No open roles right now.</p>}
    </div>
  );
}
