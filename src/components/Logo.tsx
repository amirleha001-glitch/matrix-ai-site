import { useState, useEffect } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
  iconSize?: number;
  textColor?: "dark" | "white";
  layout?: "horizontal" | "vertical";
}

export default function Logo({
  className = "",
  showText = true,
  textSize = "text-xl",
  iconSize = 40,
  textColor = "dark",
  layout = "horizontal"
}: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [hasCheckedImage, setHasCheckedImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/image.png";
    img.onload = () => {
      setHasCheckedImage(true);
      setImageFailed(false);
    };
    img.onerror = () => {
      setHasCheckedImage(true);
      setImageFailed(true);
    };
  }, []);

  const textClass = textColor === "dark" ? "text-[#030C14]" : "text-white";

  const renderSVGLogo = () => {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:scale-105"
        id="matrix-logo-svg"
      >
        {/* Левая темная половина буквы M */}
        <path
          d="M20 75V25C20 22.2386 22.2386 20 25 20H45C47.7614 20 50 22.2386 50 25V55L45 50L20 75Z"
          fill="#030C14"
          className="transition-colors duration-300 hover:fill-[#000000]"
        />
        {/* Соединительный 3D-сгиб */}
        <path
          d="M50 55L50 25C50 22.2386 47.7614 20 45 20H50L55 25V55L50 55Z"
          fill="#0c1a26"
        />
        {/* Правая салатовая половина M */}
        <path
          d="M50 55V25C50 22.2386 52.2386 20 55 20H75C77.7614 20 80 22.2386 80 25V75L50 55Z"
          fill="#32CD32"
        />

        {/* Распадающиеся пиксели в правом верхнем углу */}
        <rect
          x="78"
          y="12"
          width="8"
          height="8"
          fill="#32CD32"
          className="animate-pulse"
          style={{ animationDelay: "0.2s" }}
        />
        <rect
          x="88"
          y="6"
          width="8"
          height="8"
          fill="#32CD32"
          className="animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <rect
          x="88"
          y="18"
          width="6"
          height="6"
          fill="#32CD32"
          opacity="0.8"
        />
        <rect
          x="70"
          y="6"
          width="6"
          height="6"
          fill="#32CD32"
          opacity="0.6"
        />
      </svg>
    );
  };

  return (
    <div
      className={`flex ${
        layout === "vertical" ? "flex-col items-center text-center" : "items-center gap-3"
      } ${className}`}
      id="matrix-brand-container"
    >
      {hasCheckedImage && !imageFailed ? (
        <img
          src="/image.png"
          alt="Matrix.ai Logo"
          style={{ height: iconSize, width: "auto" }}
          onError={() => setImageFailed(true)}
          className="object-contain"
          id="matrix-logo-img"
        />
      ) : (
        renderSVGLogo()
      )}

      {showText && (
        <div
          className={`${textSize} font-bold tracking-tight ${textClass} flex items-center`}
          style={{ fontFamily: "var(--font-sans)" }}
          id="matrix-logo-text"
        >
          <span>matrix</span>
          <span className="text-[#32CD32]">.ai</span>
        </div>
      )}
    </div>
  );
}
