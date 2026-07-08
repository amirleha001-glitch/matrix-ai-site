import { MessageSquare, Instagram, Send } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onStartProject: () => void;
}

export default function Footer({ onStartProject }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "WhatsApp",
      handle: "+7 775 781 6124",
      url: "https://wa.me/77757816124",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400",
    },
    {
      name: "Instagram",
      handle: "@matrix.ai.kz",
      url: "https://instagram.com/matrix.ai.kz",
      icon: <Instagram className="w-6 h-6" />,
      color: "hover:bg-pink-500/10 hover:border-pink-500/50 hover:text-pink-400",
    },
    {
      name: "Telegram-Бот",
      handle: "@matrixkzai_bot",
      url: "https://t.me/matrixkzai_bot",
      icon: <Send className="w-6 h-6" />,
      color: "hover:bg-[#32CD32]/10 hover:border-[#32CD32]/50 hover:text-[#32CD32]",
    },
  ];

  return (
    <footer className="bg-[#030C14] text-white pt-24 pb-12 relative overflow-hidden" id="contacts">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#32CD32]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-20" id="footer-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="footer-cta-block">
          <div className="lg:col-span-8 flex flex-col items-start gap-6" id="footer-cta-text">
            <span className="text-xs font-mono tracking-widest uppercase text-[#32CD32] font-semibold">
              Свяжитесь С Нами
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-2xl" id="footer-main-title">
              Готовы создать матрицу вашего бренда?
            </h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-lg font-normal leading-relaxed" id="footer-sub-desc">
              Обсудите вашу идею с нашими ИИ-архитекторами прямо сейчас и получите готовый расчёт стоимости.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end" id="footer-cta-btn-wrapper">
            <button
              onClick={onStartProject}
              className="px-10 py-5 rounded-full bg-[#32CD32] text-black font-extrabold text-base tracking-wide uppercase hover:scale-105 hover:shadow-[0_12px_32px_rgba(50,205,50,0.35)] transition-all duration-300"
              id="footer-action-btn"
            >
              Начать проект
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="footer-socials-grid">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              referrerPolicy="no-referrer"
              className={`p-6 rounded-xl border border-neutral-800 bg-neutral-900/40 flex items-center justify-between transition-all duration-500 group ${link.color}`}
              id={`social-link-${idx}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-neutral-500 font-mono tracking-wider font-semibold uppercase">
                    {link.name}
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-current transition-colors">
                    {link.handle}
                  </span>
                </div>
              </div>
              <div className="text-neutral-500 group-hover:translate-x-1.5 transition-transform duration-300" id={`arrow-${idx}`}>
                →
              </div>
            </a>
          ))}
        </div>

        <hr className="border-neutral-900" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-mono text-neutral-500" id="footer-bottom-bar">
          <div className="flex items-center" id="footer-logo-link">
            <Logo iconSize={30} textSize="text-sm" textColor="white" />
          </div>

          <div className="text-center md:text-right flex flex-col gap-2" id="footer-credits">
            <p className="font-semibold text-neutral-400" id="copyright-text">
              © {currentYear} matrix.ai. Все права защищены.
            </p>
            <p className="text-neutral-600" id="design-credit">
              Дизайн сгенерирован интеллектом.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
