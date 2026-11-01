#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 * FMDQ Design Automation — Git Sync Utility
 * ═══════════════════════════════════════════════════════════════
 *
 * Validates, stages, commits, and optionally pushes changes
 * after a Figma sync. Follows the non-destructive, clean-commit
 * strategy from the team's pipeline specification.
 *
 * Usage:
 *   node scripts/git-sync.mjs                    # validate + commit + push
 *   node scripts/git-sync.mjs --no-push          # validate + commit only
 *   node scripts/git-sync.mjs --branch figma-sync  # push to a feature branch
 *   node scripts/git-sync.mjs --dry-run          # show what would happen
 *
 * Requires: git on PATH
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Parse CLI args ───────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const NO_PUSH = args.includes('--no-push');
const branchIdx = args.indexOf('--branch');
const TARGET_BRANCH = branchIdx !== -1 ? args[branchIdx + 1] : null;

// ─── Helpers ──────────────────────────────────────────────────
function run(cmd, opts = {}) {
  const defaults = { cwd: ROOT, encoding: 'utf-8', stdio: 'pipe' };
  return execSync(cmd, { ...defaults, ...opts }).trim();
}

function info(msg) { console.log(`  ℹ  ${msg}`); }
function success(msg) { console.log(`  ✅  ${msg}`); }
function warn(msg) { console.warn(`  ⚠  ${msg}`); }
function die(msg) { console.error(`\n  ❌  ${msg}\n`); process.exit(1); }

// ─── Step 1: TypeScript validation ────────────────────────────
function validateTypeScript() {
  info('Running TypeScript check (tsc --noEmit)...');
  try {
    run('npx tsc --noEmit');
    success('TypeScript compilation passed');
    return true;
  } catch (err) {
    warn('TypeScript errors detected:');
    console.error(err.stdout || err.message);
    return false;
  }
}

// ─── Step 2: Check for changes ────────────────────────────────
function getChangedFiles() {
  const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf-8', stdio: 'pipe' });
  if (!status.trim()) return [];
  return status.split('\n').filter(Boolean).map(line => ({
    status: line.slice(0, 2).trim(),
    file: line.slice(3).trim()
  }));
}

// ─── Step 3: Generate commit message ──────────────────────────
function generateCommitMessage(files) {
  const tokenFiles = files.filter(f =>
    f.file.includes('tokens.css') || f.file.includes('tokens.json')
  );
  const elementFiles = files.filter(f =>
    f.file.includes('src/elements/')
  );
  const componentFiles = files.filter(f =>
    f.file.includes('src/components/')
  );
  const layoutFiles = files.filter(f =>
    f.file.includes('src/layout/')
  );
  const storyFiles = files.filter(f =>
    f.file.endsWith('.stories.tsx')
  );
  const scriptFiles = files.filter(f =>
    f.file.includes('scripts/') || f.file.includes('mcp/')
  );

  const parts = [];
  if (tokenFiles.length > 0) parts.push(`${tokenFiles.length} token file(s)`);
  if (elementFiles.length > 0) parts.push(`${elementFiles.length} element file(s)`);
  if (componentFiles.length > 0) parts.push(`${componentFiles.length} component file(s)`);
  if (layoutFiles.length > 0) parts.push(`${layoutFiles.length} layout file(s)`);
  if (storyFiles.length > 0) parts.push(`${storyFiles.length} story file(s)`);
  if (scriptFiles.length > 0) parts.push(`${scriptFiles.length} automation script(s)`);

  const scope = tokenFiles.length > 0 ? 'tokens' :
    elementFiles.length > 0 ? 'elements' :
    componentFiles.length > 0 ? 'components' :
    layoutFiles.length > 0 ? 'layout' : 'design-system';

  const summary = parts.length > 0 ? parts.join(', ') : `${files.length} file(s)`;
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');

  return `feat(${scope}): sync design system updates — ${summary}\n\nAutomated sync at ${timestamp}\nChanged files:\n${files.map(f => `  ${f.status} ${f.file}`).join('\n')}`;
}

