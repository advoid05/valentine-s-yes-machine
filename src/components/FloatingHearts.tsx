import { useEffect, useState } from "react";

const HEARTS = ["💕", "💖", "💗", "💘", "❤️", "🩷", "💝"];

interface Heart {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      left: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: (i * 0.2), // Small stagger so they start immediately
    }));
    setHearts(initial);
  }, []);

  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            bottom: "0",
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;
