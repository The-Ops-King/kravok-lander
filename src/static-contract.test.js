import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const read = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');

test('static social metadata stays plain, specific, and customer-facing', () => {
  const html = read('../index.html');

  assert.match(html, /Know when to speak\. Know when not to\./);
  assert.match(html, /Practice the call\. Get help in the moment\. See what to improve next\./);
  assert.doesNotMatch(html, /synthetic|operating loop|live-call judgment/i);
  assert.doesNotMatch(html, /one sales moment|one synthetic decision trace/i);
  assert.match(html, /og:image.+kravok-wordmark-dark\.png/);
  assert.match(html, /twitter:card" content="summary_large_image/);
});

test('approved production identity assets are bundled locally', () => {
  for (const asset of [
    '../public/brand/kravok-wordmark-dark.png',
    '../public/brand/oracle-wordmark-dark.png',
    '../public/brand/oracle-icon-transparent.png',
  ]) {
    assert.equal(existsSync(new URL(asset, import.meta.url)), true, `${asset} should exist`);
  }
});

test('GitHub Pages route handoff is transient, namespaced, and excludes query parameters', () => {
  const outbound = read('../public/404-redirect.js');
  const inbound = read('../public/spa-redirect.js');
  const privacy = read('./PrivacyNotice.jsx');

  assert.match(outbound, /kravok:redirect-path/);
  assert.match(outbound, /location\.pathname \+ window\.location\.hash/);
  assert.doesNotMatch(outbound, /location\.(?:href|search)/);
  assert.match(inbound, /removeItem\('kravok:redirect-path'\)/);
  assert.match(privacy, /browser session storage/i);
  assert.match(privacy, /Query parameters are not stored/i);
});
