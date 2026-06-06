import { Layers, Mail, Phone, MapPin, Award, ShieldCheck, Heart } from "lucide-react";
import { OFFICE_CONTACT_INFO, BRAND_NAME } from "../data";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-400 font-sans text-xs border-t border-[#C9A227]/10 pt-16 pb-8 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-10">
          
          {/* Logo Brand Statement Block (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center justify-end space-x-3 space-x-reverse">
              <div>
                <span className="block font-display text-lg font-bold text-white tracking-wide">
                  {BRAND_NAME} للاستيراد والتصدير
                </span>
                <span className="text-[9px] text-[#C9A227] tracking-widest font-semibold block uppercase">
                  United Wood Import & Export
                </span>
              </div>
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#C9A227] to-[#6B4423] p-[2px]">
                <div className="w-full h-full bg-[#121212] flex items-center justify-center rounded-sm">
                  <Layers className="w-4 h-4 text-[#C9A227]" />
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm ml-auto">
              تُعد شركة المتحدة وود للاستيراد والتصدير واحدة من الشركات الرائدة في قطاع توفير وميكنة وفحص وبيع الأخشاب الطبيعية والصناعية في جمهورية مصر العربية والشرق الأوسط.
            </p>

            <div className="flex justify-end space-x-4 space-x-reverse text-gray-500 font-bold uppercase text-[10px]">
              <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#C9A227]" /> جودة معتمدة</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" /> فحص لوجستي</span>
            </div>
          </div>

          {/* Quick links directory (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold font-display">روابط تصفح سريعة</h4>
            <div className="grid grid-cols-1 gap-2.5">
              <a href="#hero" className="hover:text-[#C9A227] transition-colors">الرئيسية للموقع</a>
              <a href="#about" className="hover:text-[#C9A227] transition-colors">من نحن وتاريخ الشركة</a>
              <a href="#products" className="hover:text-[#C9A227] transition-colors">كتالوج الأخشاب الطبيعية</a>
              <a href="#why-choose" className="hover:text-[#C9A227] transition-colors">لماذا تختار المتحدة وود</a>
              <a href="#contact" className="hover:text-[#C9A227] transition-colors">طلب عرض سعر مخصص</a>
            </div>
          </div>

          {/* Contacts info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white text-sm font-bold font-display">مكتب خدمة العملاء</h4>
            <div className="space-y-3 font-light text-gray-400 leading-relaxed">
              
              <div className="flex items-start justify-end space-x-2 space-x-reverse">
                <span className="text-white text-left font-sans">
                  {OFFICE_CONTACT_INFO.address}
                </span>
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
              </div>

              <div className="flex items-center justify-end space-x-2 space-x-reverse">
                <strong className="text-white font-mono">{OFFICE_CONTACT_INFO.phone}</strong>
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
              </div>

              <div className="flex items-center justify-end space-x-2 space-x-reverse">
                <span className="font-mono text-gray-400">info@unitedwood.com.eg</span>
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
              </div>

            </div>
          </div>

        </div>

        {/* Legal copyrights note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-600">
          <div className="flex items-center space-x-1 space-x-reverse">
            <span>صمم بحرفية وفخامة في</span>
            <span className="text-[#C9A227] font-semibold">United Wood Creative Lab</span>
          </div>
          
          <div className="text-center font-sans tracking-wide">
            © 2026 United Wood. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
