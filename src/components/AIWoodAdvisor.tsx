import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Send, Bot, User, Loader2, RefreshCw, X, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIWoodAdvisor({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "bot",
      text: "مرحباً بك! أنا مستشارك الذكي للأخشاب من المتحدة وود. كيف يمكنني مساعدتك اليوم في اختيار الأخشاب المثالية لمشروعك؟",
      isInitial: true
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const presetQuestions = [
    "ما هي أفضل الأخشاب لتصنيع الأبواب الخارجية؟",
    "ما الفرق بين خشب البلوط الطبيعي وخشب الجوز؟",
    "هل توفرون تصدير أخشاب معالجة بشهادات تبخير؟",
    "احتاج خشب جودة ممتازة وسعر مناسب للمطابخ الحديثة"
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setLoading(true);
    setErrorMessage(null);

    // Formulate history format as required by the backend
    const history = messages
      .filter((m) => !m.isInitial)
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text,
      }));

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطأ غير معروف في السيرفر");
      }

      const botMsg: ChatMessage = {
        id: "b-" + Date.now(),
        role: "bot",
        text: data.text || "عذراً، لم أستطع تكوين رد ملائم. يرجى تكرار الاستفسار.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "عذراً، نواجه صعوبة في الاتصال بمستشار الذكاء الاصطناعي الآن. يرجى التأكد من إضافة GEMINI_API_KEY."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "init-1",
        role: "bot",
        text: "مرحباً بك! أنا مستشارك الذكي للأخشاب من المتحدة وود. كيف يمكنني مساعدتك اليوم في اختيار الأخشاب المثالية لمشروعك؟",
        isInitial: true
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#131210]/60 backdrop-blur-sm">
          
          {/* Modal Overlay Close backdrop */}
          <div className="absolute inset-0" onClick={onClose}></div>

          {/* Lateral consult Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative w-full max-w-lg bg-[#242424] h-full shadow-2xl border-r border-[#C9A227]/30 flex flex-col justify-between text-right text-gray-200 z-10"
          >
            
            {/* Drawer Header */}
            <div className="bg-[#1B1B1B] p-6 border-b border-[#C9A227]/20 flex items-center justify-between">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-sm transition-all"
                aria-label="Close Advisor Side Panel"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div>
                  <h3 className="font-display font-bold text-lg text-white flex items-center justify-end space-x-2 space-x-reverse">
                    <Sparkles className="w-4 h-4 text-[#C9A227] animate-pulse" />
                    <span>مستشار الأخشاب المساعد AI</span>
                  </h3>
                  <span className="text-[10px] text-[#C9A227] block tracking-wider">
                    إجابات ودراسات فنية فورية بأحدث تقنيات Gemini
                  </span>
                </div>
                <div className="w-10 h-10 rounded-sm bg-[#6B4423] flex items-center justify-center text-[#C9A227]">
                  <Compass className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Chat Messages Log Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-stone-900/40">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 shadow-md ${
                      msg.role === "user"
                        ? "bg-[#C9A227] text-[#1B1B1B]"
                        : "bg-[#6B4423] text-[#C9A227]"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Bubble text body */}
                  <div
                    className={`p-4 rounded-sm text-sm max-w-[80%] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#C9A227] text-[#1B1B1B] font-medium rounded-tr-none"
                        : "bg-[#242424] text-gray-200 border border-white/5 rounded-tl-none font-light"
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Server Processing Animation spinner */}
              {loading && (
                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <div className="bg-[#6B4423] w-8 h-8 rounded-sm flex items-center justify-center text-[#C9A227]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <span className="font-mono">مستشارنا الذكي يحلل طلبك...</span>
                </div>
              )}

              {/* Error fallback box */}
              {errorMessage && (
                <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-sm text-xs text-red-200 leading-relaxed text-right space-y-3">
                  <p>{errorMessage}</p>
                  <p className="font-mono text-[10px] text-red-400">
                    * ملاحظة للمشرف: يرجى إدخال مفتاح GEMINI_API_KEY صالح في قائمة &quot;Secrets&quot; بموقع Google AI Studio ليتحول نظام الاستشاري المساعد إلى وضع العمل الحقيقي تلقائياً دون أي برمجة إضافية.
                  </p>
                  <div className="pt-2 flex justify-end gap-2">
                    <a
                      href="https://wa.me/201229434325"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 space-x-reverse px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 rounded-sm font-semibold text-white tracking-wide"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>اسأل المبيعات عبر واتساب</span>
                    </a>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Presets Selectors */}
            {messages.length === 1 && !loading && (
              <div className="p-4 border-t border-white/5 bg-[#1B1B1B]/40 space-y-2 text-right">
                <span className="text-[10px] text-[#C9A227] font-bold block mb-1">استفسارات مقترحة شائعة:</span>
                <div className="flex flex-col gap-1.5">
                  {presetQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-right text-xs bg-[#242424] hover:bg-[#6B4423]/20 border border-white/5 hover:border-[#C9A227]/30 p-2.5 rounded-sm text-gray-300 transition-all truncate"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Drawer Input Console */}
            <div className="p-4 bg-[#1B1B1B] border-t border-[#C9A227]/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="flex items-center gap-2"
              >
                {/* Reset button */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-stone-800 hover:bg-stone-700 p-3 rounded-sm text-gray-400 hover:text-white transition-all flex items-center justify-center shrink-0"
                  title="مسح المحادثة بالكامل"
                >
                  <RefreshCw className="w-4.5 h-4.5" />
                </button>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="اكتب استشارتك الخشبية هنا (مثال: خشب صلب لطاولة طعام)..."
                    className="w-full bg-[#242424] border border-white/10 focus:border-[#C9A227] rounded-sm py-3.5 pr-4 pl-10 text-sm text-white focus:outline-none text-right placeholder-gray-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim() || loading}
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#C9A227] hover:text-white disabled:text-stone-600 p-1.5 transition-colors"
                  >
                    <Send className="w-4.5 h-4.5 transform rotate-180" />
                  </button>
                </div>
              </form>
              
              <div className="text-[10px] text-gray-500 text-center mt-3 font-sans">
                هذا النظام محمي ومعزز لضمان خصوصية بيانات الخامات والاستعلام الدائري.
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
