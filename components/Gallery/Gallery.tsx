"use client";

import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";

const photos = [
  {
    src: "/images/gallery/photo1.jpeg",
    alt: "Angel and Nnamdi",
    featured: true,
  },
  {
    src: "/images/gallery/photo2.jpeg",
    alt: "Angel and Nnamdi",
  },
  {
    src: "/images/gallery/photo3.jpeg",
    alt: "Angel and Nnamdi",
  },
  {
    src: "/images/gallery/photo4.jpeg",
    alt: "Angel and Nnamdi",
  },
  {
    src: "/images/gallery/photo5.jpeg",
    alt: "Angel and Nnamdi",
  },
  {
    src: "/images/gallery/photo6.jpeg",
    alt: "Angel and Nnamdi",
  },
  {
  src: "/images/gallery/photo7.jpeg",
  alt: "Angel and Nnamdi",
},
];

export default function Gallery() {
  return (
    <section className="py-24 px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Our Moments"
          subtitle="A collection of beautiful moments from our journey together."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-[0_15px_35px_rgba(80,0,32,0.10)]
                ${
                  photo.featured
                    ? "col-span-2 row-span-2 min-h-[360px] md:min-h-[520px]"
                    : "aspect-[4/5]"
                }
              `}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-[10px] rounded-[20px] border border-white/25 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xl">
            ♥
          </span>
          <div className="h-px w-16 bg-[#D4AF37]" />
        </div>
      </div>
    </section>
  );
}