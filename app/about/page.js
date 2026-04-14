export const metadata = { title: 'About — WMF News', description: 'About WMF News aggregation platform' };
export default function AboutPage() {
  return (
    <main style={{ background: '#FAF8F4', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, marginBottom: 8 }}>About <em style={{ color: '#FF2D2D' }}>WMF News</em></h1>
        <div style={{ height: 4, background: '#1A1A1A', width: 60, marginBottom: 32 }} />

        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#2A2A2A', marginBottom: 24 }}>
          <strong>WMF News</strong> is a global news aggregation platform. We do not produce, write, or edit any news content. Every article, headline, and image on this website is sourced directly from established news organizations around the world.
        </p>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginTop: 40, marginBottom: 12 }}>How It Works</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6B6B6B', marginBottom: 24 }}>
          We use RSS (Really Simple Syndication) feeds — a standard, open technology that news publishers make publicly available. Our system automatically fetches these feeds every 5 minutes and displays the latest headlines. Every story links directly to the original source.
        </p>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginTop: 40, marginBottom: 12 }}>Our Sources</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6B6B6B', marginBottom: 16 }}>
          We aggregate from diverse global perspectives to give readers a complete picture:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#F3F0EA', padding: 20, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#2D7DD2', marginBottom: 8, letterSpacing: '0.1em' }}>WESTERN</div>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>BBC · CNN · Reuters · The Guardian · DW · France 24</div>
          </div>
          <div style={{ background: '#F3F0EA', padding: 20, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#DE2910', marginBottom: 8, letterSpacing: '0.1em' }}>CHINA</div>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>CGTN · Xinhua</div>
          </div>
          <div style={{ background: '#F3F0EA', padding: 20, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#D52B1E', marginBottom: 8, letterSpacing: '0.1em' }}>RUSSIA</div>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>RT · TASS</div>
          </div>
          <div style={{ background: '#F3F0EA', padding: 20, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#239F40', marginBottom: 8, letterSpacing: '0.1em' }}>IRAN</div>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>Press TV</div>
          </div>
          <div style={{ background: '#F3F0EA', padding: 20, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#B8860B', marginBottom: 8, letterSpacing: '0.1em' }}>MIDDLE EAST</div>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>Al Jazeera</div>
          </div>
          <div style={{ background: '#F3F0EA', padding: 20, borderRadius: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#F7931A', marginBottom: 8, letterSpacing: '0.1em' }}>FINANCE & CRYPTO</div>
            <div style={{ fontSize: 14, color: '#6B6B6B' }}>CNBC · CoinDesk · Cointelegraph</div>
          </div>
        </div>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginTop: 40, marginBottom: 12 }}>Editorial Policy</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6B6B6B', marginBottom: 24 }}>
          WMF News has zero editorial content. We do not write, modify, or curate news stories. We do not endorse any viewpoint. Our role is purely to aggregate and organize publicly available RSS feeds so readers can see multiple perspectives on world events in one place.
        </p>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginTop: 40, marginBottom: 12 }}>Fair Use & Attribution</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6B6B6B' }}>
          All content belongs to its respective publishers. We only display headlines and short descriptions with direct links to the original articles. If you are a publisher and wish to have your feed removed, please contact us.
        </p>
      </div>
    </main>
  );
}