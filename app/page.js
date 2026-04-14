'use client';
import { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';

const categories = [
  { key: 'world', label: 'World', icon: '🌍' },
  { key: 'finance', label: 'Finance', icon: '💰' },
  { key: 'crypto', label: 'Crypto', icon: '₿' },
  { key: 'geopolitics', label: 'Geopolitics', icon: '🏛️' },
  { key: 'war', label: 'War & Conflict', icon: '⚔️' },
  { key: 'technology', label: 'Technology', icon: '💻' },
  { key: 'china', label: 'China', icon: '🇨🇳' },
  { key: 'russia', label: 'Russia', icon: '🇷🇺' },
  { key: 'iran', label: 'Iran', icon: '🇮🇷' },
];

const regionColors = {
  'Western': '#2D7DD2',
  'China': '#DE2910',
  'Russia': '#D52B1E',
  'Iran': '#239F40',
  'Middle East': '#B8860B',
  'Crypto': '#F7931A',
  'Tech': '#6366F1',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Home() {
  const [activeCat, setActiveCat] = useState('world');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allNews, setAllNews] = useState({});
  const [markets, setMarkets] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      if (allNews[activeCat]) {
        setArticles(allNews[activeCat]);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/news?category=${activeCat}`);
        const data = await res.json();
        const arts = data.articles || [];
        setArticles(arts);
        setAllNews(prev => ({ ...prev, [activeCat]: arts }));
      } catch (e) {
        setArticles([]);
      }
      setLoading(false);
    }
    fetchNews();
  }, [activeCat]);

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await fetch('/api/markets');
        const data = await res.json();
        if (data.status === 'ok') setMarkets(data);
      } catch (e) {}
    }
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 60000);
    return () => clearInterval(interval);
  }, []);

  const hero = articles[0];
  const grid = articles.slice(1);
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main>
      {/* NAV */}
      <nav className="topnav">
        <div className="nav-inner">
          <a href="/" style={{ textDecoration: 'none' }}><div className="nav-logo"><span className="dot" /> WMF <em>News</em></div></a>
          <div className="nav-links">
            {categories.map(c => (
              <a key={c.key} href="#" className={activeCat === c.key ? 'active' : ''}
                onClick={e => { e.preventDefault(); setActiveCat(c.key); }}>{c.icon} {c.label}</a>
            ))}
            <a href="#" className="live-link"><span className="live-dot" /> Live</a>
          </div>
        </div>
      </nav>

      {/* MARKET BAR */}
      <div className="data-bar">
        {markets?.bitcoin && <div className="data-item"><span>BTC</span> <span className="val">${markets.bitcoin.price?.toLocaleString()}</span> <span style={{ color: markets.bitcoin.change_24h > 0 ? '#22c55e' : '#ef4444', fontSize: 11 }}>{markets.bitcoin.change_24h > 0 ? '▲' : '▼'}{Math.abs(markets.bitcoin.change_24h || 0).toFixed(1)}%</span></div>}
        {markets?.ethereum && <div className="data-item"><span>ETH</span> <span className="val">${markets.ethereum.price?.toLocaleString()}</span></div>}
        {markets?.stocks?.sp500 && <div className="data-item"><span>S&P 500</span> <span className="val">{markets.stocks.sp500.price?.toLocaleString(undefined, {maximumFractionDigits: 1})}</span></div>}
        {markets?.forex?.eur && <div className="data-item"><span>EUR/USD</span> <span className="val">{markets.forex.eur?.toFixed(4)}</span></div>}
        {markets?.commodities?.gold && <div className="data-item"><span>Gold</span> <span className="val">${markets.commodities.gold?.toLocaleString()}</span></div>}
        {markets?.forex?.inr && <div className="data-item"><span>USD/INR</span> <span className="val">₹{markets.forex.inr?.toFixed(2)}</span></div>}
        {!markets && <div className="data-item" style={{ color: '#6B6B6B' }}>Loading markets...</div>}
      </div>

      {/* DATE BAR */}
      <div style={{ textAlign: 'center', padding: '16px 24px', fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.2em', color: '#6B6B6B', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>
        {dateStr} · Live Aggregation · Zero Editorial
      </div>

      {/* WORLD MAP */}
      <div style={{ background: '#0A0A0F', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1340, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.3em', color: '#FF2D2D', textTransform: 'uppercase', marginBottom: 8 }}>// Live Global Map</div>
            <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, color: '#FAF8F4', marginBottom: 8 }}>What's Happening <em style={{ color: '#FF2D2D' }}>Where</em></h2>
            <p style={{ fontSize: 14, color: '#6B6B6B' }}>Click any country dot to see its latest news</p>
          </div>
          <WorldMap onCountryClick={(cat, name) => { setActiveCat(cat); }} />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '120px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#6B6B6B', fontFamily: 'var(--mono)' }}>
            Aggregating {categories.find(c => c.key === activeCat)?.icon} {categories.find(c => c.key === activeCat)?.label} news...
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div style={{ padding: '120px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#6B6B6B' }}>Could not reach sources. Try again in a moment.</div>
        </div>
      ) : (
        <>
          {/* HERO — FULL WIDTH BIG IMAGE */}
          {hero && (
            <a href={hero.url} target="_blank" rel="noopener" style={{ display: 'block', position: 'relative', height: 520, overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'absolute', inset: 0 }}>
                {hero.urlToImage ? (
                  <img src={hero.urlToImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 40%, transparent 100%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 48px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {hero.region && <span style={{ fontSize: 11, background: regionColors[hero.region] || '#666', color: 'white', padding: '4px 10px', borderRadius: 6, fontWeight: 600, letterSpacing: '0.08em' }}>{hero.region}</span>}
                  <span style={{ fontSize: 11, background: '#FF2D2D', color: 'white', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>{hero.source}</span>
                </div>
                <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 48, lineHeight: 1.1, color: 'white', marginBottom: 12, letterSpacing: '-0.02em' }}>{hero.title}</h1>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#9CA3AF' }}>{timeAgo(hero.publishedAt)}</div>
              </div>
            </a>
          )}

          {/* GRID — BIG CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: 'var(--border)' }}>
            {grid.slice(0, 12).map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener" style={{ display: 'flex', flexDirection: 'row', background: 'var(--cream)', textDecoration: 'none', color: 'inherit', transition: 'background 0.2s', minHeight: 200 }}
                onMouseEnter={e => e.currentTarget.style.background = '#F3F0EA'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--cream)'}>
                <div style={{ width: '45%', minHeight: 200, overflow: 'hidden', flexShrink: 0 }}>
                  {a.urlToImage ? (
                    <img src={a.urlToImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }} />
                  )}
                </div>
                <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                    {a.region && <span style={{ fontSize: 9, background: regionColors[a.region] || '#666', color: 'white', padding: '2px 6px', borderRadius: 3, fontWeight: 600, letterSpacing: '0.05em' }}>{a.region}</span>}
                    <span style={{ fontSize: 9, color: '#999', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>{a.source}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, lineHeight: 1.3, marginBottom: 8 }}>{a.title}</h3>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#B0B0B0' }}>{timeAgo(a.publishedAt)}</div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {/* NEWSLETTER */}
      <div style={{ background: '#1A1A1A', color: '#FAF8F4', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, marginBottom: 8 }}>The <em style={{ color: '#FF2D2D' }}>Morning</em> Brief</h2>
        <p style={{ fontSize: 15, color: '#6B6B6B', marginBottom: 24 }}>Top stories from every perspective — delivered daily.</p>
        <div style={{ display: 'flex', gap: 8, maxWidth: 480, margin: '0 auto' }}>
          <input style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '14px 16px', color: 'white', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }} placeholder="your@email.com" />
          <button style={{ background: '#FF2D2D', color: 'white', border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Subscribe</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">WMF <em>News</em></div>
            <p className="footer-brand-desc">100% aggregated. Zero editorial. News from BBC, CNN, Reuters, WSJ, Bloomberg, Al Jazeera, CGTN, Xinhua, RT, TASS, Press TV & more.</p>
          </div>
          <div className="footer-col">
            <h5>Sections</h5>
            {categories.map(c => <a key={c.key} href="#" onClick={e => { e.preventDefault(); setActiveCat(c.key); }}>{c.icon} {c.label}</a>)}
          </div>
          <div className="footer-col">
            <h5>Sources</h5>
            <a href="#">BBC · CNN · Reuters</a>
            <a href="#">WSJ · Bloomberg · CNBC</a>
            <a href="#">Al Jazeera · Guardian</a>
            <a href="#">CGTN · Xinhua</a>
            <a href="#">RT · TASS</a>
            <a href="#">Press TV</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WMF News · Aggregated from global sources · No editorial content</span>
          <span><a href="/privacy" style={{ color: '#888' }}>Privacy</a> · <a href="/terms" style={{ color: '#888' }}>Terms</a> · <a href="/contact" style={{ color: '#888' }}>Contact</a></span>
        </div>
      </footer>
    </main>
  );
}