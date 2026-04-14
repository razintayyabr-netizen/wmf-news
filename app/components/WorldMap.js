'use client';
import { useState } from 'react';

// Country data with news region mapping
const countryData = {
  'US': { name: 'United States', region: 'Western', cat: 'world', lat: 39.8, lng: -98.5, size: 10 },
  'GB': { name: 'United Kingdom', region: 'Western', cat: 'world', lat: 55.3, lng: -3.4, size: 6 },
  'FR': { name: 'France', region: 'Western', cat: 'world', lat: 46.2, lng: 2.2, size: 6 },
  'DE': { name: 'Germany', region: 'Western', cat: 'world', lat: 51.1, lng: 10.4, size: 6 },
  'RU': { name: 'Russia', region: 'Russia', cat: 'russia', lat: 61.5, lng: 105.3, size: 12 },
  'CN': { name: 'China', region: 'China', cat: 'china', lat: 35.8, lng: 104.1, size: 12 },
  'IN': { name: 'India', region: 'Western', cat: 'world', lat: 20.5, lng: 78.9, size: 9 },
  'BR': { name: 'Brazil', region: 'Western', cat: 'world', lat: -14.2, lng: -51.9, size: 7 },
  'AU': { name: 'Australia', region: 'Western', cat: 'world', lat: -25.2, lng: 133.7, size: 7 },
  'JP': { name: 'Japan', region: 'Western', cat: 'technology', lat: 36.2, lng: 138.2, size: 7 },
  'KR': { name: 'South Korea', region: 'Western', cat: 'technology', lat: 35.9, lng: 127.7, size: 5 },
  'SA': { name: 'Saudi Arabia', region: 'Middle East', cat: 'geopolitics', lat: 23.8, lng: 45.0, size: 6 },
  'IR': { name: 'Iran', region: 'Iran', cat: 'iran', lat: 32.4, lng: 53.6, size: 7 },
  'IQ': { name: 'Iraq', region: 'Middle East', cat: 'war', lat: 33.2, lng: 43.6, size: 5 },
  'IL': { name: 'Israel', region: 'Middle East', cat: 'war', lat: 31.0, lng: 34.8, size: 5 },
  'UA': { name: 'Ukraine', region: 'Russia', cat: 'war', lat: 48.3, lng: 31.1, size: 7 },
  'NG': { name: 'Nigeria', region: 'Western', cat: 'world', lat: 9.0, lng: 8.6, size: 5 },
  'ZA': { name: 'South Africa', region: 'Western', cat: 'world', lat: -30.5, lng: 22.9, size: 5 },
  'MX': { name: 'Mexico', region: 'Western', cat: 'world', lat: 23.6, lng: -102.5, size: 7 },
  'CA': { name: 'Canada', region: 'Western', cat: 'world', lat: 56.1, lng: -106.3, size: 8 },
  'EG': { name: 'Egypt', region: 'Middle East', cat: 'geopolitics', lat: 26.8, lng: 30.8, size: 5 },
  'PK': { name: 'Pakistan', region: 'Western', cat: 'geopolitics', lat: 30.3, lng: 69.3, size: 6 },
  'TR': { name: 'Turkey', region: 'Western', cat: 'geopolitics', lat: 38.9, lng: 35.2, size: 6 },
  'SY': { name: 'Syria', region: 'Middle East', cat: 'war', lat: 34.8, lng: 38.9, size: 4 },
  'AF': { name: 'Afghanistan', region: 'Middle East', cat: 'war', lat: 33.9, lng: 67.7, size: 4 },
  'KP': { name: 'North Korea', region: 'China', cat: 'geopolitics', lat: 40.3, lng: 127.5, size: 4 },
  'TW': { name: 'Taiwan', region: 'China', cat: 'geopolitics', lat: 23.6, lng: 120.9, size: 4 },
  'PS': { name: 'Palestine', region: 'Iran', cat: 'war', lat: 31.9, lng: 35.2, size: 4 },
  'AE': { name: 'UAE', region: 'Middle East', cat: 'finance', lat: 23.4, lng: 53.8, size: 5 },
  'IT': { name: 'Italy', region: 'Western', cat: 'world', lat: 41.8, lng: 12.5, size: 5 },
  'ES': { name: 'Spain', region: 'Western', cat: 'world', lat: 40.4, lng: -3.7, size: 5 },
  'AR': { name: 'Argentina', region: 'Western', cat: 'world', lat: -38.4, lng: -63.6, size: 5 },
  'ID': { name: 'Indonesia', region: 'Western', cat: 'world', lat: -0.7, lng: 113.9, size: 6 },
  'TH': { name: 'Thailand', region: 'Western', cat: 'world', lat: 15.8, lng: 100.9, size: 5 },
  'MY': { name: 'Malaysia', region: 'Western', cat: 'world', lat: 4.2, lng: 101.9, size: 4 },
  'VN': { name: 'Vietnam', region: 'Western', cat: 'world', lat: 14.0, lng: 108.2, size: 5 },
  'KE': { name: 'Kenya', region: 'Western', cat: 'world', lat: -0.02, lng: 37.9, size: 4 },
  'ET': { name: 'Ethiopia', region: 'Western', cat: 'world', lat: 9.1, lng: 40.5, size: 4 },
  'CO': { name: 'Colombia', region: 'Western', cat: 'world', lat: 4.5, lng: -74.2, size: 5 },
  'SE': { name: 'Sweden', region: 'Western', cat: 'world', lat: 60.1, lng: 18.6, size: 4 },
  'PL': { name: 'Poland', region: 'Western', cat: 'world', lat: 51.9, lng: 19.1, size: 5 },
  'NL': { name: 'Netherlands', region: 'Western', cat: 'world', lat: 52.1, lng: 5.3, size: 4 },
  'CH': { name: 'Switzerland', region: 'Western', cat: 'finance', lat: 46.8, lng: 8.2, size: 4 },
};

