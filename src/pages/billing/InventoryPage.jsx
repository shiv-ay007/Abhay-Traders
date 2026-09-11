import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { formatINR } from '../../utils/numberToWords';
import { FiPlus, FiSearch, FiAlertTriangle, FiTrash2, FiEdit2, FiBox } from 'react-icons/fi';
import AddProductModal from '../../components/billing/AddProductModal';
import toast from 'react-hot-toast';

export default function InventoryPage() {
  const { businessProducts, activeBusiness, businesses, deleteProduct, updateProduct } = useBusiness();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [stockAdjustmentId, setStockAdjustmentId] = useState(null);
  const [stockAdjustmentQty, setStockAdjustmentQty] = useState('');

  const filtered = businessProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    (p.hsn && p.hsn.includes(search))
  );

  const handleUpdateStock = (prod) => {
    const qty = Number(stockAdjustmentQty);
    if (isNaN(qty)) {
      toast.error('Enter valid stock quantity');
      return;
    }
    updateProduct({ ...prod, stock: qty });
    setStockAdjustmentId(null);
    setStockAdjustmentQty('');
    toast.success(`Stock for ${prod.name} updated to ${qty} ${prod.unit}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Inventory & Products Catalog
          </h2>
          <p className="text-xs text-slate-500">
            Managing commodities, wholesale items and stock for <strong>{activeBusiness.name}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>+ Add Product / Commodity</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center space-x-3 text-xs">
        <FiSearch className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by commodity name, HSN code, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full focus:outline-none"
        />
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Product Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">HSN Code</th>
                <th className="p-3.5 text-right">Selling Rate</th>
                <th className="p-3.5 text-right">Purchase Cost</th>
                <th className="p-3.5 text-center">GST Rate</th>
                <th className="p-3.5 text-center">Available Stock</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((prod) => {
                  const isLow = prod.stock <= prod.minStock;
                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{prod.name}</div>
                        {prod.description && (
                          <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">{prod.description}</div>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          {prod.category}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-600">
                        {prod.hsn || '-'}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        {formatINR(prod.sellingPrice)} / {prod.unit}
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-500">
                        {formatINR(prod.purchasePrice)}
                      </td>
                      <td className="p-3.5 text-center font-mono">
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-800">
                          {prod.gstRate}%
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        {stockAdjustmentId === prod.id ? (
                          <div className="flex items-center justify-center space-x-1">
                            <input
                              type="number"
                              autoFocus
                              value={stockAdjustmentQty}
                              onChange={(e) => setStockAdjustmentQty(e.target.value)}
                              className="w-16 px-1 py-0.5 border border-emerald-500 rounded text-center text-xs font-mono font-bold"
                            />
                            <button
                              onClick={() => handleUpdateStock(prod)}
                              className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setStockAdjustmentId(prod.id);
                              setStockAdjustmentQty(String(prod.stock));
                            }}
                            className="inline-flex items-center space-x-1 cursor-pointer hover:underline"
                            title="Click to quickly update stock quantity"
                          >
                            <span className={`font-mono font-bold ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
                              {prod.stock} {prod.unit}
                            </span>
                            {isLow && (
                              <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded">
                                Low
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${prod.name}?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-700 transition"
                          title="Delete Product"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400">
                    No items found in this business catalog. Click "+ Add Product / Commodity" to populate your inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </div>
  );
}
