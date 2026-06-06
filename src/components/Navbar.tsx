import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageSquare, Menu, X, Layers, Compass } from "lucide-react";
import { OFFICE_CONTACT_INFO, BRAND_NAME } from "../data";

export default function Navbar({ onOpenAdvisor, onScrollToQuote }: { onOpenAdvisor: () => void; onScrollToQuote: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "من نحن", href: "#about" },
    { name: "منتجاتنا", href: "#products" },
    { name: "لماذا نحن", href: "#why-choose" },
    { name: "آراء العملاء", href: "#testimonials" },
    { name: "مواعيدنا", href: "#working-hours" },
    { name: "اتصل بنا", href: "#contact" },
  ];

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#1B1B1B]/95 backdrop-blur-md shadow-lg border-b border-[#C9A227]/20 py-3"
          : "bg-gradient-to-b from-[#1B1B1B]/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo and Title */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#C9A227] to-[#6B4423] p-[2px]">
              <div className="w-full h-full bg-[#1B1B1B] flex items-center justify-center rounded-sm">
                <Layers className="w-5 h-5 text-[#C9A227]" />
              </div>
            </div>
            <div>
              <span className="block font-display text-xl font-bold text-white tracking-wide">
                {BRAND_NAME}
              </span>
              <span className="block text-[9px] text-[#C9A227] font-sans tracking-widest font-semibold uppercase">
                United Wood Import & Export
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-[#C9A227] transition-all duration-200 uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute bottom-0 right-3 left-3 h-[2px] bg-[#C9A227] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Luxury Actions Trigger */}
          <div className="hidden sm:flex items-center space-x-3 space-x-reverse">
            <button
              onClick={onOpenAdvisor}
              className="flex items-center space-x-1.5 space-x-reverse px-3.5 py-1.5 text-xs font-bold uppercase rounded-sm border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-[#1B1B1B] transition-all duration-300 shadow-md group"
            >
              <Compass className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform duration-300" />
              <span>مستشار الذكاء الاصطناعي</span>
            </button>
            
            <a
              href={OFFICE_CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-sm transition-all duration-200 shadow-md flex items-center justify-center"
              aria-label="Contact on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href={OFFICE_CONTACT_INFO.directCallUrl}
              className="bg-[#C9A227] hover:bg-[#b08c1e] text-[#1B1B1B] font-semibold px-4 py-2 rounded-sm text-xs flex items-center space-x-2 space-x-reverse transition-all duration-200 shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>اتصال مباشر</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
              aria-label="Open primary menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1B1B1B] border-t border-[#C9A227]/20 mt-3"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-sm text-base font-medium text-gray-300 hover:bg-[#6B4423]/20 hover:text-[#C9A227] transition-all"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdvisor();
                  }}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse px-4 py-3 bg-[#6B4423]/30 border border-[#C9A227] text-[#C9A227] rounded-sm font-semibold"
                >
                  <Compass className="w-5 h-5 animate-spin-slow" />
                  <span>مستشار الأخشاب المساعد AI</span>
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={OFFICE_CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center space-x-2 px-3 py-2.5 bg-emerald-700 text-white rounded-sm text-sm font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>
                  <a
                    href={OFFICE_CONTACT_INFO.directCallUrl}
                    className="flex justify-center items-center space-x-2 px-3 py-2.5 bg-[#C9A227] text-[#1B1B1B] rounded-sm text-sm font-bold"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
