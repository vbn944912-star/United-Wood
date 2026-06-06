import { Star, Quote, MessageSquare, BadgeCheck } from "lucide-react";
import { CUSTOMER_TESTIMONIALS } from "../data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#F8F6F1] relative overflow-hidden">
      
      {/* Background watermarks */}
      <div className="absolute top-10 left-5 text-[150px] font-serif font-black text-[#6B4423]/2 pointer-events-none select-none">
        “ ”
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-right space-y-4 max-w-2xl ml-auto mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-[#6B4423]">
            <Star className="w-5 h-5 text-[#C9A227] fill-[#C9A227]" />
            <span>آراء شركاء النجاح</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B1B1B] tracking-tight">
            ماذا يقول عملاؤنا عن المتحدة وود؟
          </h2>
          <div className="w-20 h-1 bg-[#C9A227] rounded-full inline-block"></div>
          <p className="text-gray-600 font-sans leading-relaxed text-sm sm:text-base">
            ثقة عملائنا هي فخرنا الأكبر، ونلتزم دوماً بمراقبة الجودة وفحص كتل الأخشاب للتأكد من المحافظة على ريادتنا وجودة خامات التوريد.
          </p>
        </div>

        {/* Testimonials Wall */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CUSTOMER_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md border border-stone-200 hover:border-[#C9A227]/40 transition-all duration-300 relative group flex flex-col justify-between text-right"
            >
              <div className="space-y-6">
                
                {/* Upper quote indicator */}
                <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                  <Quote className="w-8 h-8 text-[#C9A227]/20 transform rotate-180" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: test.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
                    ))}
                  </div>
                </div>

                {/* Star Description quotes */}
                <p className="text-gray-700 text-sm leading-relaxed font-sans font-light italic">
                  &quot;{test.text}&quot;
                </p>

              </div>

              {/* Author details box layout */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-end space-x-3.5 space-x-reverse">
                <div className="text-right">
                  <div className="font-bold text-sm text-[#1B1B1B] flex items-center justify-end space-x-1.5 space-x-reverse">
                    <BadgeCheck className="w-4 h-4 text-[#C9A227]" />
                    <span>{test.author}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-sans mt-0.5">{test.role}</div>
                </div>
                
                {/* Short visual brand avatar */}
                <div className="w-10 h-10 rounded-sm bg-[#6B4423]/15 text-[#6B4423] font-display font-black text-sm flex items-center justify-center">
                  {test.author.charAt(8)} {/* Letter index helper */}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Business summary banner */}
        <div className="mt-16 bg-[#1B1B1B] p-8 rounded-sm text-right text-white relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/5 rounded-full blur-2xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <h3 className="font-display font-extrabold text-xl text-[#C9A227]">هل ترغب في الانضمام لقائمة شركاء الثقة؟</h3>
              <p className="text-gray-300 text-sm font-sans font-light leading-relaxed max-w-2xl">
                نحن فخورون بأن نكون الشريك المعتمد لأكبر مصانع الأثاث وشركات التطوير العقاري. يسعدنا توريد متطلباتكم من الأخشاب الرومانية والصلبة والمستوردة بجودة مطابقة وبآليات لوجستية مرنة ومتميزة.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <a
                href="#contact"
                className="w-full md:w-auto px-6 py-3 bg-[#C9A227] hover:bg-[#b08c1e] text-[#1B1B1B] font-bold text-xs rounded-sm transition-all text-center uppercase tracking-wider block"
              >
                تواصل وقدم عرض سعر
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
