import { Shield, Zap, Compass, CheckCircle } from "lucide-react";

export default function Perks() {
  const perksList = [
    {
      title: "Космическая Скорость",
      description: "Генерация первых концептов логотипа или наброска интерфейса занимает считанные часы, а не недели долгого ожидания.",
      icon: <Zap className="w-5 h-5 text-[#32CD32]" />,
    },
    {
      title: "Абсолютная Уникальность",
      description: "Наши обученные модели генерируют структуры с нуля, исключая копирование или повторение чужих шаблонов.",
      icon: <Compass className="w-5 h-5 text-[#32CD32]" />,
    },
    {
      title: "Юридическая Безопасность",
      description: "Все права на сгенерированные и финальные графические файлы полностью принадлежат вам. Без роялти и скрытых условий.",
      icon: <Shield className="w-5 h-5 text-[#32CD32]" />,
    },
    {
      title: "Пиксельный Контроль",
      description: "Каждая деталь проходит строгую ручную калибровку и доработку нашими дизайнерами перед отправкой клиенту.",
      icon: <CheckCircle className="w-5 h-5 text-[#32CD32]" />,
    },
  ];

  return (
    <section className="py-24 bg-neutral-50 relative border-y border-neutral-100" id="perks">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16" id="perks-container">
        <div className="max-w-xl flex flex-col gap-4" id="perks-header">
          <span className="text-xs font-mono tracking-widest uppercase text-[#32CD32] font-semibold">
            Наши Преимущества
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#030C14] tracking-tight leading-tight">
            Почему выбирают матрицу ИИ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="perks-grid">
          {perksList.map((perk, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-white border border-neutral-100 flex flex-col gap-6 hover:shadow-lg hover:shadow-neutral-100 transition-all duration-300 group"
              id={`perk-card-${idx}`}
            >
              <div className="w-10 h-10 rounded-lg bg-[#32CD32]/5 flex items-center justify-center transition-colors group-hover:bg-[#32CD32]/10" id={`perk-icon-${idx}`}>
                {perk.icon}
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-[#030C14]" id={`perk-title-${idx}`}>
                  {perk.title}
                </h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal" id={`perk-desc-${idx}`}>
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
