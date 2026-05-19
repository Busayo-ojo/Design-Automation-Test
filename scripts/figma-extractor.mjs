#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 * FMDQ Design Automation — Figma Deep-Scan Token Extractor
 * ═══════════════════════════════════════════════════════════════
 *
 * Connects to the Figma REST API and performs a DEEP NODE SCAN
 * to extract design tokens directly from the file's visual tree.
 * This approach works even when styles aren't formally published.
 *
 * Extraction targets:
 *   - Colors page  → color palettes (Primary, Secondary, Neutral, Semantics)
 *   - Typography   → font families, sizes, weights
 *   - Spacing      → spacing scale values
 *   - Shadows      → shadow/effect definitions
 *
 * Outputs:
 *   - src/tokens.json   (raw structured data)
 *   - src/tokens.css     (CSS custom properties)
 *
 * Usage:
 *   node scripts/figma-extractor.mjs                # full sync
 *   node scripts/figma-extractor.mjs --tokens-only  # tokens only, skip component listing
 *   node scripts/figma-extractor.mjs --dry-run      # preview without writing files
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TOKENS_CSS_PATH = path.join(ROOT, 'src', 'tokens.css');
const TOKENS_JSON_PATH = path.join(ROOT, 'src', 'tokens.json');

// ─── Load .env manually ──────────────────────────────────────
function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const API_BASE = 'https://api.figma.com/v1';

const flags = new Set(process.argv.slice(2).map(a => a.toLowerCase()));
const DRY_RUN = flags.has('--dry-run');
const TOKENS_ONLY = flags.has('--tokens-only');

// ─── Helpers ──────────────────────────────────────────────────
function die(msg) { console.error(`\n❌  ${msg}\n`); process.exit(1); }
function info(msg) { console.log(`  ℹ  ${msg}`); }
function success(msg) { console.log(`  ✅  ${msg}`); }

