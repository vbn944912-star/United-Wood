import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trees, Globe, CheckCircle2, ChevronRight, Package, Calculator } from "lucide-react";
import { WOOD_PRODUCTS } from "../data";
import { WoodProduct } from "../types";

export default function ProductsCatalog({
  onSelectProductForQuote,
}: {
  onSelectProductForQuote: (productName: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<"all" | "natural" | "industrial" | "project" | "export">("all");
  const [selectedProduct, setSelectedProduct] = useState<WoodProduct | null>(null);

  const categories = [
    { id: "all", label: "جميع المنتجات" },
    { id: "natural", label: "الأخشاب الطبيعية" },
    { id: "industrial", label: "الأخشاب الصناعية" },
    { id: "project", label: "أخشاب المشروعات" },
    { id: "export", label: "منتجات التصدير" }
  ];

  const filteredProducts = activeCategory === "all"
    ? WOOD_PRODUCTS
    : WOOD_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-[#1B1B1B] text-white relative">
      
      {/* Decorative wood slice outline backcloth */}
      <div className="absolute right-0 bottom-10 w-[400px] h-[400px] bg-[#6B4423]/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-[#C9A227]">
            <Trees className="w-5 h-5" />
            <span>كتالوج المنتجات الفاخرة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            منتجاتنا الخشبية الفريدة
          </h2>
          <p className="text-gray-400 font-sans leading-relaxed text-sm sm:text-base">
            تصفح مجموعتنا الحصرية واستخدم أدوات التصفية لرؤية تفاصيل خاماتنا الفاخرة. انقر على أي فئة أخشاب لاستعراض تفاصيلها الفنية وتوصية الاستخدام.
          </p>
        </div>

        {/* Dynamic Category Filtering Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-6 py-3 text-sm font-bold rounded-sm border transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#C9A227] text-[#1B1B1B] border-[#C9A227] shadow-lg"
                  : "bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#242424] rounded-sm overflow-hidden border border-white/5 hover:border-[#C9A227]/30 transition-all duration-300 flex flex-col group shadow-xl"
              >
                
                {/* Product Image Frame */}
                <div className="relative aspect-video overflow-hidden bg-stone-900 group">
                  <img
                    src={product.imageUrl}
                    alt={product.arabicName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242424] to-transparent opacity-60"></div>
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 right-4 text-[10px] bg-[#6B4423]/90 text-[#C9A227] border border-[#C9A227]/30 px-2.5 py-1 rounded-sm uppercase font-bold tracking-widest backdrop-blur-sm">
                    {categories.find(c => c.id === product.category)?.label}
                  </span>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between text-right space-y-6">
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between space-x-2 space-x-reverse">
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-[#C9A227] transition-colors">
                        {product.arabicName}
                      </h3>
                      <span className="text-[10px] font-mono font-medium text-gray-500 bg-white/5 px-2 py-0.5 rounded-sm">
                        {product.name}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-1.5 space-x-reverse text-xs text-[#C9A227] font-medium pt-1">
                      <Globe className="w-4 h-4" />
                      <span>المنشأ الأصلي: {product.origin}</span>
                    </div>
                  </div>

                  {/* Features List inside Card */}
                  <div className="bg-white/3 p-3.5 rounded-sm space-y-1.5 border border-white/5">
                    {product.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start space-x-1.5 space-x-reverse text-[11px] text-gray-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                    {product.features.length > 2 && (
                      <div className="text-[10px] text-gray-500 font-mono text-center pt-1 italic">
                        + {product.features.length - 2} مواصفات فنية إضافية
                      </div>
                    )}
                  </div>

                  {/* Actions Frame */}
                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-white/5">
                    {/* View Specs Trigger */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs text-gray-300 hover:text-white underline transition-colors"
                    >
                      مواصفاته الفنية كاملة
                    </button>

                    {/* Pre-fill Quote CTA */}
                    <button
                      onClick={() => onSelectProductForQuote(product.arabicName)}
                      className="bg-[#C9A227] hover:bg-[#b08c1e] text-[#1B1B1B] font-bold text-xs px-3.5 py-2.5 rounded-sm transition-all flex items-center space-x-1.5 space-x-reverse"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>اطلب تسعير الصنف</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal: Full Technical Specifications Details */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B1B1B]/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#242424] max-w-2xl w-full rounded-sm border border-[#C9A227]/40 shadow-2xl relative overflow-hidden text-right text-gray-200"
              >
                
                {/* Decorative element background */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#6B4423]/10 rounded-full blur-xl"></div>
                
                {/* Title and Category */}
                <div className="bg-[#1B1B1B] p-6 border-b border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-sm text-xs transition-all"
                  >
                    إغلاق ×
                  </button>
                  <div>
                    <span className="text-[10px] tracking-wider text-[#C9A227] uppercase font-bold block">
                      المواصفات الهندسية للأخشاب
                    </span>
                    <h3 className="font-display font-black text-xl text-white mt-1">
                      {selectedProduct.arabicName}
                    </h3>
                  </div>
                </div>

                {/* Specs content body */}
                <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
                  
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider">حول الصنف واستخداماته المقترحة:</h4>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
                      {selectedProduct.detailedDescription}
                    </p>
                  </div>

                  {/* Stats & Origin Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1B1B1B]/55 p-3.5 rounded-sm border border-white/5 space-y-1 text-center">
                      <span className="text-[10px] text-gray-500 block">دولة التوريد والإنتاج</span>
                      <strong className="text-sm text-[#C9A227]">{selectedProduct.origin}</strong>
                    </div>
                    <div className="bg-[#1B1B1B]/55 p-3.5 rounded-sm border border-white/5 space-y-1 text-center">
                      <span className="text-[10px] text-gray-500 block">فئة الاستخدام</span>
                      <strong className="text-sm text-[#C9A227]">
                        {categories.find(c => c.id === selectedProduct.category)?.label}
                      </strong>
                    </div>
                  </div>

                  {/* Technical Features Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider">مميزات الفحص الفني وجودة القطع:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.features.map((feat, index) => (
                        <div key={index} className="flex items-start space-x-2 space-x-reverse text-xs leading-relaxed font-sans">
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#C9A227] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advisory Notice */}
                  <div className="bg-[#6B4423]/10 border-r-4 border-[#C9A227]/40 p-4 rounded-sm text-xs text-gray-400 leading-relaxed font-sans">
                    * ملاحظة هندسية: تخضع جميع أخشاب شركة المتحدة وود لاختبارات جفاف ومعالجة دقيقة، ويسعدنا تقديم الاستشارات الفنية الملائمة لكل تطبيق نجارة وديكور بشكل مجاني.
                  </div>

                </div>

                {/* Specs Dialog bottom action */}
                <div className="bg-[#1B1B1B] p-4 border-t border-white/10 flex justify-end gap-3 rounded-b-sm">
                  <button
                    onClick={() => {
                      onSelectProductForQuote(selectedProduct.arabicName);
                      setSelectedProduct(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#C9A227] hover:bg-[#b08c1e] text-[#1B1B1B] font-bold text-xs rounded-sm transition-all"
                  >
                    تقديم طلب عرض سعر مباشر لـ {selectedProduct.arabicName}
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
