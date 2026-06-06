import { motion } from "motion/react";
import { BadgePercent, Star, ArrowLeft, Heart, Sparkles, MessageCircle, FileText } from "lucide-react";
import { BRAND_TAGLINE, BRAND_STATS, OFFICE_CONTACT_INFO } from "../data";

export default function Hero({ onOpenAdvisor, onScrollToQuote }: { onOpenAdvisor: () => void; onScrollToQuote: () => void }) {
  // Use our real generated high-end image asset
  const heroImage = "/images/hero_luxury_logs_1780760670360.png";

  return (
    <section id="hero" className="relative min-h-screen bg-[#1B1B1B] text-white flex items-center pt-24 overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#6B4423]/20 rounded-full blur-3xl pointers-event-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#C9A227]/10 rounded-full blur-3xl pointers-event-none"></div>
      
      {/* Subtle wood texture grid pattern lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A227_1px,transparent_1px),linear-gradient(to_bottom,#C9A227_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right hand side - Text content (Arabic reading right to left) */}
          <div className="lg:col-span-7 space-y-8 text-right order-1 lg:order-1">
            
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-[#6B4423]/30 border border-[#C9A227]/30 px-3 py-1.5 rounded-full text-[#C9A227] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227] animate-pulse" />
              <span>شركة المتحدة وود للاستيراد والتصدير</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight">
              رواد استيراد وتصدير <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#C9A227] via-[#f7d663] to-[#C9A227]">
                المنتجات الخشبية
              </span>{" "}
              في مصر
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl">
              نوفر أجود الخامات الخشبية المستوردة والمحلية لتلبية احتياجات المصانع، شركات الأثاث، المشروعات التجارية، والمقاولين بأعلى معايير الجودة والالتزام.
            </p>

            <div className="text-[#C9A227] font-serif italic text-sm border-r-2 border-[#C9A227] pr-4 py-1">
              &quot;{BRAND_TAGLINE}&quot;
            </div>

            {/* CTA Interaction buttons */}
            <div className="flex flex-wrap gap-4 justify-start">
              <button
                onClick={onScrollToQuote}
                className="px-8 py-4 bg-[#C9A227] hover:bg-[#b08c1e] text-[#1B1B1B] font-bold text-base rounded-sm transition-all duration-300 shadow-xl flex items-center space-x-3.5 space-x-reverse scale-100 hover:scale-102 active:scale-98"
              >
                <FileText className="w-5 h-5" />
                <span>اطلب عرض سعر</span>
              </button>

              <a
                href={OFFICE_CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 hover:border-white text-white font-semibold text-base rounded-sm transition-all duration-300 flex items-center space-x-3.5 space-x-reverse"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>تواصل مع المبيعات</span>
              </a>
            </div>

            {/* Quick Micro advisor entry point */}
            <div className="pt-2">
              <button
                onClick={onOpenAdvisor}
                className="inline-flex items-center space-x-2 space-x-reverse text-sm text-[#C9A227] hover:text-[#f7d663] transition-colors group"
              >
                <span>ابدأ التحدث مع مستشار الأخشاب المساعد بالذكاء الاصطناعي</span>
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform duration-200" />
              </button>
            </div>

          </div>

          {/* Left hand side - Interactive luxurious display frame */}
          <div className="lg:col-span-5 order-2 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Golden corner borders */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C9A227]"></div>
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#C9A227]"></div>

              {/* Framed Image Overlay */}
              <div className="rounded-sm overflow-hidden bg-[#1B1B1B] shadow-2xl border border-white/10 p-2.5">
                <div className="relative aspect-video lg:aspect-[4/5] overflow-hidden rounded-sm group">
                  
                  {/* Luxury logs custom generated image */}
                  <img
                    src={heroImage}
                    alt="Premium raw luxury solid logs imported by United Wood"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle dark shade tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-transparent to-transparent opacity-60"></div>
                  
                  {/* floating real-time info banner inside the image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1B1B1B]/90 backdrop-blur-sm p-4 rounded-sm border border-[#C9A227]/30 text-right">
                    <span className="text-[10px] tracking-widest text-[#C9A227] uppercase font-bold block mb-1">
                      خامات حصرية مستوردة
                    </span>
                    <h3 className="font-display font-bold text-sm text-white">
                      أخشاب طبيعية معالجة بأعلى المعايير الأوروبية والأمريكية
                    </h3>
                  </div>

                </div>
              </div>

              {/* Live floating rating chip */}
              <div className="absolute -bottom-6 -right-6 bg-[#6B4423]/95 text-white border border-[#C9A227]/40 px-5 py-3.5 rounded-sm shadow-xl flex items-center space-x-3.5 space-x-reverse backdrop-blur-md">
                <div className="bg-[#C9A227] p-2 rounded-sm text-[#1B1B1B]">
                  <Star className="w-5 h-5 fill-[#1B1B1B]" />
                </div>
                <div>
                  <div className="font-bold text-lg leading-none">4.6/5</div>
                  <div className="text-[11px] text-gray-300">تقييم موثق من شركائنا</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Brand Statistics Section (bilingual grids) */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {BRAND_STATS.map((stat, idx) => (
              <div key={stat.id} className="text-right space-y-1.5 border-r border-[#C9A227]/20 pr-6">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#C9A227] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
