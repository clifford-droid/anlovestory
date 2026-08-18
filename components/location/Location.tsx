"use client";

import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";

export default function Location() {
  const mapUrl =
    "https://www.google.com/maps?q=New+Planet+Resorts+Event+Hall,+133%2F135+Aka+Road,+Ajangbadi,+Ojo,+Lagos&output=embed";

  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=New+Planet+Resorts+Event+Hall,+133%2F135+Aka+Road,+Ajangbadi,+Ojo,+Lagos";

  return (
    <section className="py-20 px-6 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Event Location"
          subtitle="We look forward to welcoming you and sharing this beautiful day together."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-3xl shadow-lg bg-white"
        >
          {/* Map */}
          <div className="w-full h-[350px] md:h-[450px]">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding venue location"
            />
          </div>

          {/* Location Information */}
          <div className="p-8 md:p-10 text-center">
            <div className="text-[#D4AF37] text-3xl mb-4">
              ✦
            </div>

            <h3 className="text-2xl md:text-3xl text-[#800020]">
              New Planet Resorts Event Hall
            </h3>

            <p className="mt-4 text-gray-500 leading-7">
              133/135 Aka Road,
              <br />
              Ajangbadi, Ojo, Lagos
            </p>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-7 px-8 py-3 rounded-full bg-[#800020] text-white hover:bg-[#650019] transition-colors duration-300"
            >
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}