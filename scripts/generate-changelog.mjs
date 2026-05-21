#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function run(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (err) {
    return '';
  }
}

function getRepoUrl() {
  const remoteUrl = run('git remote get-url origin');
  if (!remoteUrl) return '';
  
  // Convert SSH to HTTPS URL
  // git@github.com:WebMaster0-1/Design-Automation-Test.git -> https://github.com/WebMaster0-1/Design-Automation-Test
  if (remoteUrl.startsWith('git@')) {
    return remoteUrl
      .replace(':', '/')
      .replace('git@', 'https://')
      .replace(/\.git$/, '');
  }
  return remoteUrl.replace(/\.git$/, '');
}

function generateChangelog() {
  console.log('Generating dynamic changelog from Git history...');
  
  const repoUrl = getRepoUrl();
  const logOutput = run('git log --pretty=format:"%h|%aI|%an|%ae|%s" --date=short');
  
  if (!logOutput) {
    console.error('No git history found or Git is not installed.');
    process.exit(0);
  }

  const commits = logOutput.split('\n').filter(Boolean).map(line => {
    const [hash, authorDate, authorName, authorEmail, subject] = line.split('|');
    
    // Parse Date (YYYY-MM-DD)
    const date = authorDate ? authorDate.split('T')[0] : '';
    
    // Parse Conventional Commits
    // e.g., feat(nav): add Elements category
    const commitRegex = /^(feat|fix|docs|refactor|chore|style|test|ci|perf|build|revert)(?:\(([^)]+)\))?:\s*(.*)$/i;
    const match = subject.match(commitRegex);
    
    let category = 'other';
    let scope = '';
    let message = subject;
    
    if (match) {
      category = match[1].toLowerCase();
      scope = match[2] || '';
      message = match[3];
    } else {
      // Fallback for non-conventional commit messages but try to check prefixes
      const words = subject.split(' ');
      const firstWord = words[0]?.toLowerCase().replace(/[^a-z]/g, '');
      const commonCategories = ['feat', 'fix', 'docs', 'refactor', 'chore', 'style', 'test', 'ci', 'perf', 'build', 'revert'];
      if (commonCategories.includes(firstWord)) {
        category = firstWord;
        message = words.slice(1).join(' ');
      }
    }

    return {
      hash,
      date,
      author: authorName,
      email: authorEmail,
      subject,
      category,
      scope,
      message,
      url: repoUrl ? `${repoUrl}/commit/${hash}` : ''
    };
  });

  const outputPath = path.join(ROOT, 'src', 'docs', 'changelog-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(commits, null, 2), 'utf-8');
  console.log(`Changelog data successfully written to ${outputPath} (${commits.length} commits parsed)`);
}

generateChangelog();
