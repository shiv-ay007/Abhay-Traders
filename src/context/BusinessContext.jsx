import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BUSINESSES, INITIAL_PRODUCTS, INITIAL_PARTIES, INITIAL_INVOICES } from '../data/initialData';
import toast from 'react-hot-toast';

const BusinessContext = createContext();

export function BusinessProvider({ children }) {
  // 1. Businesses State
  const [businesses, setBusinesses] = useState(() => {
    const saved = localStorage.getItem('abhay_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [activeBusinessId, setActiveBusinessIdState] = useState(() => {
    const saved = localStorage.getItem('abhay_active_business_id');
    return saved || 'abhay-traders';
  });

  // 2. Invoices State
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('abhay_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  // 3. Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('abhay_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // 4. Parties/Customers State
  const [parties, setParties] = useState(() => {
    const saved = localStorage.getItem('abhay_parties');
    return saved ? JSON.parse(saved) : INITIAL_PARTIES;
  });

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem('abhay_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('abhay_active_business_id', activeBusinessId);
  }, [activeBusinessId]);

  useEffect(() => {
    localStorage.setItem('abhay_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('abhay_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('abhay_parties', JSON.stringify(parties));
  }, [parties]);

  // Current active business object
  const activeBusiness = businesses.find(b => b.id === activeBusinessId) || businesses[0];

  const setActiveBusinessId = (id) => {
    const target = businesses.find(b => b.id === id);
    if (target) {
      setActiveBusinessIdState(id);
      toast.success(`Switched to ${target.name}`, {
        icon: '🏢',
        duration: 2500
      });
    }
  };

  // Update business profile
  const updateBusiness = (updated) => {
    setBusinesses(prev => prev.map(b => b.id === updated.id ? { ...b, ...updated } : b));
    toast.success('Company Details updated successfully!');
  };

  // Add Invoice
  const addInvoice = (invoiceData) => {
    const newInvoice = {
      ...invoiceData,
      id: `inv-${Date.now()}`,
      businessId: invoiceData.businessId || activeBusiness.id,
      createdAt: new Date().toISOString()
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Deduct stock for inventory products
    if (newInvoice.items && newInvoice.items.length > 0) {
      setProducts(prevProducts => {
        return prevProducts.map(p => {
          const itemMatch = newInvoice.items.find(it => it.productId === p.id || it.name === p.name);
          if (itemMatch) {
            const newStock = Math.max(0, p.stock - (Number(itemMatch.quantity) || 0));
            return { ...p, stock: newStock };
          }
          return p;
        });
      });
    }

    // Update party balance if unpaid or partial
    if (newInvoice.partyId && newInvoice.paymentStatus !== 'Paid') {
      const pendingAmount = newInvoice.paymentStatus === 'Partial'
        ? (newInvoice.grandTotal - (newInvoice.amountReceived || 0))
        : newInvoice.grandTotal;

      setParties(prevParties => {
        return prevParties.map(pty => {
          if (pty.id === newInvoice.partyId) {
            return { ...pty, balance: (pty.balance || 0) + pendingAmount };
          }
          return pty;
        });
      });
    }

    toast.success(`Invoice ${newInvoice.invoiceNumber} created successfully!`, {
      icon: '🧾',
      duration: 3000
    });
    return newInvoice;
  };

  // Update Invoice
  const updateInvoice = (updatedInvoice) => {
    setInvoices(prev => prev.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv));
    toast.success(`Invoice ${updatedInvoice.invoiceNumber} updated!`);
  };

  // Delete Invoice
  const deleteInvoice = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    toast.success('Invoice deleted successfully');
  };

  // Add Product
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      businessId: productData.businessId || activeBusiness.id,
    };
    setProducts(prev => [newProduct, ...prev]);
    toast.success(`Item "${newProduct.name}" added to catalog!`);
    return newProduct;
  };

  // Update Product
  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    toast.success('Product updated successfully!');
  };

  // Delete Product
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product removed from catalog');
  };

  // Add Party
  const addParty = (partyData) => {
    const newParty = {
      ...partyData,
      id: `party-${Date.now()}`,
      balance: Number(partyData.balance) || 0,
    };
    setParties(prev => [newParty, ...prev]);
    toast.success(`Party "${newParty.name}" added!`);
    return newParty;
  };

  // Update Party
  const updateParty = (updatedParty) => {
    setParties(prev => prev.map(p => p.id === updatedParty.id ? updatedParty : p));
    toast.success('Party details updated!');
  };

  // Delete Party
  const deleteParty = (id) => {
    setParties(prev => prev.filter(p => p.id !== id));
    toast.success('Party removed');
  };

  // Record Party Payment Received (Udhar Wapsi)
  const recordPartyPayment = (partyId, amount, paymentMode = 'UPI', note = '') => {
    const num = Number(amount) || 0;
    if (num <= 0) {
      toast.error('Enter a valid payment amount');
      return;
    }
    setParties(prev => prev.map(p => {
      if (p.id === partyId) {
        return {
          ...p,
          balance: Math.max(0, (p.balance || 0) - num)
        };
      }
      return p;
    }));
    toast.success(`Payment of ₹${num.toLocaleString('en-IN')} recorded!`);
  };

  // Calculate Next Invoice Number for active business
  const getNextInvoiceNumber = (businessId = activeBusiness.id) => {
    const biz = businesses.find(b => b.id === businessId) || activeBusiness;
    const bizInvoices = invoices.filter(inv => inv.businessId === businessId);
    const count = bizInvoices.length + 1;
    const padded = String(count).padStart(4, '0');
    return `${biz.invoicePrefix || 'INV-24'}-${padded}`;
  };

  // Filtered lists for the active business
  const businessInvoices = invoices.filter(inv => inv.businessId === activeBusiness.id);
  const businessProducts = products.filter(p => p.businessId === activeBusiness.id);

  // Business Analytics
  const businessStats = {
    totalSales: businessInvoices.reduce((acc, inv) => acc + (Number(inv.grandTotal) || 0), 0),
    paidSales: businessInvoices.filter(i => i.paymentStatus === 'Paid').reduce((acc, inv) => acc + (Number(inv.grandTotal) || 0), 0),
    pendingUdhar: businessInvoices.filter(i => i.paymentStatus !== 'Paid').reduce((acc, inv) => acc + (Number(inv.grandTotal) || 0), 0),
    totalInvoices: businessInvoices.length,
    lowStockCount: businessProducts.filter(p => p.stock <= p.minStock).length,
    totalProducts: businessProducts.length,
  };

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        activeBusiness,
        activeBusinessId,
        setActiveBusinessId,
        updateBusiness,
        invoices,
        businessInvoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        products,
        businessProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        parties,
        addParty,
        updateParty,
        deleteParty,
        recordPartyPayment,
        getNextInvoiceNumber,
        businessStats,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
