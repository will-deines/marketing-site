import React from 'react';

export const GarrioLogoLight = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 5.8} 
    height={size * 2} 
    viewBox="0 0 140 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" stopOpacity="1" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    <g>
      <rect x="0" y="0" width="48" height="48" rx="12" fill="url(#gradient-light)"  />
      
      <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
            fill="#ffffff" />
      
      <g transform="translate(30, 30)">
        <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
              fill="#fbbf24" />
      </g>
      
      <text x="60" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#111827">Garrio</text>
    </g>
  </svg>
);

export const GarrioIconLight = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 2} 
    height={size * 2} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-icon-light" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" stopOpacity="1" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    <rect width="48" height="48" rx="12" fill="url(#gradient-icon-light)"  />
    
    <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
          fill="#ffffff" />
    
    <g transform="translate(30, 30)">
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
            fill="#fbbf24" />
    </g>
  </svg>
);


import React from 'react';

export const GarrioLogoDark = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 5.8} 
    height={size * 2} 
    viewBox="0 0 140 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    <g>
      <rect x="0" y="0" width="48" height="48" rx="12" fill="url(#gradient-dark)"  />
      
      <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
            fill="#9333ea" />
      
      <g transform="translate(30, 30)">
        <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
              fill="#6366f1" />
      </g>
      
      <text x="60" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#ffffff">Garrio</text>
    </g>
  </svg>
);

export const GarrioIconDark = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 2} 
    height={size * 2} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-icon-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    <rect width="48" height="48" rx="12" fill="url(#gradient-icon-dark)"  />
    
    <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
          fill="#9333ea" />
    
    <g transform="translate(30, 30)">
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
            fill="#6366f1" />
    </g>
  </svg>
);


import React from 'react';

export const GarrioLogoTransparent = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 5.8} 
    height={size * 2} 
    viewBox="0 0 140 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-transparent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="transparent" stopOpacity="0.1" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    
    <g>
      <rect x="0" y="0" width="48" height="48" rx="12" fill="rgba(147, 51, 234, 0.1)" stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1" />
      
      <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
            fill="#9333ea" />
      
      <g transform="translate(30, 30)">
        <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
              fill="#fbbf24" />
      </g>
      
      <text x="60" y="30" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="#111827">Garrio</text>
    </g>
  </svg>
);

export const GarrioIconTransparent = ({ className = "", size = 24 }) => (
  <svg 
    width={size * 2} 
    height={size * 2} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gradient-icon-transparent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="transparent" stopOpacity="0.1" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    
    <rect width="48" height="48" rx="12" fill="rgba(147, 51, 234, 0.1)" stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1" />
    
    <path d="M12 12C12 10.3431 13.3431 9 15 9H28C29.6569 9 31 10.3431 31 12V24C31 25.6569 29.6569 27 28 27H19L15 31V27H15C13.3431 27 12 25.6569 12 24V12Z" 
          fill="#9333ea" />
    
    <g transform="translate(30, 30)">
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8Z" 
            fill="#fbbf24" />
    </g>
  </svg>
);
