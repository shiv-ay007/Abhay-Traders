import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const { activeBusiness } = useBusiness();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Bulk Wholesale Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter name and phone number');
      return;
    }
    toast.success('Your message has been sent to our sales desk. We will call you back shortly!');
    setFormData({ name: '', phone: '', email: '', subject: 'Bulk Wholesale Inquiry', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            CONNECT WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Get in <span className="text-emerald-700">Touch</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Visit our offices and godowns or connect with our wholesale trading desks for daily quotes and mandi updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-white border-b border-slate-800 pb-4">
              Registered Offices & Mandi Depots
            </h3>

            {/* Prayagraj UP Office (from Image 2) */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <FiMapPin className="w-4 h-4" />
                <span>Head Office (Prayagraj, UP)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                M/S ABHAY TRADERS<br />
                Gharwan Ka Purwa, Dahiyawan, Soraon,<br />
                Prayagraj, Uttar Pradesh - 212503<br />
                <span className="text-emerald-400 font-bold">GSTIN: 09AKCPL1208K1ZA</span>
              </p>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <FiPhone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Phone: +91 9628727269</span>
              </div>
            </div>

            {/* Rohtas Bihar Office (from Image 3) */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <FiMapPin className="w-4 h-4" />
                <span>Milling Plant (Rohtas, Bihar)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                SHREE SHANKAR FOODS<br />
                Post Durgawati, P.S. Durgawati, Kulhariya,<br />
                Khajura, Rohtas, Bihar - 821105<br />
                <span className="text-amber-400 font-bold">GSTIN: 10FOAPS7195B1Z2</span>
              </p>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <FiPhone className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone: +91 9918406257</span>
              </div>
            </div>

            {/* Support Hours */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <FiClock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mandi Hours: 8:00 AM – 8:00 PM</span>
              </div>
              <a
                href={`https://wa.me/${activeBusiness.whatsappNumber || '919628727269'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-semibold"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send Message / Business Query</h3>
            <p className="text-xs text-slate-500 mb-6">Fill in details to receive prompt callback and personalized rate cards.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>Bulk Wholesale Inquiry</option>
                    <option>Dealership / Distribution</option>
                    <option>Shree Shankar Foods Milling Supply</option>
                    <option>Cosmetics Wholesale Stock</option>
                    <option>Logistics & Transport Hire</option>
                    <option>Other Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Specify commodity requirement, expected tonnage, destination mandi..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <FiSend className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
