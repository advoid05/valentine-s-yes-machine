import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import Celebration from "./Celebration";

const MESSAGES = [
  "No",
  "Are you sure? 🥺",
  "Really really sure? 😢",
  "Think again! 💔",
  "Pls? 🥹",
  "Don't do this to me 😭",
  "I'll cry... 😿",
  "You're breaking my heart 💔",
  "FINE... just kidding, try again 😏",
  "Last chance... maybe? 🫣",
  "OK I'm not giving up 🫶",
];

const BEAR_STAGES = [
  "🧸",
  "🥺",
  "😢",
  "😭",
  "💀",
];

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const yesScale = 1 + noCount * 0.25;
  const bearIndex = Math.min(Math.floor(noCount / 2), BEAR_STAGES.length - 1);

  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1);
  }, []);

  const getNoPosition = useCallback(() => {
    if (noCount < 2) return {};
    // After 2 clicks, the button runs away
    return {
      position: "fixed" as const,
      left: `${Math.random() * 70 + 10}%`,
      top: `${Math.random() * 70 + 10}%`,
    };
  }, [noCount]);

  const noText = MESSAGES[Math.min(noCount, MESSAGES.length - 1)];

  if (accepted) {
    return <Celebration />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
      <FloatingHearts />

      <motion.div
        className="z-10 flex flex-col items-center gap-6 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        {/* Bear emoji that changes with rejection */}
        <motion.div
          className="text-8xl"
          animate={{ rotate: noCount > 0 ? [0, -10, 10, -10, 0] : 0 }}
          transition={{ duration: 0.5 }}
          key={bearIndex}
        >
          {BEAR_STAGES[bearIndex]}
        </motion.div>

        <h1 className="text-3xl sm:text-5xl text-foreground drop-shadow-sm">
          Will you be my Valentine?
        </h1>

        {noCount > 0 && (
          <motion.p
            className="text-lg text-muted-foreground font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={noCount}
          >
            {noCount > 5
              ? `You've said no ${noCount} times... the button won't stop 😈`
              : "The no button is getting suspicious..."}
          </motion.p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {/* YES Button - grows with each rejection */}
          <motion.button
            className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            style={{ fontFamily: "var(--font-body)" }}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.1 }}
            whileTap={{ scale: yesScale * 0.95 }}
            onClick={() => setAccepted(true)}
          >
            Yes! 💖
          </motion.button>

          {/* NO Button - runs away after 2 clicks */}
          <AnimatePresence mode="wait">
            <motion.button
              ref={noButtonRef}
              key={noCount}
              className="rounded-full border-2 border-border bg-card px-6 py-3 font-semibold text-card-foreground shadow hover:bg-muted transition-colors"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: `${Math.max(0.7, 1 - noCount * 0.05)}rem`,
                ...getNoPosition(),
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: Math.max(0.4, 1 - noCount * 0.08) }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              whileHover={
                noCount >= 3
                  ? {
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
              onClick={handleNo}
            >
              {noText}
            </motion.button>
          </AnimatePresence>
        </div>

        {noCount >= 8 && (
          <motion.p
            className="text-sm text-accent italic mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Hint: There's only one correct answer here 😏
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ValentineProposal;
