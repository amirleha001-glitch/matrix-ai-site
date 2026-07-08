import { useEffect, useState, MouseEvent } from "react";
import Logo from "./Logo";

interface HeaderProps {
  onStartProject: () => void;
}

export default function Header({ onStartProject }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/70 backdrop-blur-md border-b border-neutral-100 shadow-xs"
          : "py-6 bg-transparent"
      }`}
      id="main-app-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between" id="header-container">
        <a href="#" className="flex items-center" id="header-logo-link">
          <Logo iconSize={36} textSize="text-lg md:text-xl" />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" id="header-nav">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, "services")}
            className="text-neutral-500 hover:text-[#030C14] transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#32CD32] hover:after:w-full after:transition-all after:duration-300"
            id="nav-link-services"
          >
            Услуги
          </a>
          <a
            href="#perks"
            onClick={(e) => handleNavClick(e, "perks")}
            className="text-neutral-500 hover:text-[#030C14] transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#32CD32] hover:after:w-full after:transition-all after:duration-300"
            id="nav-link-perks"
          >
            Преимущества
          </a>
          <a
            href="#process"
            onClick={(e) => handleNavClick(e, "process")}
            className="text-neutral-500 hover:text-[#030C14] transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#32CD32] hover:after:w-full after:transition-all after:duration-300"
            id="nav-link-process"
          >
            Процесс
          </a>
          <a
            href="#contacts"
            onClick={(e) => handleNavClick(e, "contacts")}
            className="text-neutral-500 hover:text-[#030C14] transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#32CD32] hover:after:w-full after:transition-all after:duration-300"
            id="nav-link-contacts"
          >
            Контакты
          </a>
        </nav>

        <div className="flex items-center gap-4" id="header-cta-wrapper">
          <button
            onClick={onStartProject}
            className="relative px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-semibold border-2 border-[#32CD32] text-[#030C14] bg-[#32CD32] overflow-hidden group transition-all duration-500 hover:border-[#030C14]"
            id="header-cta-btn"
          >
            <span className="absolute inset-0 w-full h-full bg-[#030C14] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            <span className="relative z-10 text-[#030C14] group-hover:text-white transition-colors duration-500">
              Начать проект
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
