import { useState, useEffect } from "react";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PinSection from "./components/PinSection";
import Services from "./components/Services";
import Perks from "./components/Perks";
import Process from "./components/Process";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!preloaderDone) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [preloaderDone]);

  return (
    <div className="relative w-full min-h-screen bg-white" id="app-root-wrapper">
      <Cursor />

      <Preloader onComplete={() => setPreloaderDone(true)} />

      {preloaderDone && (
        <div className="flex flex-col w-full" id="main-content-layout">
          <Header onStartProject={() => setIsModalOpen(true)} />

          <Hero onStartProject={() => setIsModalOpen(true)} />

          <PinSection />

          <Services />

          <Perks />

          <Process />

          <Marquee />

          <Footer onStartProject={() => setIsModalOpen(true)} />

          <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
