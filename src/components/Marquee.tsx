import { motion } from "framer-motion";

export default function Marquee() {
  const words = [
    "Нейросети",
    "Дизайн",
    "Будущее",
    "matrix.ai",
    "Frontend",
    "Анимация",
    "Инновации",
    "Премиум",
  ];

  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="relative w-full bg-[#030C14] py-8 border-y border-neutral-800 overflow-hidden" id="marquee-section">
      <div className="flex whitespace-nowrap overflow-hidden" id="marquee-track">
        <motion.div
          className="flex items-center gap-12 text-[#32CD32] font-mono text-lg md:text-2xl font-semibold uppercase tracking-wider select-none pr-12"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 18,
            ease: "linear",
          }}
          id="marquee-content-1"
        >
          {repeatedWords.map((word, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span>{word}</span>
              <span className="text-white/20 text-sm">•</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-12 text-[#32CD32] font-mono text-lg md:text-2xl font-semibold uppercase tracking-wider select-none pr-12"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 18,
            ease: "linear",
          }}
          id="marquee-content-2"
        >
          {repeatedWords.map((word, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <span>{word}</span>
              <span className="text-white/20 text-sm">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
