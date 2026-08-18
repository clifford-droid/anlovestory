"use client";

import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-white via-[#FAF8F5] to-white">

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="max-w-3xl w-full text-center"
      >
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-20 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-2xl">✦</span>
          <div className="h-px w-20 bg-[#D4AF37]" />
        </div>

        <p className="uppercase tracking-[0.45em] text-[#D4AF37] text-sm">
          Together with our Families
        </p>

        <div className="my-10">
          <h1 className="text-6xl md:text-8xl text-[#800020] leading-none">
            {wedding.groom}
          </h1>

          <p className="text-5xl text-[#B79CED] my-6">&</p>

          <h1 className="text-6xl md:text-8xl text-[#800020] leading-none">
            {wedding.bride}
          </h1>
        </div>

        <div className="space-y-3">

          <p className="text-2xl text-gray-700">
  {wedding.weddingDate}
</p>

<p className="text-lg text-gray-500">
  {wedding.weddingTime}
</p>

          <p className="text-lg text-gray-500">
           <>
  <p className="text-lg text-gray-500">
    {wedding.venue}
  </p>

  <p className="text-sm text-gray-400 mt-1">
    {wedding.address}
  </p>
</>
          </p>

        </div>

        {/* Bottom Ornament */}

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px w-20 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-2xl">
            ♥
          </span>
          <div className="h-px w-20 bg-[#D4AF37]" />
        </div>

      </motion.div>

    </section>
  );
}