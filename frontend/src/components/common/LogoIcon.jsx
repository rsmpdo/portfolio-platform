import React from 'react';

export default function LogoIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="logo-grad-accent" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6366F1" floodOpacity="0.4" />
        </filter>
      </defs>
      
      {/* Outer Geometric Hex Shield */}
      <path
        d="M16 2.5L27 8.8507V21.1493L16 27.5L5 21.1493V8.8507L16 2.5Z"
        fill="url(#logo-grad-primary)"
        fillOpacity="0.2"
        stroke="url(#logo-grad-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
        filter="url(#logo-glow)"
      />
      
      {/* Stylized Craftsman Diamond Prism 'P' & 'C' Monogram */}
      <path
        d="M11 8.5H16.5C19.5376 8.5 22 10.9624 22 14C22 17.0376 19.5376 19.5 16.5 19.5H11V8.5Z"
        stroke="url(#logo-grad-primary)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14H16.5C17.9355 14 19.1 15.1645 19.1 16.6C19.1 18.0355 17.9355 19.2 16.5 19.2H11V23.5"
        stroke="url(#logo-grad-accent)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Central Diamond Spark */}
      <circle cx="16" cy="14" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}
