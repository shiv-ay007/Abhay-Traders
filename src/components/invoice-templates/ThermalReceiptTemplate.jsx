import React from 'react';
import { formatINR, formatDate } from '../../utils/numberToWords';

export default function ThermalReceiptTemplate({ invoice, business }) {
  if (!invoice || !business) return null;

  return (
    <div className="printable-area bg-white text-black font-mono text-[11px] p-4 max-w-[320px] mx-auto border border-dashed border-slate-400 rounded print:border-none print:max-w-full print:p-0 leading-snug">
      {/* Center Header */}
      <div className="text-center pb-2 border-b border-dashed border-black space-y-0.5">
        <div className="font-bold text-sm uppercase">{business.name}</div>
        <div className="text-[10px]">{business.tagline}</div>
        <div className="text-[10px]">{business.billingAddress.split(',').slice(0, 3).join(',')}</div>
        <div>Ph: {business.phone}</div>
        <div className="font-bold">GSTIN: {business.gstNumber}</div>
      </div>

      {/* Invoice Meta */}
      <div className="py-2 border-b border-dashed border-black space-y-0.5 text-[10px]">
        <div className="flex justify-between">
          <span>Bill No: {invoice.invoiceNumber}</span>
          <span>{formatDate(invoice.invoiceDate)}</span>
        </div>
        <div>Customer: {invoice.partyName}</div>
        {invoice.partyPhone && <div>Mobile: {invoice.partyPhone}</div>}
        {invoice.partyGst && <div>Cust GST: {invoice.partyGst}</div>}
      </div>

      {/* Items list */}
      <div className="py-2 border-b border-dashed border-black">
        <div className="flex justify-between font-bold pb-1 text-[10px]">
          <span className="w-1/2">Item</span>
          <span className="w-1/4 text-center">Qty</span>
          <span className="w-1/4 text-right">Amt</span>
        </div>
        {invoice.items && invoice.items.map((item, idx) => (
          <div key={idx} className="flex justify-between py-0.5 text-[10px]">
            <span className="w-1/2 truncate">{item.name}</span>
            <span className="w-1/4 text-center">{item.quantity} {item.unit}</span>
            <span className="w-1/4 text-right">₹{item.total}</span>
          </div>
        ))}
      </div>

      {/* Calculation */}
      <div className="py-2 border-b border-dashed border-black space-y-0.5 text-[10px]">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatINR(invoice.subtotal)}</span>
        </div>
        {invoice.cgstTotal > 0 && (
          <div className="flex justify-between">
            <span>CGST + SGST:</span>
            <span>{formatINR(invoice.cgstTotal + invoice.sgstTotal)}</span>
          </div>
        )}
        <div className="flex justify-between text-xs font-bold pt-1 border-t border-dotted border-black">
          <span>GRAND TOTAL:</span>
          <span>{formatINR(invoice.grandTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Paid Via:</span>
          <span>{invoice.paymentMode || 'Cash'}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-2 text-[9px] space-y-0.5">
        <div>UPI: {business.upiId}</div>
        <div>Thank you for your visit!</div>
        <div>Computer Generated Thermal Slip</div>
      </div>
    </div>
  );
}
