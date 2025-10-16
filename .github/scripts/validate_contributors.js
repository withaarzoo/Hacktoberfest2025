#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONTRIBUTORS_PATH = path.join(__dirname, '..', '..', 'contributors.json');

function normalizeGithubUsername(urlOrValue) {
  if (!urlOrValue || typeof urlOrValue !== 'string') return null;
  let str = urlOrValue.trim();
  if (!str) return null;
  // If they provided a raw username (e.g. "@user" or "user")
  if (!str.includes('github.com')) {
    return str.replace(/^@/, '').replace(/\/+$/, '').toLowerCase();
  }
  try {
    const u = new URL(str, 'https://github.com');
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;
    return parts[parts.length - 1].toLowerCase();
  } catch (e) {
    const parts = str.split('/').filter(Boolean);
    return parts.length ? parts[parts.length - 1].toLowerCase() : null;
  }
}

function loadContributors(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading or parsing contributors.json:', err.message);
    process.exit(2);
  }
}

function findDuplicates(contributors) {
  const map = new Map();
  const duplicates = new Map();

  contributors.forEach((c, idx) => {
    const username = normalizeGithubUsername(c.github_profile_url || c.github || c.github_profile || c.github_url || '');
    const key = username || `__fallback_${idx}`;
    if (!map.has(key)) {
      map.set(key, [idx]);
    } else {
      map.get(key).push(idx);
      duplicates.set(key, map.get(key));
    }
  });

  return duplicates;
}

function main() {
  const contributors = loadContributors(CONTRIBUTORS_PATH);
  if (!Array.isArray(contributors)) {
    console.error('contributors.json should contain a JSON array of contributor objects.');
    process.exit(2);
  }

  const duplicates = findDuplicates(contributors);
  if (duplicates.size === 0) {
    console.log('No duplicate contributors found.');
    process.exit(0);
  }

  console.error('\nDuplicate contributors detected!\n');
  for (const [key, indexes] of duplicates.entries()) {
    console.error(`- username/key: ${key} -> ${indexes.length} entries (indexes: ${indexes.join(', ')})`);
    indexes.forEach((i) => {
      const item = contributors[i];
      console.error(`  index ${i}: name="${item.name || ''}" github_profile_url="${item.github_profile_url || ''}" project_netlify_link="${item.project_netlify_link || ''}"`);
    });
    console.error('');
  }

  console.error('Please remove or merge duplicate entries in contributors.json before merging this PR.');
  process.exit(1);
}

main();
