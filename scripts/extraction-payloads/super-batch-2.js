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

const ids = [{"id":"3253:140455","name":"plant"},{"id":"3253:140450","name":"plant-2"},{"id":"3253:140291","name":"play"},{"id":"3253:140296","name":"playlist"},{"id":"3253:139658","name":"plus"},{"id":"3253:139653","name":"plus-circle"},{"id":"3253:140072","name":"pounds"},{"id":"3253:139382","name":"power"},{"id":"3253:140301","name":"previous"},{"id":"3253:139372","name":"printer"},{"id":"3253:139377","name":"processor"},{"id":"3253:140501","name":"pull-request"},{"id":"3253:140580","name":"QR-code"},{"id":"3253:139748","name":"question-circle"},{"id":"3253:140689","name":"quote"},{"id":"3253:139663","name":"radio-button"},{"id":"3253:139670","name":"radio-selected"},{"id":"3253:140077","name":"receipt"},{"id":"3287:134210","name":"redo"},{"id":"3287:134209","name":"refresh"},{"id":"3253:140306","name":"repeat"},{"id":"3253:140321","name":"repeat-once"},{"id":"3253:140933","name":"road-sign"},{"id":"3253:140938","name":"rocket"},{"id":"3253:140943","name":"rocket-alt"},{"id":"3287:134211","name":"rotate-left"},{"id":"3287:134212","name":"rotate-right"},{"id":"3253:140948","name":"route"},{"id":"3253:139278","name":"row"},{"id":"3253:139961","name":"save"},{"id":"3253:140560","name":"scan"},{"id":"3253:140311","name":"scissor"},{"id":"3253:140316","name":"screenshot"},{"id":"3253:139677","name":"search"},{"id":"3253:139682","name":"send"},{"id":"3253:139097","name":"send-AI"},{"id":"3253:139687","name":"send-alt"},{"id":"3253:139387","name":"server"},{"id":"3253:139392","name":"server-alt"},{"id":"3253:139694","name":"settings"},{"id":"3253:139701","name":"settings"},{"id":"3253:139706","name":"settings"},{"id":"3253:139711","name":"share"},{"id":"3253:139716","name":"share-alt"},{"id":"3253:140565","name":"shield"},{"id":"3253:140570","name":"shield-cross"},{"id":"3253:140575","name":"shield-tick"},{"id":"3253:140953","name":"ship"},{"id":"3253:140792","name":"shower"},{"id":"3287:134213","name":"shrink"},{"id":"3287:134214","name":"shrink-alt"},{"id":"3253:140326","name":"shuffle"},{"id":"3253:139721","name":"sign-in"},{"id":"3253:139728","name":"sign-out"},{"id":"3253:139397","name":"signal"},{"id":"3253:139402","name":"signal-off"},{"id":"3253:139407","name":"sim"},{"id":"3253:140850","name":"snooze"},{"id":"3253:141028","name":"snowflake"},{"id":"3253:140799","name":"sofa"},{"id":"3253:139412","name":"speaker"},{"id":"3253:141034","name":"star"},{"id":"3253:141039","name":"stars"},{"id":"3253:140331","name":"stop"},{"id":"3253:140855","name":"stopwatch"},{"id":"3253:139773","name":"store"},{"id":"3253:140694","name":"strikethrough"},{"id":"3253:140701","name":"subscript"},{"id":"3253:139733","name":"suitcase"},{"id":"3253:141044","name":"sun"}];
const results = [];
console.log("START SUPER BATCH 2");
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
console.log("END SUPER BATCH 2");
return results;