// WMF News Aggregator API — pulls real news from multiple global sources
// Zero editorial content — 100% aggregated

const RSS_FEEDS = {
  // === WESTERN ===
  bbc: { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml', region: 'Western' },
  bbc_world: { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', region: 'Western' },
  bbc_business: { name: 'BBC Business', url: 'https://feeds.bbci.co.uk/news/business/rss.xml', region: 'Western' },
  bbc_tech: { name: 'BBC Tech', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', region: 'Western' },
  cnn: { name: 'CNN', url: 'https://rss.cnn.com/rss/edition.rss', region: 'Western' },
  cnn_world: { name: 'CNN World', url: 'https://rss.cnn.com/rss/edition_world.rss', region: 'Western' },
  reuters: { name: 'Reuters', url: 'https://feeds.reuters.com/reuters/topNews', region: 'Western' },
  reuters_world: { name: 'Reuters World', url: 'https://feeds.reuters.com/reuters/worldNews', region: 'Western' },
  reuters_business: { name: 'Reuters Business', url: 'https://feeds.reuters.com/reuters/businessNews', region: 'Western' },
  reuters_tech: { name: 'Reuters Tech', url: 'https://feeds.reuters.com/reuters/technologyNews', region: 'Western' },
  wsj: { name: 'Wall Street Journal', url: 'https://feeds.a.foxnews.com/72864/wsj/opinion.xml', region: 'Western' },
  wsj_world: { name: 'WSJ World', url: 'https://feeds.a.foxnews.com/72864/wsj/world.xml', region: 'Western' },
  aljazeera: { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', region: 'Middle East' },
  aljazeera_world: { name: 'Al Jazeera World', url: 'https://www.aljazeera.com/xml/rss/world.xml', region: 'Middle East' },
  guardian: { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss', region: 'Western' },
  guardian_us: { name: 'Guardian US', url: 'https://www.theguardian.com/us-news/rss', region: 'Western' },
  dw: { name: 'DW News', url: 'https://rss.dw.com/rdf/rss-en-all', region: 'Western' },
  france24: { name: 'France 24', url: 'https://www.france24.com/en/rss', region: 'Western' },

  // === CHINA ===
  cgtn: { name: 'CGTN', url: 'https://news.cgtn.com/news/rss.xml', region: 'China' },
  xinhua: { name: 'Xinhua', url: 'https://english.news.cn/rss.xml', region: 'China' },

  // === RUSSIA ===
  rt: { name: 'RT', url: 'https://www.rt.com/rss/news/', region: 'Russia' },
  tass: { name: 'TASS', url: 'https://tass.com/rss/v2.xml', region: 'Russia' },

  // === IRAN ===
  presstv: { name: 'Press TV', url: 'https://www.presstv.ir/rss/topnews', region: 'Iran' },
  presstv_world: { name: 'Press TV World', url: 'https://www.presstv.ir/rss/world', region: 'Iran' },

  // === FINANCE & CRYPTO ===
  cnbc: { name: 'CNBC', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147', region: 'Western' },
  cnbc_world: { name: 'CNBC World', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362', region: 'Western' },
  cnbc_finance: { name: 'CNBC Finance', url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19854910', region: 'Western' },
  coindesk: { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', region: 'Crypto' },
  cointelegraph: { name: 'Cointelegraph', url: 'https://cointelegraph.com/rss', region: 'Crypto' },

  // === TECH ===
  techcrunch: { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', region: 'Tech' },
  theverge: { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', region: 'Tech' },
  ars: { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', region: 'Tech' },
  wired: { name: 'Wired', url: 'https://www.wired.com/feed/rss', region: 'Tech' },
  hackaday: { name: 'Hackaday', url: 'https://hackaday.com/feed/', region: 'Tech' },
};

const CATEGORY_FEEDS = {
  world: ['bbc_world', 'reuters_world', 'aljazeera', 'cgtn', 'xinhua', 'rt', 'tass', 'presstv_world', 'guardian', 'dw', 'france24', 'cnn_world'],
  finance: ['cnbc', 'cnbc_world', 'cnbc_finance', 'reuters_business', 'bbc_business', 'coindesk'],
  crypto: ['coindesk', 'cointelegraph', 'cnbc_finance'],
  geopolitics: ['aljazeera', 'reuters_world', 'bbc_world', 'cgtn', 'rt', 'presstv_world', 'guardian', 'xinhua', 'dw'],
  war: ['aljazeera', 'reuters_world', 'bbc_world', 'rt', 'presstv_world', 'cnn_world', 'tass'],
  technology: ['techcrunch', 'theverge', 'ars', 'wired', 'bbc_tech', 'reuters_tech', 'cgtn', 'hackaday'],
  china: ['cgtn', 'xinhua'],
  russia: ['rt', 'tass'],
  iran: ['presstv', 'presstv_world'],
};

function parseRSS(xml, sourceKey) {
  const source = RSS_FEEDS[sourceKey];
  if (!source) return [];
  const articles = [];

  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const items = xml.match(itemRegex) || [];
  // Also try <entry> for Atom feeds
  const entryRegex = /<entry[\s\S]*?<\/entry>/gi;
  const entries = xml.match(entryRegex) || [];

  const allItems = [...items, ...entries];

  for (const item of allItems.slice(0, 15)) {
    const title = (item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) || item.match(/<title>([\s\S]*?)<\/title>/i))?.[1]?.trim() || '';
    const link = (item.match(/<link[^>]*href="([^"]+)"/i) || item.match(/<link>([\s\S]*?)<\/link>/i))?.[1]?.trim() || '';
    const desc = (item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) || item.match(/<description>([\s\S]*?)<\/description>/i) || item.match(/<summary><!\[CDATA\[([\s\S]*?)\]\]><\/summary>/i) || item.match(/<summary>([\s\S]*?)<\/summary>/i))?.[1]?.trim() || '';
    const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || item.match(/<published>([\s\S]*?)<\/published>/i) || item.match(/<updated>([\s\S]*?)<\/updated>/i))?.[1]?.trim() || '';
    const img = (item.match(/<media:content[^>]*url="([^"]+)"/i) || item.match(/<enclosure[^>]*url="([^"]+)"/i) || item.match(/<media:thumbnail[^>]*url="([^"]+)"/i) || item.match(/<img[^>]*src="([^"]+)"/i))?.[1] || '';

    if (title && link) {
      const clean = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#8217;/g, "'").replace(/&#8211;/g, '–').replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8230;/g, '…').trim();

      const cleanedTitle = clean(title);
      const cleanedDesc = clean(desc).slice(0, 250);
      const validUrl = link.startsWith('http') ? link : '';

      if (cleanedTitle && validUrl) {
        articles.push({
          source: source.name,
          sourceKey,
          region: source.region,
          title: cleanedTitle,
          description: cleanedDesc,
          url: validUrl,
          urlToImage: img.startsWith('http') ? img : '',
          publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          category: '',
        });
      }
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

  const fetchPromises = feedKeys.map(async (key) => {
    const feed = RSS_FEEDS[key];
    if (!feed) return;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(feed.url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WMFNews/1.0; +https://wmf-news.vercel.app)' },
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

  // Deduplicate by title
  const seen = new Set();
  const unique = allArticles.filter(a => {
    const key = a.title.toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort by date (newest first)
  unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  unique.forEach(a => a.category = category);

  return Response.json({
    status: unique.length > 0 ? 'ok' : 'partial',
    totalResults: unique.length,
    errors: errors.length > 0 ? errors.slice(0, 5) : undefined,
    articles: unique.slice(0, 50),
  });
}