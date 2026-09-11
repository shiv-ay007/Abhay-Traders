import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { formatINR, formatDate } from '../../utils/numberToWords';
import { FiSearch, FiFilter, FiPlus, FiPrinter, FiEye, FiTrash2, FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function InvoicesPage({ onOpenCreateInvoice, onViewInvoice }) {
  const { invoices, activeBusiness, businesses, deleteInvoice } = useBusiness();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBusiness, setFilterBusiness] = useState(activeBusiness.id);
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchBiz = filterBusiness === 'all' || inv.businessId === filterBusiness;
    const matchStatus = filterStatus === 'All' || inv.paymentStatus === filterStatus;
    const query = searchQuery.toLowerCase();
    const matchQuery = !searchQuery ||
      inv.invoiceNumber.toLowerCase().includes(query) ||
      inv.partyName.toLowerCase().includes(query) ||
      (inv.partyPhone && inv.partyPhone.includes(query)) ||
      (inv.partyGst && inv.partyGst.toLowerCase().includes(query));

    return matchBiz && matchStatus && matchQuery;
  });

  const handleDelete = (id, invNum) => {
    if (window.confirm(`Are you sure you want to delete invoice ${invNum}?`)) {
      deleteInvoice(id);
    }
  };

  const handleWhatsApp = (inv) => {
    const invBiz = businesses.find(b => b.id === inv.businessId) || activeBusiness;
    const phone = inv.partyPhone ? inv.partyPhone.replace(/[^0-9]/g, '') : '';
    const text = encodeURIComponent(
      `Hello ${inv.partyName},\n\n` +
      `Here is your GST invoice details from *${invBiz.name}*:\n` +
      `📄 Invoice No: ${inv.invoiceNumber}\n` +
      `📅 Date: ${inv.invoiceDate}\n` +
      `💰 Grand Total: ${formatINR(inv.grandTotal)}\n` +
      `💳 Status: ${inv.paymentStatus}\n` +
      `🏢 GSTIN: ${invBiz.gstNumber}\n\n` +
      `UPI ID for payment: ${invBiz.upiId}\n` +
      `Thank you!`
    );
    window.open(`https://wa.me/${phone ? `91${phone}` : ''}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">GST Invoices & Bills</h2>
          <p className="text-xs text-slate-500">Manage, print and share sales bills across your businesses</p>
        </div>

        <button
          onClick={onOpenCreateInvoice}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>+ Create New Bill</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        {/* Search */}
        <div className="sm:col-span-5 relative">
          <FiSearch className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by invoice #, customer name, mobile or GST..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Business Filter */}
        <div className="sm:col-span-4">
          <select
            value={filterBusiness}
            onChange={(e) => setFilterBusiness(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-700"
          >
            <option value="all">All 4 Businesses (Consolidated)</option>
            {businesses.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-700"
          >
            <option value="All">All Payment Status</option>
            <option value="Paid">Paid Only</option>
            <option value="Pending">Pending / Udhar</option>
            <option value="Partial">Partial Payment</option>
          </select>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Business</th>
                <th className="p-3.5">Customer / Party</th>
                <th className="p-3.5">Doc Type</th>
                <th className="p-3.5 text-right">Taxable</th>
                <th className="p-3.5 text-right">Total Amount</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => {
                  const invBiz = businesses.find(b => b.id === inv.businessId);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 font-bold font-mono text-slate-900">
                        {inv.invoiceNumber}
                      </td>
                      <td className="p-3.5 text-slate-500 whitespace-nowrap">
                        {formatDate(inv.invoiceDate)}
                      </td>
                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 line-clamp-1">
                          {invBiz ? invBiz.name : inv.businessId}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{inv.partyName}</div>
                        {inv.partyPhone && (
                          <div className="text-[11px] text-slate-400 font-mono">{inv.partyPhone}</div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                          {inv.invoiceType || 'Tax Invoice'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-600">
                        {formatINR(inv.subtotal)}
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
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => onViewInvoice(inv)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition"
                            title="View / Print Invoice"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleWhatsApp(inv)}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 transition"
                            title="Share on WhatsApp"
                          >
                            <FaWhatsapp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(inv.id, inv.invoiceNumber)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition"
                            title="Delete Invoice"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-400">
                    No invoices found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
