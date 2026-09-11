import React, { useState } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useBusiness } from '../../context/BusinessContext';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function QuoteModal({ isOpen, onClose }) {
  const { activeBusiness } = useBusiness();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    commodity: 'Wheat (Gehu) Sharbati',
    quantity: '100',
    unit: 'Quintal',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number');
      return;
    }

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    toast.success(`Quote request submitted! Our sales team will call ${formData.phone} shortly.`, {
      duration: 5000,
      icon: '🌾'
    });

    onClose();
  };

  const handleWhatsAppQuote = () => {
    if (!formData.name || !formData.phone) {
      toast.error('Please provide name and phone first');
      return;
    }

    const text = encodeURIComponent(
      `Hello ${activeBusiness.name} Team,\n\nI want a bulk quotation for:\n` +
      `📦 Product: ${formData.commodity}\n` +
      `⚖️ Quantity: ${formData.quantity} ${formData.unit}\n` +
      `📍 Delivery Location: ${formData.city || 'Not Specified'}\n` +
      `👤 Buyer Name: ${formData.name}\n` +
      `📞 Contact: ${formData.phone}\n` +
      (formData.message ? `📝 Notes: ${formData.message}\n` : '') +
      `\nPlease share best wholesale rates & dispatch time.`
    );

    window.open(`https://wa.me/${activeBusiness.whatsappNumber || '919628727269'}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-200">Wholesale & Bulk Supply</span>
            <h3 className="text-lg font-bold">Request Instant Quote</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700 transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Business *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Agrawal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Product / Commodity</label>
              <select
                value={formData.commodity}
                onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <optgroup label="Agro & Food Grains">
                  <option>Wheat (Gehu) Sharbati</option>
                  <option>1121 Steam Basmati Rice</option>
                  <option>Desi Toor Dal (Arhar)</option>
                  <option>Chana Dal Super Grade</option>
                  <option>Black Mustard Seeds (Sarson)</option>
                  <option>Yellow Maize / Corn</option>
                </optgroup>
                <optgroup label="Shree Shankar Foods Staples">
                  <option>Chakki Fresh Atta (25kg/50kg)</option>
                  <option>Superfine Maida</option>
                  <option>Pure Chana Besan</option>
                  <option>Granular Sooji / Rawa</option>
                </optgroup>
                <optgroup label="Beauty & Cosmetics">
                  <option>Pond's / Lakme Wholesale Lot</option>
                  <option>Nivea / Mamaearth Beauty Supplies</option>
                </optgroup>
                <optgroup label="Logistics & Supply">
                  <option>Bulk Grain Truckload (FTL)</option>
                  <option>Warehousing Storage Slot</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery City & State</label>
              <input
                type="text"
                placeholder="e.g. Prayagraj, Varanasi, Patna"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option>Quintal</option>
                <option>Tons</option>
                <option>Bag (25kg/50kg)</option>
                <option>Carton / Box</option>
                <option>Truckload</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Specifications</label>
            <textarea
              rows={2}
              placeholder="Any specific grain moisture, grade, packaging or timeline requirement..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
            >
              <FiSend className="w-4 h-4" />
              <span>Submit Enquiry</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppQuote}
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
            >
              <FaWhatsapp className="w-5 h-5 text-white" />
              <span>Instant WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
