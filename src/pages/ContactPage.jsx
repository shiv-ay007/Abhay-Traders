import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuoteModal from '../components/common/QuoteModal';
import BusinessSwitcherModal from '../components/common/BusinessSwitcherModal';
import { useBusiness } from '../context/BusinessContext';
import { BusinessLogoRenderer } from '../components/common/BusinessLogos';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiShield, FiCreditCard } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const { activeBusiness } = useBusiness();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: 'Retailer / Wholesaler',
    commodity: 'Wheat (Gehu) Sharbati',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number');
      return;
    }
    toast.success(`Thank you ${formData.name}! Our sales desk will contact you on ${formData.phone} shortly.`, {
      duration: 5000,
      icon: '📞'
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      businessType: 'Retailer / Wholesaler',
      commodity: 'Wheat (Gehu) Sharbati',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
      />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-18 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-3 relative z-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/40">
              DIRECT MANDI DESK & DEPOTS
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Contact Abhay Traders Group
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Connect directly with our commodity traders, flour milling managers, and logistics fleet operators for instant quotes and contract bookings.
            </p>
          </div>
        </section>

        {/* 2 Locations & Contact Details Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Locations Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Prayagraj Head Office (From Screenshot 2) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4 hover:border-emerald-500 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <BusinessLogoRenderer businessId="abhay-traders" className="w-12 h-12" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                      Head Office & Grain Depot
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">M/S ABHAY TRADERS</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-mono">
                  <div className="flex items-start space-x-2">
                    <FiMapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Gharwan Ka Purwa, Dahiyawan, Soraon, Prayagraj, Uttar Pradesh - 212503</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-bold text-slate-900">GSTIN: 09AKCPL1208K1ZA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiPhone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Mobile: +91 9628727269</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiMail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>abhaytradersinfo@gmail.com</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <a
                    href="tel:9628727269"
                    className="flex-1 text-center py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                  >
                    Call Office
                  </a>
                  <a
                    href="https://wa.me/919628727269?text=Hello%20Abhay%20Traders,%20I%20have%20an%20enquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Rohtas Bihar Milling Depot (From Screenshot 3) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4 hover:border-amber-500 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <BusinessLogoRenderer businessId="shree-shankar-foods" className="w-12 h-12" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      Milling Plant & Processing Depot
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">SHREE SHANKAR FOODS</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 font-mono">
                  <div className="flex items-start space-x-2">
                    <FiMapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>Post Durgawati, P.S. Durgawati, Kulhariya Road, Khajura, Rohtas, Bihar - 821105</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="font-bold text-slate-900">GSTIN: 10FOAPS7195B1Z2 / 09FOAPS7195B1ZL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiPhone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Mobile: +91 9918406257</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiMail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>shreeshankarfoodsinfo@gmail.com</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <a
                    href="tel:9918406257"
                    className="flex-1 text-center py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                  >
                    Call Mill
                  </a>
                  <a
                    href="https://wa.me/919918406257?text=Hello%20Shree%20Shankar%20Foods"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Direct Sales & Mandi Desk Inquiry</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Send your requirements to receive wholesale rate quotations and dispatch estimates.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar Agrawal"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Profile</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option>Retailer / Kirana Merchant</option>
                      <option>Wholesaler / Mandi Trader</option>
                      <option>Commercial Bakery / Food Processor</option>
                      <option>Catering / Hotel Chain</option>
                      <option>Cosmetic Store / Beauty Salon</option>
                      <option>Transporter / Fleet Hire</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Commodity / Service Required</label>
                    <select
                      value={formData.commodity}
                      onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option>Wheat (Gehu) Sharbati / Lokwan</option>
                      <option>1121 Steam Basmati Rice</option>
                      <option>Desi Toor & Chana Pulses</option>
                      <option>Shankar Chakki Fresh Atta & Maida</option>
                      <option>Pond's & Lakme Cosmetics Lot</option>
                      <option>Shankar Logistics Freight Truckload</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message / Specific Lot Quantity</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter expected tonnage, preferred delivery destination, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-lg transition cursor-pointer"
                >
                  <FiSend className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
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
