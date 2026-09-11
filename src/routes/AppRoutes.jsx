import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import CosmeticsPage from '../pages/CosmeticsPage';
import ShankarFoodsPage from '../pages/ShankarFoodsPage';
import WhyChooseUsPage from '../pages/WhyChooseUsPage';
import ContactPage from '../pages/ContactPage';

import BillingLayout from '../components/billing/BillingLayout';
import BillingDashboard from '../pages/billing/BillingDashboard';
import InvoicesPage from '../pages/billing/InvoicesPage';
import InventoryPage from '../pages/billing/InventoryPage';
import PartiesPage from '../pages/billing/PartiesPage';
import CompanyProfilePage from '../pages/billing/CompanyProfilePage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Main Public Corporate Multi-Business Website Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cosmetics" element={<CosmeticsPage />} />
      <Route path="/shankar-foods" element={<ShankarFoodsPage />} />
      <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* 2. Swipe / GimBooks Multi-Tenant Billing System Routes */}
      <Route
        path="/billing"
        element={
          <BillingLayout>
            <BillingDashboard />
          </BillingLayout>
        }
      />

      <Route
        path="/billing/invoices"
        element={
          <BillingLayout>
            <InvoicesPage />
          </BillingLayout>
        }
      />

      <Route
        path="/billing/inventory"
        element={
          <BillingLayout>
            <InventoryPage />
          </BillingLayout>
        }
      />

      <Route
        path="/billing/parties"
        element={
          <BillingLayout>
            <PartiesPage />
          </BillingLayout>
        }
      />

      <Route
        path="/billing/settings"
        element={
          <BillingLayout>
            <CompanyProfilePage />
          </BillingLayout>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
