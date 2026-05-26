const fs = require("fs");
const path = require("path");

const tokensPath = path.join(__dirname, "../src/tokens.css");
let content = fs.readFileSync(tokensPath, "utf8");

// Regex to match the variables
const linearRegex = /(--icon-ai-stars-linear:\s*url\("data:image\/svg\+xml;base64,)([^"]+)"\);/;
const boldRegex = /(--icon-ai-stars-bold:\s*url\("data:image\/svg\+xml;base64,)([^"]+)"\);/;

const linearMatch = content.match(linearRegex);
const boldMatch = content.match(boldRegex);

if (linearMatch) {
  const base64 = linearMatch[2];
  const svg = Buffer.from(base64, "base64").toString("utf8");
  console.log("Original Linear SVG:\n", svg);
  
  // Replace fill="currentColor" with fill="black"
  const updatedSvg = svg.replace(/fill="currentColor"/g, 'fill="black"');
  console.log("Updated Linear SVG:\n", updatedSvg);
  
  const newBase64 = Buffer.from(updatedSvg).toString("base64");
  content = content.replace(linearRegex, `$1${newBase64}");`);
}

if (boldMatch) {
  const base64 = boldMatch[2];
  const svg = Buffer.from(base64, "base64").toString("utf8");
  console.log("Original Bold SVG:\n", svg);
  
  // Replace fill="currentColor" with fill="black"
  const updatedSvg = svg.replace(/fill="currentColor"/g, 'fill="black"');
  console.log("Updated Bold SVG:\n", updatedSvg);
  
  const newBase64 = Buffer.from(updatedSvg).toString("base64");
  content = content.replace(boldRegex, `$1${newBase64}");`);
}

fs.writeFileSync(tokensPath, content, "utf8");
console.log("Updated tokens.css successfully!");
