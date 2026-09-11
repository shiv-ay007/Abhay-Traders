import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { motion } from 'framer-motion';
import { TilakLogo, LogisticsLogo } from '../common/BusinessLogos';
import { FiArrowRight, FiCheckCircle, FiShield } from 'react-icons/fi';
import { FaTruckMoving, FaIndustry } from 'react-icons/fa';

export default function ShankarFoodsSection({ onOpenQuote }) {
  const { setActiveBusinessId } = useBusiness();

  const foodProducts = [
    {
      name: 'Shankar Chakki Fresh Atta',
      spec: '100% MP Wheat Sharbati blend • 25kg & 50kg Bags',
      tag: 'Whole Wheat'
    },
    {
      name: 'Shankar Superfine Maida',
      spec: 'Double-refined bakery grade • High elasticity 50kg',
      tag: 'Refined Flour'
    },
    {
      name: 'Shankar Pure Chana Besan',
      spec: 'Micro-ground Bengal gram • Zero additives 10kg',
      tag: 'Pulse Flour'
    },
    {
      name: 'Shankar Granular Sooji / Rawa',
      spec: 'Uniform coarse semolina • Golden roasted texture 25kg',
      tag: 'Semolina'
    }
  ];

  return (
    <section id="shankar-foods" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800 scroll-mt-20">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Shree Shankar Foods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <TilakLogo className="w-12 h-12" />
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Food Processing & Milling</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Shree Shankar Foods
                </h2>
              </div>
            </div>

            <p className="text-slate-300 text-base leading-relaxed">
              Equipped with modern roller flour mills and pneumatic stone chakki plants in Durgawati (Rohtas, Bihar) and Dahiyawan (Prayagraj, UP), Shree Shankar Foods supplies hygienic, nutrient-dense staples to commercial caterers, bakeries, and retail wholesalers.
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {foodProducts.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 hover:border-amber-500/80 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm mt-1">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.spec}</p>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveBusinessId('shree-shankar-foods');
                  onOpenQuote();
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer hover:scale-105"
              >
                Book Milling Lot →
              </button>
              <div className="text-xs text-slate-400 font-mono">
                GST: <span className="text-amber-400 font-semibold">10FOAPS7195B1Z2</span> (Bihar) & <span className="text-amber-400 font-semibold">09FOAPS7195B1ZL</span> (UP)
              </div>
            </div>
          </motion.div>

          {/* Right Column: Shankar Logistics & Fleet */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6"
          >
            <div className="flex items-center space-x-3">
              <LogisticsLogo className="w-12 h-12" />
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-blue-400">Dedicated Fleet & Haulage</span>
                <h3 className="text-xl font-bold text-white">Shankar Logistics</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              We operate an active fleet of heavy commercial vehicles with 24x7 GPS tracking, providing safe transit of agro commodities from farms and mandis directly to your doorsteps across Uttar Pradesh, Bihar, Delhi NCR, and Madhya Pradesh.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <FaTruckMoving className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Full Truck Load (FTL) & PTL</strong>: 10 to 40 ton bulk grain capacity trucks.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <FaIndustry className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Warehousing & Storage</strong>: Moisture-proof godowns in Prayagraj & Rohtas.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <FiShield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Transit Insurance & e-Way Bill</strong>: 100% compliant documentation on every trip.</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Helpline: 9918406257</span>
              <button
                onClick={() => {
                  setActiveBusinessId('shankar-logistics');
                  onOpenQuote();
                }}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center space-x-1 cursor-pointer hover:underline"
              >
                <span>Hire Transport</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
