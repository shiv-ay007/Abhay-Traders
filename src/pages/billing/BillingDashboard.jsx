import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { BusinessLogoRenderer } from '../../components/common/BusinessLogos';
import { formatINR, formatDate } from '../../utils/numberToWords';
import {
  FiPlus,
  FiFileText,
  FiTrendingUp,
  FiAlertCircle,
  FiUsers,
  FiBox,
  FiShare2,
  FiPrinter,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiSettings
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AddProductModal from '../../components/billing/AddProductModal';
import AddPartyModal from '../../components/billing/AddPartyModal';
import { Link } from 'react-router-dom';

export default function BillingDashboard({ onOpenCreateInvoice, onViewInvoice, onOpenSwitcher }) {
  const { activeBusiness, businesses, setActiveBusinessId, businessInvoices, businessProducts, parties, businessStats } = useBusiness();

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddPartyOpen, setIsAddPartyOpen] = useState(false);

  // Recent invoices for active business
  const recentInvoices = businessInvoices.slice(0, 5);

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
  };

  return (
    <div className="space-y-6">
      {/* GimBooks Style Company Profile Card (Matching Image 4) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <BusinessLogoRenderer businessId={activeBusiness.id} className="w-16 h-16 rounded-2xl flex-shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {activeBusiness.name}
                </h2>
                <span className="bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-md">
                  {activeBusiness.gstNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                {activeBusiness.billingAddress}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                <span><strong>Mobile:</strong> {activeBusiness.phone}</span>
                <span>•</span>
                <span><strong>Email:</strong> {activeBusiness.email}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold font-mono">UPI: {activeBusiness.upiId}</span>
              </div>
            </div>
          </div>

          {/* Quick Share & Switch Buttons */}
          <div className="flex flex-wrap sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
            <button
              onClick={handleShareDetails}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition border border-slate-300 shadow-2xs"
            >
              <FiShare2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Share Details</span>
            </button>
            <button
              onClick={onOpenSwitcher}
              className="flex-1 sm:flex-initial text-xs text-emerald-700 hover:underline font-semibold"
            >
              Switch Business (4 available) ↗
            </button>
          </div>
        </div>

        {/* 4 Multi-tenant Business Switch Pills */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex-shrink-0">
            Switch Business:
          </span>
          {businesses.map((biz) => {
            const isCurrent = biz.id === activeBusiness.id;
            return (
              <button
                key={biz.id}
                onClick={() => setActiveBusinessId(biz.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition border ${
                  isCurrent
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{biz.name}</span>
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invoiced Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Billed Sales</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FiTrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {formatINR(businessStats.totalSales)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Collected: {formatINR(businessStats.paidSales)}</span>
            <span className="text-emerald-700 font-semibold">100% Tax Compliant</span>
          </div>
        </div>

        {/* Pending Udhar / Receivables */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Udhar (Baki)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <FiClock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-amber-900 font-mono">
              {formatINR(businessStats.pendingUdhar)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Awaiting Payment</span>
            <Link to="/billing/parties" className="text-amber-800 font-bold hover:underline">
              Send Reminders →
            </Link>
          </div>
        </div>

        {/* Total Invoices Count */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">GST Bills Issued</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <FiFileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {businessStats.totalInvoices} Invoices
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Prefix: {activeBusiness.invoicePrefix}</span>
            <button onClick={onOpenCreateInvoice} className="text-blue-700 font-bold hover:underline">
              + New Bill
            </button>
          </div>
        </div>

        {/* Active Products & Low Stock */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Catalog Items</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <FiBox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {businessStats.totalProducts} Items
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            {businessStats.lowStockCount > 0 ? (
              <span className="text-rose-600 font-bold flex items-center space-x-1">
                <FiAlertCircle className="w-3.5 h-3.5" />
                <span>{businessStats.lowStockCount} Low Stock</span>
              </span>
            ) : (
              <span className="text-emerald-600 font-medium">Stock Healthy</span>
            )}
            <button onClick={() => setIsAddProductOpen(true)} className="text-purple-700 font-bold hover:underline">
              + Add Item
            </button>
          </div>
        </div>
      </div>

      {/* GimBooks 2.0 Quick Actions Bar (Matches Image 4 features) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Quick Swipe Billing Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={onOpenCreateInvoice}
            className="p-4 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl text-left transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
              <FiPlus className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Create Tax Bill</div>
            <div className="text-[11px] text-slate-500">Auto GST & HSN calculation</div>
          </button>

          <button
            onClick={() => setIsAddProductOpen(true)}
            className="p-4 bg-purple-50 hover:bg-purple-100/80 border border-purple-200 rounded-xl text-left transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
              <FiBox className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Add Product</div>
            <div className="text-[11px] text-slate-500">Grain, Pulses, Cosmetics</div>
          </button>

          <button
            onClick={() => setIsAddPartyOpen(true)}
            className="p-4 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 rounded-xl text-left transition group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
              <FiUsers className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Add Customer</div>
            <div className="text-[11px] text-slate-500">Save party in Khata ledger</div>
          </button>

          <Link
            to="/billing/settings"
            className="p-4 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-xl text-left transition group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition">
              <FiSettings className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Company Settings</div>
            <div className="text-[11px] text-slate-500">GST, Bank, UPI & Sign</div>
          </Link>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">Recent Invoices for {activeBusiness.name}</h3>
            <p className="text-xs text-slate-500">View, print A4/thermal bill, or share directly via WhatsApp</p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/billing/invoices"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
            >
              View All Invoices ({businessInvoices.length}) →
            </Link>
            <button
              onClick={onOpenCreateInvoice}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-2xs transition"
            >
              + Create Bill
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Invoice No</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Billed Party</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInvoices.length > 0 ? (
                recentInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-bold font-mono text-slate-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {formatDate(inv.invoiceDate)}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900">{inv.partyName}</div>
                      {inv.partyGst && <div className="text-[10px] font-mono text-slate-400">{inv.partyGst}</div>}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {inv.invoiceType}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-black font-mono text-slate-900 text-sm">
                      {formatINR(inv.grandTotal)}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        inv.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inv.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onViewInvoice(inv)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
                          title="View / Print Bill"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <a
                          href={`https://wa.me/${inv.partyPhone ? `91${inv.partyPhone.replace(/[^0-9]/g, '')}` : ''}?text=Invoice%20${inv.invoiceNumber}%20Total%20${formatINR(inv.grandTotal)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 transition"
                          title="Share on WhatsApp"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    No invoices generated yet for this business. Click "+ Create Tax Bill" to begin!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modals */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />

      <AddPartyModal
        isOpen={isAddPartyOpen}
        onClose={() => setIsAddPartyOpen(false)}
      />
    </div>
  );
}
