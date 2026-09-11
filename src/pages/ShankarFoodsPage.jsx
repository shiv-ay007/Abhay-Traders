import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';
import { useBusiness } from '../context/BusinessContext';
import { TilakLogo, LogisticsLogo } from '../components/common/BusinessLogos';
import { formatINR } from '../utils/numberToWords';
import {
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiBox,
  FiLayers
} from 'react-icons/fi';
import { FaIndustry, FaTruckMoving, FaWhatsapp } from 'react-icons/fa';

export default function ShankarFoodsPage() {
  const { setActiveBusinessId } = useBusiness();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const millingProducts = [
    {
      name: 'Shankar Chakki Fresh Whole Wheat Atta',
      spec: '100% MP Wheat Sharbati blend • Traditional stone ground',
      packing: '25kg & 50kg Heavy Poly Bags',
      rate: 840,
      unit: '25kg Bag',
      hsn: '1101',
      gst: '5%',
      gluten: '10.5% Min',
      moisture: '11.8% Max',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
      description: 'Slow-ground on genuine granite chakki stones to prevent nutrient loss from heating. Delivers exceptionally soft, puffed rotis that stay fresh for 12+ hours.'
    },
    {
      name: 'Shankar Superfine Bakery Maida',
      spec: 'Double-refined roller mill grade • High gluten elasticity',
      packing: '50kg Moisture-Proof Liner Bags',
      rate: 1680,
      unit: '50kg Bag',
      hsn: '1101',
      gst: '5%',
      gluten: '11.5% Min',
      moisture: '12.0% Max',
      image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?auto=format&fit=crop&w=700&q=80',
      description: 'Refined wheat flour engineered specifically for commercial bakeries, biscuits, samosa cones, and naan flatbreads with superior stretch and crispness.'
    },
    {
      name: 'Shankar Pure Chana Dal Besan',
      spec: '100% Desi Bengal gram • Zero added khesari dal',
      packing: '10kg & 30kg Bags',
      rate: 890,
      unit: '10kg Bag',
      hsn: '1106',
      gst: '5%',
      gluten: 'Naturally Gluten-Free',
      moisture: '10.5% Max',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
      description: 'Cleaned yellow Bengal gram chana dal ground to an ultra-fine aromatic powder. Ideal for boondi, laddoos, snacks, and catering bulk requirements.'
    },
    {
      name: 'Shankar Granular Golden Sooji / Rawa',
      spec: 'Clean uniform semolina granulation • Roasted aroma',
      packing: '25kg Poly Bags',
      rate: 940,
      unit: '25kg Bag',
      hsn: '1103',
      gst: '5%',
      gluten: 'Medium',
      moisture: '11.0% Max',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80',
      description: 'Crisp, granular semolina extracted from the heart of golden durum wheat kernels. Highly demanded for halwa, upma, idli batters, and crisp snacks.'
    }
  ];

  const fleetServices = [
    {
      title: 'Full Truck Load (FTL) Heavy Haulage',
      tonnage: '10 to 40 Metric Tons',
      vehicles: '10-Wheel & 14-Wheel Taurus / Multi-Axle Trucks',
      features: 'GPS Tracked, e-Way bill generated, door-to-door delivery',
      corridors: 'Prayagraj ⇄ Patna ⇄ Varanasi ⇄ Kolkata ⇄ Delhi NCR'
    },
    {
      title: 'Commodity Warehousing & Cold Godown',
      tonnage: '50,000+ Bags Capacity',
      vehicles: 'Durgawati & Soraon Logistics Parks',
      features: 'Raised plinth, fumigated, 100% moisture-sealed, 24x7 security',
      corridors: 'Safe multi-month seasonal buffer stock holding'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-amber-950 via-slate-900 to-amber-950 text-white py-18 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-900/80 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <TilakLogo className="w-5 h-5 rounded-md" />
              <span>Flour Milling & Food Processing Division</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Shree Shankar <span className="text-amber-400">Foods</span>
            </h1>
            <p className="text-amber-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Milling pure, nutrient-dense whole wheat Chakki Atta, Superfine Maida, Chana Besan, and Sooji with state-of-the-art pneumatic processing in Durgawati, Rohtas & Prayagraj.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs">
              <span className="bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-amber-300 font-bold">
                Bihar GSTIN: 10FOAPS7195B1Z2
              </span>
              <span className="bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-amber-300 font-bold">
                UP Branch: 09FOAPS7195B1ZL
              </span>
            </div>
          </div>
        </section>

        {/* Milling Products Section with Card Hover */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              MILLING SPECIFICATIONS
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Stone Chakki & Roller Mill Products
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Hygienically milled without chemical bleach, added chalk, or artificial preservatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {millingProducts.map((prod, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10"></div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-lg shadow">
                    HSN: {prod.hsn}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                      {prod.packing}
                    </span>
                    <h3 className="text-lg font-bold drop-shadow group-hover:text-amber-300 transition-colors">
                      {prod.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-amber-50/60 p-3 rounded-2xl border border-amber-200/50">
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-semibold block">Gluten Index</span>
                      <span className="font-bold text-slate-800">{prod.gluten}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-semibold block">Moisture Limit</span>
                      <span className="font-bold text-slate-800">{prod.moisture}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Wholesale Rate
                      </span>
                      <div className="font-mono font-black text-xl text-slate-900">
                        ₹{prod.rate.toLocaleString('en-IN')} <span className="text-xs font-sans text-slate-500 font-medium">/ {prod.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveBusinessId('shree-shankar-foods');
                        setIsQuoteOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition cursor-pointer"
                    >
                      Book Milling Lot →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shankar Logistics Fleet Section */}
        <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div className="flex items-center space-x-3">
                <LogisticsLogo className="w-14 h-14" />
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-blue-400">
                    OUR 4TH BUSINESS VERTICAL
                  </span>
                  <h2 className="text-3xl font-black text-white">Shankar Logistics & Fleet Supply</h2>
                  <p className="text-xs text-slate-400 mt-1">Connecting Mandis, Milling Depots & Consumer Markets Across India</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveBusinessId('shankar-logistics');
                  setIsQuoteOpen(true);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer"
              >
                Book Freight Truck →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fleetServices.map((svc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 hover:border-blue-500 transition shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{svc.tonnage}</span>
                    <FaTruckMoving className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{svc.title}</h4>
                  <p className="text-xs text-slate-300 font-medium">Vehicles: {svc.vehicles}</p>
                  <div className="text-xs text-slate-400 border-t border-slate-700/60 pt-2 space-y-1">
                    <div><strong>Key Feature:</strong> {svc.features}</div>
                    <div><strong>Major Corridors:</strong> {svc.corridors}</div>
                  </div>
                </div>
              ))}
            </div>
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
