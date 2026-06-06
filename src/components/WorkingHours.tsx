import { Clock, Calendar, AlertTriangle, ShieldAlert } from "lucide-react";
import { WORKING_HOURS } from "../data";

export default function WorkingHours() {
  
  // Calculate dynamic business status based on Cairo time or current local time!
  // Note: local time from metadata is provided as 2026-06-06T15:43:34Z (which is a Saturday, Cairo is UTC+3)
  // Let's write a beautiful, friendly, real-time widget showing if the branch is currently open!
  const checkIfCurrentlyOpen = () => {
    try {
      const now = new Date();
      // Adjust to Cairo time (roughly UTC + 3)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const cairoTime = new Date(utc + (3600000 * 3));
      
      const day = cairoTime.getDay(); // 0 is Sunday, 5 is Friday, 6 is Saturday
      const hour = cairoTime.getHours();
      
      if (day === 5) {
        return { open: false, msg: "الفرع مغلق اليوم (الجمعة عطلة أسبوعية)" };
      }
      
      // Office hours: 9:00 AM (9) to 7:00 PM (19)
      if (hour >= 9 && hour < 19) {
        return { open: true, msg: `الفرع مفتوح الآن لاستقبالكم (حتى الساعة 7:00 مساءً)` };
      }
      
      return { open: false, msg: "الفرع مغلق حالياً (ساعات العمل تبدأ من 9:00 صباحاً)" };
    } catch (e) {
      return { open: true, msg: "الفرع في أوقات العمل الرسمية حالياً" };
    }
  };

  const status = checkIfCurrentlyOpen();

  return (
    <section id="working-hours" className="py-24 bg-[#1B1B1B] text-white relative">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-[#C9A227]">
            <Clock className="w-5 h-5 text-[#C9A227]" />
            <span>تنظيمات الحضور والدعم</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
            ساعات وأوقات العمل الرسمية
          </h2>
          <p className="text-gray-400 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            يسعدنا استقبال اتصالاتكم الهاتفية لطلب عروض الأسعار، أو تشريفنا بالزيارة المباشرة لفحص شحنات الأخشاب المستلمة وفقاً للتوقيتات الرسمية التالية:
          </p>
        </div>

        {/* Live Status indicator panel widget */}
        <div className="bg-[#242424] p-5 rounded-sm border border-white/5 mb-8 text-right flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className={`w-3.5 h-3.5 rounded-full ${status.open ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`}></span>
            <span className={`w-3.5 h-3.5 rounded-full absolute ${status.open ? "bg-emerald-500" : "bg-amber-500"}`}></span>
            <strong className="text-sm font-sans mr-5 text-gray-200">
              {status.msg}
            </strong>
          </div>
          <span className="text-[10px] text-gray-500 bg-white/5 px-3 py-1 rounded-sm border border-white/5 uppercase tracking-wider font-mono">
            Cairo Time Zone (UTC+3)
          </span>
        </div>

        {/* Timings Grid Card layout */}
        <div className="bg-[#242424] rounded-sm border border-[#C9A227]/30 shadow-2xl overflow-hidden text-right font-sans">
          <div className="grid grid-cols-1 divide-y divide-white/5">
            {WORKING_HOURS.map((item, idx) => {
              const isFriday = item.day === "الجمعة";
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-5 transition-colors duration-200 ${
                    isFriday ? "bg-stone-900/45 text-red-400" : "hover:bg-white/3"
                  }`}
                >
                  <span className={`font-mono font-bold ${isFriday ? "text-red-400" : "text-[#C9A227]"}`}>
                    {item.hours}
                  </span>
                  
                  <span className="font-bold text-sm text-white flex items-center space-x-2 space-x-reverse">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{item.day}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logistics Notice */}
        <div className="mt-8 bg-[#6B4423]/10 border-r-4 border-[#C9A227]/40 p-5 rounded-sm text-xs text-stone-400 leading-relaxed text-right font-sans">
          * نود إفاطة السادة العملاء أن تحميل وتفريغ الطلبيات المسطحة الكبرى والكونتر للمصانع يتم تنسيقه مسبقاً قبل الساعة 4:00 مساءً لضمان أعلى مستويات الأمان اللوجستي وسلامة الأخشاب أثناء النقل والشحن الداخلي بالمرج.
        </div>

      </div>
    </section>
  );
}
