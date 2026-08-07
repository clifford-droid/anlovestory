import { wedding } from "../../data/wedding";
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#FAF8F5] to-[#F6F2EC] px-6">

      {/* Top Left Decoration */}
      <div className="absolute top-8 left-8 text-6xl opacity-20">
        🌸
      </div>

      {/* Top Right Decoration */}
      <div className="absolute top-8 right-8 text-6xl opacity-20">
        🌸
      </div>

      {/* Bottom Left Decoration */}
      <div className="absolute bottom-8 left-8 text-6xl opacity-20 rotate-180">
        🌸
      </div>

      {/* Bottom Right Decoration */}
      <div className="absolute bottom-8 right-8 text-6xl opacity-20 rotate-180">
        🌸
      </div>

      <div className="text-center max-w-4xl">

        <div className="inline-block border border-[#D4AF37] rounded-full px-8 py-3 mb-10">
          <span className="text-[#D4AF37] tracking-[0.5em] text-xl">
            NJ ♥ AN
          </span>
        </div>

        <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-sm mb-5">
          Together with our Families
        </p>

        <p className="italic text-gray-600 mb-10">
          joyfully invite you to celebrate the beginning of our forever
        </p>

        <h1 className="text-6xl md:text-8xl text-[#800020] font-bold">
          Nnamdi John
        </h1>

        <p className="text-5xl text-[#B79CED] my-6">&</p>

        <h1 className="text-6xl md:text-8xl text-[#800020] font-bold">
          Angel Nwanyim
        </h1>

        <div className="mt-12 space-y-3">
          <p className="text-2xl font-semibold text-gray-700">
            Thursday, October 1, 2026
          </p>

          <p className="text-lg text-gray-600">
            11:00 AM
          </p>

          <p className="text-gray-500">
            New Planet Resorts Event Hall
          </p>

          <p className="text-gray-500">
            133/135 Aka Road, Ajangbadi, Ojo, Lagos
          </p>
        </div>

        <button
          className="mt-12 rounded-full bg-[#800020] px-10 py-4 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300"
        >
          Open Invitation
        </button>

      </div>
    </section>
  );
}