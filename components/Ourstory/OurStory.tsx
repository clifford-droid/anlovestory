
"use client";

import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";
export default function OurStory() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Our Story"
          subtitle="Every love story is beautiful, but ours is our favorite."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-[#FAF8F5]">
              <img
                src="/images/couple.jpg"
                alt="Nnamdi and Angel"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-[#B79CED]/30 -z-0" />
          </motion.div>

          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm">
              How it all began
            </span>

            <h3 className="mt-4 text-3xl md:text-4xl text-[#800020]">
              Two Hearts, One Journey
            </h3>

            <div className="mt-6 space-y-5 text-gray-600 leading-8">
              <p>
                Some stories begin with a single moment, while others unfold
                beautifully over time. Ours is a story of friendship, love,
                laughter, and the grace that brought two hearts together.
              </p>

              <p>
                Through every season, we have grown together, supported one
                another, and discovered that the best part of life is having
                someone special to share it with.
              </p>

              <p>
                Today, we are grateful for the journey that brought us here
                and excited to begin a new chapter as one.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xl">♥</span>
              <div className="h-px w-12 bg-[#D4AF37]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

