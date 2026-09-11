import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { BusinessLogoRenderer } from './BusinessLogos';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenQuote, onOpenSwitcher }) {
  const { activeBusiness, businesses } = useBusiness();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Pre-footer Call to Action (Matches Image 1 "Let's Grow Together") */}
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Let's <span className="text-emerald-400">Grow Together</span>
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Whether you need food grains in bulk, flour milling staples, or genuine cosmetic supplies, Abhay Traders is always here to serve you.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-900/30 transition cursor-pointer"
            >
              Get a Quote →
            </button>
            <a
              href={`https://wa.me/${activeBusiness.whatsappNumber || '919628727269'}?text=Hello%20Abhay%20Traders`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition flex items-center space-x-2"
            >
              <FaWhatsapp className="text-emerald-400 w-4 h-4" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <BusinessLogoRenderer businessId={activeBusiness.id} className="w-12 h-12" />
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">Abhay Traders</h4>
                <p className="text-xs text-emerald-400 font-medium">Grains Today, Better Tomorrow</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Leading wholesale supplier of premium Wheat, Basmati Rice, Pulses, FMCG Cosmetics, and Food Milling products with trusted Pan-India supply networks.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <FiPhone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>+91 9628727269 / +91 9918406257</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>abhaytradersinfo@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <FiMapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Dahiyawan, Soraon, Prayagraj, UP 212503 & Rohtas, Bihar 821105</span>
              </div>
            </div>
          </div>

          {/* Col 2: Our 4 Businesses */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Our 4 Businesses</h5>
            <ul className="space-y-2 text-xs">
              {businesses.map((biz) => (
                <li key={biz.id}>
                  <button
                    onClick={onOpenSwitcher}
                    className="hover:text-emerald-400 transition text-left"
                  >
                    • {biz.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Quick Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-emerald-400 transition">About Our Group</Link></li>
              <li><Link to="/products" className="hover:text-emerald-400 transition">Grains & Agro Products</Link></li>
              <li><Link to="/cosmetics" className="hover:text-emerald-400 transition">Cosmetics & Beauty</Link></li>
              <li><Link to="/shankar-foods" className="hover:text-emerald-400 transition">Shree Shankar Foods</Link></li>
              <li><Link to="/why-choose-us" className="hover:text-emerald-400 transition">Why Choose Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition">Contact & Depots</Link></li>
              <li><Link to="/billing" className="text-amber-400 font-semibold hover:text-amber-300">GST Billing ERP →</Link></li>
            </ul>
          </div>

          {/* Col 4: Wholesale Credentials */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Compliance & GST</h5>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Abhay Traders GSTIN:</span>
                <span className="font-mono text-emerald-400 font-bold">09AKCPL1208K1ZA</span>
              </div>
              <div>
                <span className="text-slate-500 block">Shree Shankar Foods GSTIN:</span>
                <span className="font-mono text-emerald-400 font-bold">10FOAPS7195B1Z2</span>
              </div>
              <div className="pt-1 text-[10px] text-slate-500">
                100% Tax Compliant • Registered under GST Council of India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Matches Image 1 footer) */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © 2026 Abhay Traders. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-slate-400">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <span>•</span>
            <Link to="/billing" className="hover:text-emerald-400 transition">Billing Portal</Link>
          </div>

          {/* Social Icons matching Image 1 */}
          <div className="flex items-center space-x-3">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition">
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition">
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition">
              <FaYoutube className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center transition">
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://wa.me/${activeBusiness.whatsappNumber || '919628727269'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition shadow"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
