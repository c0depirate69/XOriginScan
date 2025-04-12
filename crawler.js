const fs = require('fs');
const path = require('path');
const crawl = require('./modules/crawl');
const sop = require('./modules/sop');
const postMessage = require('./modules/postmessage');
const cors = require('./modules/cors');
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: 'new' // opt in to the new headless mode
});
(async () => {
  const domains = fs.readFileSync('domains.txt', 'utf-8').split(/\r?\n/);
  for (const domain of domains) {
    const origin = `http://${domain}`;
    console.log(`\n\u001b[1m[*] Crawling: ${origin}\u001b[0m`);
    await crawl(origin);
    await sop(origin);
    await postMessage(origin);
    await cors(origin);
  }
})();
