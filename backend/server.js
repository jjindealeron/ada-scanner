const express = require('express');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins (configure this for production later)
// CORS configuration - allow frontend from Vercel
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://ada-scanner-do.vercel.app',
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ADA Scanner Backend is running!');
});

app.post('/scan', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  console.log(`Starting scan for: ${url}`);
  let browser = null;

  try {
    // Launch browser
    // In Docker/Render, we might need specific args, but Playwright image handles most.
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Often needed for container environments
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 1024 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    const page = await context.newPage();

    // Navigate to URL
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    // Inject and run Axe
    console.log('Running Axe analysis...');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) // Standard WCAG rules
      .analyze();

    console.log(`Scan complete. Found ${results.violations.length} violations.`);

    // Enhance results with screenshots or snippets if needed (optional for now)
    // For now, just return the raw Axe results which contain selectors and html snippets.

    res.json(results);

  } catch (error) {
    console.error('Scan failed:', error);
    res.status(500).json({
      error: 'Scan failed',
      details: error.message
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