async function figmaGet(endpoint, retries = 5, backoff = 5000) {
  const url = `${API_BASE}${endpoint}`;
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } });
    if (res.status === 429) {
      const delay = parseInt(res.headers.get('Retry-After') || '0') * 1000 || backoff * (i + 1);
      info(`Rate limited by Figma API. Retrying in ${Math.round(delay / 1000)}s...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      continue;
    }
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      die(`Figma API ${res.status} at ${endpoint}\n${body.slice(0, 300)}`);
    }
    return res.json();
  }
  die(`Figma API rate limit exceeded after ${retries} retries at ${endpoint}`);
}

function rgbaToHex({ r, g, b }) {
  return '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}

// ─── Page discovery ───────────────────────────────────────────
async function getFilePages() {
  info('Fetching Figma file structure...');
  const data = await figmaGet(`/files/${FIGMA_FILE_KEY}?depth=2`);
  const pages = data.document.children.map(c => ({
    id: c.id,
    name: c.name.trim(),
    childNames: (c.children || []).map(ch => ch.name)
  }));
  info(`Found ${pages.length} pages`);
  return pages;
}

function findPage(pages, keyword) {
  return pages.find(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
}

// ─── Deep node fetcher ────────────────────────────────────────
async function getPageNodes(pageId) {
  const data = await figmaGet(`/files/${FIGMA_FILE_KEY}/nodes?ids=${pageId}&depth=12`);
  return data.nodes[pageId]?.document;
}

// ═══════════════════════════════════════════════════════════════
// COLOR EXTRACTION
// ═══════════════════════════════════════════════════════════════

function extractColorPalettes(node) {
  const palettes = {};

  // Walk the tree looking for color swatch groups
  // Pattern: Parent frame named like "Primary", "Neutral", etc.
  //   → child groups named with shade numbers
  //     → "Shade" text node (e.g. "50", "100", "400 (base)")
  //     → "Hex code" text node (e.g. "#034591")
  //     → "BG" rectangle with actual fill

  function findColorGroups(n, category = '') {
    const name = (n.name || '').trim();

    // Detect category frames (Primary, Secondary, Neutral, Semantics sub-groups)
    const categoryNames = [
      'Primary', 'Secondary', 'Neutral',
      'Success', 'Warning', 'Error', 'Information',
      'Grey', 'Gray'
    ];

    let currentCategory = category;
    if (categoryNames.some(c => name.toLowerCase() === c.toLowerCase())) {
      currentCategory = name;
    }
    // Also match "Title" text nodes that declare a category
    if (n.type === 'TEXT' && n.name === 'Text' && n.characters) {
      const text = n.characters.trim();
      if (categoryNames.some(c => text.toLowerCase() === c.toLowerCase())) {
        currentCategory = text;
      }
    }

    // Look for shade/hex pairs within grouped containers
    if (n.children && n.children.length > 0) {
      // Check if this node contains a "Shade" and "Hex code" sibling pair
      const shadeNode = findDescendantByName(n, 'Shade');
      const hexNode = findDescendantByName(n, 'Hex code');
      const bgNode = findDescendantByNameAndType(n, 'BG', 'RECTANGLE');

      if (shadeNode && hexNode && shadeNode.characters && hexNode.characters) {
        const shade = shadeNode.characters.trim().replace(/\s*\(base\)/i, '');
        let hex = hexNode.characters.trim().toUpperCase();

        // Validate and normalize hex
        if (hex.match(/^#[0-9A-F]{6,7}$/i)) {
          hex = hex.slice(0, 7); // Trim extra F if present (e.g. #FFFFFFF → #FFFFFF)
        }

        // Determine the category from ancestor path
        const cat = currentCategory || detectCategory(n);
        if (cat) {
          if (!palettes[cat]) palettes[cat] = {};
          palettes[cat][shade] = hex;
        }
      }

      // Recurse into children
      for (const child of n.children) {
        const childPalettes = extractColorPalettes_inner(child, currentCategory);
        for (const [cat, shades] of Object.entries(childPalettes)) {
          if (!palettes[cat]) palettes[cat] = {};
          Object.assign(palettes[cat], shades);
        }
      }
    }

    return palettes;
  }

  function extractColorPalettes_inner(n, category = '') {
    const result = {};
    const name = (n.name || '').trim();

    // Category detection
    const categoryNames = [
      'Primary', 'Secondary', 'Neutral',
      'Success', 'Warning', 'Error', 'Information',
      'Grey', 'Gray', 'Shades'
    ];

    let currentCategory = category;

    // Check frame name for category
    for (const cat of categoryNames) {
      if (name.toLowerCase() === cat.toLowerCase() ||
          name.toLowerCase().startsWith(cat.toLowerCase() + ' ')) {
        currentCategory = cat === 'Shades' ? 'Neutral' : cat;
        break;
      }
    }

    // Check if a child TEXT node's text declares a category
    if (n.children) {
      for (const child of n.children) {
        if (child.type === 'TEXT' && child.name === 'Text' && child.characters) {
          const t = child.characters.trim();
          for (const cat of categoryNames) {
            if (t.toLowerCase() === cat.toLowerCase()) {
              currentCategory = cat === 'Shades' ? 'Neutral' : cat;
            }
          }
        }
      }
    }

    if (n.children) {
      // Try to find shade/hex pairs at this level
      const shadeNode = findDirectChild(n, 'Shade', 'TEXT');
      const hexNode = findDirectChild(n, 'Hex code', 'TEXT');

      if (shadeNode && hexNode && shadeNode.characters && hexNode.characters) {
        const shade = shadeNode.characters.trim().replace(/\s*\(base\)/i, '');
        let hex = hexNode.characters.trim();
        if (hex.match(/^#[0-9A-Fa-f]{6,8}$/)) {
          hex = hex.slice(0, 7).toUpperCase();
          if (currentCategory) {
            if (!result[currentCategory]) result[currentCategory] = {};
            result[currentCategory][shade] = hex;
          }
        }
      }

      // Recurse
      for (const child of n.children) {
        const childResult = extractColorPalettes_inner(child, currentCategory);
        for (const [cat, shades] of Object.entries(childResult)) {
          if (!result[cat]) result[cat] = {};
          Object.assign(result[cat], shades);
        }
      }
    }

    return result;
  }

  return extractColorPalettes_inner(node);
}

function findDescendantByName(node, targetName) {
  if (node.name === targetName && node.type === 'TEXT') return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findDescendantByName(child, targetName);
      if (found) return found;
    }
  }
  return null;
}

function findDescendantByNameAndType(node, targetName, targetType) {
  if (node.name === targetName && node.type === targetType) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findDescendantByNameAndType(child, targetName, targetType);
      if (found) return found;
    }
  }
  return null;
}

function findDirectChild(node, name, type) {
  if (!node.children) return null;
  for (const child of node.children) {
    if (child.name === name && (!type || child.type === type)) return child;
    // Also search one level deeper (common pattern: Base/Shade, Base/Hex code)
    if (child.children) {
      for (const grandchild of child.children) {
        if (grandchild.name === name && (!type || grandchild.type === type)) return grandchild;
        // And one more level for Code/Hex code pattern
        if (grandchild.children) {
          for (const gg of grandchild.children) {
            if (gg.name === name && (!type || gg.type === type)) return gg;
          }
        }
      }
    }
  }
  return null;
}

function detectCategory(node) {
  // Walk up to detect category from ancestor names
  return null; // Used in fallback only
}

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY EXTRACTION
// ═══════════════════════════════════════════════════════════════

function extractTypography(node) {
  const typography = [];

  function walk(n) {
    if (n.type === 'TEXT' && n.style) {
      const s = n.style;
      const existing = typography.find(t =>
        t.fontFamily === s.fontFamily &&
        t.fontSize === s.fontSize &&
        t.fontWeight === s.fontWeight
      );
      if (!existing && s.fontFamily && s.fontSize) {
        typography.push({
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight || 400,
          lineHeight: s.lineHeightPx || null,
          lineHeightPercent: s.lineHeightPercent || null,
          letterSpacing: s.letterSpacing || 0,
          textCase: s.textCase || 'ORIGINAL',
          sample: (n.characters || '').slice(0, 40)
        });
      }
    }
    if (n.children) n.children.forEach(walk);
  }

  walk(node);
  // Sort by fontSize descending
  typography.sort((a, b) => b.fontSize - a.fontSize);
  return typography;
}

// ═══════════════════════════════════════════════════════════════
// SPACING EXTRACTION
// ═══════════════════════════════════════════════════════════════

function extractSpacing(node) {
  const spacingValues = new Set();

  function walk(n) {
    // Look for frames/rectangles that represent spacing tokens
    if (n.type === 'TEXT' && n.characters) {
      // Match patterns like "4", "8", "12", "16", "24", "32", "40", "48", "64" etc.
      const match = n.characters.match(/^(\d+)(?:px)?$/);
      if (match) {
        const val = parseInt(match[1]);
        if (val > 0 && val <= 200) spacingValues.add(val);
      }
    }
    // Also look at size of spacing swatch rectangles
    if (n.name && n.name.toLowerCase().includes('spacing') && n.absoluteBoundingBox) {
      const w = Math.round(n.absoluteBoundingBox.width);
      const h = Math.round(n.absoluteBoundingBox.height);
      if (w === h && w > 0 && w <= 200) spacingValues.add(w);
    }
    if (n.children) n.children.forEach(walk);
  }

  walk(node);
  return [...spacingValues].sort((a, b) => a - b);
}

// ═══════════════════════════════════════════════════════════════
// SHADOW EXTRACTION
// ═══════════════════════════════════════════════════════════════

function extractShadows(node) {
  const shadows = [];

  function walk(n) {
    if (n.effects && n.effects.length > 0) {
      const dropShadows = n.effects.filter(e =>
        (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') && e.visible !== false
      );
      if (dropShadows.length > 0) {
        const cssValues = dropShadows.map(e => {
          const c = e.color || { r: 0, g: 0, b: 0, a: 0.1 };
          const rgba = `rgba(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)}, ${(c.a ?? 0.1).toFixed(2)})`;
          const x = e.offset?.x ?? 0;
          const y = e.offset?.y ?? 0;
          const r = e.radius ?? 0;
          const s = e.spread ?? 0;
          const inset = e.type === 'INNER_SHADOW' ? 'inset ' : '';
          return `${inset}${x}px ${y}px ${r}px ${s}px ${rgba}`;
        });

        const existing = shadows.find(s => s.css === cssValues.join(', '));
        if (!existing) {
          shadows.push({
            name: n.name,
            css: cssValues.join(', '),
            effects: dropShadows.map(e => ({
              type: e.type,
              x: e.offset?.x ?? 0,
              y: e.offset?.y ?? 0,
              blur: e.radius ?? 0,
              spread: e.spread ?? 0,
              color: e.color ? rgbaToHex(e.color) : '#000000',
              opacity: e.color?.a ?? 0.1
            }))
          });
        }
      }
    }
    if (n.children) n.children.forEach(walk);
  }

  walk(node);
  return shadows;
}

// ═══════════════════════════════════════════════════════════════
// BUTTON SPECS EXTRACTION
// ═══════════════════════════════════════════════════════════════

function extractButtonSpecs(node) {
  const buttons = [];

  function walk(n) {
    const name = (n.name || '').toLowerCase();
    if (
      (name.includes('button') || n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') &&
      n.absoluteBoundingBox
    ) {
      const spec = {
        name: n.name,
        type: n.type,
        width: Math.round(n.absoluteBoundingBox.width),
        height: Math.round(n.absoluteBoundingBox.height),
      };

      if (n.cornerRadius) spec.borderRadius = n.cornerRadius;
      if (n.paddingLeft !== undefined) {
        spec.padding = {
          top: n.paddingTop, right: n.paddingRight,
          bottom: n.paddingBottom, left: n.paddingLeft
        };
      }
      if (n.itemSpacing !== undefined) spec.gap = n.itemSpacing;
      if (n.fills && n.fills.length > 0 && n.fills[0].type === 'SOLID') {
        spec.fill = rgbaToHex(n.fills[0].color);
      }
      if (n.strokes && n.strokes.length > 0 && n.strokes[0].type === 'SOLID') {
        spec.stroke = rgbaToHex(n.strokes[0].color);
        spec.strokeWeight = n.strokeWeight;
      }

      buttons.push(spec);
    }
    if (n.children) n.children.forEach(walk);
  }

  walk(node);
  return buttons;
}

// ═══════════════════════════════════════════════════════════════
// CSS GENERATION
// ═══════════════════════════════════════════════════════════════

function generateCSS(tokens) {
  const lines = [':root {'];

  // Colors
  for (const [category, shades] of Object.entries(tokens.colors)) {
    const catSlug = category.toLowerCase().replace(/\s+/g, '-');
    lines.push(`  /* ── ${category} ── */`);

    // Sort shades numerically, with special names at end
    const sortedShades = Object.entries(shades).sort((a, b) => {
      const numA = parseInt(a[0]);
      const numB = parseInt(b[0]);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      if (!isNaN(numA)) return -1;
      if (!isNaN(numB)) return 1;
      return a[0].localeCompare(b[0]);
    });

    for (const [shade, hex] of sortedShades) {
      const shadeSlug = shade.toLowerCase().replace(/\s+/g, '-');
      lines.push(`  --color-${catSlug}-${shadeSlug}: ${hex};`);
    }
    lines.push('');
  }

  // Typography
  if (tokens.typography.length > 0) {
    lines.push('  /* ── Typography ── */');
    const families = [...new Set(tokens.typography.map(t => t.fontFamily))];
    families.forEach((family, i) => {
      lines.push(`  --font-family-${i === 0 ? 'primary' : 'secondary'}: '${family}', sans-serif;`);
    });
    lines.push('');

    // Font size scale
    const sizes = [...new Set(tokens.typography.map(t => t.fontSize))].sort((a, b) => a - b);
    const sizeLabels = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
    sizes.forEach((size, i) => {
      const label = sizeLabels[i] || `${size}`;
      lines.push(`  --font-size-${label}: ${size}px;`);
    });
    lines.push('');

    // Line heights
    const lineHeights = [...new Set(tokens.typography.filter(t => t.lineHeightPercent).map(t => Math.round(t.lineHeightPercent)))].sort((a, b) => a - b);
    lineHeights.forEach(lh => {
      lines.push(`  --font-line-height-${lh}: ${lh}%;`);
    });
    if (lineHeights.length > 0) lines.push('');
  }

  // Spacing
  if (tokens.spacing.length > 0) {
    lines.push('  /* ── Spacing ── */');
    for (const val of tokens.spacing) {
      lines.push(`  --spacing-${val}: ${val}px;`);
    }
    lines.push('');
  }

  // Shadows
  if (tokens.shadows.length > 0) {
    lines.push('  /* ── Shadows ── */');
    tokens.shadows.forEach((shadow, i) => {
      const label = ['sm', 'md', 'lg', 'xl', '2xl'][i] || `${i + 1}`;
      lines.push(`  --shadow-${label}: ${shadow.css};`);
    });
    lines.push('');
  }

  // Border radii (standard scale)
  lines.push('  /* ── Radii ── */');
  lines.push('  --radius-4: 4px;');
  lines.push('  --radius-8: 8px;');
  lines.push('  --radius-12: 12px;');
  lines.push('  --radius-16: 16px;');
  lines.push('  --radius-24: 24px;');
  lines.push('  --radius-full: 9999px;');
  lines.push('');

  // Transitions
  lines.push('  /* ── Transitions ── */');
  lines.push("  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);");
  lines.push("  --transition-smooth: 0.3s cubic-bezier(0.16, 1, 0.3, 1);");
  lines.push('');

  // Focus rings
  lines.push('  /* ── Focus Rings ── */');
  lines.push('  --shadow-glow-primary: 0 0 0 3px rgba(3, 69, 145, 0.15);');
  lines.push('  --shadow-glow-destructive: 0 0 0 3px rgba(203, 26, 20, 0.15);');

  lines.push('}');
  return lines.join('\n') + '\n';
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function main() {
  console.log('\n🎨 FMDQ Figma Deep-Scan Token Extractor');
  console.log('═'.repeat(50));

  if (!FIGMA_TOKEN) die('FIGMA_ACCESS_TOKEN is not set. See .env.example');
  if (!FIGMA_FILE_KEY) die('FIGMA_FILE_KEY is not set. See .env.example');

  // 1. Get file structure
  const pages = await getFilePages();

  const tokens = {
    colors: {},
    typography: [],
    spacing: [],
    shadows: [],
    components: {},
    _meta: {
      source: `figma://file/${FIGMA_FILE_KEY}`,
      extractedAt: new Date().toISOString(),
      pages: pages.map(p => p.name)
    }
  };

  // 2. Extract COLORS
  const colorsPage = findPage(pages, 'Colors');
  if (colorsPage) {
    info(`Scanning Colors page: "${colorsPage.name}" (${colorsPage.id})...`);
    const colorNodes = await getPageNodes(colorsPage.id);
    if (colorNodes) {
      tokens.colors = extractColorPalettes(colorNodes);
      const totalColors = Object.values(tokens.colors).reduce((sum, cat) => sum + Object.keys(cat).length, 0);
      success(`Extracted ${totalColors} colors across ${Object.keys(tokens.colors).length} palettes`);
      for (const [cat, shades] of Object.entries(tokens.colors)) {
        info(`  ${cat}: ${Object.keys(shades).length} shades`);
      }
    }
  } else {
    info('No Colors page found');
  }

  // 3. Extract TYPOGRAPHY
  const typoPage = findPage(pages, 'Typography');
  if (typoPage) {
    info(`Scanning Typography page: "${typoPage.name}" (${typoPage.id})...`);
    const typoNodes = await getPageNodes(typoPage.id);
    if (typoNodes) {
      tokens.typography = extractTypography(typoNodes);
      success(`Extracted ${tokens.typography.length} unique typography styles`);
    }
  } else {
    info('No Typography page found');
  }

  // 4. Extract SPACING
  const spacingPage = findPage(pages, 'Spacing');
  if (spacingPage) {
    info(`Scanning Spacing page: "${spacingPage.name}" (${spacingPage.id})...`);
    const spacingNodes = await getPageNodes(spacingPage.id);
    if (spacingNodes) {
      tokens.spacing = extractSpacing(spacingNodes);
      success(`Extracted ${tokens.spacing.length} spacing values`);
    }
  } else {
    info('No Spacing page found');
  }

  // 5. Extract SHADOWS
  const shadowPage = findPage(pages, 'Shadow');
  if (shadowPage) {
    info(`Scanning Shadows page: "${shadowPage.name}" (${shadowPage.id})...`);
    const shadowNodes = await getPageNodes(shadowPage.id);
    if (shadowNodes) {
      tokens.shadows = extractShadows(shadowNodes);
      success(`Extracted ${tokens.shadows.length} shadow definitions`);
    }
  } else {
    info('No Shadows page found');
  }

  // 6. Extract COMPONENT SPECS (unless --tokens-only)
  if (!TOKENS_ONLY) {
    const buttonsPage = findPage(pages, 'Buttons');
    if (buttonsPage) {
      info(`Scanning Buttons page: "${buttonsPage.name}" (${buttonsPage.id})...`);
      const buttonNodes = await getPageNodes(buttonsPage.id);
      if (buttonNodes) {
        tokens.components.buttons = extractButtonSpecs(buttonNodes);
        success(`Extracted ${tokens.components.buttons.length} button specs`);
      }
    }
  }

  // ─── Output ─────────────────────────────────────────────────
  if (DRY_RUN) {
    console.log('\n📋 DRY RUN — No files written\n');
    console.log(JSON.stringify(tokens, null, 2));
    return;
  }

  // Write tokens.json
  fs.writeFileSync(TOKENS_JSON_PATH, JSON.stringify(tokens, null, 2) + '\n', 'utf-8');
  success(`Written ${TOKENS_JSON_PATH}`);

  // Write tokens.css
  const css = generateCSS(tokens);
  fs.writeFileSync(TOKENS_CSS_PATH, css, 'utf-8');
  success(`Written ${TOKENS_CSS_PATH}`);

  console.log('\n✨ Figma sync complete!\n');
}

main().catch(err => {
  console.error('\n💥 Extraction failed:', err.message);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
