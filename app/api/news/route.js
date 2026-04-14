// WMF News Aggregator API — pulls real news from multiple global sources
// Zero editorial content — 100% aggregated

const RSS_FEEDS = {
  // === WESTERN ===
  bbc: { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', region: 'Western' },
  bbc_world: { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', region: 'Western' },
  cnn: { name: 'CNN', url: 'http://rss.cnn.com/rss/edition.rss', region: 'Western' },
  reuters: { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', region: 'Western' },
  reuters_world: { name: 'Reuters World', url: 'https://feeds.reuters.com/reuters/worldNews', region: 'Western' },
  wsj: { name: 'Wall Street Journal', url: 'https://feeds.content.dowjonessonline.com/RSSWSJDcom.xml', region: 'Western' },
  bloomberg: { name: 'Bloomberg', url: 'https://feeds.bloomberg.com/markets/news.rss', region: 'Western' },
  aljazeera: { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', region: 'Middle East' },
  guardian: { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss', region: 'Western' },

  // === CHINA ===
  cgtn: { name: 'CGTN', url: 'https://news.cgtn.com/news/rss.xml', region: 'China' },
  xinhua: { name: 'Xinhua', url: 'http://www.xinhuanet.com/english/rss/world.xml', region: 'China' },

  // === RUSSIA ===
  rt: { name: 'RT', url: 'https://www.rt.com/rss/news/', region: 'Russia' },
  tass: { name: 'TASS', url: 'https://tass.com/rss/v2.xml', region: 'Russia' },

  // === IRAN ===
  presstv: { name: 'Press TV', url: 'https://www.presstv.ir/rss/topnews', region: 'Iran' },
  farsnews: { name: 'Fars News', url: 'https://en.farsnews.ir/rss', region: 'Iran' },

  // === FINANCE & CRYPTO ===
  cnbc: { name: 'CNBC', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147', region: 'Western' },
  cnbc_world: { name: 'CNBC World', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362', region: 'Western' },
  coindesk: { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', region: 'Crypto' },
  cointelegraph: { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss', region: 'Crypto' },

  // === TECH ===
  techcrunch: { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', region: 'Tech' },
  theverge: { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', region: 'Tech' },
  ars: { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', region: 'Tech' },
  wired: { name: 'Wired', url: 'https://www.wired.com/feed/rss', region: 'Tech' },
};

const CATEGORY_FEEDS = {
  world: ['bbc_world', 'reuters_world', 'aljazeera', 'cgtn', 'xinhua', 'rt', 'tass', 'presstv', 'guardian', 'farsnews'],
  finance: ['bloomberg', 'wsj', 'cnbc', 'cnbc_world', 'reuters', 'bbc'],
  crypto: ['coindesk', 'cointelegraph', 'bloomberg', 'cnbc'],
  geopolitics: ['aljazeera', 'reuters_world', 'bbc_world', 'cgtn', 'rt', 'presstv', 'guardian', 'xinhua'],
  war: ['aljazeera', 'reuters_world', 'bbc_world', 'rt', 'presstv', 'cnn', 'tass'],
  technology: ['techcrunch', 'theverge', 'ars', 'wired', 'cgtn'],
  china: ['cgtn', 'xinhua'],
  russia: ['rt', 'tass'],
  iran: ['presstv', 'farsnews'],
};

// Simple RSS parser (no dependencies)
function parseRSS(xml, sourceKey) {
  const source = RSS_FEEDS[sourceKey];
  const articles = [];

  // Extract items using regex (lightweight, no DOM parser needed)
  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const items = xml.match(itemRegex) || [];

  for (const item of items.slice(0, 10)) {
    const title = (item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) || item.match(/<title>([\s\S]*?)<\/title>/i))?.[1]?.trim() || '';
    const link = (item.match(/<link>([\s\S]*?)<\/link>/i))?.[1]?.trim() || '';
    const desc = (item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) || item.match(/<description>([\s\S]*?)<\/description>/i))?.[1]?.trim() || '';
    const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || item.match(/<published>([\s\S]*?)<\/published>/i))?.[1]?.trim() || '';
    const img = (item.match(/<media:content[^>]*url="([^"]+)"/i) || item.match(/<enclosure[^>]*url="([^"]+)"/i) || item.match(/<media:thumbnail[^>]*url="([^"]+)"/i))?.[1] || '';

    if (title && link) {
      // Clean HTML from title/desc
      const clean = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').trim();

      articles.push({
        source: source.name,
        sourceKey,
        region: source.region,
        title: clean(title),
        description: clean(desc).slice(0, 200),
        url: link,
        urlToImage: img,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        category: '',
      });
    }
  }
  return articles;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'world';
  const feedKeys = CATEGORY_FEEDS[category] || CATEGORY_FEEDS.world;

  const allArticles = [];
  const errors = [];

  // Fetch feeds in parallel with timeout
  const fetchPromises = feedKeys.map(async (key) => {
    const feed = RSS_FEEDS[key];
    if (!feed) return;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(feed.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WMFNews/1.0)' },
        next: { revalidate: 300 },
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();
      const articles = parseRSS(xml, key);
      allArticles.push(...articles);
    } catch (e) {
      errors.push({ source: feed.name, error: e.message });
    }
  });

  await Promise.allSettled(fetchPromises);

  // Sort by date (newest first)
  allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Add category tag
  allArticles.forEach(a => a.category = category);

  return Response.json({
    status: allArticles.length > 0 ? 'ok' : 'partial',
    totalResults: allArticles.length,
    errors: errors.length > 0 ? errors : undefined,
    articles: allArticles.slice(0, 50),
  });
}