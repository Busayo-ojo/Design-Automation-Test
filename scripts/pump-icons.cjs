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

console.error(`Missing: ${missing.length} icons`);
if (missing.length === 0) process.exit(0);

const iconArr = missing.map(ic => `{id:'${ic.id}',name:'${ic.name}'}`).join(',');

const code = `
(async () => {
  const icons = [${iconArr}];
  const chunkSize = 10;
  let successCount = 0;
  
  for (let i = 0; i < icons.length; i += chunkSize) {
    const chunk = icons.slice(i, i + chunkSize);
    const results = [];
    
    for (const ic of chunk) {
      try {
        const nd = await figma.getNodeByIdAsync(ic.id);
        if (!nd) continue;
        
        let cs = nd;
        if (nd.type !== 'COMPONENT_SET' && nd.parent && nd.parent.type === 'COMPONENT_SET') cs = nd.parent;
        
        let cat = 'Uncategorized';
        let a = cs.parent;
        while(a) {
          if (a.type === 'SECTION' || (a.type === 'FRAME' && a.parent && a.parent.type === 'PAGE')) {
            cat = a.name;
            break;
          }
          a = a.parent;
        }
        
        let ln = null, bn = null;
        if (cs.type === 'COMPONENT_SET') {
          for (const c of cs.children) {
            const p = c.name.toLowerCase();
            if (p.includes('linear')) ln = c;
            if (p.includes('bold')) bn = c;
          }
        } else {
          bn = cs;
        }
        
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
        }
      } catch(e) {
        console.log('Error processing ' + ic.name + ': ' + e.message);
      }
    }
    
    if (results.length > 0) {
      try {
        await fetch('http://localhost:3000/icons', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(results)
        });
        successCount += results.length;
      } catch(e) {
        console.log('Fetch error: ' + e.message);
      }
    }
  }
  
  return \`Done pumping \${successCount} icons.\`;
})()
`;

process.stdout.write(code);
