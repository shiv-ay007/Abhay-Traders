import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { BusinessLogoRenderer } from './BusinessLogos';
import { FiCheck, FiX, FiPhone, FiMapPin } from 'react-icons/fi';
import { TbFileInvoice } from 'react-icons/tb';

export default function BusinessSwitcherModal({ isOpen, onClose }) {
  const { businesses, activeBusinessId, setActiveBusinessId } = useBusiness();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-lg font-bold">Select Active Business</h3>
            <p className="text-xs text-slate-300">Choose which company to view website or generate GST invoices for</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* List of 4 businesses */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto">
          {businesses.map((biz) => {
            const isSelected = biz.id === activeBusinessId;
            return (
              <div
                key={biz.id}
                onClick={() => {
                  setActiveBusinessId(biz.id);
                  onClose();
                }}
                className={`cursor-pointer group relative p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                    <FiCheck className="w-3.5 h-3.5" />
                  </div>
                )}

                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <BusinessLogoRenderer businessId={biz.id} className="w-11 h-11" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700">
                        {biz.name}
                      </h4>
                      <span className="inline-block text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md mt-0.5">
                        {biz.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 mt-2">
                    <div className="flex items-center text-slate-700 font-mono text-[11px]">
                      <span className="font-semibold text-slate-500 mr-1.5">GST:</span>
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-semibold">{biz.gstNumber}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <FiPhone className="w-3 h-3 mr-1.5 text-slate-400 flex-shrink-0" />
                      <span>{biz.phone}</span>
                    </div>
                    <div className="flex items-start text-slate-500 text-[11px] line-clamp-1">
                      <FiMapPin className="w-3 h-3 mr-1 mt-0.5 text-slate-400 flex-shrink-0" />
                      <span>{biz.billingAddress.split(',')[0]}, {biz.state}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Prefix: {biz.invoicePrefix}</span>
                  <span className={`font-semibold ${isSelected ? 'text-emerald-700' : 'text-slate-600 group-hover:text-emerald-600'}`}>
                    {isSelected ? 'Active Business' : 'Switch Here →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Multi-tenant GST architecture enabled</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
