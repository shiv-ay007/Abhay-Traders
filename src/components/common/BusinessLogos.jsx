import React from 'react';

// Official Abhay Traders Colorful Grain Sprout Logo (matching reference Image 1)
export function AbhayTradersLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`flex items-center justify-center flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
        {/* Center Vertical Grain Sprout (Vibrant Green) */}
        <path
          d="M50 10 C53 26 53.5 48 50 76 C46.5 48 47 26 50 10 Z"
          fill="#16a34a"
        />

        {/* Top Left Leaf (Tangerine Orange) */}
        <path
          d="M48 34 C36 24 24 25 20 32 C18 42 30 46 46 44 Z"
          fill="#ea580c"
        />

        {/* Top Right Leaf (Lime/Emerald Green) */}
        <path
          d="M52 34 C64 24 76 25 80 32 C82 42 70 46 54 44 Z"
          fill="#65a30d"
        />

        {/* Middle Left Leaf (Warm Golden Amber) */}
        <path
          d="M47 50 C32 42 18 46 16 54 C15 64 30 64 45 57 Z"
          fill="#f59e0b"
        />

        {/* Middle Right Leaf (Vibrant Emerald) */}
        <path
          d="M53 50 C68 42 82 46 84 54 C85 64 70 64 55 57 Z"
          fill="#10b981"
        />

        {/* Bottom Left Leaf (Golden Yellow) */}
        <path
          d="M48 64 C35 60 25 66 25 74 C26 81 38 78 47 70 Z"
          fill="#eab308"
        />

        {/* Bottom Right Leaf (Deep Forest Green) */}
        <path
          d="M52 64 C65 60 75 66 75 74 C74 81 62 78 53 70 Z"
          fill="#059669"
        />

        {/* Base Seed Stem Node */}
        <circle cx="50" cy="78" r="3.5" fill="#15803d" />
      </svg>
    </div>
  );
}

// Trishul Emblem for M/S Abhay Traders (alternative/traditional emblem)
export function TrishulLogo({ className = "w-10 h-10", dark = true }) {
  return (
    <div className={`flex items-center justify-center rounded-xl p-1.5 shadow-md ${dark ? 'bg-zinc-950 text-amber-400 border border-zinc-800' : 'bg-amber-600 text-white'} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Trishul Prongs */}
        <path d="M50 8 L50 92" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M50 35 C38 35 24 25 24 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 35 C62 35 76 25 76 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        {/* Center spear blade */}
        <polygon points="50,4 46,14 54,14" fill="currentColor" />
        <polygon points="24,8 21,18 27,18" fill="currentColor" />
        <polygon points="76,8 73,18 79,18" fill="currentColor" />
        {/* Sacred Damru & Tripund */}
        <path d="M38 52 Q50 48 62 52" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 56 Q50 52 64 56" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="54" r="2.5" fill="#f59e0b" />
        {/* Om Symbol / text base */}
        <text x="50" y="86" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="serif">॥ ॐ नमः शिवाय ॥</text>
      </svg>
    </div>
  );
}

// Sacred Tilak Emblem for Shree Shankar Foods (from screenshot Image 3 & 4)
export function TilakLogo({ className = "w-10 h-10", dark = true }) {
  return (
    <div className={`flex items-center justify-center rounded-xl p-1.5 shadow-md ${dark ? 'bg-zinc-950 text-white border border-zinc-800' : 'bg-orange-600 text-white'} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Sacred U-Shape White Tilak */}
        <path d="M32 20 V56 C32 72 68 72 68 56 V20" stroke="#f8fafc" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        {/* Red Center Bindi / Flame mark */}
        <path d="M50 28 V64" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="50" cy="65" rx="3.5" ry="5" fill="#dc2626" />
        {/* Sacred base */}
        <circle cx="50" cy="78" r="3" fill="#f59e0b" />
      </svg>
    </div>
  );
}

// Cosmetics & Beauty Care Emblem
export function CosmeticsLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`flex items-center justify-center rounded-xl p-1.5 shadow-md bg-gradient-to-tr from-rose-600 to-pink-500 text-white ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/5 h-4/5">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
      </svg>
    </div>
  );
}

// Logistics & Supply Chain Emblem
export function LogisticsLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`flex items-center justify-center rounded-xl p-1.5 shadow-md bg-gradient-to-tr from-blue-700 to-indigo-600 text-white ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4/5 h-4/5">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
        <path d="M15 18H9"/>
        <path d="M19 18h2a1 1 0 0 0 1-1v-5l-4-4h-4v10Z"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
      </svg>
    </div>
  );
}

export function BusinessLogoRenderer({ businessId, className = "w-10 h-10" }) {
  switch (businessId) {
    case 'abhay-traders':
      return <AbhayTradersLogo className={className} />;
    case 'shree-shankar-foods':
      return <TilakLogo className={className} />;
    case 'abhay-cosmetics':
      return <CosmeticsLogo className={className} />;
    case 'shankar-logistics':
      return <LogisticsLogo className={className} />;
    default:
      return <AbhayTradersLogo className={className} />;
  }
}
