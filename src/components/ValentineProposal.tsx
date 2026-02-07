import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import Celebration from "./Celebration";

const MESSAGES = [
  "No",
  "Are you sure? 🥺",
  "Really really sure? 😢",
  "Think again! 💔",
];

const BEAR_STAGES = [
  "🧸",
  "🥺",
  "😢",
  "😭",
  "💀",
];

const CONVERT_AT = 4; // After this many "No" clicks, No becomes Yes

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const yesScale = 1 + noCount * 0.3;
  const bearIndex = Math.min(Math.floor(noCount / 2), BEAR_STAGES.length - 1);
  const noConverted = noCount >= CONVERT_AT;

  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1);
  }, []);

  const noText = noConverted
    ? "Yes! 💖"
    : MESSAGES[Math.min(noCount, MESSAGES.length - 1)];

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

        {noCount > 0 && !noConverted && (
          <motion.p
            className="text-lg text-muted-foreground font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={noCount}
          >
            The no button is getting suspicious...
          </motion.p>
        )}

        {noConverted && (
          <motion.p
            className="text-lg text-muted-foreground font-semibold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            See? Both buttons say Yes now 😏
          </motion.p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {/* YES Button - grows with each rejection */}
          <motion.button
            className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            style={{ fontFamily: "var(--font-body)" }}
            animate={{ scale: noConverted ? 1 : yesScale }}
            whileHover={{ scale: (noConverted ? 1 : yesScale) * 1.1 }}
            whileTap={{ scale: (noConverted ? 1 : yesScale) * 0.95 }}
            onClick={() => setAccepted(true)}
          >
            Yes! 💖
          </motion.button>

          {/* NO Button - stays in place, converts to Yes after CONVERT_AT clicks */}
          <motion.button
            className={`rounded-full px-6 py-3 font-semibold shadow transition-colors ${
              noConverted
                ? "bg-primary text-primary-foreground hover:shadow-xl"
                : "border-2 border-border bg-card text-card-foreground hover:bg-muted"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
            animate={noConverted ? { scale: 1 } : {}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={noConverted ? () => setAccepted(true) : handleNo}
          >
            {noText}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ValentineProposal;
