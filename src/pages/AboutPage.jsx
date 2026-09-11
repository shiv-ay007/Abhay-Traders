import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';
import { useBusiness } from '../context/BusinessContext';
import { BusinessLogoRenderer } from '../components/common/BusinessLogos';
import {
  FiAward,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiMapPin,
  FiPhone,
  FiArrowRight,
  FiHeart
} from 'react-icons/fi';
import { FaSeedling, FaTruckMoving, FaIndustry } from 'react-icons/fa';

export default function AboutPage() {
  const { activeBusiness } = useBusiness();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const milestones = [
    {
      year: '2019',
      title: 'Foundation in Prayagraj',
      desc: 'Started as a modest agro trading firm in Soraon mandi, Prayagraj, supplying high-grade wheat to local processors.'
    },
    {
      year: '2021',
      title: 'Milling & Processing Expansion',
      desc: 'Established Shree Shankar Foods milling facility in Durgawati, Rohtas (Bihar) for stone-ground chakki atta and besan.'
    },
    {
      year: '2023',
      title: 'Cosmetics & FMCG Wholesale',
      desc: 'Launched Abhay Beauty & Cosmetics division, partnering with Pond\'s, Lakme, Nivea and Mamaearth for wholesale supply.'
    },
    {
      year: '2025',
      title: 'Logistics Fleet & Pan-India Scale',
      desc: 'Integrated Shankar Logistics with GPS-monitored heavy commercial vehicles, delivering across UP, Bihar, WB and MP.'
    }
  ];

  const coreValues = [
    {
      icon: <FiAward className="w-6 h-6 text-emerald-700" />,
      title: 'Sortex-Quality Standards',
      desc: 'Zero tolerance for adulterants. Every grain lot undergoes optical Sortex sorting and laboratory moisture calibration.'
    },
    {
      icon: <FiShield className="w-6 h-6 text-emerald-700" />,
      title: '100% Tax & Legal Integrity',
      desc: 'All transactions backed by genuine GST tax invoices, computerized weighbridge slips, and verified e-Way bills.'
    },
    {
      icon: <FaSeedling className="w-6 h-6 text-emerald-700" />,
      title: 'Empowering Farming Communities',
      desc: 'Direct farmgate procurement provides transparent pricing and prompt payment settlements to regional farmers.'
    },
    {
      icon: <FaTruckMoving className="w-6 h-6 text-emerald-700" />,
      title: 'Reliable Supply Continuity',
      desc: 'With massive godown reserves, we guarantee year-round supply stability even during seasonal mandi price spikes.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80')`
          }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span>About Abhay Traders Group</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Built on Trust. Driven by <span className="text-emerald-400">Quality.</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              From the heartland fertile plains of Prayagraj (UP) and Rohtas (Bihar), we have grown from a single wholesale grain depot into a multi-vertical enterprise spanning Agro Commodities, FMCG Cosmetics, Food Milling, and Pan-India Freight.
            </p>
          </div>
        </section>

        {/* Company Overview Card with Logos */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                WHO WE ARE
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                A Unified Umbrella of 4 Interconnected Businesses
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Abhay Traders Group operates under a unified vision: delivering authentic products from origin to consumer with complete transparency. Our operations combine agricultural mandi trading, modernized stone chakki flour production, authorized cosmetic distribution, and end-to-end logistics.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="font-extrabold text-2xl text-emerald-800 font-mono">1,000+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Wholesale Commercial Buyers</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="font-extrabold text-2xl text-amber-700 font-mono">5,000+ Tons</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Annual Commodity Dispatch</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-850 p-6 sm:p-8 rounded-2xl text-white space-y-4 shadow-xl">
              <h3 className="font-bold text-lg text-white border-b border-slate-700 pb-3">
                Our 4 Core Entities
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700">
                  <BusinessLogoRenderer businessId="abhay-traders" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-xs">M/S Abhay Traders</div>
                    <div className="text-[11px] text-slate-400">Wheat, Basmati Rice & Pulses Wholesale</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700">
                  <BusinessLogoRenderer businessId="shree-shankar-foods" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-xs">Shree Shankar Foods</div>
                    <div className="text-[11px] text-slate-400">Atta, Maida, Besan & Sooji Milling</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700">
                  <BusinessLogoRenderer businessId="abhay-cosmetics" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-xs">Abhay Beauty & Cosmetics</div>
                    <div className="text-[11px] text-slate-400">Pond's, Lakme, Nivea Wholesale Stockist</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700">
                  <BusinessLogoRenderer businessId="shankar-logistics" className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-xs">Shankar Logistics & Supply</div>
                    <div className="text-[11px] text-slate-400">GPS Fleet Freight & Warehousing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Cards with Premium Hover */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">OUR FOUNDATION</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Our Core Values</h2>
              <p className="text-slate-600 text-sm mt-2">Every grain of wheat and every business transaction is guided by our dedication to quality.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-default"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100/70 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 flex items-center justify-center mb-4 transition-colors duration-300">
                      {val.icon}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center space-x-1">
                    <span>Verified Commitment</span>
                    <FiCheckCircle className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Timeline */}
        <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">MILESTONES</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Our Journey of Growth</h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-500 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                <div className="w-20 h-20 rounded-2xl bg-emerald-800 text-white font-black text-xl flex items-center justify-center font-mono flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  {m.year}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
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
