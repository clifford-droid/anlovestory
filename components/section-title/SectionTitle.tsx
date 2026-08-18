"use client";

import { motion } from "framer-motion";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-4 mb-5">
        <div className="h-px w-16 bg-[#D4AF37]" />
        <span className="text-[#D4AF37]">✦</span>
        <div className="h-px w-16 bg-[#D4AF37]" />
      </div>

      <h2 className="text-4xl md:text-6xl text-[#800020]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}