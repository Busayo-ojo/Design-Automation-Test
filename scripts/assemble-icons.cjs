const fs = require('fs');
const path = require('path');

const logsPath = path.join(__dirname, 'raw-logs.json');
if (!fs.existsSync(logsPath)) {
  console.error(`Error: ${logsPath} not found.`);
  process.exit(1);
}

const rawLogs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
const logs = rawLogs.logs || [];

// Sort logs chronologically to ensure batches are in order
logs.sort((a, b) => a.timestamp - b.timestamp);

const batchMap = new Map();
let maxBatchIndex = 0;
let done = false;

for (const entry of logs) {
  const msg = entry.message || '';
  if (msg.startsWith('JSON_BATCH_')) {
    const colonIdx = msg.indexOf(':');
    if (colonIdx !== -1) {
      const prefix = msg.slice(0, colonIdx);
      const batchIdx = parseInt(prefix.replace('JSON_BATCH_', ''));
      const jsonStr = msg.slice(colonIdx + 1);
      try {
        const data = JSON.parse(jsonStr);
        batchMap.set(batchIdx, data);
        if (batchIdx > maxBatchIndex) {
          maxBatchIndex = batchIdx;
        }
      } catch (err) {
        console.error(`Error parsing JSON for batch ${batchIdx}:`, err.message);
      }
    }
  } else if (msg === 'JSON_ALL_DONE') {
    done = true;
  }
}

console.log(`Parsed batches: ${Array.from(batchMap.keys()).sort((a,b)=>a-b).join(', ')}`);
console.log(`Max batch index found: ${maxBatchIndex}`);
console.log(`Extraction status: ${done ? 'FINISHED' : 'IN_PROGRESS'}`);

// Let's assemble all icons
let allIcons = [];
for (let i = 1; i <= maxBatchIndex; i++) {
  const batchData = batchMap.get(i);
  if (batchData) {
    allIcons = allIcons.concat(batchData);
  } else {
    console.warn(`Warning: Batch ${i} is missing!`);
  }
}

console.log(`Assembled ${allIcons.length} total icons.`);

const outputPath = path.join(__dirname, 'figma-output-batch-16.json');
fs.writeFileSync(outputPath, JSON.stringify(allIcons, null, 2), 'utf8');
console.log(`Saved output to ${outputPath}`);
