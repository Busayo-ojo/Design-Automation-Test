#!/usr/bin/env node
/**
 * harvest-console.cjs
 * Reads the raw console log output.txt (copied by the user or passed as arg),
 * extracts JSON_BATCH_* entries, parses the icon data, and writes new batch files.
 * 
 * Usage: node scripts/harvest-console.cjs <path-to-output.txt>
 * Or just run it to process the latest step output.
 */
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;

// Read existing icons from all batch files
function getExistingIcons() {
  const names = new Set();
  for (let i = 1; i <= 100; i++) {
    const f = path.join(SCRIPTS_DIR, `figma-output-batch-${i}.json`);
    if (fs.existsSync(f)) {
      try {
        const arr = JSON.parse(fs.readFileSync(f, 'utf8'));
        arr.forEach(ic => names.add(ic.name));
      } catch(e) {}
    }
  }
  return names;
}

// Parse the console log JSON for JSON_BATCH entries
function extractBatchesFromLogJson(logJson) {
  const allIcons = [];
  const logs = logJson.logs || [];
  
  for (const logEntry of logs) {
    const msg = logEntry.message || '';
    if (!msg.startsWith('JSON_BATCH_')) continue;
    
    // Extract the JSON array portion after "JSON_BATCH_N:"
    const colonIdx = msg.indexOf(':');
    if (colonIdx === -1) continue;
    
    const jsonPart = msg.substring(colonIdx + 1);
    try {
      const icons = JSON.parse(jsonPart);
      if (Array.isArray(icons)) {
        allIcons.push(...icons);
      }
    } catch(e) {
      // Try the args field if message is truncated
      if (logEntry.args && logEntry.args[0]) {
        const argMsg = logEntry.args[0];
        const argColonIdx = argMsg.indexOf(':');
        if (argColonIdx !== -1) {
          try {
            const icons = JSON.parse(argMsg.substring(argColonIdx + 1));
            if (Array.isArray(icons)) {
              allIcons.push(...icons);
            }
          } catch(e2) {
            console.log(`  [WARN] Could not parse batch from args: ${argMsg.substring(0, 80)}...`);
          }
        }
      }
    }
  }
  
  return allIcons;
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.log('Usage: node scripts/harvest-console.cjs <path-to-console-output.txt>');
    process.exit(1);
  }
  
  console.log(`Reading: ${inputPath}`);
  const raw = fs.readFileSync(inputPath, 'utf8');
  
  let logJson;
  try {
    logJson = JSON.parse(raw);
  } catch(e) {
    console.error('Failed to parse input as JSON');
    process.exit(1);
  }
  
  const existingNames = getExistingIcons();
  console.log(`Existing icons in batch files: ${existingNames.size}`);
  
  const newIcons = extractBatchesFromLogJson(logJson);
  console.log(`Icons extracted from console: ${newIcons.length}`);
  
  // Filter to only new icons
  const truly_new = newIcons.filter(ic => !existingNames.has(ic.name));
  console.log(`New icons (not in existing batches): ${truly_new.length}`);
  
  if (truly_new.length === 0) {
    console.log('No new icons to save.');
    return;
  }
  
  // Find the next batch number
  let nextBatch = 1;
  while (fs.existsSync(path.join(SCRIPTS_DIR, `figma-output-batch-${nextBatch}.json`))) {
    nextBatch++;
  }
  
  const outPath = path.join(SCRIPTS_DIR, `figma-output-batch-${nextBatch}.json`);
  fs.writeFileSync(outPath, JSON.stringify(truly_new, null, 2));
  console.log(`Saved ${truly_new.length} new icons to ${outPath}`);
  
  // Print summary
  const finalNames = new Set([...existingNames, ...truly_new.map(ic => ic.name)]);
  console.log(`Total icons now: ${finalNames.size}`);
  
  // Check against master list
  const masterList = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'all-sorted-icons.json'), 'utf8'));
  const stillMissing = masterList.filter(ic => !finalNames.has(ic.name));
  console.log(`Still missing: ${stillMissing.length}`);
  if (stillMissing.length > 0 && stillMissing.length <= 50) {
    console.log('Missing:', stillMissing.map(n => n.name).join(', '));
  }
}

main().catch(console.error);
