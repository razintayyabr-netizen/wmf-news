// Real-time market data API — free, no API key needed
export async function GET() {
  try {
    // Fetch BTC price from CoinGecko (free, no key)
    const btcRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true', {
      next: { revalidate: 60 },
      headers: { 'Accept': 'application/json' }
    });
    const btcData = await btcRes.json();

    // Fetch stock data from free sources
    // Using Yahoo Finance via a simple proxy approach
    let stocks = {};
    try {
      const spRes = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?range=1d&interval=1m', {
        next: { revalidate: 60 },
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (spRes.ok) {
        const spData = await spRes.json();
        const meta = spData?.chart?.result?.[0]?.meta;
        if (meta) {
          stocks.sp500 = { price: meta.regularMarketPrice, change: meta.regularMarketPrice - meta.chartPreviousClose };
        }
      }
    } catch (e) { /* fallback below */ }

    try {
      const nasRes = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/%5EIXIC?range=1d&interval=1m', {
        next: { revalidate: 60 },
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (nasRes.ok) {
        const nasData = await nasRes.json();
        const meta = nasData?.chart?.result?.[0]?.meta;
        if (meta) {
          stocks.nasdaq = { price: meta.regularMarketPrice, change: meta.regularMarketPrice - meta.chartPreviousClose };
        }
      }
    } catch (e) { /* fallback */ }

    try {
      const djiRes = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/%5EDJI?range=1d&interval=1m', {
        next: { revalidate: 60 },
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (djiRes.ok) {
        const djiData = await djiRes.json();
        const meta = djiData?.chart?.result?.[0]?.meta;
        if (meta) {
          stocks.dow = { price: meta.regularMarketPrice, change: meta.regularMarketPrice - meta.chartPreviousClose };
        }
      }
    } catch (e) { /* fallback */ }

    // Gold and oil from free API
    let commodities = {};
    try {
      const goldRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd', {
        next: { revalidate: 60 },
        headers: { 'Accept': 'application/json' }
      });
      if (goldRes.ok) {
        const goldData = await goldRes.json();
        if (goldData['tether-gold']) {
          commodities.gold = goldData['tether-gold'].usd;
        }
      }
    } catch (e) { /* fallback */ }

    // Forex rates
    let forex = {};
    try {
      const fxRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
        next: { revalidate: 300 },
      });
      if (fxRes.ok) {
        const fxData = await fxRes.json();
        if (fxData.rates) {
          forex.eur = fxData.rates.EUR;
          forex.gbp = fxData.rates.GBP;
          forex.inr = fxData.rates.INR;
          forex.cny = fxData.rates.CNY;
          forex.rub = fxData.rates.RUB;
          forex.irr = fxData.rates.IRR;
        }
      }
    } catch (e) { /* fallback */ }

    return Response.json({
      status: 'ok',
      bitcoin: btcData?.bitcoin ? {
        price: btcData.bitcoin.usd,
        change_24h: btcData.bitcoin.usd_24h_change,
      } : null,
      ethereum: btcData?.ethereum ? {
        price: btcData.ethereum.usd,
        change_24h: btcData.ethereum.usd_24h_change,
      } : null,
      stocks,
      commodities,
      forex,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    return Response.json({ status: 'error', error: e.message, timestamp: new Date().toISOString() });
  }
}