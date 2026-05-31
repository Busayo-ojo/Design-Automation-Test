const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT, 'scripts', 'figma-output-batch-16.json');

let allIcons = [];

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (req.url === '/write') {
          console.log(`Received batch of ${data.length} icons...`);
          allIcons = allIcons.concat(data);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('ok');
        } else if (req.url === '/done') {
          console.log(`Finished receiving. Total icons: ${allIcons.length}`);
          fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allIcons, null, 2), 'utf8');
          console.log(`Saved output to ${OUTPUT_FILE}`);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('saved');
          
          // Shut down server gracefully
          console.log('Shutting down server...');
          res.connection.end();
          server.close(() => {
            console.log('Server stopped.');
            process.exit(0);
          });
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      } catch (err) {
        console.error('Error processing request:', err.message);
        res.writeHead(500);
        res.end(err.message);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(8999, '127.0.0.1', () => {
  console.log('Icon receiver server running on http://127.0.0.1:8999');
});
