"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 1;
    audio.muted = false;

    const handlePlaying = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsPlaying(false);
      console.log("Audio could not be loaded.");
    };

    const startMusic = async () => {
      if (!audio.paused) return;

      try {
        audio.muted = false;
        audio.volume = 1;

        await audio.play();
      } catch (error) {
        console.log(
          "Browser prevented automatic music playback:",
          error
        );
      }
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    // One genuine interaction is enough.
    window.addEventListener(
      "pointerdown",
      startMusic,
      { once: true }
    );

    return () => {
      audio.removeEventListener(
        "playing",
        handlePlaying
      );

      audio.removeEventListener(
        "pause",
        handlePause
      );

      audio.removeEventListener(
        "error",
        handleError
      );

      window.removeEventListener(
        "pointerdown",
        startMusic
      );
    };
  }, []);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        audio.muted = false;
        audio.volume = 1;

        await audio.play();
      } catch (error) {
        console.log(
          "Music could not start:",
          error
        );
      }
    } else {
      audio.pause();
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/Heartbeat.mp3"
        preload="auto"
        loop
        playsInline
      />

      <motion.button
        type="button"
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        aria-label={
          isPlaying
            ? "Pause wedding music"
            : "Play wedding music"
        }
        className="
          fixed
          bottom-6
          right-6
          z-[100]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border-2
          border-[#D4AF37]
          bg-[#800020]
          text-white
          shadow-xl
        "
      >
        <span className="text-xl">
          {isPlaying ? "❚❚" : "♫"}
        </span>
      </motion.button>
    </>
  );
}