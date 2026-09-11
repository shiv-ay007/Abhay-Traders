import React from 'react';
import { FiUsers, FiPackage, FiTruck, FiAward } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

export default function StatsBanner() {
  const stats = [
    {
      value: '1000+',
      label: 'Happy Clients',
      icon: <FiUsers className="w-5 h-5 text-emerald-400" />
    },
    {
      value: '5000+',
      label: 'Tons Supplied',
      icon: <FiPackage className="w-5 h-5 text-emerald-400" />
    },
    {
      value: 'All India',
      label: 'Delivery Network',
      icon: <FiTruck className="w-5 h-5 text-emerald-400" />
    },
    {
      value: '5+',
      label: 'Years of Trust',
      icon: <FiAward className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 border-b border-slate-800">
      {/* Background imagery with subtle overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-emerald-950/90 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className={`pt-6 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''}`}>
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-700 shadow-sm">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-emerald-300/90 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline matching Image 1: "From Fields to Families, Across India" */}
        <div className="mt-12 text-center flex items-center justify-center space-x-2">
          <FaLeaf className="w-5 h-5 text-emerald-400 animate-bounce" />
          <p className="font-serif italic text-lg sm:text-2xl text-emerald-200 tracking-wide">
            "From Fields to Families, Across India"
          </p>
        </div>
      </div>
    </section>
  );
}
