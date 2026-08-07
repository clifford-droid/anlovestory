"use client";

type WelcomeProps = {
  onOpen: () => void;
};

export default function Welcome({ onOpen }: WelcomeProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-[#FAF8F5] to-white px-6">

      <div className="text-center">

        <p className="text-[#D4AF37] tracking-[0.4em] uppercase text-sm mb-5">
          Welcome
        </p>

        <h1 className="text-6xl text-[#800020] mb-5">
          ANLoveStory
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Nnamdi John
          <br />
          &
          <br />
          Angel Nwanyim
        </p>

        <button
          onClick={onOpen}
          className="bg-[#800020] hover:bg-[#650018] transition text-white rounded-full px-10 py-4 shadow-xl"
        >
          Open Invitation
        </button>

      </div>

    </section>
  );
}