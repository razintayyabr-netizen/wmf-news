'use client';
import { useState, useEffect } from 'react';

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
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
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
      } catch (e) { /* silent fail */ }
    }
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const hero = articles[0];
  const topFive = articles.slice(1, 6);
  const rest = articles.slice(6, 18);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const cat = categories.find(c => c.key === activeCat);

  return (
    <main>
      <nav className="topnav">
        <div className="nav-top">
          <span className="nav-date">{dateStr}</span>
          <span className="nav-edition">Live Aggregation · Zero Editorial</span>
        </div>
        <div className="nav-logo">WMF <em>News</em></div>
        <div className="nav-links">
          {categories.map(c => (
            <a key={c.key} href="#" className={activeCat === c.key ? 'active' : ''}
              onClick={e => { e.preventDefault(); setActiveCat(c.key); }}>
              {c.icon} {c.label}
            </a>
          ))}
          <a href="#" className="live-link"><span className="live-dot" /> Live</a>
        </div>
      </nav>

      <div className="paper-grid">
        <div className="data-bar">
          {markets?.bitcoin && <div className="data-item"><span>BTC</span> <span className="val">${markets.bitcoin.price?.toLocaleString()}</span> <span style={{ color: markets.bitcoin.change_24h > 0 ? '#22c55e' : '#ef4444', fontSize: 11 }}>{markets.bitcoin.change_24h > 0 ? '▲' : '▼'} {Math.abs(markets.bitcoin.change_24h || 0).toFixed(1)}%</span></div>}
          {markets?.ethereum && <div className="data-item"><span>ETH</span> <span className="val">${markets.ethereum.price?.toLocaleString()}</span></div>}
          {markets?.stocks?.sp500 && <div className="data-item"><span>S&P 500</span> <span className="val">{markets.stocks.sp500.price?.toLocaleString(undefined, {maximumFractionDigits: 1})}</span> <span style={{ color: markets.stocks.sp500.change > 0 ? '#22c55e' : '#ef4444', fontSize: 11 }}>{markets.stocks.sp500.change > 0 ? '▲' : '▼'}{Math.abs(markets.stocks.sp500.change || 0).toFixed(0)}</span></div>}
          {markets?.stocks?.dow && <div className="data-item"><span>DOW</span> <span className="val">{markets.stocks.dow.price?.toLocaleString(undefined, {maximumFractionDigits: 0})}</span></div>}
          {markets?.forex?.eur && <div className="data-item"><span>EUR/USD</span> <span className="val">{markets.forex.eur?.toFixed(4)}</span></div>}
          {markets?.commodities?.gold && <div className="data-item"><span>Gold</span> <span className="val">${markets.commodities.gold?.toLocaleString()}</span></div>}
          {markets?.forex?.inr && <div className="data-item"><span>USD/INR</span> <span className="val">₹{markets.forex.inr?.toFixed(2)}</span></div>}
          {!markets && <div className="data-item" style={{ color: '#6B6B6B' }}>Loading market data...</div>}
        </div>

        {loading ? (
          <div className="paper-cell" style={{ gridColumn: '1 / -1', padding: '80px 48px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#6B6B6B', fontFamily: 'var(--mono)' }}>
              Aggregating {cat?.icon} {cat?.label} news from global sources...
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="paper-cell" style={{ gridColumn: '1 / -1', padding: '80px 48px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>Could not reach sources for this category. Try again in a moment.</div>
          </div>
        ) : (
          <>
            {/* HERO */}
            {hero && (
              <a href={hero.url} target="_blank" rel="noopener" className="paper-cell hero-cell story" style={{ gridColumn: '1 / 8' }}>
                <div className="hero-kicker" style={{ color: regionColors[hero.region] || 'var(--red)' }}>
                  {hero.region && <span style={{ fontSize: 9, background: regionColors[hero.region] || '#666', color: 'white', padding: '2px 6px', borderRadius: 3, marginRight: 6 }}>{hero.region}</span>}
                  {hero.source}
                </div>
                <h1 className="hero-headline">{hero.title}</h1>
                <p className="hero-deck">{hero.description}</p>
                <div className="hero-byline">
                  <span className="name" style={{ color: regionColors[hero.region] || 'var(--red)' }}>{hero.source}</span>
                  <span>·</span>
                  <span className="time">{timeAgo(hero.publishedAt)}</span>
                </div>
              </a>
            )}

            {/* TOP 5 SIDEBAR */}
            <div className="paper-cell" style={{ gridColumn: '8 / -1' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: '#6B6B6B', marginBottom: 12, textTransform: 'uppercase' }}>Top Stories</div>
              {topFive.map((a, i) => (
                <a key={i} href={a.url} target="_blank" rel="noopener" className="numbered-item">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="num-title">{a.title}</div>
                    <div className="num-meta">
                      <span style={{ color: regionColors[a.region] || '#999', fontWeight: 500 }}>{a.source}</span>
                      {a.region && <span style={{ marginLeft: 6, fontSize: 9, background: regionColors[a.region] || '#666', color: 'white', padding: '1px 5px', borderRadius: 3 }}>{a.region}</span>}
                      <span style={{ marginLeft: 6 }}>{timeAgo(a.publishedAt)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {hero?.urlToImage && (
              <div className="hero-image" style={{ backgroundImage: `url(${hero.urlToImage})`, backgroundSize: 'cover', backgroundPosition: 'center', gridColumn: '1 / -1' }}>
                <div className="hero-image-text">{hero.source} · {hero.region}</div>
              </div>
            )}

            <div className="rule-red" style={{ gridColumn: '1 / -1' }}></div>

            <div className="section-label" style={{ gridColumn: '1 / -1' }}>
              {cat?.icon} {cat?.label} — More from Global Sources
            </div>

            {rest.map((a, i) => {
              const colSpan = i < 3 ? 4 : 3;
              const startCol = i < 3 ? (i * 4 + 1) : ((i - 3) * 3 + 1);
              return (
                <a key={i} href={a.url} target="_blank" rel="noopener"
                  className="paper-cell story story-small"
                  style={{ gridColumn: `${startCol} / span ${colSpan}` }}>
                  {a.urlToImage && (
                    <div style={{ height: 120, background: `url(${a.urlToImage}) center/cover`, borderRadius: 4, marginBottom: 10 }} />
                  )}
                  <div className="story-kicker" style={{ color: regionColors[a.region] || 'var(--red)' }}>
                    {a.region && <span style={{ fontSize: 9, background: regionColors[a.region] || '#666', color: 'white', padding: '2px 6px', borderRadius: 3, marginRight: 6 }}>{a.region}</span>}
                    {a.source}
                  </div>
                  <h2 className="story-headline">{a.title}</h2>
                  {a.description && <p className="story-deck">{a.description}</p>}
                  <div className="story-meta">{timeAgo(a.publishedAt)}</div>
                </a>
              );
            })}
          </>
        )}

        <div className="newsletter-cell" style={{ gridColumn: '1 / -1' }}>
          <h2 className="nl-title">The <em>Morning</em> Brief</h2>
          <p className="nl-sub">Top stories from every perspective — delivered daily. Free, forever.</p>
          <div className="nl-form">
            <input className="nl-input" placeholder="your@email.com" />
            <button className="nl-btn">Subscribe</button>
          </div>
        </div>
      </div>

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
            <a href="#">Press TV · Fars News</a>
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