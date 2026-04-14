'use client';
import { useState } from 'react';

// Simplified world map SVG — major countries as clickable paths
// Country data with news region mapping
const countryData = {
  'US': { name: 'United States', region: 'Western', cat: 'world', lat: 39.8, lng: -98.5 },
  'GB': { name: 'United Kingdom', region: 'Western', cat: 'world', lat: 55.3, lng: -3.4 },
  'FR': { name: 'France', region: 'Western', cat: 'world', lat: 46.2, lng: 2.2 },
  'DE': { name: 'Germany', region: 'Western', cat: 'world', lat: 51.1, lng: 10.4 },
  'RU': { name: 'Russia', region: 'Russia', cat: 'russia', lat: 61.5, lng: 105.3 },
  'CN': { name: 'China', region: 'China', cat: 'china', lat: 35.8, lng: 104.1 },
  'IN': { name: 'India', region: 'Western', cat: 'world', lat: 20.5, lng: 78.9 },
  'BR': { name: 'Brazil', region: 'Western', cat: 'world', lat: -14.2, lng: -51.9 },
  'AU': { name: 'Australia', region: 'Western', cat: 'world', lat: -25.2, lng: 133.7 },
  'JP': { name: 'Japan', region: 'Western', cat: 'world', lat: 36.2, lng: 138.2 },
  'KR': { name: 'South Korea', region: 'Western', cat: 'technology', lat: 35.9, lng: 127.7 },
  'SA': { name: 'Saudi Arabia', region: 'Middle East', cat: 'geopolitics', lat: 23.8, lng: 45.0 },
  'IR': { name: 'Iran', region: 'Iran', cat: 'iran', lat: 32.4, lng: 53.6 },
  'IQ': { name: 'Iraq', region: 'Middle East', cat: 'war', lat: 33.2, lng: 43.6 },
  'IL': { name: 'Israel', region: 'Middle East', cat: 'war', lat: 31.0, lng: 34.8 },
  'UA': { name: 'Ukraine', region: 'Russia', cat: 'war', lat: 48.3, lng: 31.1 },
  'NG': { name: 'Nigeria', region: 'Western', cat: 'world', lat: 9.0, lng: 8.6 },
  'ZA': { name: 'South Africa', region: 'Western', cat: 'world', lat: -30.5, lng: 22.9 },
  'MX': { name: 'Mexico', region: 'Western', cat: 'world', lat: 23.6, lng: -102.5 },
  'CA': { name: 'Canada', region: 'Western', cat: 'world', lat: 56.1, lng: -106.3 },
  'EG': { name: 'Egypt', region: 'Middle East', cat: 'geopolitics', lat: 26.8, lng: 30.8 },
  'PK': { name: 'Pakistan', region: 'Western', cat: 'geopolitics', lat: 30.3, lng: 69.3 },
  'TR': { name: 'Turkey', region: 'Western', cat: 'geopolitics', lat: 38.9, lng: 35.2 },
  'SY': { name: 'Syria', region: 'Middle East', cat: 'war', lat: 34.8, lng: 38.9 },
  'AF': { name: 'Afghanistan', region: 'Middle East', cat: 'war', lat: 33.9, lng: 67.7 },
  'KP': { name: 'North Korea', region: 'China', cat: 'geopolitics', lat: 40.3, lng: 127.5 },
  'TW': { name: 'Taiwan', region: 'China', cat: 'geopolitics', lat: 23.6, lng: 120.9 },
  'PS': { name: 'Palestine', region: 'Iran', cat: 'war', lat: 31.9, lng: 35.2 },
  'AE': { name: 'UAE', region: 'Middle East', cat: 'finance', lat: 23.4, lng: 53.8 },
};

const regionColors = {
  'Western': '#2D7DD2',
  'China': '#DE2910',
  'Russia': '#D52B1E',
  'Iran': '#239F40',
  'Middle East': '#B8860B',
  'Crypto': '#F7931A',
  'Tech': '#6366F1',
};

export default function WorldMap({ onCountryClick }) {
  const [hovered, setHovered] = useState(null);

  // Convert lat/lng to SVG coordinates (simple equirectangular projection)
  const project = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto' }}>
      <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto' }}>
        {/* Ocean */}
        <rect width="800" height="400" fill="#0E0E14" rx="8" />

        {/* Grid lines */}
        {[0, 30, 60, -30, -60].map(lat => {
          const y = (90 - lat) * (400 / 180);
          return <line key={`lat-${lat}`} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />;
        })}
        {[-180, -120, -60, 0, 60, 120, 180].map(lng => {
          const x = (lng + 180) * (800 / 360);
          return <line key={`lng-${lng}`} x1={x} y1="0" x2={x} y2="400" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />;
        })}

        {/* Country dots */}
        {Object.entries(countryData).map(([code, data]) => {
          const { x, y } = project(data.lat, data.lng);
          const isHovered = hovered === code;
          const color = regionColors[data.region] || '#6B6B6B';
          return (
            <g key={code}
              onMouseEnter={() => setHovered(code)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onCountryClick?.(data.cat, data.name)}
              style={{ cursor: 'pointer' }}>
              {/* Glow */}
              {isHovered && <circle cx={x} cy={y} r="18" fill={color} opacity="0.15" />}
              {/* Pulse ring */}
              {isHovered && <circle cx={x} cy={y} r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.4">
                <animate attributeName="r" from="8" to="18" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
              </circle>}
              {/* Dot */}
              <circle cx={x} cy={y} r={isHovered ? "6" : "4"} fill={color} stroke={isHovered ? "white" : color} strokeWidth={isHovered ? "2" : "0.5"} style={{ transition: 'all 0.2s' }} />
              {/* Label on hover */}
              {isHovered && (
                <g>
                  <rect x={x - 50} y={y - 30} width="100" height="22" rx="4" fill="rgba(10,10,15,0.9)" stroke={color} strokeWidth="0.5" />
                  <text x={x} y={y - 16} textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">{data.name}</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Region labels */}
        <text x="140" y="120" fill="rgba(255,255,255,0.06)" fontSize="24" fontWeight="700" fontFamily="Space Grotesk, sans-serif">AMERICAS</text>
        <text x="350" y="70" fill="rgba(255,255,255,0.06)" fontSize="24" fontWeight="700" fontFamily="Space Grotesk, sans-serif">EUROPE</text>
        <text x="520" y="110" fill="rgba(255,255,255,0.06)" fontSize="24" fontWeight="700" fontFamily="Space Grotesk, sans-serif">MIDDLE EAST</text>
        <text x="620" y="180" fill="rgba(255,255,255,0.06)" fontSize="24" fontWeight="700" fontFamily="Space Grotesk, sans-serif">ASIA</text>
        <text x="330" y="320" fill="rgba(255,255,255,0.06)" fontSize="24" fontWeight="700" fontFamily="Space Grotesk, sans-serif">AFRICA</text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
        {Object.entries(regionColors).map(([region, color]) => (
          <div key={region} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: 11, color: '#6B6B6B', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>{region}</span>
          </div>
        ))}
      </div>
    </div>
  );
}