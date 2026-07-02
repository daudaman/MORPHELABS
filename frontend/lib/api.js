const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchList(resource) {
  const res = await fetch(`${API_URL}/${resource}?published=true`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchOne(resource, slug) {
  const res = await fetch(`${API_URL}/${resource}/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
