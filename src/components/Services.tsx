import { useState, useRef, ReactNode, MouseEvent } from "react";
import { Cpu, Layout, Sparkles } from "lucide-react";

interface ServiceCardProps {
  key?: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: ReactNode;
  id: string;
}

function ServiceCard({ title, description, price, features, icon, id }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / height) * 15;
    const rY = (mouseX / width) * 15;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-8 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-all duration-300 flex flex-col justify-between h-full group"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: rotateX === 0 && rotateY === 0 ? "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
      }}
      id={`service-card-${id}`}
    >
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#32CD32] pointer-events-none transition-all duration-500 z-10" />

      <div
        className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-[#32CD32]/0 group-hover:bg-[#32CD32]/5 blur-2xl transition-all duration-500 pointer-events-none"
        style={{ transform: "translateZ(10px)" }}
      />

      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col gap-6">
        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-[#030C14] group-hover:bg-[#32CD32]/10 group-hover:text-[#32CD32] transition-colors duration-500" id={`service-icon-${id}`}>
          {icon}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold text-[#030C14] group-hover:text-black transition-colors" id={`service-title-${id}`}>
            {title}
          </h4>
          <p className="text-sm text-neutral-500 leading-relaxed font-normal" id={`service-desc-${id}`}>
            {description}
          </p>
        </div>

        <hr className="border-neutral-100 my-2" />

        <ul className="flex flex-col gap-3 text-xs text-neutral-600 font-medium" id={`service-features-${id}`}>
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32CD32]" />
              {feat}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ transform: "translateZ(20px)" }} className="mt-8 flex items-baseline justify-between" id={`service-price-wrapper-${id}`}>
        <span className="text-xs text-neutral-400 font-mono font-semibold uppercase tracking-wider">
          Стоимость
        </span>
        <span className="text-xl font-extrabold text-[#030C14] group-hover:text-[#32CD32] transition-colors">
          {price}
        </span>
      </div>
    </div>
  );
}

export default function Services() {
  const servicesList = [
    {
      id: "logo",
      title: "ИИ-Логотипы",
      description: "Уникальные, масштабируемые и современные логотипы, сгенерированные и доработанные нашей нейросетью под концепцию вашего бренда.",
      price: "от 45 000 ₸",
      features: [
        "10+ концептов за 24 часа",
        "Векторный формат (SVG, PDF, EPS)",
        "Полный брендбук по цветам",
        "Адаптивные вариации",
      ],
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      id: "landing",
      title: "ИИ-Сайты визитки",
      description: "Современные, сверхбыстрые и невероятно красивые landing-page без перегруженного бэкенда. Идеально для стартапов и презентации продуктов.",
      price: "от 120 000 ₸",
      features: [
        "Уникальный интерактивный дизайн",
        "Адаптивность под все устройства",
        "Оптимизация скорости загрузки",
        "Интеграция с ИИ-ассистентами",
      ],
      icon: <Layout className="w-6 h-6" />,
    },
    {
      id: "animation",
      title: "ИИ-Анимация",
      description: "Оживите ваш бренд. Создаем залипательные, гипнотические 2D и 3D анимации для соцсетей, презентаций или шапки вашего веб-сайта.",
      price: "от 65 000 ₸",
      features: [
        "Анимация готовых логотипов",
        "Короткие промо-ролики для Reels/Shorts",
        "Плавные Lottie и GIF форматы",
        "Свободные авторские права",
      ],
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-24 bg-white relative z-10" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16" id="services-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="services-section-header">
          <div className="max-w-xl flex flex-col gap-4" id="services-header-text">
            <span className="text-xs font-mono tracking-widest uppercase text-[#32CD32] font-semibold">
              Услуги И Сервисы
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#030C14] tracking-tight leading-tight">
              Интеллектуальные решения для вашего бренда
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-500 max-w-sm font-normal leading-relaxed" id="services-header-desc">
            Мы объединили эстетику минимализма и мощность нейросетей нового поколения для создания безупречного контента.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="services-grid">
          {servicesList.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
