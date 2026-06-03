const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOKENS_CSS_PATH = path.join(ROOT, 'src', 'tokens.css');
const SHOWCASE_PATH = path.join(ROOT, 'src', 'docs', 'IconShowcase.tsx');
const SCRIPTS_DIR = path.join(ROOT, 'scripts');

function getTags(name, category) {
  const parts = name.split('-');
  const tags = new Set([...parts]);
  
  const catWords = category.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  for (const w of catWords) {
    if (w && w.length > 2) tags.add(w);
  }
  
  if (name.includes('stars')) tags.add('magic').add('sparkles').add('ai');
  if (name.includes('lock')) tags.add('secure').add('security');
  if (name.includes('search')) tags.add('zoom').add('find').add('magnifier');
  if (name.includes('mail') || name.includes('message')) tags.add('email').add('chat').add('send');
  if (name.includes('bin') || name.includes('trash')) tags.add('delete').add('remove');
  
  return Array.from(tags);
}

function wrapSvg(innerContent) {
  if (!innerContent) return '';
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n${innerContent}\n</svg>`;
}

function run() {
  console.log('Reading Figma exported batch files...');
  const files = fs.readdirSync(SCRIPTS_DIR)
    .filter(f => f.startsWith('figma-output-batch-') && f.endsWith('.json'))
    .sort();
  
  if (files.length === 0) {
    console.error('Error: No figma-output-batch-*.json files found in ' + SCRIPTS_DIR);
    process.exit(1);
  }

  let icons = [];
  for (const file of files) {
    const filePath = path.join(SCRIPTS_DIR, file);
    console.log(`Loading ${file}...`);
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    icons = icons.concat(fileData);
  }
  
  console.log(`Loaded ${icons.length} total icons.`);

  // Sort icons by name to be deterministic
  icons.sort((a, b) => a.name.localeCompare(b.name));

  // 1. Process tokens.css
  console.log('Processing tokens.css...');
  let cssContent = fs.readFileSync(TOKENS_CSS_PATH, 'utf8');

  // We want to replace the :root variables and class definitions for icons.
  const rootIndex = cssContent.indexOf(':root {');
  if (rootIndex === -1) {
    console.error('Error: :root not found in tokens.css');
    process.exit(1);
  }
  
  const iconsComment = '/* ── Icons ── */';
  const iconsCommentIndex = cssContent.indexOf(iconsComment);
  if (iconsCommentIndex === -1) {
    console.error('Error: /* ── Icons ── */ comment not found in tokens.css');
    process.exit(1);
  }

  const part1 = cssContent.substring(0, iconsCommentIndex + iconsComment.length);
  const restOfCss = cssContent.substring(iconsCommentIndex + iconsComment.length);
  const closingBraceIndex = restOfCss.indexOf('}');
  if (closingBraceIndex === -1) {
    console.error('Error: closing brace of :root not found');
    process.exit(1);
  }

  const restAfterRoot = restOfCss.substring(closingBraceIndex);
  
  // Now generate the CSS variables
  let variablesString = '\n';
  for (const icon of icons) {
    if (icon.linear) {
      const fullSvg = wrapSvg(icon.linear);
      const b64 = Buffer.from(fullSvg).toString('base64');
      variablesString += `  --icon-${icon.name}-linear: url("data:image/svg+xml;base64,${b64}");\n`;
    }
    if (icon.bold) {
      const fullSvg = wrapSvg(icon.bold);
      const b64 = Buffer.from(fullSvg).toString('base64');
      variablesString += `  --icon-${icon.name}-bold: url("data:image/svg+xml;base64,${b64}");\n`;
    }
  }

  // Now construct Part 2: everything from class mappings to the end of file.
  let classMappingsString = '\n\n/* ── Base Icon Utility CSS ── */\n';
  classMappingsString += `.fmdq-icon {
  display: inline-block;
  width: var(--icon-size, 24px);
  height: var(--icon-size, 24px);
  background-color: var(--icon-color, currentColor);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  flex-shrink: 0;
}\n\n/* Icon Variants mapping */\n`;

  for (const icon of icons) {
    classMappingsString += `.fmdq-icon-${icon.name} {
  mask-image: var(--icon-${icon.name}-linear);
  -webkit-mask-image: var(--icon-${icon.name}-linear);
}\n`;
    classMappingsString += `.fmdq-icon-${icon.name}.style-bold {
  mask-image: var(--icon-${icon.name}-bold);
  -webkit-mask-image: var(--icon-${icon.name}-bold);
}\n\n`;
  }

  const globalBaseComment = '/* ── Global Base ── */';
  const globalBaseIndex = restAfterRoot.indexOf(globalBaseComment);
  if (globalBaseIndex === -1) {
    console.error('Error: /* ── Global Base ── */ not found');
    process.exit(1);
  }

  const globalBasePart = restAfterRoot.substring(globalBaseIndex);

  // Write new tokens.css
  const newCssContent = part1 + variablesString + '}' + classMappingsString + globalBasePart;
  fs.writeFileSync(TOKENS_CSS_PATH, newCssContent, 'utf8');
  console.log('Successfully updated tokens.css');

  // 2. Process IconShowcase.tsx
  console.log('Processing IconShowcase.tsx...');
  let showcaseContent = fs.readFileSync(SHOWCASE_PATH, 'utf8');

  // We want to replace the ALL_ICONS array in Showcase.tsx
  const iconDataArray = icons.map(icon => ({
    name: icon.name,
    category: icon.category,
    tags: getTags(icon.name, icon.category)
  }));

  const arrayString = `const ALL_ICONS: IconData[] = ${JSON.stringify(iconDataArray, null, 2)};`;

  const arrayStartText = 'const ALL_ICONS: IconData[] = [';
  const startIndex = showcaseContent.indexOf(arrayStartText);
  if (startIndex === -1) {
    console.error('Error: const ALL_ICONS array not found in IconShowcase.tsx');
    process.exit(1);
  }

  const remainingShowcase = showcaseContent.substring(startIndex);
  const closingIndex = remainingShowcase.indexOf('];');
  if (closingIndex === -1) {
    console.error('Error: closing ]; of ALL_ICONS not found');
    process.exit(1);
  }

  const absoluteClosingIndex = startIndex + closingIndex + 2;

  const newShowcaseContent = showcaseContent.substring(0, startIndex) + arrayString + showcaseContent.substring(absoluteClosingIndex);
  fs.writeFileSync(SHOWCASE_PATH, newShowcaseContent, 'utf8');
  console.log('Successfully updated IconShowcase.tsx metadata list');
}

run();
