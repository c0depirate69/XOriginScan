# Browser Security CLI

CLI tool for automated analysis of:
- SOP Relaxation
- postMessage handling
- CORS misconfiguration

## Usage

```bash
npm install
node crawler.js
```

Put domains in `domains.txt` (one per line).

To run the mitmproxy addon:
```bash
mitmproxy -s mitm/rewrite_equals.py
```

Ensure browser traffic goes through mitmproxy for rewriting `===` to `==` for Proxy compatibility.