const regionColors = {
  'Western': '#3B82F6',
  'China': '#EF4444',
  'Russia': '#DC2626',
  'Iran': '#22C55E',
  'Middle East': '#F59E0B',
  'Crypto': '#F97316',
  'Tech': '#8B5CF6',
};

export default function WorldMap({ onCountryClick }) {
  const [hovered, setHovered] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);

  // Project lat/lng to circle coordinates
  const project = (lat, lng) => {
    const x = (lng + 180) / 360;
    const y = (90 - lat) / 180;
    return { x: x * 100, y: y * 100 };
  };

  const filtered = activeRegion
    ? Object.entries(countryData).filter(([, d]) => d.region === activeRegion)
    : Object.entries(countryData);

  return (
    <div>
      {/* Region Filter */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <button onClick={() => setActiveRegion(null)} style={{
          padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500, border: '1px solid rgba(255,255,255,0.08)',
          background: !activeRegion ? 'rgba(255,255,255,0.1)' : 'transparent', color: !activeRegion ? 'white' : '#6B6B6B',
          cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif'
        }}>All</button>
        {Object.entries(regionColors).map(([region, color]) => (
          <button key={region} onClick={() => setActiveRegion(activeRegion === region ? null : region)} style={{
            padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 500,
            border: `1px solid ${activeRegion === region ? color : 'rgba(255,255,255,0.08)'}`,
            background: activeRegion === region ? `${color}22` : 'transparent',
            color: activeRegion === region ? color : '#6B6B6B',
            cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif'
          }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: color, marginRight: 6 }} />
            {region}
          </button>
        ))}
      </div>

      {/* Circle Map */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '2/1', background: '#060610', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}>
        {/* Subtle grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 50" preserveAspectRatio="none">
          {[10, 20, 30, 40].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.015)" strokeWidth="0.1" />)}
          {[20, 40, 60, 80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="50" stroke="rgba(255,255,255,0.015)" strokeWidth="0.1" />)}
          {/* Equator */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" strokeDasharray="1,1" />
          {/* Prime meridian */}
          <line x1="50" y1="0" x2="50" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.15" strokeDasharray="1,1" />
        </svg>

        {/* Country dots */}
        {filtered.map(([code, data]) => {
          const { x, y } = project(data.lat, data.lng);
          const isHovered = hovered === code;
          const color = regionColors[data.region] || '#6B6B6B';
          const size = data.size || 5;
          const opacity = activeRegion && data.region !== activeRegion ? 0.1 : 1;

          return (
            <div key={code}
              onMouseEnter={() => setHovered(code)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onCountryClick?.(data.cat, data.name)}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                opacity,
                transition: 'opacity 0.3s, transform 0.2s',
                zIndex: isHovered ? 10 : 1,
              }}>
              {/* Glow */}
              {isHovered && <div style={{
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                width: size * 6, height: size * 6, borderRadius: '50%',
                background: color, opacity: 0.15, filter: 'blur(8px)',
              }} />}

              {/* Pulse ring */}
              {isHovered && <div style={{
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                width: size * 2, height: size * 2, borderRadius: '50%',
                border: `1px solid ${color}`, opacity: 0.6,
                animation: 'map-pulse 1.5s ease-out infinite',
              }} />}

              {/* Dot */}
              <div style={{
                width: size * (isHovered ? 1.4 : 1),
                height: size * (isHovered ? 1.4 : 1),
                borderRadius: '50%',
                background: color,
                border: isHovered ? `2px solid white` : `1px solid ${color}88`,
                transition: 'all 0.2s',
                boxShadow: isHovered ? `0 0 20px ${color}66` : `0 0 8px ${color}33`,
              }} />

              {/* Tooltip */}
              {isHovered && (
                <div style={{
                  position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(6,6,16,0.95)', border: `1px solid ${color}44`, borderRadius: 8,
                  padding: '8px 14px', whiteSpace: 'nowrap', backdropFilter: 'blur(10px)',
                  boxShadow: `0 4px 20px ${color}22`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'white', fontFamily: 'Inter, sans-serif' }}>{data.name}</div>
                  <div style={{ fontSize: 10, color, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em', marginTop: 2 }}>{data.region}</div>
                  <div style={{ fontSize: 9, color: '#6B6B6B', marginTop: 4 }}>Click to view news →</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Region labels */}
        <div style={{ position: 'absolute', top: '15%', left: '15%', fontSize: 14, color: 'rgba(255,255,255,0.03)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em' }}>AMERICAS</div>
        <div style={{ position: 'absolute', top: '12%', left: '43%', fontSize: 14, color: 'rgba(255,255,255,0.03)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em' }}>EUROPE</div>
        <div style={{ position: 'absolute', top: '22%', left: '55%', fontSize: 14, color: 'rgba(255,255,255,0.03)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em' }}>MIDDLE EAST</div>
        <div style={{ position: 'absolute', top: '20%', left: '72%', fontSize: 14, color: 'rgba(255,255,255,0.03)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em' }}>ASIA</div>
        <div style={{ position: 'absolute', top: '55%', left: '42%', fontSize: 14, color: 'rgba(255,255,255,0.03)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em' }}>AFRICA</div>
      </div>

      {/* Pulse animation style */}
      <style>{`
        @keyframes map-pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}