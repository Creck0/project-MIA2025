import { useMemo, useState } from "react";
import { UMKMS, CATEGORIES } from "../data/umkms";
import "../styles/umkm.css";

export default function UMKMList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const safe = (v, f = "") => (v === null || v === undefined ? f : v);

  const filtered = useMemo(() => {
    return UMKMS.filter((u) => {
      const name = safe(u.name).toLowerCase();
      const q = query.toLowerCase();

      const matchesQuery = name.includes(q);
      const matchesCategory = category === "All" || u.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="umkm-list-page">

      {/* TITLE TENGAH */}
      <h1 className="umkm-title">Daftar UMKM</h1>

      <div className="controls">
        <input
          className="search"
          placeholder="Cari UMKM berdasarkan nama..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filtered.map((u) => {
          const name = safe(u.name, "UMKM Tanpa Nama");
          const category = safe(u.category, "Tidak ada kategori");
          const desc = safe(
            u.caption || u.shortDescription,
            "Tidak ada deskripsi"
          );

          const photo =
            u.photos && u.photos[0]
              ? `/assets/umkm/${u.photos[0]}`
              : null;

          return (
            <article
              key={u.id}
              className="card"
              onClick={() => (window.location.hash = `#/umkm/${u.id}`)}
            >
              <div className="thumb">
                {photo ? (
                  <img src={photo} alt={name} />
                ) : (
                  <div className="placeholder">No Image</div>
                )}
              </div>

              <div className="info">
                <h3>{name}</h3>
                <p className="category">{category}</p>
                <p className="desc">{desc}</p>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p className="no-result">Tidak ada UMKM yang cocok.</p>
        )}
      </div>
    </div>
  );
}
