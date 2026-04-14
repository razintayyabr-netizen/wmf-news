'use client';
import { useState, useEffect } from 'react';

const categories = [
  { key: 'general', label: 'World', icon: '🌍' },
  { key: 'finance', label: 'Finance', icon: '💰' },
  { key: 'crypto', label: 'Crypto', icon: '₿' },
  { key: 'geopolitics', label: 'Geopolitics', icon: '🏛️' },
  { key: 'war', label: 'War & Conflict', icon: '⚔️' },
  { key: 'technology', label: 'Technology', icon: '💻' },
  { key: 'sports', label: 'Sports', icon: '🏆' },
  { key: 'health', label: 'Health', icon: '🏥' },
];

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Home() {
  const [activeCat, setActiveCat] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allNews, setAllNews] = useState({});

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
        if (data.articles?.length > 0) {
          setArticles(data.articles);
          setAllNews(prev => ({ ...prev, [activeCat]: data.articles }));
        } else {
          setArticles([]);
        }
      } catch (e) {
        setArticles([]);
      }
      setLoading(false);
    }
    fetchNews();
  }, [activeCat]);

  const hero = articles[0];
  const topFive = articles.slice(1, 6);
  const rest = articles.slice(6);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main>
      {/* NAV */}
      <nav className="topnav">
        <div className="nav-top">
          <span className="nav-date">{dateStr}</span>
          <span className="nav-edition">Live Edition</span>
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
        {/* DATA TICKER */}
        <div className="data-bar">
          <div className="data-item"><span>S&P 500</span> <span className="val">▲ 2.3%</span></div>
          <div className="data-item"><span>BTC</span> <span className="val">$87,420</span></div>
          <div className="data-item"><span>EUR/USD</span> <span className="val">1.0847</span></div>
          <div className="data-item"><span>Gold</span> <span className="val">$3,241/oz</span></div>
          <div className="data-item"><span>Oil</span> <span className="val">$71.20</span></div>
        </div>

        {loading ? (
          <div className="paper-cell" style={{ gridColumn: '1 / -1', padding: '80px 48px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, color: '#6B6B6B', fontFamily: 'var(--mono)' }}>Loading {categories.find(c => c.key === activeCat)?.label} news...</div>
          </div>
        ) : articles.length === 0 ? (
          <div className="paper-cell" style={{ gridColumn: '1 / -1', padding: '80px 48px', textAlign: 'center' }}>
            <div style={{ fontSize: 16, color: '#6B6B6B' }}>No articles found for this category. Try another section.</div>
          </div>
        ) : (
          <>
            {/* HERO */}
            {hero && (
              <a href={hero.url} target="_blank" rel="noopener" className="paper-cell hero-cell story" style={{ gridColumn: '1 / 8' }}>
                <div className="hero-kicker">{hero.source}</div>
                <h1 className="hero-headline">{hero.title}</h1>
                <p className="hero-deck">{hero.description}</p>
                <div className="hero-byline">
                  {hero.author && <span className="name">{hero.author}</span>}
                  {hero.author && <span>·</span>}
                  <span className="time">{timeAgo(hero.publishedAt)}</span>
                </div>
              </a>
            )}

            {/* TOP 5 SIDEBAR */}
            <div className="paper-cell" style={{ gridColumn: '8 / -1' }}>
              {topFive.map((a, i) => (
                <a key={i} href={a.url} target="_blank" rel="noopener" className="numbered-item">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="num-title">{a.title}</div>
                    <div className="num-meta">{a.source} · {timeAgo(a.publishedAt)}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* FEATURED IMAGE */}
            {hero?.urlToImage && (
              <div className="hero-image" style={{ backgroundImage: `url(${hero.urlToImage})`, backgroundSize: 'cover', backgroundPosition: 'center', gridColumn: '1 / -1' }}>
                <div className="hero-image-text">{hero.source}</div>
              </div>
            )}

            <div className="rule-red" style={{ gridColumn: '1 / -1' }}></div>

            {/* SECTION LABEL */}
            <div className="section-label" style={{ gridColumn: '1 / -1' }}>More in {categories.find(c => c.key === activeCat)?.label}</div>

            {/* REST OF ARTICLES */}
            {rest.map((a, i) => {
              const cols = i < 3 ? 'span 4' : 'span 3';
              const start = i < 3 ? (i * 4 + 1) : ((i - 3) * 3 + 1);
              if (i >= 3 + 4) return null;
              return (
                <a key={i} href={a.url} target="_blank" rel="noopener"
                  className="paper-cell story story-small"
                  style={{ gridColumn: `${start} / span ${cols}` }}>
                  {a.urlToImage && (
                    <div style={{ height: 140, background: `url(${a.urlToImage}) center/cover`, borderRadius: 4, marginBottom: 12 }} />
                  )}
                  <div className="story-kicker">{a.source}</div>
                  <h2 className="story-headline">{a.title}</h2>
                  {a.description && <p className="story-deck">{a.description}</p>}
                  <div className="story-meta">{timeAgo(a.publishedAt)}</div>
                </a>
              );
            })}
          </>
        )}

        {/* NEWSLETTER */}
        <div className="newsletter-cell" style={{ gridColumn: '1 / -1' }}>
          <h2 className="nl-title">The <em>Morning</em> Brief</h2>
          <p className="nl-sub">The 5 stories that matter — delivered before your coffee. Free, forever.</p>
          <div className="nl-form">
            <input className="nl-input" placeholder="your@email.com" />
            <button className="nl-btn">Subscribe</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">WMF <em>News</em></div>
            <p className="footer-brand-desc">Independent global journalism. Real-time news from trusted sources worldwide.</p>
          </div>
          <div className="footer-col">
            <h5>Sections</h5>
            {categories.map(c => <a key={c.key} href="#" onClick={e => { e.preventDefault(); setActiveCat(c.key); }}>{c.icon} {c.label}</a>)}
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#">About</a><a href="#">Careers</a><a href="#">Press</a><a href="#">Ethics</a><a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <a href="#">Twitter / X</a><a href="#">YouTube</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">RSS</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WMF News. All rights reserved.</span>
          <span>Privacy · Terms · Corrections</span>
        </div>
      </footer>
    </main>
  );
}