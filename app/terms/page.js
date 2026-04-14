export const metadata = { title: 'Terms of Service — WMF News', description: 'Terms of service for WMF News' };
export default function TermsPage() {
  return (
    <main style={{ background: '#FAF8F4', minHeight: '100vh', paddingTop: 120 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
        <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, marginBottom: 8 }}>Terms of <em style={{ color: '#FF2D2D' }}>Service</em></h1>
        <div style={{ height: 4, background: '#1A1A1A', width: 60, marginBottom: 32 }} />
        <p style={{ fontSize: 13, color: '#6B6B6B', fontFamily: 'JetBrains Mono, monospace', marginBottom: 32 }}>Last updated: April 13, 2026</p>

        {[
          { title: 'Nature of Service', body: 'WMF News is a news aggregation service. We display headlines and descriptions from publicly available RSS feeds. We do not produce, write, or edit any news content. All articles link to their original publishers.' },
          { title: 'Content Ownership', body: 'All news content, headlines, images, and articles displayed on WMF News belong to their respective publishers. We claim no ownership over aggregated content. Our service is provided under fair use principles with full attribution and direct links.' },
          { title: 'Accuracy', body: 'We do not verify, fact-check, or modify the content we aggregate. The accuracy of any article is the responsibility of its original publisher. We recommend consulting multiple sources for important news.' },
          { title: 'External Links', body: 'Clicking any headline takes you to the original publisher\'s website. We are not responsible for content, privacy practices, or policies of external sites.' },
          { title: 'Use of Service', body: 'You may use WMF News for personal, non-commercial purposes. You may not: scrape or mass-download our aggregated content, frame or embed the site without permission, or use the service for any unlawful purpose.' },
          { title: 'Service Availability', body: 'We strive for 24/7 availability but do not guarantee uninterrupted service. RSS feed sources may occasionally be unavailable. We may modify or discontinue any part of the service without notice.' },
          { title: 'Limitation of Liability', body: 'WMF News is provided "as is" without warranties. We are not liable for any damages arising from use of the service, including but not limited to: inaccurate news, broken links, or service interruptions.' },
          { title: 'Publisher Removal', body: 'If you represent a news organization and wish to have your RSS feed removed from our aggregation, contact us and we will comply promptly.' },
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