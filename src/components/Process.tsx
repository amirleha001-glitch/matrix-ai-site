export default function Process() {
  const stepsList = [
    {
      num: "01",
      title: "Анализ и Бриф",
      description: "Обсуждаем вашу бизнес-идею, целевую аудиторию и позиционирование. Заполняем экспресс-бриф.",
    },
    {
      num: "02",
      title: "ИИ-Синтез концептов",
      description: "Генерируем сотни векторов, сеток и эскизов с помощью наших запатентованных нейросетей.",
    },
    {
      num: "03",
      title: "Ручная калибровка",
      description: "Наши арт-директора отбирают лучшие варианты и доводят их вручную до идеальных пропорций.",
    },
    {
      num: "04",
      title: "Запуск и Передача",
      description: "Вы получаете готовый архив, исходники, векторные файлы и полную передачу авторских прав.",
    },
  ];

  return (
    <section className="py-24 bg-white relative" id="process">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16" id="process-container">
        <div className="max-w-xl flex flex-col gap-4" id="process-header">
          <span className="text-xs font-mono tracking-widest uppercase text-[#32CD32] font-semibold">
            Этапы Работы
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#030C14] tracking-tight leading-tight">
            Процесс создания совершенства
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" id="process-steps-grid">
          <div className="hidden lg:block absolute top-16 left-6 right-6 h-[1.5px] bg-neutral-100 -z-10" />

          {stepsList.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-6" id={`process-step-${idx}`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl md:text-5xl font-extrabold font-mono text-neutral-200 group-hover:text-[#32CD32] transition-colors">
                  {step.num}
                </span>
                <span className="w-3 h-[1.5px] bg-[#32CD32] lg:hidden" />
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-bold text-[#030C14]" id={`step-title-${idx}`}>
                  {step.title}
                </h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal" id={`step-desc-${idx}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
