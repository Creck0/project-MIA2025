import { useEffect, useState, useCallback } from "react";
import { fetchUMKM } from "../services/api";
import { normalizeImageUrl } from "../utils/image";
import "./umkm.css";

const CATEGORY_LABELS = {
  food: "Makanan",
  drink: "Minuman",
  service: "Jasa",
};

export default function UMKMDetail({ id }) {
  const [umkm, setUmkm] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);

  const showNext = useCallback(() => {
    if (!umkm || !umkm.photos || !umkm.photos.length) return;
    setLightboxIndex((i) => (i + 1) % umkm.photos.length);
  }, [umkm]);

  const showPrev = useCallback(() => {
    if (!umkm || !umkm.photos || !umkm.photos.length) return;
    setLightboxIndex((i) => (i - 1 + umkm.photos.length) % umkm.photos.length);
  }, [umkm]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUMKM(id);
        if (mounted) setUmkm(data);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  // keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === -1) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  if (loading) return <p>Memuat...</p>;
  if (error) return <p>Terjadi kesalahan: {error}</p>;
  if (!umkm) return <p>UMKM tidak ditemukan.</p>;

  const mapSrc = umkm.mapsLink || `https://www.google.com/maps?q=${encodeURIComponent(umkm.address)}&z=15&output=embed`;

  return (
    <div className="umkm-detail">
      <button className="back" onClick={() => (window.location.hash = "#/")}>
        &larr; Kembali
      </button>
      <h2>{umkm.name}</h2>
      <p className="short">{umkm.description}</p>
      <p className="category">
        <strong>Kategori:</strong> {CATEGORY_LABELS[umkm.category] || umkm.category}
      </p>
      <p className="address">
        <strong>Alamat:</strong> {umkm.address}
      </p>

      <div className="map-wrap">
        <iframe title="map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>

      <div className="gallery">
        <h3>Foto</h3>
        {umkm.images && umkm.images.length ? (
          <div className="photos">
            {umkm.images.map((p, i) => (
              <img key={i} src={normalizeImageUrl(p)} alt={`${umkm.name} ${i + 1}`} onClick={() => openLightbox(i)} />
            ))}
          </div>
        ) : (
          <p>Tidak ada foto.</p>
        )}
      </div>

      {lightboxIndex > -1 && umkm.images && umkm.images[lightboxIndex] && (
        <div
          className="lightbox lb-open"
          onClick={(e) => {
            if (e.target.classList.contains("lightbox")) closeLightbox();
          }}
        >
          <button className="lb-close" onClick={closeLightbox} aria-label="close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M15 18l-6-6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="lb-content">
            <div className="lb-counter">
              {lightboxIndex + 1} / {umkm.images.length}
            </div>
            <img className="lb-image" src={normalizeImageUrl(umkm.images[lightboxIndex])} alt={`photo ${lightboxIndex + 1}`} />
          </div>
          <button
            className="lb-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
