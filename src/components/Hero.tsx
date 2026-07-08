import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onStartProject: () => void;
}

export default function Hero({ onStartProject }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const points: { x: number; y: number; z: number }[] = [];
    const numPoints = 80;
    const radius = Math.min(width, height) * 0.14;

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(-1 + (2 * i) / numPoints);
      const phi = Math.sqrt(numPoints * Math.PI) * theta;

      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      });
    }

    let angleY = 0.003;
    let angleX = 0.002;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;

      const currentAngleY = angleY + mousePos.x * 0.01;
      const currentAngleX = angleX + mousePos.y * 0.01;

      const projected: { x: number; y: number; size: number; alpha: number }[] = [];
      const cx = width / 2;
      const cy = height / 2;
      const distance = radius * 3.5;

      points.forEach((p) => {
        const cosY = Math.cos(currentAngleY);
        const sinY = Math.sin(currentAngleY);
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        const cosX = Math.cos(currentAngleX);
        const sinX = Math.sin(currentAngleX);
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        const perspectiveScale = distance / (distance + z2);
        const projX = cx + x1 * perspectiveScale;
        const projY = cy + y2 * perspectiveScale;

        const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));

        projected.push({
          x: projX,
          y: projY,
          size: Math.max(1, 4 * perspectiveScale),
          alpha,
        });
      });

      ctx.lineWidth = 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * 0.95) {
            const opacity = (1 - dist / (radius * 0.95)) * 0.15 * projected[i].alpha;
            ctx.strokeStyle = `rgba(50, 205, 50, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        ctx.fillStyle = `rgba(5, 12, 20, ${p.alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        if (p.alpha > 0.6) {
          ctx.fillStyle = `rgba(50, 205, 50, ${p.alpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <section
      className="relative min-h-screen bg-white flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden"
      id="hero"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] [background-size:16px_16px] opacity-65 pointer-events-none"
        id="hero-grid-bg"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center" id="hero-content-grid">
        <div className="lg:col-span-7 flex flex-col items-start gap-8" id="hero-left-col">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-xs font-semibold text-neutral-600 uppercase tracking-widest"
            id="hero-badge"
          >
            <span className="w-2 h-2 rounded-full bg-[#32CD32] animate-pulse" />
            Интеллектуальный Бутик Дизайна
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#030C14] leading-[1.05]"
            id="hero-main-title"
          >
            Создаем цифровое <br className="hidden md:block" />
            будущее с помощью <span className="text-[#32CD32] relative inline-block">ИИ.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-500 max-w-xl font-normal leading-relaxed"
            id="hero-subtitle"
          >
            Премиальные нейро-логотипы, сайты-визитки и анимации для вашего бизнеса.
            Быстро. Инновационно. Безупречно.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            id="hero-actions"
          >
            <button
              onClick={onStartProject}
              className="px-8 py-4 rounded-full bg-[#030C14] text-white font-semibold text-base hover:bg-[#32CD32] hover:text-[#030C14] hover:shadow-[0_12px_24px_rgba(50,205,50,0.25)] transition-all duration-500 flex items-center justify-center gap-3 group"
              id="hero-primary-cta"
            >
              <span>Обсудить задачу</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <a
              href="#services"
              className="px-8 py-4 rounded-full bg-transparent text-[#030C14] font-semibold text-base border border-neutral-200 hover:border-[#030C14] hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              id="hero-secondary-cta"
            >
              Наши услуги
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] relative flex items-center justify-center w-full" id="hero-right-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            id="hero-canvas-container"
          >
            <div className="absolute w-[200px] h-[200px] rounded-full bg-[#32CD32]/5 blur-[60px] pointer-events-none" id="hero-canvas-glow" />

            <canvas
              ref={canvasRef}
              className="w-full h-full max-w-[500px] max-h-[500px]"
              id="hero-canvas-sphere"
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-xs font-semibold text-neutral-400 tracking-widest uppercase pointer-events-none" id="hero-scroll-indicator">
        <span>Скролл вниз</span>
        <div className="w-[1.5px] h-8 bg-neutral-100 relative overflow-hidden rounded-full" id="indicator-line-bg">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#32CD32] rounded-full"
            style={{ height: "40%" }}
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            id="indicator-line-fill"
          />
        </div>
      </div>
    </section>
  );
}
