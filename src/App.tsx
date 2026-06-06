import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProductsCatalog from "./components/ProductsCatalog";
import WhyChooseUs from "./components/WhyChooseUs";
import AIWoodAdvisor from "./components/AIWoodAdvisor";
import QuoteForm from "./components/QuoteForm";
import Testimonials from "./components/Testimonials";
import WorkingHours from "./components/WorkingHours";
import Footer from "./components/Footer";

export default function App() {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | null>(null);

  const handleOpenAdvisor = () => {
    setIsAdvisorOpen(true);
  };

  const handleCloseAdvisor = () => {
    setIsAdvisorOpen(false);
  };

  const handleSelectProductForQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    
    // Smooth scroll down to the Contact Quote form section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToQuote = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetCatalogProduct = () => {
    setSelectedProductForQuote(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#C9A227] selection:text-[#1B1B1B]">
      
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenAdvisor={handleOpenAdvisor}
        onScrollToQuote={handleScrollToQuote}
      />

      {/* 2. Primary Sections */}
      <main className="flex-grow">
        
        {/* Hero Section Container */}
        <Hero
          onOpenAdvisor={handleOpenAdvisor}
          onScrollToQuote={handleScrollToQuote}
        />

        {/* About Section */}
        <About />

        {/* Dynamic Products Catalog */}
        <ProductsCatalog
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* Why Choose Us Values */}
        <WhyChooseUs />

        {/* Interactive Quote Form & Contact guidelines */}
        <QuoteForm
          selectedProductFromCatalog={selectedProductForQuote}
          onResetCatalogProduct={handleResetCatalogProduct}
        />

        {/* Customer Star Testimonials */}
        <Testimonials />

        {/* Dynamic branches timings status details */}
        <WorkingHours />

      </main>

      {/* 3. Luxury Sidebar / Drawer Widget - AI Wood Advisor panel */}
      <AIWoodAdvisor
        isOpen={isAdvisorOpen}
        onClose={handleCloseAdvisor}
      />

      {/* 4. Bottom Footer */}
      <Footer />

    </div>
  );
}
