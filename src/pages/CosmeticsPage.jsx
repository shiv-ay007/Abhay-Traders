import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';
import { useBusiness } from '../context/BusinessContext';
import { formatINR } from '../utils/numberToWords';
import { FiSearch, FiArrowRight, FiShield, FiHeart, FiCheckCircle, FiPercent } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export default function CosmeticsPage() {
  const { setActiveBusinessId } = useBusiness();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('All');

  const brands = ['All', "POND'S", 'LAKMÉ', 'NIVEA', 'mamaearth', 'GLOW & LOVELY'];

  const cosmeticsItems = [
    {
      id: 'cos-1',
      brand: "POND'S",
      name: "Pond's Bright Beauty Spotless Glow Face Cream",
      size: '50g x 12 Pcs Outer Box',
      mrpPerPiece: 195,
      wholesaleBoxRate: 1720,
      margin: '26% Profit Margin',
      hsn: '3304',
      gst: '18%',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
      description: 'Enriched with Vitamin B3+ formula for spot reduction. Highest re-order velocity product for kirana and cosmetic retail counters.',
      tag: 'Best Seller'
    },
    {
      id: 'cos-2',
      brand: "POND'S",
      name: "Pond's Super Light Gel Oil-Free Moisturiser",
      size: '100ml x 12 Pcs Box',
      mrpPerPiece: 240,
      wholesaleBoxRate: 2150,
      margin: '25% Profit Margin',
      hsn: '3304',
      gst: '18%',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
      description: 'Hydrating hyaluronic acid + Vitamin E daily water gel moisturiser. Non-sticky and 24-hr moisture lock.',
      tag: 'Trending'
    },
    {
      id: 'cos-3',
      brand: 'LAKMÉ',
      name: 'Lakme Forever Matte Liquid Lip Color (10 Shade Box)',
      size: '5.6ml x 10 Assorted Box',
      mrpPerPiece: 349,
      wholesaleBoxRate: 2750,
      margin: '21% Profit Margin',
      hsn: '3304',
      gst: '18%',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80',
      description: '16-hour lightweight intense matte finish lipstick in top selling nude, pink and red shades.',
      tag: 'Salon Grade'
    },
    {
      id: 'cos-4',
      brand: 'LAKMÉ',
      name: 'Lakme Complexion Care (CC) Cream SPF 30',
      size: '30g x 8 Pcs Box',
      mrpPerPiece: 310,
      wholesaleBoxRate: 1980,
      margin: '20% Profit Margin',
      hsn: '3304',
      gst: '18%',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
      description: 'Skin styling cream providing natural coverage with sun protection for working women.',
      tag: 'Daily Wear'
    },
    {
      id: 'cos-5',
      brand: 'NIVEA',
      name: 'Nivea Soft Light Moisturiser Cream (200ml)',
      size: '200ml x 6 Pcs Master Carton',
      mrpPerPiece: 340,
      wholesaleBoxRate: 1620,
      margin: '21% Profit Margin',
      hsn: '3304',
      gst: '18%',
      image: 'https://images.unsplash.com/photo-1608248597358-154955b57d60?auto=format&fit=crop&w=700&q=80',
      description: 'Infused with Jojoba oil and Vitamin E for fresh, supple skin feel across summer and winter seasons.',
      tag: 'High Demand'
    },
    {
      id: 'cos-6',
      brand: 'mamaearth',
      name: 'Mamaearth Onion Hair Oil for Hair Fall Reduction',
      size: '250ml x 8 Pcs Shipper Box',
      mrpPerPiece: 499,
      wholesaleBoxRate: 3350,
      margin: '16% Net Dealer Margin',
      hsn: '3305',
      gst: '18%',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=700&q=80',
      description: 'Formulated with Redensyl and onion seed oil for hair nourishment. Completely free of parabens, sulphates & mineral oils.',
      tag: 'Toxin Free'
    }
  ];

  const filtered = selectedBrand === 'All'
    ? cosmeticsItems
    : cosmeticsItems.filter(c => c.brand === selectedBrand);

  const handleWhatsAppInquiry = (item) => {
    const text = encodeURIComponent(
      `Hello Abhay Cosmetics,\n\nI want wholesale bulk rates for *${item.name}* (${item.brand}).\n` +
      `Wholesale Box Rate: ₹${item.wholesaleBoxRate}\n` +
      `Packaging: ${item.size}\n\n` +
      `Please confirm available carton lots and delivery timeline.`
    );
    window.open(`https://wa.me/919628727269?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-rose-50/30">
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <main className="flex-1">
        {/* Luxury Hero Header */}
        <section className="bg-gradient-to-r from-rose-950 via-slate-900 to-pink-950 text-white py-18 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-rose-900/40">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-500/20 blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-900/80 border border-rose-400/40 text-rose-200 text-xs font-bold uppercase tracking-wider">
              <HiSparkles className="w-4 h-4 text-rose-400" />
              <span>Abhay Beauty & Cosmetics Division</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Authorized Wholesale <span className="text-rose-400">Cosmetics</span> Stockist
            </h1>
            <p className="text-rose-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Genuine branded beauty supplies, salon assortments, and daily skincare products sourced directly with 100% manufacturer barcode authenticity and GST invoices.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setActiveBusinessId('abhay-cosmetics');
                  setIsQuoteOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition cursor-pointer"
              >
                Request Beauty Rate Card →
              </button>
              <span className="text-xs text-rose-300 font-mono">
                UP GSTIN: 09AKCPL1208K1ZA
              </span>
            </div>
          </div>
        </section>

        {/* Brand Selector Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-rose-100 flex items-center justify-between overflow-x-auto gap-2">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex-shrink-0 pl-2">
              Filter Brands:
            </span>
            <div className="flex space-x-2">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cosmetics Grid with Luxury Cards & Hover Effects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-rose-100 hover:border-rose-400 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-rose-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"></div>

                  <div className="absolute top-3.5 left-3.5">
                    <span className="bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span className="bg-white/95 backdrop-blur-md text-rose-700 font-bold text-xs px-2.5 py-1 rounded-xl shadow">
                      {item.brand}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-rose-200 font-bold block">
                      Pack: {item.size}
                    </span>
                    <h3 className="text-base font-black leading-snug drop-shadow group-hover:text-rose-200 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Financial & Margin Specs */}
                  <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">Retail MRP</span>
                      <span className="font-bold text-slate-800">₹{item.mrpPerPiece} / Pc</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">Retailer Margin</span>
                      <span className="font-extrabold text-emerald-700">{item.margin}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">HSN Code</span>
                      <span className="font-mono text-slate-700 font-semibold">{item.hsn}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-semibold block">GST Rate</span>
                      <span className="font-mono text-slate-700 font-semibold">{item.gst}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Wholesale Box Rate
                      </span>
                      <div className="font-mono font-black text-xl text-rose-700">
                        ₹{item.wholesaleBoxRate.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleWhatsAppInquiry(item)}
                        className="p-2.5 rounded-xl bg-rose-100 hover:bg-emerald-600 text-rose-700 hover:text-white transition cursor-pointer"
                        title="Inquire via WhatsApp"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveBusinessId('abhay-cosmetics');
                          setIsQuoteOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                      >
                        Order Box
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Retailer Advantage Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-gradient-to-r from-rose-900 to-pink-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black">Running a Cosmetic Store or Beauty Salon?</h3>
              <p className="text-xs sm:text-sm text-rose-200 max-w-xl">
                Get tiered carton discounts, free delivery in Prayagraj & Varanasi, and 100% genuine tax invoices for GST input credit claims.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveBusinessId('abhay-cosmetics');
                setIsQuoteOpen(true);
              }}
              className="px-6 py-3.5 rounded-xl bg-white text-rose-900 font-extrabold text-xs hover:bg-rose-50 shadow-lg flex-shrink-0 cursor-pointer"
            >
              Get Wholesale Dealership Terms →
            </button>
          </div>
        </section>
      </main>

      <Footer
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <BusinessSwitcherModal isOpen={isSwitcherOpen} onClose={() => setIsSwitcherOpen(false)} />
    </div>
  );
}
