const puppeteer = require('puppeteer');
module.exports = async function postMessage(origin) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => {
    if (msg.text().includes('[POSTMSG]')) console.log(msg.text());
  });
  await page.exposeFunction('logPostMessage', (info) => {
    console.log(`[POSTMSG] ${origin}: ${info}`);
  });
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('message', evt => {
      const proxy = new Proxy(evt.data, {
        get(target, prop) {
          window.logPostMessage(`Accessed ${prop} in postMessage`);
          return Reflect.get(target, prop);
        }
      });
      const orig = evt.origin;
      const src = evt.source;
      try {
        const f = evt.currentTarget;
        const fn = f.toString();
        window.logPostMessage(`Handler Source: ${fn.slice(0, 200)}...`);
      } catch {}
    }, false);
  });
  try {
    await page.goto(origin, { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {}
  await browser.close();
};
