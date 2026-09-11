import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { formatINR } from '../../utils/numberToWords';
import { FiPlus, FiSearch, FiPhone, FiMapPin, FiCreditCard, FiTrash2, FiDollarSign } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import AddPartyModal from '../../components/billing/AddPartyModal';
import toast from 'react-hot-toast';

export default function PartiesPage() {
  const { parties, deleteParty, recordPartyPayment, activeBusiness } = useBusiness();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Record payment state
  const [paymentModalParty, setPaymentModalParty] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('UPI');

  const filtered = parties.filter(p => {
    const matchType = filterType === 'All' || p.partyType === filterType;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      p.name.toLowerCase().includes(q) ||
      (p.phone && p.phone.includes(q)) ||
      (p.gstNumber && p.gstNumber.toLowerCase().includes(q));

    return matchType && matchSearch;
  });

  const handleSendReminder = (party) => {
    if (!party.phone) {
      toast.error('No phone number saved for this party');
      return;
    }
    const phone = party.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Dear ${party.name},\n\n` +
      `This is a gentle payment reminder from *${activeBusiness.name}*.\n` +
      `Your outstanding balance in our Khata ledger is *${formatINR(party.balance)}*.\n\n` +
      `Kindly arrange the payment via UPI to: *${activeBusiness.upiId}* or Bank Transfer.\n` +
      `Account: ${activeBusiness.accountNumber} | IFSC: ${activeBusiness.ifscCode}\n\n` +
      `Thank you for your business!`
    );
    window.open(`https://wa.me/91${phone}?text=${text}`, '_blank');
    toast.success('WhatsApp payment reminder generated!');
  };

  const submitPayment = (e) => {
    e.preventDefault();
    if (!paymentModalParty || !paymentAmount) return;
    recordPartyPayment(paymentModalParty.id, paymentAmount, paymentMode);
    setPaymentModalParty(null);
    setPaymentAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Parties & Khata Ledger
          </h2>
          <p className="text-xs text-slate-500">
            Customer directory, supplier accounts, and outstanding credit (Udhar) management
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>+ Add Customer / Party</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
        <div className="sm:col-span-8 relative">
          <FiSearch className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search party by name, phone, or GSTIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-700"
          >
            <option value="All">All Parties (Customers & Vendors)</option>
            <option value="Customer">Customers Only (Buyers)</option>
            <option value="Supplier">Suppliers Only (Vendors/Farmers)</option>
          </select>
        </div>
      </div>

      {/* Parties Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Party / Business Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Contact & Phone</th>
                <th className="p-3.5">GST Number</th>
                <th className="p-3.5">Billing Location</th>
                <th className="p-3.5 text-right">Khata Balance</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((party) => {
                  const hasPending = party.balance > 0;
                  return (
                    <tr key={party.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 text-sm">{party.name}</div>
                        {party.contactPerson && (
                          <div className="text-[11px] text-slate-500">Contact: {party.contactPerson}</div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          party.partyType === 'Customer'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {party.partyType}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">
                        {party.phone ? (
                          <div className="flex items-center space-x-1">
                            <FiPhone className="w-3 h-3 text-slate-400" />
                            <span>{party.phone}</span>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">
                        {party.gstNumber ? (
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-semibold">{party.gstNumber}</span>
                        ) : (
                          <span className="text-slate-400 italic">Unregistered</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <div className="line-clamp-1 max-w-xs">{party.billingAddress || party.state}</div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className={`font-mono font-black text-sm ${hasPending ? 'text-amber-800' : 'text-emerald-800'}`}>
                          {formatINR(party.balance)}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {hasPending ? 'To Receive (Baki)' : 'Settled'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {hasPending && (
                            <>
                              <button
                                onClick={() => {
                                  setPaymentModalParty(party);
                                  setPaymentAmount(String(party.balance));
                                }}
                                className="px-2 py-1 rounded-md bg-emerald-100 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-[11px] transition shadow-2xs cursor-pointer"
                                title="Record payment received"
                              >
                                Record Pay
                              </button>

                              <button
                                onClick={() => handleSendReminder(party)}
                                className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 transition"
                                title="Send WhatsApp Payment Reminder"
                              >
                                <FaWhatsapp className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete party ${party.name}?`)) {
                                deleteParty(party.id);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition"
                            title="Delete Party"
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
                  <td colSpan="7" className="p-8 text-center text-slate-400">
                    No parties found. Click "+ Add Customer / Party" to add your first customer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {paymentModalParty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl space-y-4 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900">Record Payment Received</h3>
            <p className="text-xs text-slate-500">
              Customer: <strong>{paymentModalParty.name}</strong><br />
              Current Outstanding: <strong className="text-amber-700">{formatINR(paymentModalParty.balance)}</strong>
            </p>

            <form onSubmit={submitPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount Received (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option>UPI / QR Scan</option>
                  <option>Cash</option>
                  <option>Bank Transfer / NEFT</option>
                  <option>Cheque</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalParty(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg"
                >
                  Confirm Received
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AddPartyModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </div>
  );
}
