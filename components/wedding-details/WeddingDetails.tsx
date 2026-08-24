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
            <div className="text-4xl text-[#D4AF37] mb-5">
              ♡
            </div>

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
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="bg-white rounded-2xl p-8 text-center shadow-md"
          >
            <div className="text-4xl text-[#D4AF37] mb-5">
              ◷
            </div>

            <h3 className="text-xl text-[#800020] mb-3">
              Time
            </h3>

            <p className="text-gray-600">
              12:00 PM
            </p>
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            className="bg-white rounded-2xl p-8 text-center shadow-md"
          >
            <div className="text-4xl text-[#D4AF37] mb-5">
              ⌖
            </div>

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

        {/* Color of the Day */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          className="mt-10 bg-white rounded-2xl p-8 text-center shadow-md"
        >
          <div className="text-[#D4AF37] text-2xl mb-4">
            ✦
          </div>

          <h3 className="text-xl text-[#800020]">
            Color of the Day
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            We would love to see you in our celebration colors.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-8">
            {/* Lavender */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                style={{
                  backgroundColor: "#B79CED",
                }}
              />

              <span className="text-sm text-gray-600">
                Lavender
              </span>
            </div>

            {/* Gold */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full shadow-md border-2 border-white"
                style={{
                  backgroundColor: "#D4AF37",
                }}
              />

              <span className="text-sm text-gray-600">
                Gold
              </span>
            </div>

            {/* White */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full shadow-md border border-gray-200"
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              />

              <span className="text-sm text-gray-600">
                White
              </span>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37]">
              ♥
            </span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}