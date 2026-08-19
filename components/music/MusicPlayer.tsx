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

    const startMusic = async () => {
      if (audio.paused) {
        try {
          await audio.play();
          setIsPlaying(true);

          removeListeners();
        } catch (error) {
          console.log("Music playback blocked:", error);
        }
      }
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", startMusic);
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("wheel", startMusic);
    };

    window.addEventListener("scroll", startMusic, { passive: true });
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic, { passive: true });
    window.addEventListener("wheel", startMusic, { passive: true });

    return () => {
      removeListeners();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Music could not start:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/Wedding-song.mp3"
        loop
        preload="auto"
      />

      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#800020] text-white shadow-lg border-2 border-[#D4AF37] flex items-center justify-center"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="text-xl">
          {isPlaying ? "❚❚" : "♫"}
        </span>
      </motion.button>
    </>
  );
}