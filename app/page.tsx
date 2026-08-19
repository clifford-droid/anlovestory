"use client";

import { useState } from "react";

import Welcome from "@/components/welcome/Welcome";
import Envelope from "@/components/envelope/Envelope";
import Invitation from "@/components/invitation/Invitation";
import MusicPlayer from "@/components/music/MusicPlayer";

export default function Home() {
  const [step, setStep] = useState<
    "welcome" | "envelope" | "invitation"
  >("welcome");

  return (
    <>
      <MusicPlayer />

      {step === "welcome" && (
        <Welcome
          onOpen={() => setStep("envelope")}
        />
      )}

      {step === "envelope" && (
        <Envelope
          onOpen={() => setStep("invitation")}
        />
      )}

      {step === "invitation" && (
        <Invitation />
      )}
    </>
  );
}