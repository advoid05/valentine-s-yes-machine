import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["🎉", "💖", "💕", "🥰", "💗", "✨", "🎊", "💘", "🩷", "🫶"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

const Celebration = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const p = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
    }));
    setParticles(p);
  }, []);

  // Play music when component mounts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5; // Set volume to 50%
          audioRef.current.muted = false; // Unmute before playing
          await audioRef.current.play();
        } catch (error) {
          console.log("Audio playback failed - may need user interaction:", error);
        }
      }
    };

    // Try to play immediately
    playAudio();

    // Add click handler as fallback for browsers that require user interaction
    const handleUserInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("click", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background music */}
      <audio
        ref={audioRef}
        src="/tangled-i-see-the-light_CYcydMJk.mp3"
        loop
      />
      {/* Confetti particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="fixed pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0.5],
            rotate: [0, 180, 360],
            y: [0, -50, 50],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {p.emoji}
        </motion.span>
      ))}

      <motion.div
        className="z-10 flex flex-col items-center gap-6 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-9xl"
          animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          🥰
        </motion.div>

        <h1 className="text-4xl sm:text-6xl text-foreground">
          Yaaay!!!
        </h1>

        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground font-semibold max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ fontFamily: "var(--font-body)" }}
        >
          I knew you'd say yes! 💕
          <br />
          You just made me the happiest person ever! 🫶
        </motion.p>

        <motion.div
          className="mt-4 rounded-2xl bg-card px-8 py-4 shadow-lg border border-border"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-lg text-card-foreground" style={{ fontFamily: "var(--font-body)" }}>
            I love you Soumya ❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Celebration;
