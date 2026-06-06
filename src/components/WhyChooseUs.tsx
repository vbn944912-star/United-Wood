import { Award, Coins, Truck, Compass, ShieldCheck, CheckCircle } from "lucide-react";
import { WHY_CHOOSE_US } from "../data";

export default function WhyChooseUs() {
  
  // Custom Icon Selector to avoid dangerous dynamic imports
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-6 h-6 text-[#1B1B1B]" />;
      case "Coins":
        return <Coins className="w-6 h-6 text-[#1B1B1B]" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-[#1B1B1B]" />;
      case "Compass":
        return <Compass className="w-6 h-6 text-[#1B1B1B]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#1B1B1B]" />;
      default:
        return <CheckCircle className="w-6 h-6 text-[#1B1B1B]" />;
    }
  };

  return (
    <section id="why-choose" className="py-24 bg-[#F8F6F1] relative overflow-hidden">
      
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-right space-y-4 max-w-2xl ml-auto mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-[#6B4423]">
            <Award className="w-5 h-5 text-[#C9A227]" />
            <span>مميزاتنا التنافسية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B1B1B] tracking-tight">
            لماذا تختار المتحدة وود للاستيراد والتصدير؟
          </h2>
          <div className="w-20 h-1 bg-[#C9A227] rounded-full inline-block"></div>
          <p className="text-gray-600 font-sans leading-relaxed text-sm sm:text-base">
            نسعى دائماً لتقديم المزيج المثالي بين أعلى مستويات الجودة وأفضل قيمة مالية مرنة، بمصاحبة فريق لوجستي واستشاري متخصص لضمان نجاح أعمالكم في كل خطوة.
          </p>
        </div>

        {/* Benefits Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md border border-stone-200 hover:border-[#C9A227]/40 transition-all duration-300 relative group flex flex-col justify-between text-right"
            >
              <div className="space-y-6">
                
                {/* Icon box container with gold accents */}
                <div className="w-12 h-12 rounded-sm bg-[#C9A227] flex items-center justify-center shadow-md transform group-hover:rotate-6 transition-transform">
                  {renderIcon(item.icon)}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-xl text-[#1B1B1B] group-hover:text-[#6B4423] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>

              {/* Little styling bar on bottom of card */}
              <div className="h-1 bg-transparent group-hover:bg-[#C9A227] mt-8 transition-colors duration-300 rounded-sm"></div>

            </div>
          ))}
          
          {/* Static CTA card inside Grid to complete bento feeling */}
          <div className="bg-[#6B4423] p-8 rounded-sm shadow-xl text-right text-white flex flex-col justify-between border-l-4 border-[#C9A227]">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A227]">شعارنا اليومي</span>
              <h3 className="font-display font-extrabold text-2xl leading-snug">
                جودة تبني الثقة، والتزام يعزز الشراكة المستدامة
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans font-light">
                نعتز بشراكتنا مع مئات المصانع والمقاولين داخل وخارج مصر، ونؤمن أن الخشب الجيد هو حجر الأساس لأي مشروع مميز طويل الأمد.
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#C9A227]">
              <span>المتحدة وود للاستيراد والتصدير</span>
              <span>تأسست لتدوم وثقتكم هي دافعنا</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
