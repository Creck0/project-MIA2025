import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// DASHBOARD HALAMAN AWAL (TANPA UMKM LIST)
export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="backdrop-blur-sm bg-black/40 min-h-screen p-10 flex flex-col justify-center items-center text-center">

        {/* JUDUL */}
        <motion.h1
          className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Selamat Datang di Web UMKM Malang
        </motion.h1>

        {/* DESKRIPSI */}
        <motion.p
          className="text-xl text-white opacity-90 mb-10 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Temukan berbagai UMKM terbaik yang ada di Malang Raya.
        </motion.p>

        {/* TOMBOL MASUK DENGAN ANIMASI SINEMATIK */}
        <motion.button
          onClick={() => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'black';
            overlay.style.opacity = 0;
            overlay.style.transition = 'opacity 0.8s ease-out';
            overlay.style.zIndex = 9999;
            document.body.appendChild(overlay);

            setTimeout(() => (overlay.style.opacity = 1), 20);
            setTimeout(() => (window.location.href = '/umkm'), 900);
          }}
          className="px-10 py-4 text-2xl rounded-xl shadow-xl bg-white text-black hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Masuk
        </motion.button>

      </div>
    </motion.div>
  );
}