import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MapPin, Check, Send, Sparkles, MessageCircle, FileText, ClipboardList, RefreshCw, Layers, Loader2 } from "lucide-react";
import { OFFICE_CONTACT_INFO, WOOD_PRODUCTS } from "../data";
import { SubmittedQuote } from "../types";

export default function QuoteForm({
  selectedProductFromCatalog,
  onResetCatalogProduct
}: {
  selectedProductFromCatalog: string | null;
  onResetCatalogProduct: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [woodType, setWoodType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    quoteId: string;
    recommendation: string;
    fullName: string;
  } | null>(null);

  // Real-time Database list of submitted quotes
  const [recentQuotes, setRecentQuotes] = useState<SubmittedQuote[]>([]);
  const [refreshingQuotes, setRefreshingQuotes] = useState(false);

  // Pre-fill fields if selected in Catalog
  useEffect(() => {
    if (selectedProductFromCatalog) {
      setWoodType(selectedProductFromCatalog);
    }
  }, [selectedProductFromCatalog]);

  const fetchRecentQuotes = async () => {
    setRefreshingQuotes(true);
    try {
      const res = await fetch("/api/quotes");
      const data = await res.json();
      if (res.ok && data.quotes) {
        setRecentQuotes(data.quotes);
      }
    } catch (e) {
      console.error("Failed to load local DB log", e);
    } finally {
      setRefreshingQuotes(false);
    }
  };

  useEffect(() => {
    fetchRecentQuotes();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          woodType,
          projectType,
          quantity,
          notes
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessResult({
          quoteId: data.quote.id,
          recommendation: data.recommendation,
          fullName: fullName
        });

        // Reset state
        setFullName("");
        setPhone("");
        setEmail("");
        setWoodType("");
        setProjectType("");
        setQuantity("");
        setNotes("");
        onResetCatalogProduct();
        
        // Refresh live listings
        fetchRecentQuotes();
      } else {
        alert(data.error || "فشل إرسال طلب عرض السعر.");
      }
    } catch (err) {
      alert("عذراً، يرجى التحقق من الاتصال والمحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#1B1B1B] text-white relative">
      
      {/* Decorative vector logs background circles */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#6B4423]/10 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-right space-y-4 max-w-2xl ml-auto mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-[#C9A227]">
            <FileText className="w-5 h-5 text-[#C9A227]" />
            <span>طلب عروض الأسعار والدعم</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            اطلب عرض سعر الآن
          </h2>
          <div className="w-20 h-1 bg-[#C9A227] rounded-full inline-block"></div>
          <p className="text-gray-400 font-sans leading-relaxed text-sm sm:text-base">
            املأ الاستمارة الفنية بالأسفل وسيقوم نموذج الاستشاري والمهندسون لدينا بإنشاء عرض تسعير أولي ومواصفات مقترحة لمشروعك فوراً مع تخزين آمن لطلبك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Information & Location Map */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 text-right">
            
            {/* Direct quick calling card */}
            <div className="bg-[#242424] p-8 rounded-sm space-y-6 border border-white/5 shadow-xl">
              <h3 className="font-display font-extrabold text-xl text-white">بيانات التواصل والإدارة</h3>
              <p className="text-xs text-gray-400">تفضل بزيارتنا أو اتصل مباشرة بمستشار الفروع اللوجستية:</p>
              
              <div className="space-y-4 font-sans">
                
                {/* Telephone */}
                <div className="flex items-start space-x-3.5 space-x-reverse">
                  <div className="w-10 h-10 bg-[#6B4423] rounded-sm text-[#C9A227] flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">الهاتف المباشر للإستعلام</span>
                    <strong className="text-base text-white hover:text-[#C9A227] transition-colors">
                      <a href={OFFICE_CONTACT_INFO.directCallUrl}>{OFFICE_CONTACT_INFO.phone}</a>
                    </strong>
                  </div>
                </div>

                {/* Location Address */}
                <div className="flex items-start space-x-3.5 space-x-reverse">
                  <div className="w-10 h-10 bg-[#6B4423] rounded-sm text-[#C9A227] flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">العنوان والمقر الرئيسي</span>
                    <strong className="text-sm text-gray-300">
                      {OFFICE_CONTACT_INFO.address}
                    </strong>
                  </div>
                </div>

              </div>

              {/* Direct clickable CTA buttons */}
              <div className="pt-4 grid grid-cols-2 gap-3">
                <a
                  href={OFFICE_CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-600 font-bold px-4 py-3 rounded-sm text-xs transition-all text-center flex items-center justify-center space-x-1.5 space-x-reverse"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب مبيعات</span>
                </a>
                
                <a
                  href={OFFICE_CONTACT_INFO.directCallUrl}
                  className="bg-[#C9A227] hover:bg-[#b08c1e] text-[#1B1B1B] font-bold px-4 py-3 rounded-sm text-xs transition-all text-center flex items-center justify-center space-x-1.5 space-x-reverse"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال هاتفي مباشر</span>
                </a>
              </div>

            </div>

            {/* Custom Interactive Stylized Site Location Box (خريطة الموقع) */}
            <div className="bg-[#242424] p-8 rounded-sm space-y-4 border border-white/5 shadow-xl">
              <h4 className="font-display font-bold text-lg text-white">خريطة الموقع التقريبية</h4>
              <p className="text-xs text-gray-400">تقاطع شارع التروللي مع شارع الـ15، مؤسسة الزكاة، المرج، القاهرة:</p>
              
              {/* Map Simulator */}
              <div className="w-full h-48 bg-stone-900 border border-white/5 rounded-sm overflow-hidden relative flex items-center justify-center">
                
                {/* Styled Roads lines */}
                <div className="absolute inset-0 bg-[#1e1e1e] opacity-40"></div>
                <div className="absolute top-[40%] left-0 right-0 h-4 bg-stone-800 rotate-2"></div>
                <div className="absolute left-[30%] top-0 bottom-0 w-4 bg-stone-800 -rotate-3"></div>
                
                {/* Pointer marker info banner */}
                <div className="absolute top-1/4 right-[28%] z-10 flex flex-col items-center">
                  <div className="bg-[#1B1B1B] border border-[#C9A227] text-white px-3 py-1.5 rounded-sm shadow-xl text-[10px] font-sans font-bold flex items-center space-x-1.5 space-x-reverse animate-bounce">
                    <Layers className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>المتحدة وود للاستيراد والتصدير</span>
                  </div>
                  <div className="w-2 h-2 bg-[#C9A227] transform rotate-45 -mt-1 shadow-lg"></div>
                </div>

                {/* Map Directions guidelines overlay */}
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-500 bg-stone-950/80 px-2.5 py-1 rounded-sm border border-white/5">
                  منفذ بيع واستلام أخشاب رئيسي
                </div>

                {/* Realistic Google Maps search direction redirect */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_CONTACT_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-x-4 bottom-10 bg-[#1B1B1B]/95 text-center text-xs py-2 rounded-sm text-[#C9A227] hover:bg-stone-900 font-bold border border-[#C9A227]/30 block shadow-inner transition-all"
                >
                  افتح الموقع الجغرافي على خرائط Google ↗
                </a>

              </div>
            </div>

          </div>

          {/* Right Side: Professional Request Quote dynamic form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <div className="bg-[#242424] p-8 rounded-sm border border-[#C9A227]/30 shadow-2xl relative">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-[#C9A227] to-[#6B4423]"></div>
              
              <AnimatePresence mode="wait">
                {!successResult ? (
                  <form onSubmit={handleSubmit} className="space-y-6 text-right">
                    
                    <h3 className="font-display font-extrabold text-xl text-white border-b border-white/5 pb-4">
                      نموذج التحديد الفني للخامات والمشروع
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 block font-bold">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="الاسم الثلاثي أو اسم الشركة"
                          className="w-full bg-[#1B1B1B] border border-white/10 rounded-sm py-3.5 px-4 text-sm text-white focus:border-[#C9A227] focus:outline-none placeholder-gray-600 text-right transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 block font-bold">رقم الهاتف للاتصال الجوال *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="مثال: 01229434325"
                          className="w-full bg-[#1B1B1B] border border-white/10 rounded-sm py-3.5 px-4 text-sm text-white focus:border-[#C9A227] focus:outline-none placeholder-gray-600 text-right transition-colors"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 block">البريد الإلكتروني (اختياري)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#1B1B1B] border border-white/10 rounded-sm py-3.5 px-4 text-sm text-white focus:border-[#C9A227] focus:outline-none placeholder-gray-600 text-right transition-colors"
                        />
                      </div>

                      {/* Wood Type selection */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 block font-bold">نوع خامة الخشب المطلوب</label>
                        
                        {/* Selector input with fallback input */}
                        <select
                          value={woodType}
                          onChange={(e) => setWoodType(e.target.value)}
                          className="w-full bg-[#1B1B1B] text-gray-300 border border-white/10 rounded-sm py-3.5 px-4 text-sm focus:border-[#C9A227] focus:outline-none text-right transition-colors"
                        >
                          <option value="">-- اختر من القائمة أو ادخل في الملاحظات --</option>
                          {WOOD_PRODUCTS.map((prod) => (
                            <option key={prod.id} value={prod.arabicName}>
                              {prod.arabicName} ({prod.name})
                            </option>
                          ))}
                          <option value="أخرى / خامة مخصصة">أخرى / خامة غير مدرجة بكتالوجنا</option>
                        </select>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Project Type */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 block">نوع ومجال المشروع</label>
                        <input
                          type="text"
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          placeholder="مثال: تصنيع مكاتب للشركة، أبواب شقق، برجولات خارجية"
                          className="w-full bg-[#1B1B1B] border border-white/10 rounded-sm py-3.5 px-4 text-sm text-white focus:border-[#C9A227] focus:outline-none placeholder-gray-600 text-right transition-colors"
                        />
                      </div>

                      {/* Quantity */}
                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 block">الكمية المطلوبة التقريبية</label>
                        <input
                          type="text"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="مثال: 5 متر مكعب / 20 لوح كونتر"
                          className="w-full bg-[#1B1B1B] border border-white/10 rounded-sm py-3.5 px-4 text-sm text-white focus:border-[#C9A227] focus:outline-none placeholder-gray-600 text-right transition-colors"
                        />
                      </div>

                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-xs text-gray-400 block font-bold">المواصفات المطلوبة أو تفاصيل إضافية</label>
                      <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="يرجى ذكر السمك الفني للكتير المطلوب أو أي اشتراطات تبخير وتغليف تصديري للأسواق الخارجية..."
                        className="w-full bg-[#1B1B1B] border border-white/10 rounded-sm py-3.5 px-4 text-sm text-white focus:border-[#C9A227] focus:outline-none placeholder-gray-600 text-right transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-[#C9A227] hover:bg-[#b08c1e] disabled:bg-stone-700 text-[#1B1B1B] font-bold text-base rounded-sm transition-all shadow-xl flex items-center justify-center space-x-3.5 space-x-reverse"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>قم بتوليد التوصية الفنية وحفظ الطلب...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 transform rotate-180" />
                          <span>إرسال وتوليد عرض سعر الأخشاب فُنياً بالذكاء الاصطناعي</span>
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  
                  // Success Result Display with Custom generated recommendation proposal
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8 text-right p-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <button
                        onClick={() => setSuccessResult(null)}
                        className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-4 py-2 rounded-sm text-xs transition-all"
                      >
                        تقديم طلب جديد
                      </button>
                      <div className="flex items-center space-x-2.5 space-x-reverse">
                        <div className="bg-[#6B4423] p-1.5 rounded-sm text-[#C9A227]">
                          <Check className="w-5 h-5" />
                        </div>
                        <h3 className="font-display font-extrabold text-xl text-[#C9A227]">تم استلام طلبكم بنجاح</h3>
                      </div>
                    </div>

                    {/* Proposal Body block */}
                    <div className="bg-[#1B1B1B] p-6 rounded-sm border-r-4 border-[#C9A227] space-y-4">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-gray-500 font-mono text-xs">UW-ESTIMATE SYSTEM</span>
                        <span className="bg-[#C9A227]/20 border border-[#C9A227]/40 px-3 py-1 rounded-sm text-[#C9A227] text-xs font-bold uppercase">
                          رقم الطلب الفني: {successResult.quoteId}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-300 font-sans font-light leading-relaxed">
                        <p className="font-bold text-white text-base">عزيزي {successResult.fullName}،</p>
                        <div className="markdown-body text-gray-200 mt-2" style={{ whiteSpace: "pre-wrap" }}>
                          {successResult.recommendation}
                        </div>
                      </div>

                    </div>

                    <div className="bg-[#6B4423]/10 p-4 rounded-sm text-xs text-gray-400 font-sans leading-relaxed">
                      * تم قيد طلبكم بصفة رسمية في قاعدة بيانات فرع مبيعات القاهرة المرج. سيقوم مهندسو التدقيق اللوجستي بمطابقة كتل الأخشاب بمخازننا والاتصال بكم هاتفياً لتقديم الفاتورة المالية والمنشأ التفصيلي.
                    </div>

                    <button
                      onClick={() => setSuccessResult(null)}
                      className="w-full py-3 border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#1B1B1B] text-xs font-bold rounded-sm transition-all block text-center"
                    >
                      الرجوع لتعديل بيانات الطلب أو استكشاف كتالوجات أخرى
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Database log panel displaying recently submitted quote requests (لوحة الطلبات المستلمة فُنياً) */}
        <div className="mt-20 border-t border-white/10 pt-12">
          
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={fetchRecentQuotes}
              disabled={refreshingQuotes}
              className="text-[#C9A227] hover:text-[#f7d663] text-xs font-bold flex items-center space-x-2 space-x-reverse bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-sm border border-white/5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshingQuotes ? "animate-spin" : ""}`} />
              <span>تحديث السجل</span>
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse text-right">
              <div>
                <h4 className="font-display font-bold text-lg text-white">سجل طلبات التسعير الأخيرة</h4>
                <p className="text-xs text-gray-500 font-sans">تحديث تفاعلي حي من قاعدة البيانات المحلية</p>
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center text-[#C9A227]">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {recentQuotes.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-500 font-sans">
                لا توجد طلبات تسعير مسجلة حالياً. كن أول من يرسل طلب تسعير فني!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentQuotes.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#242424] p-5 rounded-sm border border-white/5 space-y-4 text-right hover:border-[#6B4423]/50 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(item.date).toLocaleDateString("ar-EG")}
                      </span>
                      <span className="bg-[#6B4423]/20 border border-[#C9A227]/30 px-2 py-0.5 rounded-sm text-[#C9A227] tracking-wider text-[10px] font-mono">
                        {item.id}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-bold text-white text-sm">{item.fullName}</div>
                      <div className="text-gray-500 font-mono">{item.phone}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                      <div className="bg-white/3 p-2 rounded-sm border border-white/5">
                        <span className="text-gray-500 block text-[9px] mb-0.5">الصنف الفني</span>
                        <strong className="text-white truncate block">{item.woodType}</strong>
                      </div>
                      <div className="bg-white/3 p-2 rounded-sm border border-white/5">
                        <span className="text-gray-500 block text-[9px] mb-0.5">الكمية</span>
                        <strong className="text-[#C9A227] block truncate">{item.quantity}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-[10px]">
                      <span className="text-emerald-400 font-bold">● {item.status}</span>
                      <span className="text-gray-500">مراجعة المهندس الفني للتوريد</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
