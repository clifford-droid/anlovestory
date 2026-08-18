"use client";

import { motion } from "framer-motion";

export default function Closing() {
  return (
    <section className="py-24 px-6 bg-[#800020] text-white text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[#D4AF37] text-3xl mb-6">
            ✦
          </div>

          <p className="text-xl md:text-2xl leading-9 font-light">
            Two hearts, one beautiful journey,
            <br />
            and a lifetime of love ahead.
          </p>

          <div className="my-8 h-px w-20 bg-[#D4AF37] mx-auto" />

          <h2 className="text-4xl md:text-5xl">
            Angel & Nnamdi
          </h2>

          <p className="mt-5 text-[#D4AF37] tracking-[0.3em]">
            #ANLoveStory
          </p>

          <p className="mt-8 text-white/70 text-sm">
            Thank you for being part of our special day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}