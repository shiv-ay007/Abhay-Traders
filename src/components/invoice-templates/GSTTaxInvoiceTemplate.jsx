import React from 'react';
import { formatINR, formatDate } from '../../utils/numberToWords';
import { numberToWordsINR } from '../../utils/numberToWords';
import { BusinessLogoRenderer } from '../common/BusinessLogos';

export default function GSTTaxInvoiceTemplate({ invoice, business }) {
  if (!invoice || !business) return null;

  const isInterState = invoice.isInterState || (invoice.partyGst && invoice.partyGst.substring(0, 2) !== business.stateCode);

  return (
    <div className="printable-area bg-white text-slate-900 font-sans p-6 sm:p-8 max-w-4xl mx-auto border border-slate-300 shadow-lg rounded-xl print:shadow-none print:border-none print:p-2 text-xs">
      {/* Top Header Bar */}
      <div className="border-b-2 border-slate-900 pb-4 mb-4 flex items-start justify-between gap-4">
        {/* Left: Company Logo & Info (Matches Images 2 & 3) */}
        <div className="flex items-start space-x-4">
          <div className="print:w-16 print:h-16">
            <BusinessLogoRenderer businessId={business.id} className="w-16 h-16" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">
              {business.name}
            </h1>
            <p className="text-[11px] font-semibold text-slate-700 italic">
              {business.tagline}
            </p>
            <p className="text-[11px] text-slate-600 max-w-md mt-1 leading-snug">
              {business.billingAddress}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] font-medium text-slate-700 mt-1">
              <span><strong>Phone:</strong> {business.phone}</span>
              <span>•</span>
              <span><strong>Email:</strong> {business.email}</span>
            </div>
            <div className="mt-1.5 inline-block bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-xs font-mono font-bold text-slate-900">
              GSTIN: {business.gstNumber}
            </div>
          </div>
        </div>

        {/* Right: Invoice Label & Badge */}
        <div className="text-right flex-shrink-0">
          <div className="inline-block bg-slate-900 text-white font-black px-3 py-1 rounded text-sm uppercase tracking-widest print:bg-black">
            {invoice.invoiceType || 'TAX INVOICE'}
          </div>
          <div className="mt-2 space-y-1 font-mono text-xs">
            <div>
              <span className="text-slate-500 font-sans">Invoice No:</span>{' '}
              <strong className="text-slate-900 text-sm">{invoice.invoiceNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-sans">Date:</span>{' '}
              <strong>{formatDate(invoice.invoiceDate)}</strong>
            </div>
            {invoice.dueDate && (
              <div>
                <span className="text-slate-500 font-sans">Due Date:</span>{' '}
                <strong>{formatDate(invoice.dueDate)}</strong>
              </div>
            )}
            <div>
              <span className="text-slate-500 font-sans">Place of Supply:</span>{' '}
              <span className="font-semibold">{invoice.placeOfSupply || business.state}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To & Ship To Grid */}
      <div className="grid grid-cols-2 gap-4 border border-slate-300 rounded-lg p-3.5 mb-4 bg-slate-50/50">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            BILLED TO (BUYER DETAILS)
          </span>
          <h4 className="font-bold text-sm text-slate-900">{invoice.partyName}</h4>
          <p className="text-slate-600 leading-snug mt-0.5 whitespace-pre-line">
            {invoice.billingAddress || 'Local Cash Sale'}
          </p>
          <div className="mt-1 space-y-0.5 text-slate-700">
            {invoice.partyPhone && <div><strong>Mobile:</strong> {invoice.partyPhone}</div>}
            {invoice.partyGst ? (
              <div className="font-mono font-bold text-slate-900">
                <strong>GSTIN:</strong> {invoice.partyGst}
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic">Unregistered Consumer (B2C)</div>
            )}
          </div>
        </div>

        <div className="border-l border-slate-300 pl-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            SHIPPED TO (DELIVERY ADDRESS)
          </span>
          <h4 className="font-bold text-sm text-slate-900">{invoice.partyName}</h4>
          <p className="text-slate-600 leading-snug mt-0.5">
            {invoice.shippingAddress || invoice.billingAddress || 'Same as Billing Address'}
          </p>
          <div className="mt-1 text-slate-700">
            <div><strong>Dispatch Mode:</strong> {business.id === 'shankar-logistics' ? 'Own Fleet' : 'Shankar Logistics / Road'}</div>
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="overflow-x-auto border border-slate-300 rounded-lg mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 text-[11px] uppercase font-bold">
              <th className="p-2 text-center w-8">#</th>
              <th className="p-2">Item Description</th>
              <th className="p-2 text-center">HSN</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Unit</th>
              <th className="p-2 text-right">Rate (₹)</th>
              <th className="p-2 text-right">Disc %</th>
              <th className="p-2 text-right">Taxable</th>
              <th className="p-2 text-center">GST</th>
              <th className="p-2 text-right">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {invoice.items && invoice.items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70">
                <td className="p-2 text-center font-mono text-slate-500">{idx + 1}</td>
                <td className="p-2 font-semibold text-slate-900">
                  {item.name}
                </td>
                <td className="p-2 text-center font-mono text-slate-600">{item.hsn || '-'}</td>
                <td className="p-2 text-center font-bold font-mono">{item.quantity}</td>
                <td className="p-2 text-center text-slate-600">{item.unit || 'Nos'}</td>
                <td className="p-2 text-right font-mono">{formatINR(item.rate).replace('₹', '')}</td>
                <td className="p-2 text-right font-mono text-slate-600">{item.discountPercent || 0}%</td>
                <td className="p-2 text-right font-mono font-medium">{formatINR(item.taxableAmount).replace('₹', '')}</td>
                <td className="p-2 text-center font-mono">{item.gstRate || 0}%</td>
                <td className="p-2 text-right font-bold font-mono text-slate-950">
                  {formatINR(item.total).replace('₹', '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tax & Total Calculation Section */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
        {/* Left: Amount in Words, Bank Details, UPI QR */}
        <div className="sm:col-span-7 space-y-3">
          {/* Amount In Words */}
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Amount in Words:</span>
            <p className="font-bold text-slate-900 italic text-[11px] mt-0.5">
              {numberToWordsINR(invoice.grandTotal)}
            </p>
          </div>

          {/* Bank & Payment Details */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Bank Details for NEFT / RTGS / IMPS
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-slate-800">
              <div>Bank: <strong className="font-sans">{business.bankName}</strong></div>
              <div>A/C No: <strong>{business.accountNumber}</strong></div>
              <div>IFSC: <strong>{business.ifscCode}</strong></div>
              <div>Branch: <strong className="font-sans">{business.branch}</strong></div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-500">UPI ID:</span>{' '}
                <strong className="font-mono text-emerald-800">{business.upiId}</strong>
              </div>
              <div className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Scan & Pay Accepted
              </div>
            </div>
          </div>
        </div>

        {/* Right: Subtotal & Tax Breakdown */}
        <div className="sm:col-span-5 bg-slate-50/70 p-3 rounded-lg border border-slate-200">
          <div className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-slate-600">
              <span className="font-sans">Subtotal (Taxable):</span>
              <span>{formatINR(invoice.subtotal)}</span>
            </div>

            {invoice.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span className="font-sans">Total Discount:</span>
                <span>- {formatINR(invoice.totalDiscount)}</span>
              </div>
            )}

            {/* Split CGST + SGST vs IGST */}
            {!isInterState ? (
              <>
                <div className="flex justify-between text-slate-600">
                  <span className="font-sans">CGST:</span>
                  <span>{formatINR(invoice.cgstTotal || 0)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-sans">SGST:</span>
                  <span>{formatINR(invoice.sgstTotal || 0)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-slate-600">
                <span className="font-sans">IGST (Inter-State):</span>
                <span>{formatINR(invoice.igstTotal || (invoice.cgstTotal + invoice.sgstTotal) || 0)}</span>
              </div>
            )}

            {invoice.roundOff !== 0 && (
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span className="font-sans">Round Off:</span>
                <span>{invoice.roundOff > 0 ? `+${invoice.roundOff}` : invoice.roundOff}</span>
              </div>
            )}

            <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-center text-sm font-black text-slate-950">
              <span className="font-sans">Grand Total:</span>
              <span className="text-base font-extrabold text-emerald-800">
                {formatINR(invoice.grandTotal)}
              </span>
            </div>

            <div className="pt-1 text-right">
              <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                invoice.paymentStatus === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                Status: {invoice.paymentStatus || 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Signatures */}
      <div className="pt-3 border-t border-slate-300 grid grid-cols-2 gap-6 items-end">
        <div className="text-[10px] text-slate-600 space-y-1">
          <strong className="text-slate-800 block">Terms & Conditions:</strong>
          <p className="whitespace-pre-line leading-tight">
            {invoice.terms || business.terms || '1. Goods once sold will not be taken back.\n2. Payment strictly as per credit agreement.\n3. Subject to jurisdiction.'}
          </p>
        </div>

        <div className="text-right space-y-8">
          <p className="text-[11px] font-bold text-slate-900">
            For {business.name}
          </p>
          <div className="pt-6 border-t border-dashed border-slate-400 inline-block text-[10px] text-slate-600">
            Authorized Signatory
          </div>
        </div>
      </div>
    </div>
  );
}
