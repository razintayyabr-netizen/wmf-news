export const metadata = { title: 'Contact — WMF News', description: 'Contact WMF News' };
export default function ContactPage() {
  return (
    <main style={{ background: '#FAF8F4', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, marginBottom: 8 }}>Contact <em style={{ color: '#FF2D2D' }}>Us</em></h1>
        <div style={{ height: 4, background: '#1A1A1A', width: 60, marginBottom: 32 }} />

        <div style={{ background: '#F3F0EA', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Get in Touch</h2>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: '#2A2A2A' }}>
            <p style={{ marginBottom: 12 }}><strong>Email:</strong> <a href="mailto:contact@uywnix.com" style={{ color: '#FF2D2D' }}>contact@uywnix.com</a></p>
            <p style={{ marginBottom: 12 }}><strong>Publisher Removal Requests:</strong> If you represent a news organization and want your RSS feed removed, email us and we will comply within 48 hours.</p>
            <p style={{ marginBottom: 12 }}><strong>Bug Reports:</strong> Found a broken link or display issue? Let us know.</p>
            <p><strong>General Inquiries:</strong> We welcome questions about our aggregation service.</p>
          </div>
        </div>

        <div style={{ background: '#1A1A1A', borderRadius: 12, padding: 32, color: '#FAF8F4' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Send a Message</h2>
          <form action="mailto:contact@uywnix.com" method="POST" encType="text/plain">
            <input type="text" name="subject" placeholder="Subject" style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 14, color: 'white', fontSize: 14, marginBottom: 12, outline: 'none' }} />
            <textarea name="body" placeholder="Your message..." rows={5} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 14, color: 'white', fontSize: 14, marginBottom: 16, outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
            <button type="submit" style={{ background: '#FF2D2D', color: 'white', border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send Message</button>
          </form>
        </div>
      </div>
    </main>
  );
}