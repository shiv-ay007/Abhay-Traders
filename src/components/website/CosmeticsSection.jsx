import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiHeart, FiStar } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export default function CosmeticsSection({ onOpenQuote }) {
  const { setActiveBusinessId } = useBusiness();

  const brandPills = [
    { name: "POND'S", desc: "Bright Beauty & Cold Cream", tag: "Skincare" },
    { name: "LAKMÉ", desc: "Liquid Matte & Foundations", tag: "Makeup" },
    { name: "NIVEA", desc: "Moisturizers & Deodorants", tag: "Body Care" },
    { name: "mamaearth", desc: "Toxin-Free Onion Oils", tag: "Natural" },
    { name: "GLOW & LOVELY", desc: "Multi-Vitamin Creams", tag: "Daily Care" },
    { name: "GARNIER", desc: "Micellar & Face Serums", tag: "Salon Stock" }
  ];

  const handleExploreCosmetics = () => {
    setActiveBusinessId('abhay-cosmetics');
    onOpenQuote();
  };

  return (
    <section id="cosmetics" className="py-20 bg-gradient-to-b from-rose-50/70 via-white to-pink-50/40 border-b border-rose-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-rose-100/60 via-pink-50 to-white rounded-3xl p-8 sm:p-12 border border-rose-200/80 shadow-xl relative overflow-hidden">
          {/* Decorative Pink Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-pink-300/30 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (Matches Image 1) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold uppercase tracking-wider">
                <HiSparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>OUR ANOTHER BUSINESS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                <span className="text-rose-600">Beauty</span> for a Better You
              </h2>

              <p className="text-base text-slate-700 leading-relaxed max-w-lg">
                We also deal in a wide range of genuine cosmetic and personal care products from trusted national and international brands. Quality, variety and wholesale supply — all under one roof.
              </p>

              {/* Brands Pill List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {brandPills.map((brand, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-rose-200/70 shadow-2xs hover:border-rose-400 transition cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-rose-700 block uppercase tracking-wider">{brand.tag}</span>
                    <span className="font-extrabold text-slate-900 text-sm">{brand.name}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{brand.desc}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={handleExploreCosmetics}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-sm shadow-lg shadow-rose-900/20 hover:shadow-xl transition cursor-pointer"
                >
                  <span>Explore Cosmetics</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919628727269?text=Hello%20Abhay%20Cosmetics,%20I%20want%20wholesale%20rates%20for%20cosmetic%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 font-bold text-sm border border-rose-300 shadow-2xs transition"
                >
                  <FaWhatsapp className="w-4 h-4 text-rose-600" />
                  <span>Wholesale Inquiry</span>
                </a>
              </div>
            </motion.div>

            {/* Right Visual Image Arrangement (Matches Image 1) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white p-3">
                {/* Visual of cosmetics items */}
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-cover bg-center" style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80')`
                }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>

                  {/* "Trusted Brands • Great Deals" Badge matching Image 1 */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-lg border border-pink-200">
                    <p className="font-extrabold text-xs text-rose-600 tracking-tight">Trusted Brands</p>
                    <p className="font-semibold text-[10px] text-slate-700 uppercase tracking-widest">Great Deals</p>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-rose-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                      Direct Wholesale Stockist
                    </span>
                    <h4 className="text-xl font-bold">Pond's, Lakme, Nivea & Mamaearth</h4>
                    <p className="text-xs text-rose-100">Original batch products with 100% manufacturer barcode verification & GST invoices.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
