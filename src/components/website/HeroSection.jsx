import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp, FaShieldAlt, FaTruck, FaAward, FaSeedling } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function HeroSection({ onOpenQuote }) {
  const { activeBusiness } = useBusiness();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-slate-50 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Decorative background glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.35, 0.5, 0.35]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
      ></motion.div>

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content (Animated with Framer Motion) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span>{activeBusiness.badge || 'Trusted Wholesale Supplier'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              {activeBusiness.id === 'abhay-traders' ? (
                <>
                  Abhay <span className="text-emerald-700">Traders</span>
                </>
              ) : (
                activeBusiness.name
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl sm:text-2xl font-bold text-amber-900/90 tracking-tight"
            >
              {activeBusiness.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              {activeBusiness.description} Delivering premium quality agro commodities and supplies across India with unwavering trust and commitment.
            </motion.p>

            {/* Action Buttons with Motion Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenQuote}
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-xl shadow-emerald-900/20 hover:shadow-2xl transition cursor-pointer"
              >
                <span>Enquire Now</span>
                <FiArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/${activeBusiness.whatsappNumber || '919628727269'}?text=Hello%20${encodeURIComponent(activeBusiness.name)},%20I%20want%20to%20place%20an%20enquiry%20for%20wholesale%20bulk%20purchase.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border-2 border-slate-300 hover:border-emerald-600 shadow-sm transition"
              >
                <FaWhatsapp className="w-5 h-5 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </motion.a>
            </motion.div>

            {/* Trust Badges matching Image 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                <FaAward className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                <FaTruck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>All India Supply</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                <FaShieldAlt className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>1000+ Buyers</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                <FaSeedling className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>100% Natural</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Area (Animated entrance with Framer Motion) */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-amber-900/10 to-amber-100/30 p-2">
              <div className="relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80')`
              }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Floating "Good Food Brighter Tomorrow" badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 bg-amber-950/80 backdrop-blur-md text-amber-200 border border-amber-400/40 px-4 py-2 rounded-2xl text-xs font-bold text-right shadow-lg"
                >
                  <p className="font-serif italic text-sm text-white">Good Food</p>
                  <p className="tracking-wider uppercase text-[10px]">Brighter Tomorrow</p>
                </motion.div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-block bg-emerald-700/90 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Direct Mandi & Farmer Sourcing
                  </div>
                  <h3 className="text-2xl font-bold drop-shadow">
                    Certified Grade Grains & Commodities
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2">
                    Cleaned, moisture-calibrated, sortex-quality wheat, basmati paddy, and pulses dispatched under hygienic ISO standards.
                  </p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 hidden sm:flex items-center space-x-3"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow">
                  🌾
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg">5,000+ Tons</div>
                  <div className="text-xs text-slate-500 font-medium">Grain Supplied Annually</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
