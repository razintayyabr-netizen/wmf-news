export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'general';

  // Map categories to free NewsAPI categories/sources
  const categoryMap = {
    general: { cat: 'general', sources: [] },
    finance: { cat: 'business', sources: ['bloomberg', 'cnbc', 'the-wall-street-journal', 'financial-times', 'business-insider'] },
    crypto: { cat: 'technology', sources: ['techcrunch', 'wired', 'the-verge'] },
    geopolitics: { cat: 'general', sources: ['bbc-news', 'reuters', 'al-jazeera-english', 'the-guardian-uk'] },
    war: { cat: 'general', sources: ['bbc-news', 'reuters', 'al-jazeera-english', 'cnn'] },
    technology: { cat: 'technology', sources: ['techcrunch', 'the-verge', 'wired', 'ars-technica'] },
    sports: { cat: 'sports', sources: ['espn', 'bbc-sport'] },
    health: { cat: 'health', sources: ['medical-news-today'] },
    entertainment: { cat: 'entertainment', sources: [] },
    science: { cat: 'science', sources: ['national-geographic', 'new-scientist'] },
  };

  const config = categoryMap[category] || categoryMap.general;

  try {
    // Try free NewsAPI (no key needed)
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${config.cat}/us.json`;
    const res = await fetch(url, { next: { revalidate: 300 } }); // 5 min cache
    const data = await res.json();

    if (data.status === 'ok' && data.articles?.length > 0) {
      // Filter by source if specified
      let articles = data.articles;
      if (config.sources.length > 0) {
        const sourceSet = new Set(config.sources);
        const filtered = articles.filter(a => a.source?.id && sourceSet.has(a.source.id));
        if (filtered.length > 0) articles = filtered;
      }

      return Response.json({
        status: 'ok',
        articles: articles.slice(0, 20).map(a => ({
          source: a.source?.name || 'Unknown',
          author: a.author || '',
          title: a.title,
          description: a.description || '',
          url: a.url,
          urlToImage: a.urlToImage,
          publishedAt: a.publishedAt,
          category: category,
        }))
      });
    }

    return Response.json({ status: 'error', articles: [] });
  } catch (e) {
    return Response.json({ status: 'error', articles: [], error: e.message });
  }
}