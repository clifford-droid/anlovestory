"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type EnvelopeProps = {
  onOpen: () => void;
};

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;

    setOpening(true);

    setTimeout(() => {
      onOpen();
    }, 1600);
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-6 overflow-hidden">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            opacity: opening ? 0 : 1,
            y: opening ? -8 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mb-8 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
            Your Invitation Awaits
          </p>

          <p className="mt-3 font-serif text-xl italic text-[#800020]">
            Tap the seal to open
          </p>
        </motion.div>

        <motion.div
          animate={{
            scale: opening ? 1.03 : 1,
            y: opening ? 10 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative h-[320px] w-[340px] sm:w-[420px]"
        >
          {/* invitation card */}

          <motion.div
            animate={{
              y: opening ? -120 : 55,
              opacity: opening ? 1 : 0.95,
            }}
            transition={{
              delay: opening ? 0.35 : 0,
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-1/2
              top-[55px]
              z-10
              h-[210px]
              w-[270px]
              -translate-x-1/2
              rounded-xl
              border
              border-[#D4AF37]/70
              bg-gradient-to-br
              from-white
              via-[#fffaf0]
              to-[#f3e6d0]
              shadow-[0_18px_40px_rgba(70,0,20,0.18)]
            "
          >
            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C49A32]">
                The Wedding Of
              </p>

              <h2 className="mt-5 font-serif text-4xl text-[#800020]">
                AN
                <span className="mx-3 text-[#D4AF37]">
                  &
                </span>
                NJ
              </h2>

              <p className="mt-4 font-serif text-xl italic text-[#800020]">
                Angel & Nnamdi
              </p>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gray-500">
                October 1, 2026
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                12 Noon
              </p>
            </div>
          </motion.div>

          {/* envelope body */}

          <div
            className="
              absolute
              bottom-0
              left-1/2
              z-20
              h-[190px]
              w-full
              -translate-x-1/2
              rounded-2xl
              bg-gradient-to-br
              from-[#650018]
              via-[#800020]
              to-[#4D0012]
              shadow-[0_24px_45px_rgba(65,0,20,0.35)]
              overflow-hidden
            "
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10" />

            <div
              className="absolute inset-0 bg-[#70001B]"
              style={{
                clipPath:
                  "polygon(0 0, 50% 100%, 0 100%)",
              }}
            />

            <div
              className="absolute inset-0 bg-[#5E0016]"
              style={{
                clipPath:
                  "polygon(100% 0, 50% 100%, 100% 100%)",
              }}
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-[#950028] to-[#78001D]"
              style={{
                clipPath:
                  "polygon(0 100%, 50% 34%, 100% 100%)",
              }}
            />
          </div>

          {/* simple top flap */}

          <motion.div
            animate={{
              opacity: opening ? 0 : 1,
              y: opening ? -30 : 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              absolute
              left-1/2
              top-[40px]
              z-30
              h-[130px]
              w-full
              -translate-x-1/2
              bg-gradient-to-b
              from-[#970028]
              via-[#820021]
              to-[#690019]
            "
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />

          {/* gold seal */}

          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={opening}
            animate={{
              opacity: opening ? 0 : 1,
              scale: opening ? 0.5 : 1,
            }}
            transition={{
              duration: 0.3,
            }}
            whileHover={{
              scale: opening ? 0.5 : 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              absolute
              left-1/2
              top-[125px]
              z-40
              flex
              h-[74px]
              w-[74px]
              -translate-x-1/2
              items-center
              justify-center
              rounded-full
              border-4
              border-[#F5DF86]
              bg-gradient-to-br
              from-[#F7E28B]
              via-[#D4AF37]
              to-[#9D7017]
              font-serif
              text-xl
              font-bold
              text-[#650018]
              shadow-xl
            "
          >
            AN
          </motion.button>
        </motion.div>

        <motion.div
          animate={{
            opacity: opening ? 1 : 0,
          }}
          transition={{
            delay: 0.9,
            duration: 0.4,
          }}
          className="mt-5 text-center"
        >
          <p className="font-serif text-xl italic text-[#800020]">
            Angel & Nnamdi
          </p>

          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            #ANLoveStory
          </p>
        </motion.div>
      </div>
    </section>
  );
}