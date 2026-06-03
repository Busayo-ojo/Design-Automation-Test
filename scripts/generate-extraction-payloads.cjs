const fs = require('fs');
const path = require('path');

const list = JSON.parse(fs.readFileSync('scripts/all-sorted-icons.json', 'utf8'));
const remaining = list.slice(205).filter(x => x.name !== 'Misc icon' && x.name !== 'Side Menu Default');

console.log(`Remaining icons count to extract: ${remaining.length}`);

const BATCH_SIZE = 5; // Extra safe chunk size to guarantee no timeouts
const batches = [];
for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
  batches.push(remaining.slice(i, i + BATCH_SIZE));
}

console.log(`Created ${batches.length} batches.`);

const outDir = path.join(__dirname, 'extraction-payloads');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const headersStr = `
const headers = [
  { y: 372, text: "✨ AI & VR" }, { y: 601, text: "➡️ Arrows" }, { y: 934, text: "🏡 Buildings" },
  { y: 1163, text: "☎️ Call" }, { y: 1392, text: "💎 Crypto" }, { y: 1621, text: "📊 Dashboard" },
  { y: 1850, text: "💻 Devices" }, { y: 2183, text: "🔔 Essentials" }, { y: 2620, text: "🛍️ Ecommerce" },
  { y: 2849, text: "📚 Education" }, { y: 3078, text: "📁 Files" }, { y: 3412, text: "💰 Finance" },
  { y: 3745, text: "⛑️ Health" }, { y: 3974, text: "🎧 Media" }, { y: 4411, text: "📥 Messaging" },
  { y: 4640, text: "🌻 Nature" }, { y: 4869, text: "🐞 Programming" }, { y: 5098, text: "🔐 Security" },
  { y: 5327, text: "📝 Texts" }, { y: 5556, text: "🏆 Support" }, { y: 5785, text: "🎨 Things" },
  { y: 6015, text: "⏰ Time" }, { y: 6244, text: "🚗 Transport" }, { y: 6577, text: "🌤️ Weather" },
  { y: 6806, text: "👨‍👩‍👦‍👦 User" }
];
function getCategory(nodeY) {
  let bestHeader = headers[0];
  let minDiff = Infinity;
  for (const h of headers) {
    if (nodeY >= h.y) {
      const diff = nodeY - h.y;
      if (diff < minDiff) {
        minDiff = diff;
        bestHeader = h;
      }
    }
  }
  return bestHeader.text;
}
function cleanSvg(svgString) {
  let clean = svgString.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').trim();
  clean = clean.replace(/fill="((?!none)[^"]+)"/g, 'fill="black"');
  clean = clean.replace(/stroke="((?!none)[^"]+)"/g, 'stroke="black"');
  return clean;
}
`;

batches.forEach((batch, idx) => {
  const batchNum = idx + 15; // Batch 14 is already fetched, so we start at Batch 15
  const code = `
${headersStr}
const ids = ${JSON.stringify(batch)};
const results = [];
console.log("START BATCH ${batchNum}");
for (const item of ids) {
  try {
    console.log("Fetching: " + item.name + " (" + item.id + ")");
    const node = await figma.getNodeByIdAsync(item.id);
    if (!node) {
      console.log("Not found: " + item.name);
      continue;
    }
    const linearChild = node.children.find(c => c.name.replace(/\\s+/g, '').toLowerCase() === "style=linear") || node.children.find(c => c.name.toLowerCase().includes("linear"));
    const boldChild = node.children.find(c => c.name.replace(/\\s+/g, '').toLowerCase() === "style=bold") || node.children.find(c => c.name.toLowerCase().includes("bold"));
    let linearSvg = "";
    let boldSvg = "";
    if (linearChild) {
      const bytes = await linearChild.exportAsync({ format: "SVG" });
      const svgStr = Array.from(bytes).map(b => String.fromCharCode(b)).join("");
      linearSvg = cleanSvg(svgStr);
    }
    if (boldChild) {
      const bytes = await boldChild.exportAsync({ format: "SVG" });
      const svgStr = Array.from(bytes).map(b => String.fromCharCode(b)).join("");
      boldSvg = cleanSvg(svgStr);
    }
    const category = getCategory(node.y);
    results.push({
      name: item.name,
      category,
      linear: linearSvg,
      bold: boldSvg
    });
    console.log("Success: " + item.name);
  } catch (e) {
    console.log("Error extracting " + item.name + ": " + e.message);
  }
}
console.log("END BATCH ${batchNum}");
return results;
`;
  fs.writeFileSync(path.join(outDir, `batch-${batchNum}.js`), code.trim(), 'utf8');
});

console.log('Payload scripts regenerated with batch size 5 and logging.');
