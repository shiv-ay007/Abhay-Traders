import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDollarSign, FiTruck, FiBox, FiUsers, FiSmile, FiArrowRight } from 'react-icons/fi';
import { FaMapMarkedAlt, FaTruck } from 'react-icons/fa';

export default function WhyChooseUsSection({ onOpenQuote }) {
  // The 6 trust features matching Image 1
  const features = [
    {
      icon: <FiCheckCircle className="w-6 h-6 text-emerald-700" />,
      title: 'Best Quality Products',
      desc: 'Rigorous Sortex quality cleaning & moisture testing before every dispatch.'
    },
    {
      icon: <FiDollarSign className="w-6 h-6 text-emerald-700" />,
      title: 'Competitive Prices',
      desc: 'Direct mandi linkage ensures unbeatable wholesale & volume rates.'
    },
    {
      icon: <FiTruck className="w-6 h-6 text-emerald-700" />,
      title: 'Pan India Delivery',
      desc: 'Extensive transport corridor connecting UP, Bihar, WB, MP & North India.'
    },
    {
      icon: <FiBox className="w-6 h-6 text-emerald-700" />,
      title: 'Bulk Order Support',
      desc: 'Seamless capacity to fulfill 10 to 500 metric tons per order with ease.'
    },
    {
      icon: <FiUsers className="w-6 h-6 text-emerald-700" />,
      title: 'Transparent Business',
      desc: '100% genuine GST invoices, computerized weighbridge slips & clear terms.'
    },
    {
      icon: <FiSmile className="w-6 h-6 text-emerald-700" />,
      title: 'Customer Satisfaction',
      desc: 'Dedicated account managers and transparent settlement of accounts.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            WHY CHOOSE ABHAY TRADERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Your <span className="text-emerald-700">Trusted</span> Trading Partner
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            With over 5 years of excellence and 1,000+ satisfied commercial partners, our benchmark is quality, honesty, and seamless fulfillment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 6 Grid Icons (Matches Image 1 layout) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 transition duration-200 flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 transition">
                  {item.icon}
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Card: Serving Every Corner of India (Matches Image 1) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background Map decorative watermark */}
            <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-8 translate-y-8">
              <FaMapMarkedAlt className="w-64 h-64 text-emerald-400" />
            </div>

            <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 bg-emerald-800 text-emerald-200 text-[11px] font-bold rounded-full uppercase tracking-wider">
                Pan-India Supply
              </span>

              <h3 className="text-2xl font-black text-white leading-tight">
                Serving Every Corner of India
              </h3>

              <p className="text-xs text-emerald-200/90 leading-relaxed">
                From farms and local mandis directly to your business premises — we deliver nationwide with scheduled dispatches and verified transit e-Way bills.
              </p>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-md hover:scale-105"
              >
                <span>Our Network</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Truck Graphic Preview matching Image 1 */}
            <div className="relative z-10 mt-8 pt-6 border-t border-emerald-900/80">
              <div className="flex items-center space-x-3 bg-emerald-900/60 p-3 rounded-xl border border-emerald-800">
                <FaTruck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Daily Inter-State Dispatches</div>
                  <div className="text-[11px] text-emerald-300">UP • Bihar • MP • WB • Delhi</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
