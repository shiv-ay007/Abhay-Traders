import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBusiness } from '../../context/BusinessContext';
import { BusinessLogoRenderer } from '../common/BusinessLogos';
import BusinessSwitcherModal from '../common/BusinessSwitcherModal';
import CreateInvoiceModal from './CreateInvoiceModal';
import InvoiceViewModal from './InvoiceViewModal';
import {
  FiHome,
  FiFileText,
  FiBox,
  FiUsers,
  FiSettings,
  FiPlus,
  FiArrowLeft,
  FiShare2,
  FiChevronDown,
  FiShield,
  FiPhone,
  FiMail,
  FiMapPin
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function BillingLayout({ children }) {
  const { activeBusiness, businesses } = useBusiness();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [selectedInvoiceToView, setSelectedInvoiceToView] = useState(null);

  const navItems = [
    { name: 'Dashboard', path: '/billing', icon: FiHome },
    { name: 'Invoices & Bills', path: '/billing/invoices', icon: FiFileText },
    { name: 'Inventory & Items', path: '/billing/inventory', icon: FiBox },
    { name: 'Parties & Khata', path: '/billing/parties', icon: FiUsers },
    { name: 'Company Settings', path: '/billing/settings', icon: FiSettings },
  ];

  const handleShareDetails = () => {
    const text = encodeURIComponent(
      `*${activeBusiness.name}*\n` +
      `GSTIN: ${activeBusiness.gstNumber}\n` +
      `Phone: ${activeBusiness.phone}\n` +
      `Email: ${activeBusiness.email}\n` +
      `Address: ${activeBusiness.billingAddress}\n` +
      `Bank: ${activeBusiness.bankName} | A/C: ${activeBusiness.accountNumber} | IFSC: ${activeBusiness.ifscCode}\n` +
      `UPI ID: ${activeBusiness.upiId}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    toast.success('Company details copied for sharing!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back to Public Website & Brand */}
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1 text-xs font-semibold"
                title="Back to Public Website"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Website</span>
              </Link>

              <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

              {/* Active Business Selector Dropdown */}
              <button
                onClick={() => setIsSwitcherOpen(true)}
                className="flex items-center space-x-2.5 bg-slate-850 hover:bg-slate-800 p-1.5 sm:px-3 rounded-xl border border-slate-700 transition"
              >
                <BusinessLogoRenderer businessId={activeBusiness.id} className="w-8 h-8 rounded-lg" />
                <div className="text-left">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-xs sm:text-sm text-white truncate max-w-[140px] sm:max-w-[200px]">
                      {activeBusiness.name}
                    </span>
                    <FiChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono block">
                    GST: {activeBusiness.gstNumber}
                  </span>
                </div>
              </button>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setIsCreateInvoiceOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
              >
                <FiPlus className="w-4 h-4" />
                <span>+ Create Bill</span>
              </button>

              <button
                onClick={handleShareDetails}
                className="hidden md:flex items-center space-x-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-250 text-xs font-medium rounded-xl border border-slate-700 transition"
                title="Share Company Profile"
              >
                <FiShare2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Share Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub Navigation Bar for Desktop */}
        <div className="bg-slate-850 border-t border-slate-800 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-4 overflow-x-auto py-2 scrollbar-none text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        {React.cloneElement(children, {
          onOpenCreateInvoice: () => setIsCreateInvoiceOpen(true),
          onViewInvoice: (inv) => setSelectedInvoiceToView(inv),
          onOpenSwitcher: () => setIsSwitcherOpen(true),
        })}
      </main>

      {/* Mobile Bottom Navigation Bar (Matches Image 4 GimBooks App) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg px-2 py-2 flex items-center justify-around text-[10px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-1.5 rounded-lg transition ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>

      {/* Modals */}
      <BusinessSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
      />

      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        onInvoiceCreated={(created) => {
          setSelectedInvoiceToView(created);
        }}
      />

      <InvoiceViewModal
        isOpen={Boolean(selectedInvoiceToView)}
        invoice={selectedInvoiceToView}
        onClose={() => setSelectedInvoiceToView(null)}
      />
    </div>
  );
}
