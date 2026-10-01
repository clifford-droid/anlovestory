const programme = [
  { event: "Arrival & Welcoming of Guests", icon: "✦" },
  { event: "Recognition of VIP Guests", icon: "✦" },
  { event: "Let’s Welcome the Chairman", icon: "✦" },
  { event: "Introduction of the Couple’s Parents", icon: "♥" },
  { event: "Opening Prayer", icon: "✦" },
  { event: "Bridal Train Entrance", icon: "✦" },
  { event: "Couple’s Grand Entrance", icon: "♥" },
  { event: "Chairman’s Opening Speech", icon: "✦" },
  {
    event: "Couple’s First Dance",
    subtitle: "Romantic Couple Moment",
    icon: "♥",
  },
  { event: "Cutting of Cake & Feeding", icon: "✦" },
  { event: "Fun Couple Games & Guest Engagement", icon: "✦" },
  { event: "Presentation of Gifts", icon: "✦" },
  { event: "Couple’s Dance with Friends", icon: "♥" },
  { event: "Couple’s Dance with Parents", icon: "♥" },
  { event: "Dance, Dance, Dance", icon: "✦" },
  { event: "Vote of Thanks", icon: "✦" },
];

export default function ProgrammePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] text-[#342B31]">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#B79CED]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-[500px] h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      {/* HERO */}
      <section className="relative px-5 pb-12 pt-16 text-center">

        <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#D4AF37]">
          #ANLoveStory
        </p>

        <p
          className="mb-1 text-xl italic text-[#7D688C]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          The Wedding Reception of
        </p>

        <h1
          className="mt-3 text-5xl leading-none md:text-7xl"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Angel
          <span className="mx-3 font-light text-[#D4AF37]">&</span>
          Nnamdi
        </h1>

        {/* Ornament */}
        <div className="my-7 flex items-center justify-center gap-3">
          <span className="h-px w-14 bg-[#D4AF37]/70" />
          <span className="text-lg text-[#D4AF37]">✦</span>
          <span className="h-px w-14 bg-[#D4AF37]/70" />
        </div>

        <h2
          className="text-3xl text-[#7D688C] md:text-4xl"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Order of Events
        </h2>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-[#625962]">
          Thursday • 01 October • 2026
        </p>

        <p className="mt-2 text-sm text-[#8B8188]">
          New Planet Resorts Event Hall
        </p>
      </section>

      {/* INTRO */}
      <section className="relative mx-auto max-w-xl px-8 pb-10 text-center">
        <p
          className="text-xl italic leading-relaxed text-[#655966]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          We are delighted to celebrate this beautiful day with you.
          Enjoy every moment, every smile and every dance.
        </p>
      </section>

      {/* TIMELINE */}
      <section className="relative mx-auto max-w-2xl px-5 pb-20">

        <div className="relative ml-3 border-l border-[#D4AF37]/50 pl-7 md:ml-6 md:pl-10">

          {programme.map((item, index) => (
            <article
              key={`${index}-${item.event}`}
              className="group relative mb-6"
            >
              {/* Timeline circle */}
              <div className="absolute -left-[2.16rem] top-7 flex h-4 w-4 items-center justify-center rounded-full border border-[#D4AF37] bg-[#FAF8F5] md:-left-[2.78rem]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              {/* Event card */}
              <div className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-white/75 px-6 py-5 shadow-[0_8px_30px_rgba(70,50,60,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(70,50,60,0.09)]">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B38D29]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3
                      className="text-[1.65rem] leading-tight text-[#40353D]"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                      }}
                    >
                      {item.event}
                    </h3>

                    {item.subtitle && (
                      <p className="mt-2 text-sm italic text-[#8A7D86]">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <span className="mt-1 text-sm text-[#D4AF37]">
                    {item.icon}
                  </span>

                </div>
              </div>
            </article>
          ))}

        </div>
      </section>

      {/* MENU BUTTON */}
      <section className="relative px-6 pb-16 text-center">
        <a
          href="/menu"
          className="inline-flex items-center justify-center rounded-full border border-[#D4AF37] bg-[#D4AF37] px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#B38D29]"
        >
          View Menu
        </a>
      </section>

      {/* MENU */}
<section className="relative mx-auto max-w-2xl px-5 pb-20">

  <div className="mb-10 text-center">

    <div className="mb-7 flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-[#D4AF37]/70" />
      <span className="text-[#D4AF37]">✦</span>
      <span className="h-px w-12 bg-[#D4AF37]/70" />
    </div>

    <p
      className="text-xl italic text-[#7D688C]"
      style={{ fontFamily: "Cormorant Garamond, serif" }}
    >
      A Taste of Celebration
    </p>

    <h2
      className="mt-2 text-4xl text-[#7D688C] md:text-5xl"
      style={{ fontFamily: "Cormorant Garamond, serif" }}
    >
      Wedding Menu
    </h2>

  </div>

  <div className="space-y-6">

    {/* APPETIZER */}
    <article className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-white/75 px-6 py-7 shadow-[0_8px_30px_rgba(70,50,60,0.05)] backdrop-blur-sm">

      <h3
        className="mb-5 text-2xl text-[#7D688C]"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Appetizer
      </h3>

      <div className="space-y-3">
        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Small Chops
        </p>

        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Chapman
        </p>
      </div>

    </article>

    {/* MAIN DISH */}
    <article className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-white/75 px-6 py-7 shadow-[0_8px_30px_rgba(70,50,60,0.05)] backdrop-blur-sm">

      <h3
        className="mb-5 text-2xl text-[#7D688C]"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Main Dish
      </h3>

      <div className="space-y-3">

        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Semo & Egusi Soup
        </p>

        <div className="flex items-center gap-3">
          <p className="text-xl text-[#40353D]">
            <span className="mr-3 text-[#D4AF37]">✦</span>
            Amala & Ewedu
          </p>

          <span className="text-[10px] uppercase tracking-[0.15em] text-[#B38D29]">
            At the Spot
          </span>
        </div>

        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Jollof Rice
        </p>

        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Fried Rice
        </p>

      </div>

    </article>

    {/* SIDES */}
    <article className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-white/75 px-6 py-7 shadow-[0_8px_30px_rgba(70,50,60,0.05)] backdrop-blur-sm">

      <h3
        className="mb-5 text-2xl text-[#7D688C]"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Sides
      </h3>

      <p className="text-xl text-[#40353D]">
        <span className="mr-3 text-[#D4AF37]">✦</span>
        Tasty Popcorn
      </p>

    </article>

    {/* PROTEIN */}
    <article className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-white/75 px-6 py-7 shadow-[0_8px_30px_rgba(70,50,60,0.05)] backdrop-blur-sm">

      <h3
        className="mb-5 text-2xl text-[#7D688C]"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Protein
      </h3>

      <div className="space-y-3">

        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Beef
        </p>

        <p className="text-xl text-[#40353D]">
          <span className="mr-3 text-[#D4AF37]">✦</span>
          Chicken
        </p>

      </div>

    </article>

  </div>

</section>

      {/* CLOSING */}
      <section className="relative px-6 pb-20 text-center">

        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-[#D4AF37]/70" />
          <span className="text-[#D4AF37]">♥</span>
          <span className="h-px w-12 bg-[#D4AF37]/70" />
        </div>

        <p
          className="text-4xl italic text-[#7D688C]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Let&apos;s Celebrate Love
        </p>

        <p className="mt-5 text-xs uppercase tracking-[0.35em] text-[#B38D29]">
          Angel & Nnamdi
        </p>

        <p className="mt-2 text-xs tracking-[0.25em] text-[#8A7D86]">
          #ANLoveStory
        </p>

        <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-[#AAA0A6]">
          Thank you for celebrating with us
        </p>

      </section>
    </main>
  );
}