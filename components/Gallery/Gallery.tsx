
"use client";

import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";

const photos = [
  {
    src: "/images/gallery/photo1.jpg",
    alt: "Nnamdi and Angel",
  },
  {
    src: "/images/gallery/photo2.jpg",
    alt: "Nnamdi and Angel",
  },
  {
    src: "/images/gallery/photo3.jpg",
    alt: "Nnamdi and Angel",
  },
  {
    src: "/images/gallery/photo4.jpg",
    alt: "Nnamdi and Angel",
  },
  {
    src: "/images/gallery/photo5.jpg",
    alt: "Nnamdi and Angel",
  },
  {
    src: "/images/gallery/photo6.jpg",
    alt: "Nnamdi and Angel",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Our Moments"
          subtitle="A collection of beautiful moments from our journey together."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="aspect-square overflow-hidden rounded-2xl bg-white shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

