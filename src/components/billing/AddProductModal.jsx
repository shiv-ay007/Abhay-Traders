import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { FiX, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AddProductModal({ isOpen, onClose }) {
  const { activeBusiness, addProduct } = useBusiness();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Grains');
  const [hsn, setHsn] = useState('1001');
  const [unit, setUnit] = useState('Quintal');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('20');
  const [gstRate, setGstRate] = useState('5');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !sellingPrice) {
      toast.error('Please enter product name and selling price');
      return;
    }

    addProduct({
      name,
      category,
      hsn,
      unit,
      purchasePrice: Number(purchasePrice) || 0,
      sellingPrice: Number(sellingPrice) || 0,
      stock: Number(stock) || 0,
      minStock: Number(minStock) || 10,
      gstRate: Number(gstRate) || 0,
      description,
      businessId: activeBusiness.id
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-base font-bold">Add Item to Catalog</h3>
            <p className="text-xs text-slate-400">Adding to {activeBusiness.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Product / Commodity Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sharbati Gehu Grade-A / Pond's Cream 50g"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Grains, Pulses, Skincare, Flour"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">HSN / SAC Code</label>
              <input
                type="text"
                value={hsn}
                onChange={(e) => setHsn(e.target.value)}
                placeholder="e.g. 1001, 3304, 1101"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Selling Rate (₹) *</label>
              <input
                type="number"
                required
                min="0"
                step="any"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="Rate"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Purchase Rate (₹)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="Cost"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Measurement Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-2 py-2 border border-slate-300 rounded-lg text-xs"
              >
                <option>Quintal</option>
                <option>Bag</option>
                <option>Kg</option>
                <option>Tons</option>
                <option>Box</option>
                <option>Carton</option>
                <option>Pcs</option>
                <option>Trip</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Initial Stock</label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Qty"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Low Stock Alert</label>
              <input
                type="number"
                min="0"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">GST Tax Rate</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                className="w-full px-2 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              >
                <option value="0">0% (Nil)</option>
                <option value="5">5% (Grains/Flour)</option>
                <option value="12">12%</option>
                <option value="18">18% (Cosmetics)</option>
                <option value="28">28%</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description / Packaging Notes</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quality specifications, moisture %, packaging..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
            ></textarea>
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-sm"
            >
              <FiCheck className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
