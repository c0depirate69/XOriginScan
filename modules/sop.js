const puppeteer = require('puppeteer');
module.exports = async function sop(origin) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.text().includes('[SOP RELAX]')) console.log(msg.text());
  });
  await page.exposeFunction('logSOPRelax', (domain) => {
    console.log(`[SOP RELAX] ${origin} set document.domain to ${domain}`);
  });
  await page.evaluateOnNewDocument(() => {
    const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'domain');
    Object.defineProperty(document, 'domain', {
      set(val) {
        window.logSOPRelax(val);
        return descriptor.set.call(this, val);
      },
      get() {
        return descriptor.get.call(this);
      }
    });
  });
  try {
    await page.goto(origin, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {}
  await browser.close();
};
