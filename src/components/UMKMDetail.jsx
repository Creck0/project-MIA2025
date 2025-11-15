import { useEffect, useState } from "react";
import { UMKMS } from "../data/umkms";
import "../styles/umkm.css";

export default function UMKMDetail({ id }) {
  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    const found = UMKMS.find((u) => u.id === id);
    setUmkm(found || null);
  }, [id]);

  if (!umkm)
    return (
      <div className="no-result-box">
        <div className="no-result-icon">⚠️</div>
        <p className="no-result-text">UMKM tidak ditemukan</p>
      </div>
    );

  return (
    <div className="umkm-detail-page">
      <button className="back-btn" onClick={() => (window.location.hash = "#/umkm")}>
        ← Kembali
      </button>

      <div className="detail-box">
        <h2 className="detail-title">{umkm.name}</h2>

        <div className="detail-image-wrapper">
          <img
            className="detail-main-image"
            src={`/assets/umkm/${umkm.photos[0]}`}
            alt={umkm.name}
          />
        </div>

        <p className="detail-desc">
          {umkm.caption}
        </p>

        <p className="detail-address">
          <strong>Alamat:</strong> {umkm.address}
        </p>

        <a
          className="detail-map-button"
          href={umkm.mapsLink}
          target="_blank"
        >
          📍 Buka di Google Maps
        </a>
      </div>
    </div>
  );
}
