#!/usr/bin/env node
/**
 * extract-missing.cjs
 * Generates the Figma plugin code to extract a batch of icons.
 * Usage: node scripts/extract-missing.cjs <startIdx> <count>
 * 
 * Outputs the code to stdout that should be passed to figma_execute.
 */
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;

// Load all icons
const allIcons = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'all-sorted-icons.json'), 'utf8'));

// Find existing icons
const existingNames = new Set();
for (let i = 1; i <= 100; i++) {
  const f = path.join(SCRIPTS_DIR, `figma-output-batch-${i}.json`);
  if (fs.existsSync(f)) {
    try {
      const arr = JSON.parse(fs.readFileSync(f, 'utf8'));
      arr.forEach(ic => existingNames.add(ic.name));
    } catch(e) {}
  }
}

// Filter missing icons
const missing = allIcons.filter(ic => !existingNames.has(ic.name));

const startIdx = parseInt(process.argv[2] || '0');
const count = parseInt(process.argv[3] || '3');
const batch = missing.slice(startIdx, startIdx + count);

if (batch.length === 0) {
  console.error('No more icons to extract!');
  console.error(`Total existing: ${existingNames.size}, Total needed: ${allIcons.length}`);
  process.exit(0);
}

console.error(`Extracting icons ${startIdx} to ${startIdx + batch.length - 1} of ${missing.length} missing`);
console.error(`Icons: ${batch.map(b => b.name).join(', ')}`);

// Generate extraction code
const iconEntries = batch.map(ic => `{id:"${ic.id}",name:"${ic.name}"}`).join(',');

const code = `
(async () => {
  const icons = [${iconEntries}];
  const results = [];
  
  for (const icon of icons) {
    try {
      const node = await figma.getNodeByIdAsync(icon.id);
      if (!node) { results.push({name: icon.name, error: "node not found"}); continue; }
      
      // Find the component set (parent with children for variants)
      let compSet = node;
      if (node.type !== 'COMPONENT_SET' && node.parent && node.parent.type === 'COMPONENT_SET') {
        compSet = node.parent;
      }
      
      // Determine category from the section/frame hierarchy
      let category = "Uncategorized";
      let ancestor = compSet.parent;
      while (ancestor) {
        if (ancestor.type === 'SECTION' || (ancestor.type === 'FRAME' && ancestor.parent && ancestor.parent.type === 'PAGE')) {
          category = ancestor.name;
          break;
        }
        ancestor = ancestor.parent;
      }
      
      // Find linear and bold variants
      let linearNode = null, boldNode = null;
      
      if (compSet.type === 'COMPONENT_SET') {
        for (const child of compSet.children) {
          const props = child.name.toLowerCase();
          if (props.includes('linear') || props.includes('outline')) linearNode = child;
          if (props.includes('bold') || props.includes('filled') || props.includes('solid')) boldNode = child;
        }
      } else if (compSet.type === 'COMPONENT') {
        // Single component - check variant props
        const variantProp = compSet.name.toLowerCase();
        if (variantProp.includes('linear') || variantProp.includes('outline')) linearNode = compSet;
        else if (variantProp.includes('bold') || variantProp.includes('filled')) boldNode = compSet;
        else boldNode = compSet; // Default to bold
      }
      
      async function exportSvg(n) {
        if (!n) return "";
        try {
          const svgBytes = await n.exportAsync({ format: 'SVG' });
          const svgStr = String.fromCharCode.apply(null, svgBytes);
          // Strip the outer <svg> tag, keep only inner paths
          const inner = svgStr
            .replace(/<svg[^>]*>/, '')
            .replace(/<\\/svg>/, '')
            .replace(/\\n/g, '\\\\n')
            .trim();
          // Normalize fills/strokes to black
          return inner
            .replace(/fill="[^"]*"/g, 'fill="black"')
            .replace(/stroke="[^"]*"/g, 'stroke="black"');
        } catch(e) {
          return "";
        }
      }
      
      const linear = await exportSvg(linearNode);
      const bold = await exportSvg(boldNode);
      
      results.push({ name: icon.name, category, linear, bold });
    } catch(e) {
      results.push({name: icon.name, error: e.message});
    }
  }
  
  return results;
})()
`;

// Output the code
process.stdout.write(code.trim());
