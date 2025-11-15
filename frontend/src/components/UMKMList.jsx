import { useMemo, useState, useEffect } from "react";
import { fetchUMKMs } from "../services/api";
import "./umkm.css";
import { normalizeImageUrl } from "../utils/image";

// Category options that match backend values (value = stored value, label = display text)
const CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "food", label: "Makanan" },
  { value: "drink", label: "Minuman" },
  { value: "service", label: "Jasa" },
];

export default function UMKMList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [umkms, setUmkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUMKMs();
        if (mounted) setUmkms(data);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    return umkms.filter((u) => {
      const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || (u.category || "") === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category, umkms]);

  return (
    <div className="umkm-list">
      <div className="controls">
        <input className="search" placeholder="Cari UMKM berdasarkan nama..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {loading && <p>Memuat...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <>
            {filtered.map((u) => (
              <article key={u.id} className="card" onClick={() => (window.location.hash = `#/umkm/${u.id}`)}>
                <div className="thumb">{u.images && u.images.length ? <img src={normalizeImageUrl(u.images[0])} alt={u.name} /> : <div className="placeholder">No Image</div>}</div>
                <div className="info">
                  <h3>{u.name}</h3>
                  <p className="category">{(CATEGORY_OPTIONS.find((c) => c.value === (u.category || "")) || { label: u.category }).label}</p>
                  <p className="desc">
                    {u.description?.substring(0, 120)}
                    {u.description && u.description.length > 120 ? "..." : ""}
                  </p>
                </div>
              </article>
            ))}
            {filtered.length === 0 && <p>Tidak ada UMKM yang cocok.</p>}
          </>
        )}
      </div>
    </div>
  );
}
