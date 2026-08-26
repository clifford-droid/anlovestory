"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import SectionTitle from "../section-title/SectionTitle";

type RSVPProps = {
  invitationCode?: string;
};

export default function RSVP({
  invitationCode,
}: RSVPProps) {
  const pathname = usePathname();

  // Example:
  // /invite/6JDM3Q6W
  const pathCode =
    pathname.startsWith("/invite/")
      ? pathname.split("/invite/")[1]?.split("/")[0]
      : undefined;

  // Use the supplied invitation code first.
  // If it is missing, recover it directly from the URL.
  const code = invitationCode || pathCode;

  const rsvpLink = code
    ? `/rsvp?code=${encodeURIComponent(code)}`
    : "/rsvp";

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle
          title="Kindly Reply"
          subtitle="Your RSVP"
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
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <div className="text-[#D4AF37] text-3xl mb-6">
            ✦
          </div>

          <p className="text-gray-600 text-lg md:text-xl leading-8 max-w-2xl mx-auto">
            Your presence would make our celebration even more special.
            Kindly let us know if you will be joining us as we celebrate
            this beautiful beginning together.
          </p>

          {code ? (
            <a
              href={rsvpLink}
              className="
                inline-flex
                items-center
                justify-center
                mt-10
                px-10
                py-4
                rounded-full
                bg-[#800020]
                text-white
                tracking-wide
                shadow-md
                transition-all
                duration-300
                hover:bg-[#650019]
                hover:shadow-lg
                active:scale-95
                cursor-pointer
              "
            >
              RSVP — TAP TO REGISTER
            </a>
          ) : (
            <div className="mt-10">
              <p className="text-sm text-red-600">
                Unable to load your registration link.
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Please reopen your personal invitation link and try again.
              </p>
            </div>
          )}

          <p className="mt-8 text-sm uppercase tracking-widest text-[#800020]">
            Please respond by September 18, 2026
          </p>

          <p className="mt-6 text-[#D4AF37] tracking-widest">
            #ANLoveStory
          </p>
        </motion.div>
      </div>
    </section>
  );
}