import { fetchList } from "../../lib/api";

export async function getServerSideProps() {
  const services = await fetchList("services");
  return { props: { services } };
}

export default function Services({ services }) {
  return (
    <div className="container">
      <h1>Services</h1>
      {services.map((s) => (
        <div className="card" key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
        </div>
      ))}
      {services.length === 0 && <p>No services listed yet.</p>}
    </div>
  );
}
