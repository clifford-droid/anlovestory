"use client";

import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";

export default function TraditionalMarriage() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Traditional Marriage"
          subtitle="A celebration of love, culture, family, and tradition."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-[#B79CED]/20 text-[#800020] text-sm tracking-widest uppercase">
            Thursday, September 24, 2026
          </div>

          <h3 className="mt-8 text-3xl md:text-4xl text-[#800020]">
            Our Traditional Marriage Ceremony
          </h3>

          <p className="mt-6 text-gray-600 leading-8 text-lg">
            With the blessings of our families and the richness of our
            heritage, we invite you to join us as we celebrate our traditional
            marriage.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#FAF8F5] p-7 shadow-sm">
              <h4 className="text-xl text-[#800020]">
                Bride&apos;s Family
              </h4>

              <p className="mt-4 text-gray-600 leading-7">
                The Nwanyim Family
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] p-7 shadow-sm">
              <h4 className="text-xl text-[#800020]">
                Groom&apos;s Family
              </h4>

              <p className="mt-4 text-gray-600 leading-7">
                The John Family
              </p>
            </div>
          </div>

          {/* Traditional Marriage Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 rounded-2xl bg-[#FAF8F5] p-8 shadow-sm"
          >
            <div className="text-[#D4AF37] text-3xl mb-4">
              ⌖
            </div>

            <h4 className="text-xl text-[#800020]">
              Venue
            </h4>

            <p className="mt-4 text-gray-600 leading-7">
              Mr &amp; Mrs Chukwuemeka Nwanyim&apos;s Compound
            </p>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Obodoeze Imama, Nomeh, Nkanu East LGA,
              Enugu State
            </p>
          </motion.div>

          <div className="mt-10 text-[#D4AF37] text-2xl">
            ✦ ♥ ✦
          </div>
        </motion.div>
      </div>
    </section>
  );
}