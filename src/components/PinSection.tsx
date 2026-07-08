import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger);

export default function PinSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinElement = pinRef.current;
    if (!container || !pinElement) return;

    const animObject = { value: 0 };

    const tl = gsap.to(animObject, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=180%", // Длина фиксации скролла
        pin: pinElement,
        scrub: 1.2, // Плавность синхронизации колеса мыши и анимации
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const isDarkPhase = scrollProgress > 0.35;
  const isFinishedPhase = scrollProgress > 0.7;

  const bgTransitionStyle = {
    backgroundColor: scrollProgress < 0.35 
      ? "#ffffff" 
      : scrollProgress < 0.7 
        ? "#121b24" 
        : "#030C14",
    transition: "background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "260vh" }}
      id="pin-trigger-wrapper"
    >
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
        style={bgTransitionStyle}
        id="pin-content"
      >
        <div
          className={`absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none transition-opacity duration-1000 ${
            isDarkPhase ? "opacity-0" : "opacity-70"
          }`}
          id="pin-grid-light"
        />
        <div
          className={`absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none transition-opacity duration-1000 ${
            isDarkPhase ? "opacity-30" : "opacity-0"
          }`}
          id="pin-grid-dark"
        />

        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10" id="pin-floating-headers">
          <p className="text-xs font-mono tracking-widest uppercase text-[#32CD32] font-semibold mb-2">
            Интерактивный Таймлайн
          </p>
          <h3
            className={`text-2xl md:text-3xl font-extrabold tracking-tight transition-all duration-700 ${
              isDarkPhase ? "text-white" : "text-[#030C14]"
            }`}
          >
            {scrollProgress < 0.35 && "1. Рождение концепта (Wireframe)"}
            {scrollProgress >= 0.35 && scrollProgress < 0.7 && "2. Обретение формы (Премиальная тема)"}
            {scrollProgress >= 0.7 && "3. ИИ-Активация (Финальный продукт)"}
          </h3>
        </div>

        {/* Браузерный мокап */}
        <div
          className={`relative w-[90%] max-w-[850px] aspect-[16/10] rounded-xl border transition-all duration-1000 overflow-hidden shadow-2xl ${
            isDarkPhase
              ? "border-neutral-800 bg-[#050e17] shadow-black/80"
              : "border-neutral-200 bg-white shadow-neutral-200/50"
          }`}
          id="pin-browser-frame"
          style={{
            transform: `perspective(1000px) rotateX(${15 - scrollProgress * 15}deg) scale(${0.9 + scrollProgress * 0.1})`,
          }}
        >
          <div
            className={`px-4 py-3 border-b flex items-center gap-2 justify-between transition-colors duration-1000 ${
              isDarkPhase ? "border-neutral-800 bg-[#09121a]" : "border-neutral-100 bg-neutral-50"
            }`}
            id="pin-browser-controls"
          >
            <div className="flex gap-1.5" id="browser-dots">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div
              className={`text-[10px] md:text-xs px-6 py-1 rounded-full text-center tracking-tight transition-all duration-1000 w-[60%] font-mono ${
                isDarkPhase ? "bg-neutral-900/60 text-neutral-400" : "bg-neutral-200/50 text-neutral-500"
              }`}
              id="browser-address"
            >
              https://matrix.ai/brand-activation
            </div>
            <div className="w-8" />
          </div>

          <div className="p-6 md:p-8 flex flex-col h-full justify-between gap-6" id="pin-browser-body">
            <div className="flex items-center justify-between" id="fake-header">
              <div className="flex items-center gap-2">
                {isFinishedPhase ? (
                  <Logo showText={true} iconSize={24} textSize="text-sm" textColor={isDarkPhase ? "white" : "dark"} />
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-xs bg-neutral-300 animate-pulse" />
                    <div className="w-16 h-3 bg-neutral-300 rounded-xs" />
                  </>
                )}
              </div>
              <div className="flex gap-4">
                <div className={`w-12 h-2.5 rounded-xs transition-colors duration-700 ${isDarkPhase ? "bg-neutral-800" : "bg-neutral-200"}`} />
                <div className={`w-12 h-2.5 rounded-xs transition-colors duration-700 ${isDarkPhase ? "bg-neutral-800" : "bg-neutral-200"}`} />
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-4 my-auto" id="fake-hero">
              <div
                className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase transition-all duration-700 ${
                  isFinishedPhase
                    ? "bg-[#32CD32]/10 border border-[#32CD32]/30 text-[#32CD32]"
                    : "bg-neutral-100 border border-neutral-200 text-neutral-400"
                }`}
                id="fake-sub-badge"
              >
                ● {isFinishedPhase ? "SYSTEM INJECTED" : "SKELETON WIREFRAME"}
              </div>

              <div className="max-w-md flex flex-col gap-2" id="fake-title-wrapper">
                {isDarkPhase ? (
                  <h4 className="text-xl md:text-3xl font-black text-white leading-tight">
                    Интеллект формирует <span className={isFinishedPhase ? "text-[#32CD32] transition-colors" : "text-white"}>Реальность.</span>
                  </h4>
                ) : (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="w-64 h-5 bg-neutral-200 rounded-xs animate-pulse" />
                    <div className="w-48 h-5 bg-neutral-200 rounded-xs animate-pulse" />
                  </div>
                )}
              </div>

              <div className="max-w-xs md:max-w-sm mt-1" id="fake-subtitle-wrapper">
                {isDarkPhase ? (
                  <p className="text-[10px] md:text-xs text-neutral-400 leading-relaxed">
                    Преобразование аналогового бизнеса в динамическую структуру. Полная поддержка ИИ-дизайна.
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5 items-center">
                    <div className="w-56 h-2 bg-neutral-200 rounded-xs" />
                    <div className="w-40 h-2 bg-neutral-200 rounded-xs" />
                  </div>
                )}
              </div>

              <div className="mt-3">
                {isFinishedPhase ? (
                  <button className="px-5 py-2.5 rounded-full bg-[#32CD32] text-black font-extrabold text-[10px] tracking-wide uppercase shadow-[0_4px_16px_rgba(50,205,50,0.3)] hover:scale-105 transition-transform">
                    Узнать больше
                  </button>
                ) : (
                  <div className={`w-28 h-8 rounded-full border transition-colors duration-700 ${isDarkPhase ? "border-neutral-800 bg-neutral-900" : "border-neutral-200 bg-neutral-100 animate-pulse"}`} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4" id="fake-grid">
              {[1, 2, 3].map((cardId) => (
                <div
                  key={cardId}
                  className={`p-3 rounded-lg border flex flex-col gap-2 transition-all duration-1000 ${
                    isDarkPhase
                      ? "border-neutral-800 bg-neutral-900/50"
                      : "border-neutral-200 bg-neutral-50"
                  } ${isFinishedPhase && cardId === 2 ? "ring-1 ring-[#32CD32]/40" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <div className={`w-8 h-2 rounded-xs transition-colors duration-700 ${isDarkPhase ? "bg-neutral-800" : "bg-neutral-200"}`} />
                    {isFinishedPhase && cardId === 2 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#32CD32] animate-ping" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className={`w-full h-1.5 rounded-xs transition-colors duration-700 ${isDarkPhase ? "bg-neutral-700" : "bg-neutral-300"}`} />
                    <div className={`w-[80%] h-1.5 rounded-xs transition-colors duration-700 ${isDarkPhase ? "bg-neutral-700" : "bg-neutral-300"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 w-[80%] max-w-sm flex items-center justify-between text-[10px] md:text-xs font-mono" id="pin-progress-line">
          <span className={isDarkPhase ? "text-neutral-500" : "text-neutral-400"}>Concept</span>
          <div className="flex-1 mx-4 h-[2px] bg-neutral-200 relative rounded-full overflow-hidden" id="pin-progress-bar-bg">
            <div
              className="absolute left-0 top-0 h-full bg-[#32CD32] transition-all duration-200"
              style={{ width: `${scrollProgress * 100}%` }}
              id="pin-progress-bar-fill"
            />
          </div>
          <span className={isFinishedPhase ? "text-[#32CD32]" : isDarkPhase ? "text-neutral-500" : "text-neutral-400"}>
            {isFinishedPhase ? "Matrix AI" : "Render"}
          </span>
        </div>
      </div>
    </div>
  );
}
