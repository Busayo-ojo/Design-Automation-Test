import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const emojis = [
  '🎉', '🏁', '📚', '🖇️', '🛝', '🪵', '🧭', '🧑🏽‍🍳', '🌈', '🌫️',
  '📐', '✍🏽', '📜', '📛', '➡️', '🍪', '🔠', '🚥', '🍞', '🎛️‍', '🌚',
  '🚀', '🎨', '🧩', '🧪', '✨', '⚡️', '🌟', '💥', '🔥', '💎', '💡', '📌'
];

const files = globSync('src/**/*.{mdx,stories.tsx}');

const items = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  // match <Meta title="X" /> or title: 'X'
  let match = content.match(/<Meta title="([^"]+)"/);
  if (match) {
    items.push({ file, type: 'mdx', fullTitle: match[1], searchStr: match[0], isMetaOf: false });
    return;
  }
  
  match = content.match(/title:\s*'([^']+)'/);
  if (match) {
    items.push({ file, type: 'tsx', fullTitle: match[1], searchStr: match[0], isMetaOf: false });
    return;
  }
});

// Sort items according to preview.ts logic
const order = [
  'Welcome',
  'Getting Started',
  'Catalog',
  'MCP',
  'Playground',
  'Foundations',
  'Elements',
  'Components',
  'Layout',
  'Changelog',
  'Migration Guide',
  'Contributing',
];

items.sort((a, b) => {
  const aRoot = a.fullTitle.split('/')[0];
  const bRoot = b.fullTitle.split('/')[0];

  if (aRoot !== bRoot) {
    const aIndex = order.indexOf(aRoot);
    const bIndex = order.indexOf(bRoot);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return aRoot.localeCompare(bRoot);
  }

  const aTitle = a.fullTitle.split('/').pop() || '';
  const bTitle = b.fullTitle.split('/').pop() || '';
  return aTitle.localeCompare(bTitle);
});

// Now apply emojis
items.forEach((item, index) => {
  const emoji = emojis[index] || emojis[emojis.length - 1]; // fallback to last emoji if we run out
  
  const parts = item.fullTitle.split('/');
  const leaf = parts.pop();
  const newLeaf = `${emoji} ${leaf}`;
  const newTitle = parts.length > 0 ? `${parts.join('/')}/${newLeaf}` : newLeaf;
  
  let content = fs.readFileSync(item.file, 'utf-8');
  if (item.type === 'mdx') {
    content = content.replace(item.searchStr, `<Meta title="${newTitle}"`);
  } else {
    content = content.replace(item.searchStr, `title: '${newTitle}'`);
  }
  
  fs.writeFileSync(item.file, content, 'utf-8');
  console.log(`Updated ${item.file}: ${item.fullTitle} -> ${newTitle}`);
});
