import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(0); // 0: Сборка пикселей, 1: Появление текста, 2: Растворение

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(1);
    }, 1200);

    const timer2 = setTimeout(() => {
      setStage(2);
    }, 2400);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  // Координаты сетки 5x5, образующие букву М
  const pixelPositions = [
    { r: 0, c: 0 }, { r: 0, c: 4 },
    { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: 3 }, { r: 1, c: 4 },
    { r: 2, c: 0 }, { r: 2, c: 2 }, { r: 2, c: 4 },
    { r: 3, c: 0 }, { r: 3, c: 4 },
    { r: 4, c: 0 }, { r: 4, c: 4 },
  ];

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          id="preloader-overlay"
        >
          <div className="flex flex-col items-center justify-center gap-6" id="preloader-content-wrapper">
            {/* Анимация сборки сетки пикселей */}
            <div className="relative w-24 h-24 grid grid-cols-5 grid-rows-5 gap-1" id="preloader-pixel-grid">
              {pixelPositions.map((pos, index) => (
                <motion.div
                  key={index}
                  className="bg-[#32CD32] rounded-xs shadow-[0_0_12px_rgba(50,205,50,0.4)]"
                  style={{
                    gridRowStart: pos.r + 1,
                    gridColumnStart: pos.c + 1,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    type: "spring",
                    stiffness: 120,
                  }}
                />
              ))}
            </div>

            {/* Мягкое появление названия бренда */}
            <div className="h-8 overflow-hidden flex items-center justify-center" id="preloader-text-container">
              <AnimatePresence>
                {stage >= 1 && (
                  <motion.div
                    className="flex items-center text-xl font-bold tracking-[0.2em] text-[#030C14]"
                    initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    id="preloader-brand-text"
                  >
                    MATRIX<span className="text-[#32CD32]">.AI</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Индикатор загрузки на нижней грани */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-neutral-100" id="preloader-bar-bg">
            <motion.div
              className="h-full bg-[#32CD32]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              id="preloader-bar-fill"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
