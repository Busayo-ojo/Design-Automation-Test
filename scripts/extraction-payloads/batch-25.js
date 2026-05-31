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
  let clean = svgString.replace(/<svg[^>]*>/, '').replace(/</svg>/, '').trim();
  clean = clean.replace(/fill="((?!none)[^"]+)"/g, 'fill="black"');
  clean = clean.replace(/stroke="((?!none)[^"]+)"/g, 'stroke="black"');
  return clean;
}

const ids = [{"id":"3253:139614","name":"minus"},{"id":"3253:139619","name":"minus-circle"},{"id":"3253:139342","name":"mobile"},{"id":"3253:140052","name":"money"},{"id":"3253:140057","name":"money-1"}];
const results = [];
console.log("START BATCH 25");
for (const item of ids) {
  try {
    console.log("Fetching: " + item.name + " (" + item.id + ")");
    const node = await figma.getNodeByIdAsync(item.id);
    if (!node) {
      console.log("Not found: " + item.name);
      continue;
    }
    const linearChild = node.children.find(c => c.name.replace(/\s+/g, '').toLowerCase() === "style=linear") || node.children.find(c => c.name.toLowerCase().includes("linear"));
    const boldChild = node.children.find(c => c.name.replace(/\s+/g, '').toLowerCase() === "style=bold") || node.children.find(c => c.name.toLowerCase().includes("bold"));
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
console.log("END BATCH 25");
return results;