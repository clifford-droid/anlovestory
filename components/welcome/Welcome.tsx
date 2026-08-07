"use client";

type WelcomeProps = {
  onOpen: () => void;
};

export default function Welcome({ onOpen }: WelcomeProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#FAF8F5] to-white px-6">

      <div className="max-w-md w-full rounded-[32px] bg-white shadow-2xl border border-[#F2E6C9] p-10 text-center">

        <p className="uppercase tracking-[0.45em] text-[#D4AF37] text-sm">
          You Are Invited
        </p>

        <div className="my-8">
          <h1 className="text-5xl text-[#800020]">
            NJ ♥ AN
          </h1>
        </div>

        <p className="text-gray-600 leading-8">
          Together with our families
          <br />
          request the pleasure of your company
          <br />
          as we celebrate our wedding.
        </p>

        <div className="my-10">
          <h2 className="text-4xl text-[#800020]">
            Nnamdi John
          </h2>

          <p className="text-[#B79CED] text-2xl my-3">&</p>

          <h2 className="text-4xl text-[#800020]">
            Angel Nwanyim
          </h2>
        </div>

        <p className="text-[#D4AF37] tracking-widest uppercase text-sm">
          Thursday • October 1 • 2026
        </p>

        <button
          onClick={onOpen}
          className="
            mt-10
            w-full
            rounded-full
            bg-[#800020]
            py-4
            text-white
            text-lg
            font-medium
            shadow-xl
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-2xl
          "
        >
          Open Invitation
        </button>

      </div>

    </section>
  );
}