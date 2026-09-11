# Abhay-Traders

An industry-level, multi-tenant React + Tailwind CSS corporate website and **Swipe / GimBooks-style GST Billing Software** designed to manage 4 commercial businesses under a unified platform.

---

## 🏢 4 Businesses Integrated

1. **M/S ABHAY TRADERS** (Agro & Food Grains Wholesale - Prayagraj, UP | GSTIN: `09AKCPL1208K1ZA`)
2. **SHREE SHANKAR FOODS** (Flour Milling & Food Processing - Rohtas, Bihar & Prayagraj, UP | GSTIN: `10FOAPS7195B1Z2` / `09FOAPS7195B1ZL`)
3. **ABHAY BEAUTY & COSMETICS** (Cosmetics & Personal Care Wholesale - Prayagraj, UP | GSTIN: `09AKCPL1208K1ZA`)
4. **SHANKAR LOGISTICS & SUPPLY** (Pan-India Heavy Commercial Freight & Agro Logistics)

---

## 🚀 Key Features

### 🌐 Showcase Corporate Website
- **Dedicated Route Navigation**:
  - `/` - Master Landing Page with grain catalog, statistics, and business portfolio.
  - `/about` - Corporate timeline (2019-2025), infrastructure, and client network.
  - `/products` - Agro wholesale catalog with category filters and moisture/specs table.
  - `/cosmetics` - Wholesale beauty brands (Pond's, Lakme, Nivea, Mamaearth) with margin indicators.
  - `/shankar-foods` - Pneumatic stone milling specifications & Shankar Logistics fleet details.
  - `/why-choose-us` - 6 pillars and traditional broker vs. guaranteed delivery comparison.
  - `/contact` - Registered Prayagraj & Rohtas depot locations, interactive quote & WhatsApp desk.
- **Framer Motion Animations**: Scroll-triggered reveals (`whileInView`), card hover physics (`whileHover`), and spring transitions.
- **Slide to Top**: Floating animated quick-scroll button with route change listener.
- **Responsive Navbar**: Business Switcher pill, active indicators, and zero horizontal overflow.

### 🧾 Swipe / GimBooks 2.0 GST Billing ERP
- `/billing` - Multi-tenant dashboard with sales, khata receivables, and low-stock indicators.
- `/billing/invoices` - Invoices list with A4 GST Tax Invoice and 80mm POS Thermal Receipt printing.
- `/billing/inventory` - Live inventory, stock adjustments, and low-stock alerts.
- `/billing/parties` - Customer/Vendor Khata ledger with 1-click WhatsApp payment reminders.
- `/billing/settings` - Dark-mode company profile settings.
- **Smart GST Calculation**: Automatic intra-state (CGST + SGST) vs inter-state (IGST) split based on buyer/seller state codes.
- **Rupees in Words**: Instant conversion of amounts into words on invoices.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: Framer Motion
- **Icons**: React Icons (Heroicons, Feather Icons, FontAwesome, Tabler)
- **Notifications**: React Hot Toast
- **Effects**: Canvas Confetti

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/shiv-ay007/Abhay-Traders.git

# Navigate into project directory
cd Abhay-Traders

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```
