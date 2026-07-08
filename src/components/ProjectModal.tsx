import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Send } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    category: "landing",
    contactType: "telegram",
    contactHandle: "",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactHandle) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      category: "landing",
      contactType: "telegram",
      contactHandle: "",
      details: "",
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="project-modal-overlay">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            id="modal-backdrop"
          />

          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            id="modal-card"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-50 transition-colors text-neutral-400 hover:text-neutral-600 z-10"
              id="modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6" id="modal-form">
                <div id="modal-header">
                  <h3 className="text-2xl font-black text-[#030C14] tracking-tight">
                    Начнем ваш проект
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Синтезируйте будущее вашего бренда прямо сейчас.
                  </p>
                </div>

                <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1" id="modal-fields">
                  <div className="flex flex-col gap-1.5" id="field-name-wrapper">
                    <label className="text-xs font-bold text-neutral-500 font-mono uppercase">
                      Ваше Имя *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Алексей"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#32CD32] focus:ring-1 focus:ring-[#32CD32]"
                      id="input-name"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5" id="field-company-wrapper">
                    <label className="text-xs font-bold text-neutral-500 font-mono uppercase">
                      Название компании
                    </label>
                    <input
                      type="text"
                      placeholder="My Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#32CD32] focus:ring-1 focus:ring-[#32CD32]"
                      id="input-company"
                    />
                  </div>

                  <div className="flex flex-col gap-2" id="field-category-wrapper">
                    <label className="text-xs font-bold text-neutral-500 font-mono uppercase">
                      Тип проекта
                    </label>
                    <div className="grid grid-cols-2 gap-2" id="category-grid">
                      {[
                        { id: "landing", label: "Сайт-визитка" },
                        { id: "logo", label: "ИИ-Логотип" },
                        { id: "animation", label: "Анимация" },
                        { id: "other", label: "Другое" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: item.id })}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            formData.category === item.id
                              ? "border-[#32CD32] bg-[#32CD32]/10 text-black"
                              : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2" id="field-contact-type-wrapper">
                    <label className="text-xs font-bold text-neutral-500 font-mono uppercase">
                      Способ связи
                    </label>
                    <div className="flex gap-2" id="contact-type-row">
                      {[
                        { id: "telegram", label: "Telegram" },
                        { id: "whatsapp", label: "WhatsApp" },
                        { id: "phone", label: "Звонок" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, contactType: item.id })}
                          className={`flex-1 px-2 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            formData.contactType === item.id
                              ? "border-[#32CD32] bg-[#32CD32]/10 text-black"
                              : "border-neutral-200 hover:border-neutral-300 text-neutral-500"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5" id="field-contact-handle-wrapper">
                    <label className="text-xs font-bold text-neutral-500 font-mono uppercase">
                      Ваш никнейм или номер *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={
                        formData.contactType === "telegram"
                          ? "@your_nickname"
                          : formData.contactType === "whatsapp"
                            ? "+7 700 123 4567"
                            : "+7..."
                      }
                      value={formData.contactHandle}
                      onChange={(e) => setFormData({ ...formData, contactHandle: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#32CD32] focus:ring-1 focus:ring-[#32CD32]"
                      id="input-contact-handle"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5" id="field-details-wrapper">
                    <label className="text-xs font-bold text-neutral-500 font-mono uppercase">
                      Пожелания или описание проекта
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Хочется премиальный сайт-визитку с анимациями..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-[#32CD32] focus:ring-1 focus:ring-[#32CD32] resize-none"
                      id="input-details"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#030C14] text-white font-extrabold text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-[#32CD32] hover:text-black transition-colors duration-300"
                  id="modal-submit-btn"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Синтезировать проект</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center flex flex-col items-center gap-6" id="success-screen">
                <div className="w-16 h-16 rounded-full bg-[#32CD32]/10 border border-[#32CD32] flex items-center justify-center text-[#32CD32] animate-bounce mt-4" id="success-icon-wrapper">
                  <Check className="w-8 h-8" />
                </div>

                <div className="flex flex-col gap-2" id="success-text-wrapper">
                  <h3 className="text-2xl font-black text-[#030C14] tracking-tight">
                    Заявка Синтезирована!
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium leading-relaxed max-w-sm">
                    Мы успешно зафиксировали вашу матрицу проекта. Наши ИИ-кураторы свяжутся с вами в течение{" "}
                    <span className="text-[#32CD32] font-bold">15 минут</span> через указанный{" "}
                    {formData.contactType}.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-4 mt-2 rounded-xl border border-neutral-200 text-neutral-600 hover:border-black hover:text-black font-bold text-sm uppercase transition-all duration-300"
                  id="success-back-btn"
                >
                  Вернуться на сайт
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
