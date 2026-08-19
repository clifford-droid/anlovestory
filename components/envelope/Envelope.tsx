"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type EnvelopeProps = {
  onOpen: () => void;
};

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    setOpening(true);

    setTimeout(() => {
      onOpen();
    }, 1800);
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#faf8f5] to-white px-6">

      <div className="flex flex-col items-center">

        <p className="mb-8 uppercase tracking-[0.4em] text-[#D4AF37] text-sm">
          Tap the Seal
        </p>

        <div className="relative w-80 h-56">

          {/* Card */}

          <motion.div
            animate={{
              y: opening ? -120 : 0,
              opacity: opening ? 1 : 0,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-10
              left-1/2
              -translate-x-1/2
              w-64
              h-40
              bg-white
              rounded-md
              shadow-2xl
              border
              border-[#D4AF37]
              z-0
            "
          >
            <div className="flex h-full items-center justify-center text-[#800020] text-3xl">
              AN ♥ NJ
            </div>
          </motion.div>

          {/* Envelope */}

          <div className="absolute bottom-0 w-full h-40 rounded-b-lg bg-[#800020] shadow-2xl z-10"></div>

          {/* Top Flap */}

          <motion.div
            animate={{
              rotateX: opening ? 180 : 0,
            }}
            transition={{
              duration: 1,
            }}
            style={{
              transformOrigin: "top",
            }}
            className="
              absolute
              top-0
              w-0
              h-0
              border-l-[160px]
              border-r-[160px]
              border-t-[100px]
              border-l-transparent
              border-r-transparent
              border-t-[#8f0024]
              z-20
            "
          />

          {/* Seal */}

          <motion.button
            onClick={handleOpen}
            animate={{
              scale: opening ? 0 : 1,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              absolute
              left-1/2
              top-[118px]
              -translate-x-1/2
              w-16
              h-16
              rounded-full
              bg-[#D4AF37]
              border-4
              border-yellow-200
              text-[#800020]
              font-bold
              shadow-xl
              z-30
            "
          >
            NJ
          </motion.button>

        </div>

      </div>

    </section>
  );
}