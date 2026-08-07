"use client";

import { useState } from "react";

import Welcome from "@/components/welcome/Welcome";
import Hero from "@/components/hero/Hero";
import Countdown from "@/components/countdown/Countdown";

export default function Home() {
  const [opened, setOpened] = useState(false);

  if (!opened) {
    return <Welcome onOpen={() => setOpened(true)} />;
  }

  return (
    <>
      <Hero />
      <Countdown />
    </>
  );
}