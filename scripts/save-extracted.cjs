#!/usr/bin/env node
/**
 * save-extracted.cjs
 * Takes a JSON array string from stdin (the figma_execute result) and saves 
 * new icons to the next batch file.
 * Usage: echo '<json-result>' | node scripts/save-extracted.cjs
 */
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const icons = JSON.parse(input);
    if (!Array.isArray(icons) || icons.length === 0) {
      console.log('No icons to save');
      return;
    }
    
    // Filter out errors
    const valid = icons.filter(ic => !ic.error && (ic.linear || ic.bold));
    const errors = icons.filter(ic => ic.error);
    
    if (errors.length > 0) {
      console.log('Errors:', errors.map(e => `${e.name}: ${e.error}`).join(', '));
    }
    
    if (valid.length === 0) {
      console.log('No valid icons extracted');
      return;
    }
    
    // Find next batch number
    let nextBatch = 1;
    while (fs.existsSync(path.join(SCRIPTS_DIR, `figma-output-batch-${nextBatch}.json`))) {
      nextBatch++;
    }
    
    // Append to existing batch if it's small, or create new one
    const prevBatch = nextBatch - 1;
    const prevFile = path.join(SCRIPTS_DIR, `figma-output-batch-${prevBatch}.json`);
    
    // Always create a new batch for clean tracking
    const outFile = path.join(SCRIPTS_DIR, `figma-output-batch-${nextBatch}.json`);
    fs.writeFileSync(outFile, JSON.stringify(valid, null, 2));
    console.log(`Saved ${valid.length} icons to figma-output-batch-${nextBatch}.json`);
    
    // Count total
    let total = 0;
    for (let i = 1; i <= nextBatch; i++) {
      const f = path.join(SCRIPTS_DIR, `figma-output-batch-${i}.json`);
      if (fs.existsSync(f)) {
        total += JSON.parse(fs.readFileSync(f, 'utf8')).length;
      }
    }
    console.log(`Total icons across all batches: ${total}`);
    
  } catch(e) {
    console.error('Parse error:', e.message);
    console.error('Input (first 500 chars):', input.substring(0, 500));
  }
});
