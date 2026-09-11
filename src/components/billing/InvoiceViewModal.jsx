import React, { useState } from 'react';
import GSTTaxInvoiceTemplate from '../invoice-templates/GSTTaxInvoiceTemplate';
import ThermalReceiptTemplate from '../invoice-templates/ThermalReceiptTemplate';
import { FiPrinter, FiDownload, FiX, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useBusiness } from '../../context/BusinessContext';
import { formatINR } from '../../utils/numberToWords';
import toast from 'react-hot-toast';

export default function InvoiceViewModal({ isOpen, onClose, invoice }) {
  const { businesses } = useBusiness();
  const [template, setTemplate] = useState('gst'); // 'gst' or 'thermal'

  if (!isOpen || !invoice) return null;

  const invoiceBusiness = businesses.find(b => b.id === invoice.businessId) || businesses[0];

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const phone = invoice.partyPhone ? invoice.partyPhone.replace(/[^0-9]/g, '') : '';
    const itemsList = invoice.items.map(it => `• ${it.name} (${it.quantity} ${it.unit}) - ₹${it.total}`).join('\n');

    const msg = encodeURIComponent(
      `*INVOICE FROM ${invoiceBusiness.name}*\n` +
      `--------------------------------\n` +
      `📄 *Invoice No:* ${invoice.invoiceNumber}\n` +
      `📅 *Date:* ${invoice.invoiceDate}\n` +
      `👤 *Billed To:* ${invoice.partyName}\n\n` +
      `*Items Summary:*\n${itemsList}\n\n` +
      `💰 *Grand Total:* ${formatINR(invoice.grandTotal)}\n` +
      `💳 *Status:* ${invoice.paymentStatus}\n` +
      `🏢 *GSTIN:* ${invoiceBusiness.gstNumber}\n` +
      `📲 *Pay via UPI:* ${invoiceBusiness.upiId}\n\n` +
      `Thank you for doing business with ${invoiceBusiness.name}!`
    );

    const targetUrl = phone ? `https://wa.me/91${phone}?text=${msg}` : `https://wa.me/?text=${msg}`;
    window.open(targetUrl, '_blank');
    toast.success('WhatsApp Invoice sharing opened!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-100 rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[95vh]">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 text-white gap-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-base sm:text-lg">Invoice: {invoice.invoiceNumber}</span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
              invoice.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {invoice.paymentStatus}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Template Selector */}
            <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700 flex text-xs">
              <button
                onClick={() => setTemplate('gst')}
                className={`px-3 py-1.5 rounded-md font-semibold transition ${
                  template === 'gst' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                A4 GST Tax Bill
              </button>
              <button
                onClick={() => setTemplate('thermal')}
                className={`px-3 py-1.5 rounded-md font-semibold transition ${
                  template === 'thermal' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                80mm POS Slip
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition cursor-pointer"
            >
              <FiPrinter className="w-3.5 h-3.5" />
              <span>Print Bill (Ctrl+P)</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow transition cursor-pointer"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-300" />
              <span>Send WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/60 print:bg-white print:p-0">
          {template === 'gst' ? (
            <GSTTaxInvoiceTemplate invoice={invoice} business={invoiceBusiness} />
          ) : (
            <ThermalReceiptTemplate invoice={invoice} business={invoiceBusiness} />
          )}
        </div>
      </div>
    </div>
  );
}
