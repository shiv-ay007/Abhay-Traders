import React, { useState, useEffect } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { BusinessLogoRenderer } from '../../components/common/BusinessLogos';
import { FiEdit2, FiSave, FiCheck, FiCopy, FiMapPin, FiPhone, FiMail, FiShield, FiCreditCard } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CompanyProfilePage({ onOpenSwitcher }) {
  const { activeBusiness, updateBusiness, businesses, setActiveBusinessId } = useBusiness();
  const [isEditing, setIsEditing] = useState(false);

  // Form state initialized with active business
  const [formData, setFormData] = useState({ ...activeBusiness });

  useEffect(() => {
    setFormData({ ...activeBusiness });
    setIsEditing(false);
  }, [activeBusiness]);

  const handleSave = (e) => {
    e.preventDefault();
    updateBusiness(formData);
    setIsEditing(false);
  };

  const handleCopyToShipping = () => {
    setFormData(prev => ({
      ...prev,
      shippingAddress: prev.billingAddress
    }));
    toast.success('Copied Billing Address to Shipping Address');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar matching Image 2 & 3: "Company Details" + "Edit" / "Save" Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Company Details</h2>
          <p className="text-xs text-slate-500">Official GST registration, address & bank information</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSwitcher}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs"
          >
            Switch Business ↗
          </button>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <FiSave className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {/* Dark Card Container (Matching screenshot Image 2 & 3 layout) */}
      <div className="bg-zinc-900 text-zinc-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-800 space-y-6">
        {/* Center Logo Box (Om Namah Shivaya Trishul / Tilak) */}
        <div className="flex justify-center -mt-2">
          <div className="relative">
            <BusinessLogoRenderer businessId={activeBusiness.id} className="w-20 h-20" />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-[10px] text-white font-bold px-2 py-0.5 rounded-full shadow">
              Verified
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          {/* Main Info Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 font-medium mb-1">Business/Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-bold"
                />
              ) : (
                <div className="font-bold text-sm text-zinc-100 uppercase tracking-wide">
                  {formData.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">GST Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-mono font-bold"
                />
              ) : (
                <div className="font-mono font-bold text-sm text-emerald-400">
                  {formData.gstNumber}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 font-medium mb-1">Business Phone No.</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-mono"
                  />
                ) : (
                  <div className="font-mono text-zinc-200 text-sm">
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-zinc-400 font-medium mb-1">Business Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
                  />
                ) : (
                  <div className="text-zinc-200 text-sm font-mono">
                    {formData.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Brand Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
                />
              ) : (
                <div className="font-bold text-zinc-100 uppercase">
                  {formData.brandName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Tagline</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
                />
              ) : (
                <div className="text-zinc-300 italic">
                  "{formData.tagline}"
                </div>
              )}
            </div>
          </div>

          {/* Billing Address Card (Matches Image 2 & 3) */}
          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Billing Address</span>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCopyToShipping}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 text-[11px] font-semibold"
                >
                  <FiCopy className="w-3 h-3" />
                  <span>Copy to Shipping</span>
                </button>
              )}
            </div>

            <div className="p-4 bg-zinc-850 rounded-2xl border border-zinc-800">
              <div className="font-bold text-zinc-200 uppercase mb-1">{formData.name}</div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.billingAddress}
                  onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono"
                />
              ) : (
                <div className="text-zinc-300 font-mono leading-relaxed text-[11px]">
                  {formData.billingAddress}
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address Card (Matches Image 2 & 3) */}
          <div className="pt-2">
            <span className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Shipping Address</span>
            <div className="p-4 bg-zinc-850 rounded-2xl border border-zinc-800">
              <div className="font-bold text-zinc-200 uppercase mb-1">{formData.name}</div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono"
                />
              ) : (
                <div className="text-zinc-300 font-mono leading-relaxed text-[11px]">
                  {formData.shippingAddress}
                </div>
              )}
            </div>
          </div>

          {/* Bank & Settlement Details */}
          <div className="pt-4 border-t border-zinc-800">
            <span className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
              Bank Account & UPI Settlement
            </span>
            <div className="p-4 bg-zinc-850 rounded-2xl border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 block mb-0.5">Bank Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-semibold"
                  />
                ) : (
                  <div className="text-zinc-100 font-bold">{formData.bankName}</div>
                )}
              </div>

              <div>
                <label className="text-zinc-400 block mb-0.5">Account Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono"
                  />
                ) : (
                  <div className="text-zinc-100 font-mono font-bold">{formData.accountNumber}</div>
                )}
              </div>

              <div>
                <label className="text-zinc-400 block mb-0.5">IFSC Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono"
                  />
                ) : (
                  <div className="text-zinc-100 font-mono font-bold">{formData.ifscCode}</div>
                )}
              </div>

              <div>
                <label className="text-zinc-400 block mb-0.5">UPI ID (For QR Code Payments)</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono"
                  />
                ) : (
                  <div className="text-emerald-400 font-mono font-bold">{formData.upiId}</div>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Prefix Setting */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-300 block">Invoice Number Prefix</span>
              <span className="text-[11px] text-zinc-400">Bills will be created as: {formData.invoicePrefix}-0001</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={formData.invoicePrefix}
                onChange={(e) => setFormData({ ...formData, invoicePrefix: e.target.value })}
                className="w-24 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white font-mono font-bold text-center"
              />
            ) : (
              <span className="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg text-white font-mono font-bold">
                {formData.invoicePrefix}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
