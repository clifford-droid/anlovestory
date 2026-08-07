"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const weddingDate = new Date("2026-10-01T11:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        ),
        seconds: Math.floor(
          (difference % (1000 * 60)) / 1000
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="py-24 bg-white text-center">
      <h2 className="text-4xl text-[#800020] mb-10">
        Countdown to Our Big Day
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-6">
        <TimeCard value={timeLeft.days} label="Days" />
        <TimeCard value={timeLeft.hours} label="Hours" />
        <TimeCard value={timeLeft.minutes} label="Minutes" />
        <TimeCard value={timeLeft.seconds} label="Seconds" />
      </div>
    </section>
  );
}

function TimeCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-[#FAF8F5] shadow-lg p-8">
      <div className="text-5xl font-bold text-[#800020]">
        {value}
      </div>

      <div className="uppercase tracking-widest text-[#D4AF37] mt-3">
        {label}
      </div>
    </div>
  );
}
