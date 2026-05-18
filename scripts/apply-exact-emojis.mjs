import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const exactMapping = {
  'Welcome': '🎉',
  'Getting Started': '🏁',
  'Catalog': '📚',
  'MCP': '🖇️',
  'Playground': '🛝',
  'Elements': '🧩',
  'Changelog': '🪵',
  'Migration Guide': '🧭',
  'Contributing': '🧑🏽‍🍳',
  'Colors': '🌈',
  'Shadows and Blurs': '🌫️',
  'Spacing': '📐',
  'Typography': '✍🏽',
  'Avatars': '🌚',
  'Badge': '📛',
  'Button': '➡️',
  'Chip': '🍪',
  'Input': '🔠',
  'Tabbed Buttons': '🚥',
  'Toast': '🍞',
  'Toggle': '🎛️‍',
};

const files = globSync('src/**/*.{mdx,stories.tsx}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  let isMdx = false;
  let match = content.match(/<Meta title="([^"]+)"/);
  if (!match) {
    match = content.match(/title:\s*'([^']+)'/);
    isMdx = false;
  } else {
    isMdx = true;
  }

  if (match) {
    const fullTitle = match[1];
    const searchStr = match[0];
    
    const parts = fullTitle.split('/');
    const currentLeaf = parts.pop();
    
    // To reliably get the raw name, strip any leading characters that aren't letters or numbers
    const rawLeafName = currentLeaf.replace(/^[^a-zA-Z0-9]+/, '').trim();

    let newEmoji = exactMapping[rawLeafName];
    
    if (!newEmoji) {
      newEmoji = '✨'; // default fallback
    }
    
    const newLeaf = `${newEmoji} ${rawLeafName}`;
    const newTitle = parts.length > 0 ? `${parts.join('/')}/${newLeaf}` : newLeaf;
    
    if (isMdx) {
      content = content.replace(searchStr, `<Meta title="${newTitle}"`);
    } else {
      content = content.replace(searchStr, `title: '${newTitle}'`);
    }
    
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}: ${fullTitle} -> ${newTitle}`);
  }
});
