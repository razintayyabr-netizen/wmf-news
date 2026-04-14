'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('All');
  const cats = ['All', 'World', 'Business', 'Tech', 'Sports', 'Health', 'Culture'];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main>
      {/* NAV */}
      <nav className="topnav">
        <div className="nav-top">
          <span className="nav-date">{dateStr}</span>
          <span className="nav-edition">Morning Edition</span>
        </div>
        <div className="nav-logo">WMF <em>News</em></div>
        <div className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#world">World</a>
          <a href="#business">Business</a>
          <a href="#tech">Tech</a>
          <a href="#sports">Sports</a>
          <a href="#health">Health</a>
          <a href="#culture">Culture</a>
          <a href="#" className="live-link"><span className="live-dot" /> Live</a>
        </div>
      </nav>

      {/* NEWSPAPER GRID */}
      <div className="paper-grid">

        {/* DATA TICKER */}
        <div className="data-bar">
          <div className="data-item"><span>S&P 500</span> <span className="val">▲ 2.3%</span></div>
          <div className="data-item"><span>BTC</span> <span className="val">$87,420</span></div>
          <div className="data-item"><span>EUR/USD</span> <span className="val">1.0847</span></div>
          <div className="data-item"><span>Gold</span> <span className="val">$3,241/oz</span></div>
          <div className="data-item"><span>Oil</span> <span className="val">$71.20</span></div>
          <div className="data-item"><span>Temp NYC</span> <span className="val">54°F</span></div>
        </div>

        {/* HERO */}
        <div className="hero-cell story">
          <div className="hero-kicker">Exclusive Report</div>
          <h1 className="hero-headline">Global Leaders Unveil <em>Revolutionary</em> AI Governance Framework</h1>
          <p className="hero-deck">In an unprecedented move, 40 nations agree on binding AI safety standards, mandatory transparency requirements, and a new international oversight body with enforcement powers.</p>
          <div className="hero-byline">
            <span className="name">Sarah Chen</span>
            <span>·</span>
            <span className="time">12 min read · 1h ago</span>
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <div className="hero-image">
          <div className="hero-image-text">WORLD · AI SUMMIT 2026 · GENEVA</div>
        </div>

        {/* SECTION: TOP STORIES */}
        <div className="section-label" style={{ gridColumn: '1 / -1' }}>Top Stories</div>

        {/* Story 1 — large, spans 7 cols */}
        <div className="paper-cell story story-large" style={{ gridColumn: '1 / 8' }}>
          <div className="story-kicker">Diplomacy</div>
          <h2 className="story-headline">Middle East Peace Talks <em>Resume</em> After 18-Month Deadlock</h2>
          <p className="story-deck">New framework proposal gains traction as regional powers signal willingness to compromise on key security guarantees.</p>
          <div className="story-meta">Rachel Kim · 2h ago</div>
        </div>

        {/* Side: Numbered list, spans 5 cols */}
        <div className="paper-cell" style={{ gridColumn: '8 / -1' }}>
          <div className="numbered-item"><span className="num">1</span><div><div className="num-title">Tech Giants Face New Antitrust Bill</div><div className="num-meta">Business · 3h</div></div></div>
          <div className="numbered-item"><span className="num">2</span><div><div className="num-title">Gene Therapy Shows 94% Success Rate</div><div className="num-meta">Health · 4h</div></div></div>
          <div className="numbered-item"><span className="num">3</span><div><div className="num-title">Starship Completes Orbital Refueling</div><div className="num-meta">Tech · 5h</div></div></div>
          <div className="numbered-item"><span className="num">4</span><div><div className="num-title">Central Banks Signal Rate Cuts</div><div className="num-meta">Finance · 6h</div></div></div>
          <div className="numbered-item" style={{ borderBottom: 'none' }}><span className="num">5</span><div><div className="num-title">Arctic Ice Recovery Shows Results</div><div className="num-meta">World · 7h</div></div></div>
        </div>

        {/* Divider */}
        <div className="rule-red" style={{ gridColumn: '1 / -1' }}></div>

        {/* Story 2 — 4 cols */}
        <div className="paper-cell story story-small" style={{ gridColumn: '1 / 5' }}>
          <div className="story-kicker">Quantum</div>
          <h2 className="story-headline">10,000 Qubit Processor <em>Achieved</em></h2>
          <p className="story-deck">IBM unveils processor that could revolutionize drug discovery and cryptography.</p>
          <div className="story-meta">Mike Torres · 2h ago</div>
        </div>

        {/* PULL QUOTE — 4 cols */}
        <div className="paper-cell pullquote" style={{ gridColumn: '5 / 9' }}>
          We are sleepwalking into an era where algorithms make life-altering decisions without accountability.
          <div className="pullquote-attr">— Prof. James Liu, AI Ethics Institute</div>
        </div>

        {/* Story 3 — 4 cols */}
        <div className="paper-cell story story-small" style={{ gridColumn: '9 / -1' }}>
          <div className="story-kicker">Markets</div>
          <h2 className="story-headline">Supply Chains <em>Shift West</em></h2>
          <p className="story-deck">Nearshoring accelerates as companies rethink global dependencies.</p>
          <div className="story-meta">James Okafor · 3h ago</div>
        </div>

        {/* Divider */}
        <div className="rule" style={{ gridColumn: '1 / -1' }}></div>

        {/* SECTION: OPINION */}
        <div className="section-label" style={{ gridColumn: '1 / -1' }}>Opinion</div>

        <div className="paper-cell opinion-card" style={{ gridColumn: '1 / 5' }}>
          <div className="opinion-label">Editorial</div>
          <h3 className="opinion-headline">The AI Paradox: Why Regulation Must Outpace Innovation</h3>
          <div className="opinion-author">Dr. Maya Patel · Tech Ethics Editor</div>
        </div>

        <div className="paper-cell opinion-card" style={{ gridColumn: '5 / 9' }}>
          <div className="opinion-label">Analysis</div>
          <h3 className="opinion-headline">Technology Supply Chains as the New Battlefield</h3>
          <div className="opinion-author">Marcus Webb · Global Affairs</div>
        </div>

        <div className="paper-cell opinion-card" style={{ gridColumn: '9 / -1' }}>
          <div className="opinion-label">Column</div>
          <h3 className="opinion-headline">The Climate Deal Is Historic — But Will It Survive Implementation?</h3>
          <div className="opinion-author">Maria Santos · Climate Policy</div>
        </div>

        {/* Divider */}
        <div className="rule" style={{ gridColumn: '1 / -1' }}></div>

        {/* SECTION: MORE NEWS */}
        <div className="section-label" style={{ gridColumn: '1 / -1' }}>More Coverage</div>

        <div className="paper-cell story story-small" style={{ gridColumn: '1 / 5' }}>
          <div className="story-kicker">Health</div>
          <h2 className="story-headline">WHO Overhauls <em>Mental Health</em> Guidelines</h2>
          <p className="story-deck">Updated protocols emphasize community care and digital therapeutics.</p>
          <div className="story-meta">Dr. Amara Osei · 4h ago</div>
        </div>

        <div className="paper-cell story story-small" style={{ gridColumn: '5 / 9' }}>
          <div className="story-kicker">Sports</div>
          <h2 className="story-headline">Underdog Nation Wins <em>First</em> World Cup Spot</h2>
          <p className="story-deck">Unprecedented qualification stuns football world.</p>
          <div className="story-meta">James Okafor · 5h ago</div>
        </div>

        <div className="paper-cell story story-small" style={{ gridColumn: '9 / -1' }}>
          <div className="story-kicker">Culture</div>
          <h2 className="story-headline">AI-Curated Streaming Platform <em>Launches</em></h2>
          <p className="story-deck">Personalization promises to reshape content discovery.</p>
          <div className="story-meta">Alex Rivera · 9h ago</div>
        </div>

        {/* Second row */}
        <div className="paper-cell story story-tiny" style={{ gridColumn: '1 / 4' }}>
          <div className="story-kicker">Finance</div>
          <h2 className="story-headline">G20 Finalizes Crypto Framework</h2>
          <div className="story-meta">Priya Sharma · 8h ago</div>
        </div>

        <div className="paper-cell story story-tiny" style={{ gridColumn: '4 / 7' }}>
          <div className="story-kicker">Tech</div>
          <h2 className="story-headline">Apple Vision Pro 2 With BCI</h2>
          <div className="story-meta">Lisa Wang · 6h ago</div>
        </div>

        <div className="paper-cell story story-tiny" style={{ gridColumn: '7 / 10' }}>
          <div className="story-kicker">World</div>
          <h2 className="story-headline">Arctic Ice Recovery Progress</h2>
          <div className="story-meta">Erik Nordström · 7h ago</div>
        </div>

        <div className="paper-cell story story-tiny" style={{ gridColumn: '10 / -1' }}>
          <div className="story-kicker">Space</div>
          <h2 className="story-headline">Mars Colony Blueprint Revealed</h2>
          <div className="story-meta">Kenji Tanaka · 10h ago</div>
        </div>

        {/* Divider */}
        <div className="rule-thick" style={{ gridColumn: '1 / -1' }}></div>

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
            <p className="footer-brand-desc">Independent global journalism. Rigorous reporting, diverse perspectives, zero noise.</p>
          </div>
          <div className="footer-col">
            <h5>Sections</h5>
            <a href="#">World</a><a href="#">Business</a><a href="#">Technology</a><a href="#">Sports</a><a href="#">Health</a><a href="#">Culture</a>
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