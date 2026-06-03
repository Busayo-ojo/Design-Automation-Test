const http = require('http');
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/icons') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const icons = JSON.parse(body);
        if (Array.isArray(icons) && icons.length > 0) {
          let nextBatch = 1;
          while (fs.existsSync(path.join(SCRIPTS_DIR, `figma-output-batch-${nextBatch}.json`))) {
            nextBatch++;
          }
          const outFile = path.join(SCRIPTS_DIR, `figma-output-batch-${nextBatch}.json`);
          fs.writeFileSync(outFile, JSON.stringify(icons, null, 2));
          console.log(`Saved ${icons.length} icons to figma-output-batch-${nextBatch}.json`);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid' }));
        }
      } catch (e) {
        console.log('Error', e.message);
        res.writeHead(400);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(54321, '127.0.0.1', () => {
  console.log('Icon server listening on 127.0.0.1:54321');
});
