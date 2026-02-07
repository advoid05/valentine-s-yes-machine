import { useEffect, useState } from "react";

const HEARTS = ["💕", "💖", "💗", "💘", "❤️", "🩷", "💝"];

interface Heart {
  id: number;
  emoji: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
  angle: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: (i * 0.2),
      angle: Math.random() * 360, // Random direction for movement
    }));
    setHearts(initial);
  }, []);

  return (
    <>
      {hearts.map((h) => {
        // Calculate movement based on angle
        const radians = (h.angle * Math.PI) / 180;
        const tx = Math.cos(radians) * 150;
        const ty = -Math.sin(radians) * 150;

        return (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
            } as React.CSSProperties & { "--tx": string; "--ty": string }}
          >
            {h.emoji}
          </span>
        );
      })}
    </>
  );
};

export default FloatingHearts;
