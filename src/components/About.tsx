import { motion } from "motion/react";
import { Trees, Shield, Sparkles } from "lucide-react";
import { BRAND_NAME } from "../data";

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F8F6F1] relative overflow-hidden">
      
      {/* Aesthetic watermarks */}
      <div className="absolute top-10 right-10 text-[120px] font-display font-extrabold text-[#6B4423]/3 pointer-events-none select-none">
        ABOUT
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left hand side: decorative text details in bento board */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-[#1B1B1B] text-white p-6 rounded-sm space-y-4 shadow-lg border-l-4 border-[#C9A227]">
                <div className="w-10 h-10 rounded-sm bg-[#6B4423] flex items-center justify-center text-[#C9A227]">
                  <Trees className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">مصادر فاخرة</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  تأتي خاماتنا الطبيعية والصناعية من أرقى الغابات المعولمة المطابقة لأهم المواصفات ومقاومة لعوامل الجو والرطوبة.
                </p>
              </div>

              <div className="bg-white text-[#1B1B1B] p-6 rounded-sm space-y-4 shadow-md border-t-2 border-[#6B4423]">
                <div className="w-10 h-10 rounded-sm bg-[#F8F6F1] flex items-center justify-center text-[#6B4423]">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#6B4423]">أمان وثقة</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  نضمن تطابق خامات الأخشاب الحقيقية مع العقد الفني، مع توافر معايير الفحص واللوجستيات المتقدمة.
                </p>
              </div>

              <div className="col-span-2 bg-[#1B1B1B] text-white p-6 rounded-sm relative overflow-hidden group shadow-lg">
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#C9A227]/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                <h4 className="text-[#C9A227] text-xs font-semibold uppercase tracking-wider mb-2">رؤيتنا الإستراتيجية</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  نسعى لأن نكون المورد الأول والخيار الأكثر أماناً للأخشاب الفاخرة لجميع المطورين والمصانع ومصممي الديكور في جمهورية مصر العربية وأفريقيا والخليج العربي.
                </p>
              </div>

            </div>
          </div>

          {/* Right hand side: Company explanation text */}
          <div className="lg:col-span-7 space-y-8 text-right order-1 lg:order-2">
            
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-[#6B4423]">
                <Sparkles className="w-4.5 h-4.5 text-[#C9A227]" />
                <span>عن الشركة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B1B1B] tracking-tight">
                شركة <span className="text-[#6B4423]">{BRAND_NAME}</span> للاستيراد والتصدير
              </h2>
              <div className="w-20 h-1.5 bg-[#C9A227] rounded-full inline-block"></div>
            </div>

            <div className="space-y-6 text-gray-700 font-sans text-base leading-relaxed">
              <p>
                تُعد شركة <strong className="text-[#1B1B1B] font-semibold">{BRAND_NAME}</strong> للاستيراد والتصدير واحدة من الشركات الرائدة في مجال المنتجات الخشبية داخل السوق المصري. نمتلك خبرة واسعة في توريد واستيراد الأخشاب والخامات عالية الجودة التي تلبي احتياجات المصانع، ورش الأثاث، شركات المقاولات، والمشروعات الكبرى.
              </p>
              <p>
                ونحن نلتزم بتقديم منتجات موثوقة، أسعار تنافسية، وخدمة عملاء متميزة تضمن تجربة احترافية من أول استفسار وحتى التسليم الآمن في موقع العميل.
              </p>
              <p className="border-r-4 border-[#6B4423] pr-4 py-1.5 bg-[#6B4423]/5 font-medium text-gray-800">
                خبرتنا الطويلة تمكننا من فهم المتطلبات الهندسية والفنية لكل تخصص وتلبية طلبيات الأخشاب والكتل الصلبة بمرونة وسرعة استثنائية وبأي مقاسات مطلوبة للمشاريع التجارية.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <div className="grid grid-cols-2 gap-8 text-center bg-white p-6 rounded-sm shadow-sm border border-gray-100 max-w-md">
                <div>
                  <div className="text-3xl font-extrabold text-[#6B4423] font-display">100%</div>
                  <div className="text-xs text-gray-500 mt-1">تطابق المواصفات الفنية</div>
                </div>
                <div className="border-r border-gray-200">
                  <div className="text-3xl font-extrabold text-[#C9A227] font-display">+15</div>
                  <div className="text-xs text-gray-500 mt-1">دولة تصدير واستيراد</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
