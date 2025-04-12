const puppeteer = require('puppeteer');
module.exports = async function crawl(origin) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(origin, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log(`[+] Visited: ${origin}`);
  } catch (e) {
    console.log(`[!] Failed to crawl ${origin}: ${e.message}`);
  }
  await browser.close();
};
