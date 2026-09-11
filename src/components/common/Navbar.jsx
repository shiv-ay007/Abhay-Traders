import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBusiness } from '../../context/BusinessContext';
import { BusinessLogoRenderer } from './BusinessLogos';
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiPhoneCall,
  FiClock
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { TbFileInvoice, TbBuildingStore } from 'react-icons/tb';

export default function Navbar({ onOpenSwitcher }) {
  const { activeBusiness } = useBusiness();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Cosmetics', path: '/cosmetics' },
    { name: 'Shankar Foods', path: '/shankar-foods' },
    { name: 'Why Us', path: '/why-choose-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* Top micro bar with contact and mandi info */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left: GST & Phone */}
          <div className="flex items-center space-x-2.5 whitespace-nowrap">
            <div className="flex items-center space-x-1 font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-400">GST:</span>
              <span className="font-bold text-white bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700 text-[10px]">
                {activeBusiness.gstNumber}
              </span>
            </div>

            <span className="text-slate-700 hidden sm:inline">•</span>

            <a
              href={`tel:${activeBusiness.phone}`}
              className="hidden sm:flex items-center space-x-1 text-slate-300 hover:text-emerald-400 transition"
            >
              <FiPhoneCall className="w-3 h-3 text-emerald-400" />
              <span>+91 {activeBusiness.phone}</span>
            </a>
          </div>

          {/* Right: Mandi & WhatsApp */}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <span className="text-slate-400 hidden md:inline text-[10px]">
              {activeBusiness.billingAddress.split(',')[0]}, {activeBusiness.state}
            </span>

            <span className="text-slate-700 hidden md:inline">•</span>

            <a
              href={`https://wa.me/${activeBusiness.whatsappNumber || '919628727269'}?text=Hello%20${encodeURIComponent(activeBusiness.name)},%20I%20have%20an%20enquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition text-[11px] font-semibold"
            >
              <FaWhatsapp className="w-3 h-3" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Clean, compact, guaranteed no overflow) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Left Brand Identity */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <BusinessLogoRenderer
              businessId={activeBusiness.id}
              className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
            />
            <div className="text-left">
              <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight block leading-none group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                {activeBusiness.id === 'abhay-traders' ? 'Abhay Traders' : activeBusiness.brandName}
              </span>
              <span className="text-[10.5px] font-medium text-slate-500 tracking-tight block mt-0.5 whitespace-nowrap">
                {activeBusiness.id === 'abhay-traders' ? 'Grains Today, Better Tomorrow' : activeBusiness.category}
              </span>
            </div>
          </Link>

          {/* Center Nav Links (Ultra-compact, single-line, zero wrapping) */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 flex-shrink">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap relative ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50 font-bold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-emerald-600 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area: Switcher + Billing App Button */}
          <div className="hidden sm:flex items-center space-x-2 flex-shrink-0">
            {/* Compact Business Switcher Button */}
            <button
              onClick={onOpenSwitcher}
              className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-300 text-xs font-bold transition whitespace-nowrap cursor-pointer shadow-2xs"
              title="Click to switch between businesses"
            >
              <TbBuildingStore className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span className="truncate max-w-[105px] xl:max-w-[135px]">
                {activeBusiness.name.replace('M/S ', '')}
              </span>
              <FiChevronDown className="w-3 h-3 text-slate-500 flex-shrink-0" />
            </button>

            {/* Compact Billing App Button */}
            <Link
              to="/billing"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-2xs transition border border-amber-500/40 whitespace-nowrap cursor-pointer"
            >
              <TbFileInvoice className="w-3.5 h-3.5 text-slate-950" />
              <span>Billing</span>
            </Link>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex items-center space-x-1.5 lg:hidden">
            <button
              onClick={onOpenSwitcher}
              className="px-2 py-1 rounded-md text-[11px] font-bold text-slate-800 bg-slate-100 border border-slate-300 sm:hidden whitespace-nowrap flex items-center space-x-1"
            >
              <TbBuildingStore className="w-3 h-3 text-emerald-700" />
              <span>Switch</span>
            </button>

            <Link
              to="/billing"
              className="px-2 py-1 rounded-md text-[11px] font-bold text-slate-950 bg-amber-400 sm:hidden whitespace-nowrap"
            >
              Billing
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSwitcher();
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-between"
            >
              <span>Current: {activeBusiness.name}</span>
              <span className="text-emerald-700">Switch ↗</span>
            </button>

            <Link
              to="/billing"
              className="w-full py-2 text-center text-xs font-bold text-slate-950 bg-amber-400 rounded-lg shadow-sm"
            >
              Open Swipe Billing App 🚀
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
