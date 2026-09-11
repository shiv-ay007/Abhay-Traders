import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/website/HeroSection';
import ProductsSection from '../components/website/ProductsSection';
import CosmeticsSection from '../components/website/CosmeticsSection';
import ShankarFoodsSection from '../components/website/ShankarFoodsSection';
import WhyChooseUsSection from '../components/website/WhyChooseUsSection';
import StatsBanner from '../components/website/StatsBanner';
import ContactSection from '../components/website/ContactSection';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';

export default function LandingPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onOpenQuote={() => setIsQuoteOpen(true)} />
        <ProductsSection onOpenQuote={() => setIsQuoteOpen(true)} />
        <CosmeticsSection onOpenQuote={() => setIsQuoteOpen(true)} />
        <ShankarFoodsSection onOpenQuote={() => setIsQuoteOpen(true)} />
        <WhyChooseUsSection onOpenQuote={() => setIsQuoteOpen(true)} />
        <StatsBanner />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />

      <BusinessSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
      />
    </div>
  );
}
