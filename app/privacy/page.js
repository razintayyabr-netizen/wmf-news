export const metadata = { title: 'Privacy Policy — WMF News', description: 'Privacy policy for WMF News' };
export default function PrivacyPage() {
  return (
    <main style={{ background: '#FAF8F4', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, marginBottom: 8 }}>Privacy <em style={{ color: '#FF2D2D' }}>Policy</em></h1>
        <div style={{ height: 4, background: '#1A1A1A', width: 60, marginBottom: 32 }} />
        <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: 'JetBrains Mono, monospace', marginBottom: 32 }}>Last updated: April 13, 2026</p>

        {[
          { title: 'Information We Collect', body: 'We collect minimal data. When you visit WMF News, our servers may temporarily process: your IP address (for serving content), browser type, and pages viewed. We do not require account registration, do not collect names, emails, or personal identifiers unless you subscribe to our newsletter.' },
          { title: 'Newsletter', body: 'If you subscribe to "The Morning Brief," we store your email address solely to send the newsletter. We never sell, share, or rent your email. You can unsubscribe at any time via the link in each email.' },
          { title: 'Cookies', body: 'We use minimal cookies for: remembering your preferred news category (essential), and analytics (if enabled). We do not use third-party tracking cookies beyond what is standard for web serving.' },
          { title: 'Third-Party Content', body: 'WMF News displays content from external news sources via RSS feeds. When you click a headline, you leave our site and are subject to the destination website\'s privacy policy. We are not responsible for third-party privacy practices.' },
          { title: 'Data Retention', body: 'Server logs are retained for 30 days then deleted. Newsletter subscriber emails are retained until you unsubscribe.' },
          { title: 'Your Rights', body: 'You may request deletion of any personal data we hold by contacting us. We will comply within 30 days.' },
          { title: 'Children\'s Privacy', body: 'WMF News is not directed at children under 13. We do not knowingly collect personal data from children.' },
          { title: 'Changes', body: 'We may update this policy. Changes will be posted on this page with an updated date.' },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{s.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6B6B6B' }}>{s.body}</p>
          </div>
        ))}

        <p style={{ fontSize: 14, color: '#6B6B6B', marginTop: 40, paddingTop: 20, borderTop: '1px solid #E5E2DB' }}>
          Contact: <a href="mailto:contact@uywnix.com" style={{ color: '#FF2D2D' }}>contact@uywnix.com</a>
        </p>
      </div>
    </main>
  );
}