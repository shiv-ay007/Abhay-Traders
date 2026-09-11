import React, { useState, useEffect } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { formatINR, numberToWordsINR, getStateCodeFromGST } from '../../utils/numberToWords';
import { FiPlus, FiTrash2, FiX, FiCheck, FiUserPlus, FiPercent } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

export default function CreateInvoiceModal({ isOpen, onClose, onInvoiceCreated }) {
  const { activeBusiness, businessProducts, parties, addParty, addInvoice, getNextInvoiceNumber } = useBusiness();

  const [invoiceType, setInvoiceType] = useState('Tax Invoice');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  });

  // Customer / Party state
  const [selectedPartyId, setSelectedPartyId] = useState('');
  const [partyName, setPartyName] = useState('');
  const [partyPhone, setPartyPhone] = useState('');
  const [partyGst, setPartyGst] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isNewPartyMode, setIsNewPartyMode] = useState(false);

  // Line items state
  const [items, setItems] = useState([
    {
      productId: '',
      name: '',
      hsn: '',
      quantity: 1,
      unit: 'Quintal',
      rate: 0,
      discountPercent: 0,
      discountAmount: 0,
      taxableAmount: 0,
      gstRate: 5,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: 0
    }
  ]);

  // Payment & Terms
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [amountReceived, setAmountReceived] = useState(0);
  const [notes, setNotes] = useState('Thank you for your bulk business!');
  const [terms, setTerms] = useState(
    '1. Goods once sold will not be taken back.\n2. Interest @ 18% p.a. will be charged if payment is delayed beyond credit period.\n3. Subject to jurisdiction.'
  );

  // Initialize invoice number when modal opens
  useEffect(() => {
    if (isOpen) {
      setInvoiceNumber(getNextInvoiceNumber());
      // reset party if not selected
      if (!selectedPartyId && parties.length > 0) {
        handlePartySelect(parties[0].id);
      }
    }
  }, [isOpen, activeBusiness]);

  const handlePartySelect = (id) => {
    setSelectedPartyId(id);
    const p = parties.find(party => party.id === id);
    if (p) {
      setPartyName(p.name);
      setPartyPhone(p.phone || '');
      setPartyGst(p.gstNumber || '');
      setBillingAddress(p.billingAddress || '');
      setShippingAddress(p.shippingAddress || p.billingAddress || '');
      setIsNewPartyMode(false);
    }
  };

  // Check if inter-state based on GST state codes
  const partyStateCode = getStateCodeFromGST(partyGst);
  const isInterState = Boolean(partyStateCode && partyStateCode !== activeBusiness.stateCode);

  // Handle Item row updates
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };

    // If product was selected from dropdown
    if (field === 'productId') {
      const prod = businessProducts.find(p => p.id === value);
      if (prod) {
        item.name = prod.name;
        item.hsn = prod.hsn || '';
        item.rate = Number(prod.sellingPrice) || 0;
        item.unit = prod.unit || 'Quintal';
        item.gstRate = Number(prod.gstRate) || 0;
      }
    }

    // Recalculate math for this line
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discPct = Number(item.discountPercent) || 0;
    const gstPct = Number(item.gstRate) || 0;

    const gross = qty * rate;
    const discAmt = (gross * discPct) / 100;
    const taxable = Math.max(0, gross - discAmt);
    const taxAmt = (taxable * gstPct) / 100;

    item.discountAmount = discAmt;
    item.taxableAmount = taxable;

    if (isInterState) {
      item.cgst = 0;
      item.sgst = 0;
      item.igst = taxAmt;
    } else {
      item.cgst = taxAmt / 2;
      item.sgst = taxAmt / 2;
      item.igst = 0;
    }

    item.total = Math.round((taxable + taxAmt) * 100) / 100;
    updated[index] = item;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([
      ...items,
      {
        productId: '',
        name: '',
        hsn: '',
        quantity: 1,
        unit: activeBusiness.id === 'abhay-cosmetics' ? 'Box' : 'Bag',
        rate: 0,
        discountPercent: 0,
        discountAmount: 0,
        taxableAmount: 0,
        gstRate: 5,
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: 0
      }
    ]);
  };

  const removeItemRow = (index) => {
    if (items.length <= 1) {
      toast.error('Invoice must have at least 1 item');
      return;
    }
    setItems(items.filter((_, idx) => idx !== index));
  };

  // Grand totals computation
  const subtotal = items.reduce((acc, it) => acc + (Number(it.taxableAmount) || 0), 0);
  const totalDiscount = items.reduce((acc, it) => acc + (Number(it.discountAmount) || 0), 0);
  const cgstTotal = items.reduce((acc, it) => acc + (Number(it.cgst) || 0), 0);
  const sgstTotal = items.reduce((acc, it) => acc + (Number(it.sgst) || 0), 0);
  const igstTotal = items.reduce((acc, it) => acc + (Number(it.igst) || 0), 0);
  const rawTotal = subtotal + cgstTotal + sgstTotal + igstTotal;
  const grandTotal = Math.round(rawTotal);
  const roundOff = Math.round((grandTotal - rawTotal) * 100) / 100;

  const handleSaveInvoice = (e) => {
    e.preventDefault();

    if (!partyName) {
      toast.error('Please enter customer/party name');
      return;
    }

    if (items.some(it => !it.name || it.rate <= 0)) {
      toast.error('Please specify valid name and rate for all items');
      return;
    }

    // If new party, save to parties ledger
    let finalPartyId = selectedPartyId;
    if (isNewPartyMode || !selectedPartyId) {
      const createdParty = addParty({
        name: partyName,
        phone: partyPhone,
        gstNumber: partyGst,
        billingAddress,
        shippingAddress,
        partyType: 'Customer',
        state: isInterState ? 'Other' : activeBusiness.state,
        stateCode: partyStateCode || activeBusiness.stateCode,
        balance: 0
      });
      finalPartyId = createdParty.id;
    }

    const newInvoiceObj = {
      invoiceNumber,
      businessId: activeBusiness.id,
      invoiceType,
      invoiceDate,
      dueDate,
      partyId: finalPartyId,
      partyName,
      partyGst,
      partyPhone,
      billingAddress,
      shippingAddress,
      placeOfSupply: partyStateCode ? `${partyStateCode}-State` : activeBusiness.state,
      isInterState,
      items,
      subtotal,
      totalDiscount,
      cgstTotal,
      sgstTotal,
      igstTotal,
      roundOff,
      grandTotal,
      paymentStatus,
      paymentMode,
      amountReceived: paymentStatus === 'Paid' ? grandTotal : (Number(amountReceived) || 0),
      notes,
      terms
    };

    const saved = addInvoice(newInvoiceObj);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    onInvoiceCreated(saved);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[95vh] border border-slate-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xl">🧾</span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">Swipe Billing Engine</h3>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {activeBusiness.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">Generate GST-compliant tax invoices, e-Way estimates & cash bills</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSaveInvoice} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {/* Top Invoice Metadata Grid */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bill Document Type</label>
              <select
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option>Tax Invoice</option>
                <option>Bill of Supply</option>
                <option>Cash Memo</option>
                <option>Quotation / Estimate</option>
                <option>Delivery Challan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Number *</label>
              <input
                type="text"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Invoice Date *</label>
              <input
                type="date"
                required
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Customer / Party Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Customer / Party Details (Buyer)
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsNewPartyMode(!isNewPartyMode);
                  if (!isNewPartyMode) {
                    setSelectedPartyId('');
                    setPartyName('');
                    setPartyPhone('');
                    setPartyGst('');
                    setBillingAddress('');
                  }
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
              >
                <FiUserPlus className="w-3.5 h-3.5" />
                <span>{isNewPartyMode ? '← Pick Existing Party' : '+ Add New Customer'}</span>
              </button>
            </div>

            {!isNewPartyMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Existing Party</label>
                  <select
                    value={selectedPartyId}
                    onChange={(e) => handlePartySelect(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">-- Choose Party --</option>
                    {parties.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.gstNumber ? `(${p.gstNumber})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Phone</label>
                  <input
                    type="text"
                    value={partyPhone}
                    onChange={(e) => setPartyPhone(e.target.value)}
                    placeholder="Mobile number for WhatsApp bill"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={partyGst}
                    onChange={(e) => setPartyGst(e.target.value.toUpperCase())}
                    placeholder="e.g. 09AAACG1234F1Z5"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Party / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                    placeholder="e.g. Anand Trading Co"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={partyPhone}
                    onChange={(e) => setPartyPhone(e.target.value)}
                    placeholder="10-digit phone"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GST Number (Optional)</label>
                  <input
                    type="text"
                    value={partyGst}
                    onChange={(e) => setPartyGst(e.target.value.toUpperCase())}
                    placeholder="15 digit GSTIN"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Billing Address</label>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Address, Mandi, City, State, PIN"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Shipping / Delivery Address</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Destination Godown / Delivery Address"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* Tax Type Badge Indicator */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Supplier State: <strong>{activeBusiness.state} ({activeBusiness.stateCode})</strong>
              </span>
              <span className={`px-2.5 py-0.5 rounded font-semibold text-[11px] ${
                isInterState ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isInterState ? 'IGST Applicable (Inter-State)' : 'CGST + SGST Applicable (Intra-State)'}
              </span>
            </div>
          </div>

          {/* Dynamic Line Items Section */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Line Items & Products
              </span>
              <button
                type="button"
                onClick={addItemRow}
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shadow-2xs cursor-pointer"
              >
                <FiPlus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    {/* Choose from catalog */}
                    <div className="col-span-12 sm:col-span-4">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Select Product / Commodity
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleItemChange(idx, 'productId', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="">-- Choose from Catalog or Type --</option>
                        {businessProducts.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} (₹{p.sellingPrice}/{p.unit})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Name */}
                    <div className="col-span-12 sm:col-span-5">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Item Description *</label>
                      <input
                        type="text"
                        required
                        placeholder="Item name / grade"
                        value={item.name}
                        onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-medium"
                      />
                    </div>

                    {/* HSN */}
                    <div className="col-span-6 sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">HSN Code</label>
                      <input
                        type="text"
                        placeholder="e.g. 1001"
                        value={item.hsn}
                        onChange={(e) => handleItemChange(idx, 'hsn', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg bg-white"
                      />
                    </div>

                    {/* Delete button */}
                    <div className="col-span-6 sm:col-span-1 text-right pt-4">
                      <button
                        type="button"
                        onClick={() => removeItemRow(idx)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Pricing row */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 items-center pt-2 border-t border-slate-200 text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Quantity</label>
                      <input
                        type="number"
                        min="0.01"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded bg-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Unit</label>
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded bg-white text-xs"
                      >
                        <option>Quintal</option>
                        <option>Tons</option>
                        <option>Bag</option>
                        <option>Kg</option>
                        <option>Box</option>
                        <option>Carton</option>
                        <option>Nos</option>
                        <option>Trip</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Rate (₹)</label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.rate}
                        onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Disc %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discountPercent}
                        onChange={(e) => handleItemChange(idx, 'discountPercent', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">GST Rate</label>
                      <select
                        value={item.gstRate}
                        onChange={(e) => handleItemChange(idx, 'gstRate', e.target.value)}
                        className="w-full px-2 py-1 border border-slate-300 rounded bg-white text-xs font-mono"
                      >
                        <option value="0">0% (Nil)</option>
                        <option value="5">5% (Agro/Flour)</option>
                        <option value="12">12%</option>
                        <option value="18">18% (Cosmetics/Logistics)</option>
                        <option value="28">28%</option>
                      </select>
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] text-slate-500 font-semibold mb-0.5">Row Total</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {formatINR(item.total)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Financial & Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            {/* Left: Payment options & Notes */}
            <div className="sm:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Paid">Paid (Full)</option>
                    <option value="Pending">Pending (Baki / Udhar)</option>
                    <option value="Partial">Partial Payment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option>UPI / QR Scan</option>
                    <option>Cash</option>
                    <option>Bank Transfer / NEFT</option>
                    <option>Cheque</option>
                    <option>Credit (Khata)</option>
                  </select>
                </div>
              </div>

              {paymentStatus === 'Partial' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount Received Now (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Remarks</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Delivered via Shankar Logistics truck UP70..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              {/* Amount in words live */}
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Amount in Words:</span>
                <p className="text-xs font-bold text-slate-800 italic mt-0.5">{numberToWordsINR(grandTotal)}</p>
              </div>
            </div>

            {/* Right: Tax Breakdown and Grand Total */}
            <div className="sm:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span className="font-sans">Taxable Subtotal:</span>
                  <span>{formatINR(subtotal)}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span className="font-sans">Total Discount:</span>
                    <span>- {formatINR(totalDiscount)}</span>
                  </div>
                )}

                {!isInterState ? (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">CGST:</span>
                      <span>{formatINR(cgstTotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="font-sans">SGST:</span>
                      <span>{formatINR(sgstTotal)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-slate-600">
                    <span className="font-sans">IGST:</span>
                    <span>{formatINR(igstTotal)}</span>
                  </div>
                )}

                {roundOff !== 0 && (
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span className="font-sans">Round Off:</span>
                    <span>{roundOff > 0 ? `+${roundOff}` : roundOff}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t-2 border-slate-900 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Grand Total:</span>
                <span className="text-xl font-black text-emerald-800 font-mono">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-lg shadow-emerald-900/20 transition flex items-center space-x-2 cursor-pointer"
            >
              <FiCheck className="w-4 h-4" />
              <span>Create & Save Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
