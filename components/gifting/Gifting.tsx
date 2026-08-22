"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";

export default function Gifting() {
  const [copied, setCopied] = useState(false);

  const accountNumber = "0101109421";

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(accountNumber);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="A Little Note on Gifting"
          subtitle="Your presence is the greatest gift to us."
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
          className="mt-10"
        >
          <div className="text-center mb-10">
            <p className="text-gray-600 leading-8 text-lg max-w-2xl mx-auto">
              Your presence at our celebration is the greatest
              gift to us. However, should you wish to bless us
              with a gift, we would be truly grateful.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] bg-[#FAF8F5] border border-[#E8D7A8] shadow-xl px-6 py-10 md:px-12 md:py-12">

            {/* Decorative ornaments */}

            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#B79CED]/10" />

            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-[#D4AF37]/10" />

            <div className="relative z-10 text-center">

              <div className="text-[#D4AF37] text-3xl mb-5">
                ✦
              </div>

              <p className="uppercase tracking-[0.35em] text-[#D4AF37] text-xs">
                Gift Account
              </p>

              {/* Bank */}

              <div className="mt-8">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Bank
                </p>

                <p className="mt-2 text-xl text-[#800020] font-medium">
                  Access Bank
                </p>
              </div>

              {/* Account Name */}

              <div className="mt-7">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Account Name
                </p>

                <p className="mt-2 text-xl text-[#800020] font-medium">
                  Nwanyim Eberechukwu Angel
                </p>
              </div>

              {/* Account Number */}

              <div className="mt-7">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Account Number
                </p>

                <p className="mt-3 text-xl md:text-2xl text-[#800020] font-semibold tracking-wide">
  {accountNumber}
</p>
              </div>

              {/* Copy Button */}

              <button
                type="button"
                onClick={copyAccountNumber}
                className="
                  mt-8
                  rounded-full
                  bg-[#800020]
                  px-8
                  py-3
                  text-white
                  text-sm
                  tracking-wider
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-[#650019]
                  hover:scale-105
                "
              >
                {copied
                  ? "ACCOUNT NUMBER COPIED ✓"
                  : "COPY ACCOUNT NUMBER"}
              </button>

              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-[#D4AF37]" />

                <span className="text-[#D4AF37]">
                  ♥
                </span>

                <div className="h-px w-12 bg-[#D4AF37]" />
              </div>

              <p className="mt-6 text-gray-500 italic">
                With love and gratitude,
              </p>

              <p className="mt-2 text-2xl text-[#800020]">
                Angel & Nnamdi
              </p>

              <p className="mt-4 text-[#D4AF37] tracking-widest text-sm">
                #ANLoveStory
              </p>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}