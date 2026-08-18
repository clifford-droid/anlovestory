
"use client";

import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";

export default function WeddingDetails() {
  return (
    <section className="py-20 px-6 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Wedding Details"
          subtitle="Join us as we celebrate the beginning of our forever."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl p-8 text-center shadow-md"
          >
            <div className="text-4xl text-[#D4AF37] mb-5">♡</div>

            <h3 className="text-xl text-[#800020] mb-3">
              Date
            </h3>

            <p className="text-gray-600">
              Thursday, October 1, 2026
            </p>
          </motion.div>

          {/* Time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-2xl p-8 text-center shadow-md"
          >
            <div className="text-4xl text-[#D4AF37] mb-5">◷</div>

            <h3 className="text-xl text-[#800020] mb-3">
              Time
            </h3>

            <p className="text-gray-600">
              11:00 AM
            </p>
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 text-center shadow-md"
          >
            <div className="text-4xl text-[#D4AF37] mb-5">⌖</div>

            <h3 className="text-xl text-[#800020] mb-3">
              Venue
            </h3>

            <p className="text-gray-600">
              New Planet Resorts Event Hall
            </p>

            <p className="mt-2 text-sm text-gray-500">
              133/135 Aka Road, Ajangbadi, Ojo, Lagos
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
