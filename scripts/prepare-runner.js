const fs = require('fs');
const path = require('path');

const list = JSON.parse(fs.readFileSync('scripts/all-sorted-icons.json', 'utf8'));
const remaining = list.slice(225).filter(x => x.name !== 'Misc icon' && x.name !== 'Side Menu Default');

console.log(`Remaining count: ${remaining.length}`);

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
  let clean = svgString.replace(/<svg[^>]*>/, '').replace(/<\\/svg>/, '').trim();
  clean = clean.replace(/fill="((?!none)[^"]+)"/g, 'fill="black"');
  clean = clean.replace(/stroke="((?!none)[^"]+)"/g, 'stroke="black"');
  return clean;
}
`;

const runnerCode = `
${headersStr}

const remainingIcons = ${JSON.stringify(remaining)};
console.log("Figma starting extraction loop for " + remainingIcons.length + " icons...");

// Split remainingIcons into batches of size 5
const BATCH_SIZE = 5;
const batches = [];
for (let i = 0; i < remainingIcons.length; i += BATCH_SIZE) {
  batches.push(remainingIcons.slice(i, i + BATCH_SIZE));
}

// Function to run the batches sequentially
async function runExtraction() {
  let batchIndex = 0;
  for (const batch of batches) {
    batchIndex++;
    console.log("Starting batch " + batchIndex + "/" + batches.length);
    const batchResults = [];
    for (const item of batch) {
      try {
        console.log("Fetching icon: " + item.name + " (" + item.id + ")");
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
        batchResults.push({
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

    // POST the batch results to local server
    console.log("Posting batch " + batchIndex + " results, count: " + batchResults.length);
    try {
      const response = await fetch("http://127.0.0.1:8999/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batchResults)
      });
      const text = await response.text();
      console.log("Post batch " + batchIndex + " response: " + text);
    } catch (err) {
      console.log("Post batch " + batchIndex + " error: " + err.message);
    }

    // Sleep for 200ms
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Done!
  console.log("Finished all batches. Triggering done...");
  try {
    const response = await fetch("http://127.0.0.1:8999/done", {
      method: "POST"
    });
    const text = await response.text();
    console.log("Done response: " + text);
  } catch (err) {
    console.log("Done error: " + err.message);
  }
}

// Start extraction loop in background/async context
runExtraction().catch(err => {
  console.log("Global runner error: " + err.message);
});

return { status: "Extraction loop started" };
`;

fs.writeFileSync('scripts/run-extraction-loop.js', runnerCode.trim(), 'utf8');
console.log('Figma runner script written to scripts/run-extraction-loop.js');
