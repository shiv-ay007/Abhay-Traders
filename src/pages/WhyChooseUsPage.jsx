import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';
import {
  FiCheckCircle,
  FiDollarSign,
  FiTruck,
  FiBox,
  FiUsers,
  FiSmile,
  FiShield,
  FiArrowRight,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { FaMapMarkedAlt, FaQuoteLeft } from 'react-icons/fa';

export default function WhyChooseUsPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const pillars = [
    {
      icon: <FiCheckCircle className="w-7 h-7 text-emerald-700" />,
      title: 'Sortex Quality & Hygiene',
      desc: 'All food grains pass through multi-stage pneumatic aspirators and Buhler optical Sortex machines, eliminating dust, mud balls, and damaged seeds.'
    },
    {
      icon: <FiDollarSign className="w-7 h-7 text-emerald-700" />,
      title: 'Direct Primary Mandi Rates',
      desc: 'By procuring directly from farmer clusters and primary agricultural mandis in MP, UP and Bihar, we bypass multi-tier broker commissions.'
    },
    {
      icon: <FiTruck className="w-7 h-7 text-emerald-700" />,
      title: 'Pan-India Delivery Corridors',
      desc: 'Our dedicated heavy freight fleet ensures scheduled dispatches with real-time transit visibility and e-Way bill compliance.'
    },
    {
      icon: <FiBox className="w-7 h-7 text-emerald-700" />,
      title: 'Massive Bulk Order Buffer',
      desc: 'With 50,000+ metric ton aggregate warehousing capacity, we insulate our commercial clients from market supply shortages.'
    },
    {
      icon: <FiUsers className="w-7 h-7 text-emerald-700" />,
      title: 'Transparent & Legal Accounting',
      desc: 'Zero under-weighing. Every truck is weighed on certified digital weighbridges with print slips and 100% compliant GST tax invoices.'
    },
    {
      icon: <FiSmile className="w-7 h-7 text-emerald-700" />,
      title: 'Dedicated Account Managers',
      desc: 'Our trading desk provides daily mandi rate briefings, market trend analysis, and flexible credit terms for verified commercial accounts.'
    }
  ];

  const comparison = [
    { feature: 'Quality Assurance', traditional: 'Visual inspection only (prone to stones & dust)', abhay: '100% Optical Sortex & lab moisture test' },
    { feature: 'Pricing Transparency', traditional: 'Multiple broker cuts & hidden mandi cess', abhay: 'Direct net wholesale rate + computerized bill' },
    { feature: 'Transit & Delivery', traditional: 'Third-party unverified transporters with delays', abhay: 'In-house GPS monitored fleet (Shankar Logistics)' },
    { feature: 'Invoicing & GST', traditional: 'Cash kacha bills without input tax credit', abhay: '100% Tax Invoice with seamless ITC input' },
    { feature: 'Buffer Stocks', traditional: 'Stockouts during off-season & price gouging', abhay: 'Guaranteed year-round warehouse supply contracts' },
  ];

  const testimonials = [
    {
      quote: 'We have been purchasing 250 bags of Sharbati wheat every month from Abhay Traders. Consistent quality, zero stones, and computerized weighbridge slips have saved our bakery immense time.',
      name: 'Ramesh Agrawal',
      business: 'Agrawal Bakery & Food Products',
      city: 'Varanasi, UP'
    },
    {
      quote: 'Shree Shankar Foods chakki atta has become our top selling wholesale product. Customers love the natural softness and aroma of the rotis. Deliveries always arrive right on time.',
      name: 'Sunil Kumar',
      business: 'Patna Mega Grocery Mart',
      city: 'Patna, Bihar'
    },
    {
      quote: 'Getting genuine Pond\'s and Lakme cosmetic stocks with GST bills was always tough. Abhay Cosmetics gives us reliable box rates and fast delivery in Prayagraj.',
      name: 'Pooja Srivastava',
      business: 'Glow & Grace Salon Supply',
      city: 'Civil Lines, Prayagraj'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-18 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-4 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/40">
              TRUSTED WHOLESALE PARTNERSHIP
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Why 1,000+ Buyers Trust <span className="text-emerald-400">Abhay Traders</span>
            </h1>
            <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              We eliminate the uncertainty, quality mismatch, and informal broker hassles from agricultural and FMCG commodity procurement.
            </p>
          </div>
        </section>

        {/* 6 Pillars Grid with Ultra-Premium Hover Effects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-emerald-500/80 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 flex items-center justify-center mb-6 transition-all duration-300 shadow-sm">
                    {p.icon}
                  </div>
                  <h3 className="font-black text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Guaranteed Standard</span>
                  <FiCheck className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-18">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                THE CLEAR ADVANTAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Traditional Mandi Brokers vs. Abhay Traders Group
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-slate-500 uppercase text-[11px] font-bold">
                    <th className="p-3">Feature</th>
                    <th className="p-3 text-rose-600">Traditional Broker</th>
                    <th className="p-3 text-emerald-700">Abhay Traders Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {comparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 font-bold text-slate-900">{row.feature}</td>
                      <td className="p-3.5 text-slate-500 flex items-center space-x-1.5">
                        <FiX className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span>{row.traditional}</span>
                      </td>
                      <td className="p-3.5 text-slate-900 font-semibold">
                        <div className="flex items-center space-x-1.5 text-emerald-800">
                          <FiCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{row.abhay}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="bg-slate-900 text-white py-18 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                TESTIMONIALS
              </span>
              <h2 className="text-3xl font-black text-white">What Our Commercial Buyers Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-4 hover:border-emerald-500 transition duration-300"
                >
                  <FaQuoteLeft className="w-6 h-6 text-emerald-400 opacity-60" />
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="pt-3 border-t border-slate-700">
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-emerald-400">{t.business}</div>
                    <div className="text-[11px] text-slate-400">{t.city}</div>
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
