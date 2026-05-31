#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;
const allIcons = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'all-sorted-icons.json'), 'utf8'));

const existingNames = new Set();
for (let i = 1; i <= 200; i++) {
  const f = path.join(SCRIPTS_DIR, `figma-output-batch-${i}.json`);
  if (fs.existsSync(f)) {
    try {
      JSON.parse(fs.readFileSync(f, 'utf8')).forEach(ic => existingNames.add(ic.name));
    } catch(e) {}
  }
}

const missing = allIcons.filter(ic => !existingNames.has(ic.name));

const iconArr = missing.map(ic => `{id:'${ic.id}',name:'${ic.name}'}`).join(',');

const code = `
(async () => {
  const icons = [${iconArr}];
  const chunkSize = 10;
  let batchCount = 0;
  
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  console.log("Antigravity Extraction started for " + icons.length + " icons");
  
  for (let i = 0; i < icons.length; i += chunkSize) {
    const chunk = icons.slice(i, i + chunkSize);
    const results = [];
    console.log("Starting batch " + batchCount + ", icons: " + chunk.map(c=>c.name).join(', '));
    
    for (const ic of chunk) {
      try {
        const nd = await figma.getNodeByIdAsync(ic.id);
        if (!nd) continue;
        let cs = nd;
        if (nd.type !== 'COMPONENT_SET' && nd.parent && nd.parent.type === 'COMPONENT_SET') cs = nd.parent;
        let cat = 'Uncategorized';
        let a = cs.parent;
        while(a) {
          if (a.type === 'SECTION' || (a.type === 'FRAME' && a.parent && a.parent.type === 'PAGE')) { cat = a.name; break; }
          a = a.parent;
        }
        let ln = null, bn = null;
        if (cs.type === 'COMPONENT_SET') {
          for (const c of cs.children) {
            const p = c.name.toLowerCase();
            if (p.includes('linear') || p.includes('outline')) ln = c;
            if (p.includes('bold') || p.includes('filled')) bn = c;
          }
        } else { bn = cs; }
        
        async function ex(n) {
          if (!n) return '';
          try {
            const b = await n.exportAsync({format:'SVG'});
            const s = String.fromCharCode.apply(null,b);
            return s.replace(/<svg[^>]*>/,'').replace(/<\\/svg>/,'').trim()
                    .replace(/fill="[^"]*"/g,'fill="black"')
                    .replace(/stroke="[^"]*"/g,'stroke="black"');
          } catch(e) { return ''; }
        }
        
        const l = await ex(ln);
        const b = await ex(bn);
        if (l || b) {
          results.push({name: ic.name, category: cat, linear: l, bold: b});
          console.log("Extracted: " + ic.name);
        }
      } catch(e) {
        console.log("Error on " + ic.name + ": " + e.message);
      }
    }
    
    if (results.length > 0) {
      const txt = figma.createText();
      txt.name = "AntigravityBatch_" + batchCount;
      txt.characters = JSON.stringify(results);
      txt.visible = false;
      console.log("Created node AntigravityBatch_" + batchCount);
      batchCount++;
    }
    await new Promise(r => setTimeout(r, 100));
  }
  console.log("TEXT_NODES_DONE:" + batchCount);
})();
`;

fs.writeFileSync(path.join(SCRIPTS_DIR, 'figma-run-nodes-logged.js'), code);
