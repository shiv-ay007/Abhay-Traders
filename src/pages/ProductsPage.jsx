import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';
import { useBusiness } from '../context/BusinessContext';
import { formatINR } from '../utils/numberToWords';
import { FiSearch, FiArrowRight, FiCheck, FiFilter, FiPhoneCall, FiInfo } from 'react-icons/fi';
import { FaWhatsapp, FaWheatAwn } from 'react-icons/fa6';

export default function ProductsPage() {
  const { products, activeBusiness } = useBusiness();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const agroProducts = products.filter(p => p.businessId === 'abhay-traders');

  // Rich specification cards for all commodities
  const detailedCommodities = [
    {
      id: 'prod-wheat-1',
      name: 'Premium Sharbati Wheat (Gehu)',
      category: 'Wheat',
      tag: 'Sortex Grade-A',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      rate: 2950,
      unit: 'Quintal',
      hsn: '1001',
      moisture: '11.5% Max',
      purity: '99.5% Min',
      moq: '20 Quintal',
      packaging: '50kg Standard HDPE / Jute Bags',
      description: 'Handpicked, golden-amber heavy grain Sharbati wheat with natural sheen and high protein content for premium stone chakki atta milling.',
      origin: 'Sehore & Vidisha, MP Mandi'
    },
    {
      id: 'prod-wheat-2',
      name: 'MP Lokwan Wheat Super Bold',
      category: 'Wheat',
      tag: 'Milling Quality',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      rate: 2780,
      unit: 'Quintal',
      hsn: '1001',
      moisture: '12% Max',
      purity: '99.2% Min',
      moq: '50 Quintal',
      packaging: '50kg PP Bags with Inner Liner',
      description: 'Heavy bold kernel Lokwan wheat suited for high yield commercial flour mills and packaged atta manufacturers.',
      origin: 'Malwa Belt, MP'
    },
    {
      id: 'prod-rice-1',
      name: '1121 Steam Basmati Rice (Chawal)',
      category: 'Rice',
      tag: 'Aged Extra Long',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      rate: 7100,
      unit: 'Quintal',
      hsn: '1006',
      moisture: '12.5% Max',
      purity: '99.8% Sortex',
      moq: '10 Quintal',
      packaging: '25kg & 50kg Non-Woven / Jute Bags',
      description: 'Aged 1121 steam Basmati with exceptional grain elongation (up to 22mm cooked), pearl white color and sweet aroma for hotel chains and exports.',
      origin: 'Karnal & Taraori Belt'
    },
    {
      id: 'prod-rice-2',
      name: 'Wada Kolam / Sona Masoori Rice',
      category: 'Rice',
      tag: 'Daily Meal Staple',
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80',
      rate: 4400,
      unit: 'Quintal',
      hsn: '1006',
      moisture: '13% Max',
      purity: '99% Clean',
      moq: '25 Quintal',
      packaging: '25kg & 50kg Moisture-Proof Bags',
      description: 'Medium grain lightweight rice with zero stickiness, ideal for daily catering, hospital canteens, and bulk grocery supply.',
      origin: 'Raipur & Rohtas Valley'
    },
    {
      id: 'prod-dal-1',
      name: 'Desi Toor Dal (Arhar Dal Bold)',
      category: 'Pulses',
      tag: 'Unpolished Fatka',
      image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
      rate: 12400,
      unit: 'Quintal',
      hsn: '0713',
      moisture: '10% Max',
      purity: '99.5% Natural',
      moq: '10 Quintal',
      packaging: '30kg & 50kg Poly Bags',
      description: '100% laser-sorted unpolished pigeon pea toor dal, free of marble dust, chemical oils, or synthetic polishing.',
      origin: 'Gulbarga & Latur Mandis'
    },
    {
      id: 'prod-dal-2',
      name: 'Polished Chana Dal Super Grade',
      category: 'Pulses',
      tag: 'Sweetmaker Choice',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      rate: 7400,
      unit: 'Quintal',
      hsn: '0713',
      moisture: '11% Max',
      purity: '99.7% Sortex',
      moq: '15 Quintal',
      packaging: '50kg Stitched Bags',
      description: 'Golden yellow uniform Bengal gram chana dal, heavily demanded by halwais, sweet manufacturers, and besan processing units.',
      origin: 'Bikaner & Bundelkhand'
    },
    {
      id: 'prod-dal-3',
      name: 'Moong Dal Dhuli (Skinless Yellow)',
      category: 'Pulses',
      tag: 'Fast Cooking',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      rate: 9800,
      unit: 'Quintal',
      hsn: '0713',
      moisture: '10.5% Max',
      purity: '99.5% Sortex',
      moq: '10 Quintal',
      packaging: '30kg Bags',
      description: 'Machine de-husked, double water polished yellow moong dal with fast cooking time and light digestibility.',
      origin: 'Rajasthan Mandis'
    },
    {
      id: 'prod-oil-1',
      name: 'Black Mustard Seeds (Kali Sarson)',
      category: 'Oilseeds',
      tag: 'High Oil Content (42%)',
      image: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80',
      rate: 6100,
      unit: 'Quintal',
      hsn: '1207',
      moisture: '8% Max',
      purity: '98.5% Machine Clean',
      moq: '20 Quintal',
      packaging: '50kg Jute Bags',
      description: 'Cleaned black mustard seeds with high pungency and guaranteed 40-42% oil extraction ratio for expellers and spice traders.',
      origin: 'Bharatpur & Alwar'
    },
    {
      id: 'prod-feed-1',
      name: 'Dried Yellow Maize (Makka)',
      category: 'Grains',
      tag: 'Feed & Starch Grade',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
      rate: 2350,
      unit: 'Quintal',
      hsn: '1005',
      moisture: '13% Max',
      purity: '98% Clean',
      moq: '100 Quintal',
      packaging: '50kg Loose / Bagged',
      description: 'Sun-dried yellow corn maize with low aflatoxin levels, widely supplied to poultry feed manufacturers and starch plants.',
      origin: 'Bihar Koshi Belt'
    }
  ];

  const categories = ['All', 'Wheat', 'Rice', 'Pulses', 'Oilseeds', 'Grains'];

  const filteredItems = detailedCommodities.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const handleWhatsAppRate = (item) => {
    const text = encodeURIComponent(
      `Hello Abhay Traders,\n\nI want today's wholesale rate for *${item.name}* (${item.tag}).\n` +
      `Current Listed Rate: ${formatINR(item.rate)} / ${item.unit}\n` +
      `MOQ: ${item.moq}\n\n` +
      `Please provide truckload quotation and dispatch availability to our mandi.`
    );
    window.open(`https://wa.me/919628727269?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center space-y-3 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-600/50">
              WHOLESALE COMMODITY SUPPLY
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Food Grains & Agro Commodities Catalog
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto">
              Direct mandi procurement of sortex-cleaned Wheat, aged Basmati Rice, unpolished Pulses, and Oilseeds with pan-India bulk delivery.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <FiSearch className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by grain name, quality tag, or description..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-300 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs sm:text-sm"
              />
            </div>

            {/* Category Pills */}
            <div className="md:col-span-6 flex flex-wrap gap-1.5 justify-start md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-emerald-800 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid with Ultra-Premium Hover Effects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500/80 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  <div className="absolute top-3.5 left-3.5">
                    <span className="bg-emerald-800/90 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5">
                    <span className="bg-white/95 backdrop-blur-md text-slate-900 font-mono font-bold text-xs px-2.5 py-1 rounded-xl shadow-md">
                      HSN: {item.hsn}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold block">
                      {item.category} • Origin: {item.origin}
                    </span>
                    <h3 className="text-lg font-black tracking-tight leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Quality Badges Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-medium text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-emerald-700 font-bold">Purity:</span>
                      <span>{item.purity}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-emerald-700 font-bold">Moisture:</span>
                      <span>{item.moisture}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-500 font-bold">Min Order:</span>
                      <span>{item.moq}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-500 font-bold">Pack:</span>
                      <span className="truncate">{item.packaging.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Wholesale Mandi Rate
                      </span>
                      <div className="font-mono font-black text-xl text-slate-900">
                        {formatINR(item.rate)}
                        <span className="text-xs text-slate-500 font-medium font-sans"> / {item.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleWhatsAppRate(item)}
                        className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition shadow-xs cursor-pointer"
                        title="Get Live WhatsApp Rate"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition cursor-pointer"
                      >
                        Book Lot
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mandi Quality Testing Standards Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-black text-xl text-slate-900">Mandi Lab Testing & Quality Benchmarks</h3>
                <p className="text-xs text-slate-500">Every dispatch lot is calibrated against Agmark & FSSAI standards.</p>
              </div>
              <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full">
                ISO Certified Sourcing
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Commodity</th>
                    <th className="p-3">HSN</th>
                    <th className="p-3">Moisture Limit</th>
                    <th className="p-3">Foreign Matter</th>
                    <th className="p-3">Damaged Kernels</th>
                    <th className="p-3">Standard Packaging</th>
                    <th className="p-3 text-right rounded-r-xl">Dispatch Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Sharbati Wheat (Gehu)</td>
                    <td className="p-3 font-mono">1001</td>
                    <td className="p-3">≤ 11.5%</td>
                    <td className="p-3">≤ 0.5% (Sortex)</td>
                    <td className="p-3">≤ 1.0%</td>
                    <td className="p-3">50kg New Jute/PP</td>
                    <td className="p-3 text-right font-mono text-emerald-700">Shankar Fleet FTL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">1121 Steam Basmati Rice</td>
                    <td className="p-3 font-mono">1006</td>
                    <td className="p-3">≤ 12.0%</td>
                    <td className="p-3">≤ 0.1%</td>
                    <td className="p-3">≤ 0.5%</td>
                    <td className="p-3">25kg / 50kg Bags</td>
                    <td className="p-3 text-right font-mono text-emerald-700">Shankar Fleet FTL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Desi Toor Dal (Unpolished)</td>
                    <td className="p-3 font-mono">0713</td>
                    <td className="p-3">≤ 10.0%</td>
                    <td className="p-3">≤ 0.2%</td>
                    <td className="p-3">≤ 1.0%</td>
                    <td className="p-3">30kg Poly Bags</td>
                    <td className="p-3 text-right font-mono text-emerald-700">Corridor Express</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-900">Black Mustard Seeds</td>
                    <td className="p-3 font-mono">1207</td>
                    <td className="p-3">≤ 8.0%</td>
                    <td className="p-3">≤ 1.5%</td>
                    <td className="p-3">≤ 1.5%</td>
                    <td className="p-3">50kg Jute Gunny</td>
                    <td className="p-3 text-right font-mono text-emerald-700">Expeller Lot Bulk</td>
                  </tr>
                </tbody>
              </table>
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
