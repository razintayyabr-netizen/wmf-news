export default function Home() {
  const breakingHeadlines = [
    "Global markets surge as trade deal reached between US and China — Dow up 800+",
    "AI regulation framework passes EU Parliament with overwhelming majority",
    "NASA confirms water ice deposits on Moon's south pole — Artemis III timeline accelerated",
    "Major cybersecurity breach affects 50M users across three major platforms",
  ];

  const topStories = [
    { num: '01', title: 'Global Summit Achieves Landmark Climate Agreement', meta: 'World · 2h ago', excerpt: '195 nations commit to accelerated carbon reduction targets in unprecedented deal.' },
    { num: '02', title: 'Tech Giants Face New Antitrust Legislation', meta: 'Business · 3h ago', excerpt: 'Bipartisan bill targets market dominance of top 5 tech companies.' },
    { num: '03', title: 'Breakthrough Gene Therapy Shows 94% Success Rate', meta: 'Health · 4h ago', excerpt: 'Clinical trials deliver historic results for rare disease treatment.' },
    { num: '04', title: 'SpaceX Starship Completes First Orbital Refueling', meta: 'Technology · 5h ago', excerpt: 'Milestone brings Mars mission timeline closer to reality.' },
    { num: '05', title: 'Central Banks Signal Coordinated Rate Cuts', meta: 'Finance · 6h ago', excerpt: 'Fed, ECB, and BoJ hint at synchronized easing in Q3.' },
  ];

  const categories = ['All', 'World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health'];

  const newsCards = [
    { cat: 'WORLD', title: 'Diplomatic Breakthrough: Middle East Peace Talks Resume', excerpt: 'After 18 months of deadlock, negotiations reopen with new framework proposal.', author: 'Sarah Chen', time: '1h ago' },
    { cat: 'TECH', title: 'Quantum Computing Milestone: 10,000 Qubit Processor Achieved', excerpt: 'IBM unveils processor that could revolutionize drug discovery and cryptography.', author: 'Mike Torres', time: '2h ago' },
    { cat: 'BUSINESS', title: 'Global Supply Chain Shifts: Manufacturing Returns to Western Markets', excerpt: 'Nearshoring trend accelerates as companies rethink dependencies.', author: 'Rachel Kim', time: '3h ago' },
    { cat: 'HEALTH', title: 'New WHO Guidelines Transform Mental Health Treatment Standards', excerpt: 'Updated protocols emphasize community-based care and digital therapeutics.', author: 'Dr. Amara Osei', time: '4h ago' },
    { cat: 'SPORTS', title: 'Historic Upset: Underdog Nation Wins First-Ever World Cup Spot', excerpt: 'Unprecedented qualification stuns football world and inspires a generation.', author: 'James Okafor', time: '5h ago' },
    { cat: 'TECH', title: 'Apple Vision Pro 2 Launches With Brain-Computer Interface', excerpt: 'Next-gen spatial computing device integrates neural input for seamless control.', author: 'Lisa Wang', time: '6h ago' },
    { cat: 'WORLD', title: 'Arctic Ice Recovery Program Shows Promising First Results', excerpt: 'Geoengineering initiative reports 12% ice thickness increase in test zones.', author: 'Erik Nordström', time: '7h ago' },
    { cat: 'BUSINESS', title: 'Cryptocurrency Regulation Framework Finalized by G20', excerpt: 'Unified global standards aim to bring legitimacy and stability to digital assets.', author: 'Priya Sharma', time: '8h ago' },
    { cat: 'ENTERTAINMENT', title: 'Streaming Wars: New Platform Launches With AI-Curated Content', excerpt: 'AI-driven personalization promises to reshape how audiences discover content.', author: 'Alex Rivera', time: '9h ago' },
  ];

  const editorials = [
    { label: 'EDITORIAL', title: 'The AI Paradox: Why Regulation Must Outpace Innovation', excerpt: 'As AI capabilities accelerate exponentially, our regulatory frameworks remain linear. The gap between what we can build and what we should build has never been wider.', author: 'Dr. Maya Patel', role: 'Tech Ethics Editor' },
    { label: 'ANALYSIS', title: 'The New Cold War: Technology Supply Chains as Battlefield', excerpt: 'Semiconductor sovereignty has become the defining strategic priority of the decade. The nations that control chip production will shape the next century.', author: 'Marcus Webb', role: 'Global Affairs' },
  ];

  const opinions = [
    { text: 'We are sleepwalking into an era where algorithms make life-altering decisions without accountability.', author: 'Prof. James Liu, AI Ethics' },
    { text: 'The climate agreement is historic, but implementation is where most deals go to die.', author: 'Maria Santos, Climate Policy' },
    { text: 'Central bank coordination sounds great until one of them blinks first.', author: 'Robert Chen, Economics' },
    { text: 'The quantum computing race is the new space race — and the stakes are even higher.', author: 'Dr. Anya Volkov, Physics' },
  ];

  return (
    <main>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo"><span className="dot" /> WMF News</div>
          <div className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#world">World</a>
            <a href="#business">Business</a>
            <a href="#tech">Technology</a>
            <a href="#sports">Sports</a>
            <a href="#health">Health</a>
            <div className="live-badge"><span className="dot" /> LIVE</div>
          </div>
        </div>
      </nav>

      {/* BREAKING TICKER */}
      <div className="breaking-bar">
        <span className="tag">BREAKING</span>
        <div className="ticker">
          {breakingHeadlines.map((h, i) => <span key={i} style={{ marginRight: 80 }}>{h}</span>)}
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-img" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <div className="hero-tag">EXCLUSIVE</div>
              <h1 className="hero-title">Global Leaders Unveil Revolutionary AI Governance Framework</h1>
              <p className="hero-excerpt">In an unprecedented move, 40 nations agree on binding AI safety standards, mandatory transparency requirements, and a new international oversight body with enforcement powers.</p>
              <div className="hero-meta">
                <span className="author">Sarah Chen</span>
                <span>·</span>
                <span>12 min read</span>
                <span>·</span>
                <span>1 hour ago</span>
              </div>
            </div>
          </div>
          <div className="hero-sidebar">
            {topStories.map((s, i) => (
              <div key={i} className="side-card">
                <div className="side-num">{s.num}</div>
                <div>
                  <div className="side-title">{s.title}</div>
                  <div className="side-meta">{s.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-ticker">
        <div className="stats-inner">
          <div className="stat-item"><div className="num">2.4M</div><div className="label">Daily Readers</div></div>
          <div className="stat-item"><div className="num">180+</div><div className="label">Countries Covered</div></div>
          <div className="stat-item"><div className="num">500+</div><div className="label">Journalists</div></div>
          <div className="stat-item"><div className="num">24/7</div><div className="label">Live Coverage</div></div>
        </div>
      </div>

      {/* LATEST NEWS */}
      <section id="world" className="section">
        <div className="section-header">
          <h2 className="section-title"><span className="bar" /> Latest News</h2>
          <a href="#" className="section-link">View All →</a>
        </div>
        <div className="cat-tabs">
          {categories.map((c, i) => <div key={i} className={`cat-tab ${i === 0 ? 'active' : ''}`}>{c}</div>)}
        </div>
        <div className="news-grid">
          {newsCards.map((n, i) => (
            <div key={i} className="news-card">
              <div className="news-card-img">
                <div className="cat-badge">{n.cat}</div>
              </div>
              <div className="news-card-body">
                <div className="news-card-title">{n.title}</div>
                <div className="news-card-excerpt">{n.excerpt}</div>
                <div className="news-card-meta">
                  <span>{n.author}</span>
                  <span>{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL PICKS */}
      <section className="editorial">
        <div className="editorial-inner">
          <div className="section-header">
            <h2 className="section-title"><span className="bar" /> Editorial Picks</h2>
          </div>
          <div className="editorial-grid">
            {editorials.map((e, i) => (
              <div key={i} className="editorial-card">
                <div>
                  <div className="editorial-label">{e.label}</div>
                  <h3 className="editorial-title">{e.title}</h3>
                  <p className="editorial-excerpt">{e.excerpt}</p>
                </div>
                <div className="editorial-author">
                  <div className="editorial-avatar" />
                  <div className="editorial-author-info">
                    <div className="name">{e.author}</div>
                    <div className="role">{e.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPINIONS */}
      <section id="opinion" className="section">
        <div className="section-header">
          <h2 className="section-title"><span className="bar" /> Voices & Opinion</h2>
          <a href="#" className="section-link">All Opinions →</a>
        </div>
        <div className="opinion-strip">
          {opinions.map((o, i) => (
            <div key={i} className="opinion-card">
              <div className="opinion-quote">&ldquo;</div>
              <p className="opinion-text">{o.text}</p>
              <div className="opinion-author">— {o.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <h2 className="newsletter-title">Stay Informed</h2>
          <p className="newsletter-desc">Get the most important stories delivered to your inbox every morning. No noise, just news.</p>
          <div className="newsletter-form">
            <input className="newsletter-input" placeholder="Enter your email" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-text">WMF News</div>
            <p className="desc">Independent global journalism. Breaking stories, deep analysis, and diverse perspectives from around the world.</p>
          </div>
          <div className="footer-col">
            <h4>Sections</h4>
            <a href="#">World</a><a href="#">Business</a><a href="#">Technology</a><a href="#">Sports</a><a href="#">Health</a><a href="#">Entertainment</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a><a href="#">Careers</a><a href="#">Press</a><a href="#">Ethics Policy</a><a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <a href="#">Twitter / X</a><a href="#">YouTube</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">RSS Feed</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WMF News. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </footer>
    </main>
  );
}