// ─── Step 4: Stage and commit ─────────────────────────────────
function stageAndCommit(files, message) {
  // Stage targeted design system files (non-destructive: only stage known design system paths)
  const safePatterns = [
    'src/tokens.css',
    'src/tokens.json',
    'src/foundations/',
    'src/elements/',
    'src/components/',
    'src/layout/',
    'src/docs/',
    'src/index.ts',
    'rules/',
    '.storybook/',
    'scripts/',
    'mcp/',
    '.env.example',
    '.gitignore',
    'package.json',
    'README.md',
    '.cursor/mcp.json'
  ];

  const excludePatterns = [
    'src/drp/',
    'index.html',
    'src/App.tsx',
    'src/App.css'
  ];

  const filesToStage = files
    .map(f => f.file)
    .filter(f => safePatterns.some(p => f.includes(p) || f === p))
    .filter(f => !excludePatterns.some(p => f.includes(p) || f === p))
    .filter(f => !f.startsWith('docs/'));

  if (filesToStage.length === 0) {
    warn('No relevant files to stage. Skipping commit.');
    return false;
  }

  info(`Staging ${filesToStage.length} files...`);
  for (const file of filesToStage) {
    if (DRY_RUN) {
      info(`  [dry-run] git add "${file}"`);
    } else {
      if (fs.existsSync(path.resolve(ROOT, file))) {
        run(`git add "${file}"`);
      } else {
        run(`git rm -r --cached --ignore-unmatch "${file}" 2>/dev/null || true`);
      }
    }
  }

  info('Committing...');
  if (DRY_RUN) {
    info(`  [dry-run] commit message:\n${message}`);
  } else {
    // Write commit message to temp file to handle multi-line
    const msgFile = path.join(ROOT, '.git', 'SYNC_COMMIT_MSG');
    fs.writeFileSync(msgFile, message, 'utf-8');
    run(`git commit -F "${msgFile}"`);
    fs.unlinkSync(msgFile);
    success('Changes committed');
  }

  return true;
}

// ─── Step 5: Push ─────────────────────────────────────────────
function pushChanges() {
  if (NO_PUSH) {
    info('--no-push flag set. Skipping push.');
    return;
  }

  const branch = TARGET_BRANCH || 'main';

  if (TARGET_BRANCH) {
    // Create and switch to feature branch
    info(`Creating feature branch: ${TARGET_BRANCH}`);
    if (!DRY_RUN) {
      try {
        run(`git checkout -b ${TARGET_BRANCH}`);
      } catch {
        // Branch might already exist
        run(`git checkout ${TARGET_BRANCH}`);
      }
    }
  }

  info(`Pushing to origin/${branch}...`);
  if (DRY_RUN) {
    info(`  [dry-run] git push origin ${branch}`);
  } else {
    run(`git push origin ${branch}`);
    success(`Pushed to origin/${branch}`);
  }

  // Switch back to main if we used a feature branch
  if (TARGET_BRANCH && !DRY_RUN) {
    run('git checkout main');
  }
}

// ─── Main ─────────────────────────────────────────────────────
function main() {
  console.log('\n🔄 FMDQ Git Sync');
  console.log('═'.repeat(50));

  if (DRY_RUN) {
    warn('DRY RUN mode — no changes will be applied\n');
  }

  // Validate
  const tsOk = validateTypeScript();
  if (!tsOk) {
    warn('TypeScript validation failed. Proceeding with caution...');
  }

  // Check changes
  info('Synchronizing changelog from Git history...');
  try {
    run('node scripts/generate-changelog.mjs');
  } catch (err) {
    warn('Could not run generate-changelog: ' + err.message);
  }

  const changes = getChangedFiles();
  if (changes.length === 0) {
    success('No changes detected. Everything is up to date.');
    return;
  }

  info(`Detected ${changes.length} changed file(s):`);
  changes.forEach(c => info(`  ${c.status} ${c.file}`));

  // Commit
  const message = generateCommitMessage(changes);
  const committed = stageAndCommit(changes, message);

  // If committed, update changelog with the newly created commit and amend
  if (committed && !DRY_RUN) {
    try {
      run('node scripts/generate-changelog.mjs');
      run('git add src/docs/changelog-data.json');
      run('git commit --amend --no-edit');
      success('Dynamic changelog synchronized with new commit');
    } catch (err) {
      warn('Could not auto-amend changelog: ' + err.message);
    }
  }

  // Push
  if (committed) {
    pushChanges();
  }

  console.log('\n✨ Git sync complete!\n');
}

main();
