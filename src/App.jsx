import { useEffect, useState } from "react";
import "./App.css";
import UMKMList from "./components/UMKMList";
import UMKMDetail from "./components/UMKMDetail";
import { UMKMS } from "./data/umkms";
import { motion } from "framer-motion";

export default function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");

  // PRELOAD DATA UMKM
  useEffect(() => {
    JSON.stringify(UMKMS);
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // DETAIL PAGE
  if (route.startsWith("#/umkm/")) {
    const id = route.replace("#/umkm/", "");
    return (
      <div>
        <header>
          <h1>Daftar UMKM</h1>
        </header>
        <main>
          <UMKMDetail id={id} />
        </main>
      </div>
    );
  }

  // LIST PAGE
  if (route === "#/umkm") {
    return (
      <div>
        <header>
          <h1>Daftar UMKM</h1>
        </header>
        <main>
          <UMKMList />
        </main>
      </div>
    );
  }

  // ======================================
  //              DASHBOARD
  // ======================================
  return (
    <motion.div
      className="dashboard-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overlay */}
      <div className="dashboard-overlay"></div>

      {/* Glass UI Box */}
      <motion.div
        className="dashboard-box"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="dashboard-title">
          Selamat Datang di Web UMKM Malang
        </h1>

        <p className="dashboard-desc">
          Temukan berbagai UMKM terbaik yang ada di Malang Raya.  
          Mulai dari cafe, kuliner, fashion, hingga produk kreatif.
        </p>

        <motion.button
          className="dashboard-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.location.hash = "#/umkm";
          }}
        >
          Masuk
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
