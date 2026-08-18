"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] py-12 px-6 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-[#D4AF37] text-2xl mb-4">
          ✦
        </div>

        <p className="text-[#800020] text-lg">
          With love,
        </p>

        <h2 className="mt-2 text-3xl md:text-4xl text-[#800020]">
          Angel & Nnamdi
        </h2>

        <p className="mt-4 text-sm tracking-[0.3em] text-[#D4AF37]">
          #ANLoveStory
        </p>

        <div className="mt-8 h-px w-16 bg-[#D4AF37] mx-auto" />

        <p className="mt-6 text-xs text-gray-400">
          Thank you for celebrating with us.
        </p>
      </motion.div>
    </footer>
  );
}