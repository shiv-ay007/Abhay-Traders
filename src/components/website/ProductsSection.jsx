import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaWheatAwn } from 'react-icons/fa6';

export default function ProductsSection({ onOpenQuote }) {
  const { products } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Grains', 'Rice', 'Pulses', 'Oilseeds'];

  const agroProducts = products.filter(p => p.businessId === 'abhay-traders');
  const filteredProducts = selectedCategory === 'All'
    ? agroProducts
    : agroProducts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // 4 Main Feature Cards matching Image 1
  const showcaseCards = [
    {
      title: 'Wheat (Gehu)',
      subtitle: 'High quality, nutritious & widely demanded.',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      icon: '🌾',
      tag: 'Sharbati & Lokwan',
      rate: '₹2,950 / Qtl'
    },
    {
      title: 'Rice (Chawal)',
      subtitle: 'Premium varieties for every need.',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      icon: '🍚',
      tag: '1121 Basmati & Kolam',
      rate: '₹7,100 / Qtl'
    },
    {
      title: 'Other Grains & Pulses',
      subtitle: 'Toor, Moong, Chana, etc.',
      image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80',
      icon: '🫘',
      tag: 'Desi Sortex Pulses',
      rate: '₹7,400 / Qtl'
    },
    {
      title: 'Other Commodities',
      subtitle: 'Maize, Soya, Mustard and more.',
      image: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=600&q=80',
      icon: '🌽',
      tag: 'Feed & Oilseeds',
      rate: '₹6,100 / Qtl'
    }
  ];

  return (
    <section id="products" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Image 1 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              OUR PRODUCTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Premium <span className="text-emerald-700">Grains</span> for a Healthier Tomorrow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              We deal in a wide range of agro commodities, sourced directly from trusted farmers, cleaned through Sortex plants, and delivered across India.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition flex-shrink-0"
          >
            <span>View All Products</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid with Framer Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Product Image Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-xs">
                  {card.tag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-800 mb-1.5">
                    <span className="text-xl">{card.icon}</span>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-700 transition">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">Mandi Rate</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{card.rate}</span>
                  </div>

                  <button
                    onClick={onOpenQuote}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-700 text-emerald-800 hover:text-white text-xs font-bold transition shadow-xs"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Catalog Table preview */}
        <div className="mt-14 bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Current Agro Wholesale Stock & Pricing</h3>
              <p className="text-xs text-slate-500">Live wholesale batch rates updated today. Subject to daily mandi fluctuations.</p>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-200/60 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-3 rounded-l-lg">Commodity Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">HSN Code</th>
                  <th className="p-3">Available Stock</th>
                  <th className="p-3">Wholesale Rate</th>
                  <th className="p-3 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-white/80 transition">
                    <td className="p-3 font-bold text-slate-900">
                      {prod.name}
                    </td>
                    <td className="p-3 text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">{prod.category}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{prod.hsn}</td>
                    <td className="p-3 font-semibold text-emerald-800">
                      {prod.stock} {prod.unit}
                    </td>
                    <td className="p-3 font-bold font-mono text-slate-900">
                      ₹{prod.sellingPrice.toLocaleString('en-IN')} / {prod.unit}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={onOpenQuote}
                        className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] transition shadow-xs"
                      >
                        Book Lot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
