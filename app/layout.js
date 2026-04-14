import './globals.css';
export const metadata = { title: 'WMF News — Breaking & Global News', description: 'Real-time breaking news, world affairs, technology, business, sports, and more.' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body className="antialiased">{children}</body></html>);
}