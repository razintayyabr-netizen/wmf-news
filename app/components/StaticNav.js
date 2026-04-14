export default function StaticNav() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <a href="/" style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, color: '#FAF8F4' }}>WMF <em style={{ color: '#FF2D2D', fontStyle: 'italic' }}>News</em></a>
      <div style={{ display: 'flex', gap: 20 }}>
        <a href="/" style={{ fontSize: 13, color: '#9CA3AF', transition: 'color 0.2s' }}>Home</a>
        <a href="/about" style={{ fontSize: 13, color: '#9CA3AF' }}>About</a>
        <a href="/contact" style={{ fontSize: 13, color: '#9CA3AF' }}>Contact</a>
      </div>
    </nav>
  );
}