const puppeteer = require('puppeteer');
module.exports = async function cors(origin) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setRequestInterception(true);
  page.on('request', req => req.continue());
  page.on('response', async res => {
    const acao = res.headers()['access-control-allow-origin'];
    const acac = res.headers()['access-control-allow-credentials'];
    if (acao && acac) {
      console.log(`[CORS] ${origin} allows ${acao} with credentials.`);
    }
  });
  try {
    await page.goto(origin, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {}
  await browser.close();
};
