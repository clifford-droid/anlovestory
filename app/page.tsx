"use client";

import { useState } from "react";

import Welcome from "@/components/welcome/Welcome";
import Envelope from "@/components/envelope/Envelope";
import Invitation from "@/components/invitation/Invitation";

export default function Home() {
  const [step, setStep] = useState<"welcome" | "envelope" | "invitation">(
    "welcome"
  );

  if (step === "welcome") {
    return (
      <Welcome onOpen={() => setStep("envelope")} />
    );
  }

  if (step === "envelope") {
    return (
      <Envelope onOpen={() => setStep("invitation")} />
    );
  }

  return <Invitation />;
}