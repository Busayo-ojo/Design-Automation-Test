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

const ids = [{"id":"3253:141049","name":"sun-cloud"},{"id":"3253:140708","name":"superscript"},{"id":"3253:140746","name":"support"},{"id":"3287:134215","name":"switch-diagonal"},{"id":"3287:134216","name":"switch-horizontal"},{"id":"3287:134217","name":"switch-vertical"},{"id":"3253:139417","name":"tablet"},{"id":"3253:139840","name":"target"},{"id":"3253:140960","name":"taxi"},{"id":"3253:140506","name":"terminal"},{"id":"3253:140715","name":"text"},{"id":"3253:141054","name":"thermometer"},{"id":"3253:140082","name":"ticket"},{"id":"3253:140757","name":"tissue"},{"id":"3253:140972","name":"train"},{"id":"3253:140751","name":"trophy"},{"id":"3253:140967","name":"truck"},{"id":"3253:139422","name":"tv"},{"id":"3253:140585","name":"underline"},{"id":"3287:134218","name":"undo"},{"id":"3253:139753","name":"upload"},{"id":"3253:141065","name":"user"},{"id":"3253:141070","name":"user-add"},{"id":"3253:141075","name":"user-circle"},{"id":"3253:141080","name":"user-cross"},{"id":"3253:141085","name":"user-group"},{"id":"3253:141090","name":"user-heart"},{"id":"3253:141095","name":"user-remove"},{"id":"3253:141105","name":"user-tick"},{"id":"3253:141100","name":"users"},{"id":"3253:139758","name":"verified"},{"id":"3253:140338","name":"video"},{"id":"3253:140343","name":"video-slash"},{"id":"3253:140348","name":"voice-note"},{"id":"3253:140358","name":"volume"},{"id":"3253:140363","name":"volume-low"},{"id":"3253:140368","name":"volume-mute"},{"id":"3253:140373","name":"volume-slash"},{"id":"3253:139087","name":"VR-goggles"},{"id":"3253:140087","name":"wallet"},{"id":"3253:140092","name":"wallet-add"},{"id":"3253:140107","name":"wallet-check"},{"id":"3253:140102","name":"wallet-cross"},{"id":"3253:140112","name":"wallet-fund"},{"id":"3253:140097","name":"wallet-remove"},{"id":"3253:140117","name":"wallet-withdraw"},{"id":"3253:141059","name":"water-drop"},{"id":"3253:139427","name":"wifi"},{"id":"3253:139432","name":"wristwatch"},{"id":"3253:139966","name":"yen"},{"id":"3253:139763","name":"zoom-in"},{"id":"3253:139768","name":"zoom-out"}];
const results = [];
console.log("START SUPER BATCH 3");
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
console.log("END SUPER BATCH 3");
return results;