import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BusinessProvider } from './context/BusinessContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <BusinessProvider>
        {/* Scroll / Slide to Top Button & Auto Scroll */}
        <ScrollToTop />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              fontSize: '13px',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />

        {/* Central Routes */}
        <AppRoutes />
      </BusinessProvider>
    </BrowserRouter>
  );
}

export default App;

