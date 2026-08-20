import assert from 'node:assert/strict';
import test from 'node:test';

import * as downloads from './downloads.js';

test('detectOS identifies supported desktop operating systems', () => {
  assert.equal(downloads.detectOS({ userAgentData: { platform: 'Windows' } }), 'windows');
  assert.equal(downloads.detectOS({ platform: 'MacIntel', maxTouchPoints: 0 }), 'mac');
});

test('detectOS does not offer a DMG to mobile, Linux, or unknown visitors', () => {
  const unsupportedVisitors = [
    { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' },
    { userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)' },
    { platform: 'MacIntel', maxTouchPoints: 5 },
    { platform: 'Linux x86_64' },
    { userAgent: 'Mozilla/5.0 (Linux; Android 15)' },
    { platform: 'Plan 9' },
    null,
  ];

  for (const visitor of unsupportedVisitors) {
    assert.equal(downloads.detectOS(visitor), 'unsupported');
  }
});

test('only macOS and Windows are supported download platforms', () => {
  assert.equal(typeof downloads.isSupportedOS, 'function');
  assert.equal(downloads.isSupportedOS('mac'), true);
  assert.equal(downloads.isSupportedOS('windows'), true);
  assert.equal(downloads.isSupportedOS('unsupported'), false);
  assert.equal(downloads.isSupportedOS('linux'), false);
});

test('the invited-user platform picker always exposes both downloads', () => {
  assert.equal(typeof downloads.getDownloadOptions, 'function');
  assert.deepEqual(
    downloads.getDownloadOptions('windows').map(({ os }) => os),
    ['windows', 'mac'],
  );
  assert.deepEqual(
    downloads.getDownloadOptions('mac').map(({ os }) => os),
    ['mac', 'windows'],
  );
  assert.deepEqual(
    downloads.getDownloadOptions('unsupported').map(({ os }) => os),
    ['mac', 'windows'],
  );
});

test('Windows instructions describe the EXE installer without Apple trust copy', () => {
  assert.equal(typeof downloads.getInstallGuide, 'function');
  const guide = downloads.getInstallGuide('windows');
  const copy = [guide.heading, ...guide.steps, guide.trust].join(' ');

  assert.match(copy, /Kravok-windows-x64-setup\.exe/);
  assert.match(copy, /Windows installer/i);
  assert.match(copy, /Start menu/i);
  assert.doesNotMatch(copy, /Applications|Apple|notar|stapl|Gatekeeper|code.?sign/i);
});

test('macOS instructions describe installation without an unverified architecture or floating trust claim', () => {
  assert.equal(typeof downloads.getInstallGuide, 'function');
  const guide = downloads.getInstallGuide('mac');
  const copy = [guide.heading, ...guide.steps, guide.trust].join(' ');

  assert.match(copy, /KRAVOK \.dmg file/);
  assert.match(copy, /Applications/);
  assert.doesNotMatch(copy, /Apple Silicon|Intel|Universal \(|current verified|Developer ID|notar|stapl/i);
  assert.doesNotMatch(downloads.DOWNLOADS.mac.filename, /Universal|Apple Silicon|Intel/i);
  assert.doesNotMatch(downloads.DOWNLOADS.mac.note, /Apple Silicon|Intel|Universal/i);
  assert.equal(
    downloads.DOWNLOADS.mac.url,
    'https://github.com/The-Ops-King/kravok-lander/releases/latest/download/Kravok-mac-universal.dmg',
  );
  assert.equal(
    downloads.DOWNLOADS.windows.url,
    'https://github.com/The-Ops-King/kravok-lander/releases/latest/download/Kravok-windows-x64-setup.exe',
  );
});

test('unsupported platforms have no download or install guide selected', () => {
  assert.equal(typeof downloads.getInstallGuide, 'function');
  assert.equal(downloads.getInstallGuide('unsupported'), null);
  assert.equal(downloads.getInstallGuide('linux'), null);
});

test('initial selection never substitutes macOS for an unsupported device', () => {
  assert.equal(typeof downloads.getInitialSelection, 'function');
  assert.equal(downloads.getInitialSelection('mac'), 'mac');
  assert.equal(downloads.getInitialSelection('windows'), 'windows');
  assert.equal(downloads.getInitialSelection('unsupported'), null);
  assert.equal(downloads.getInitialSelection('linux'), null);
});

test('download actions are explicitly scoped to already-invited users', () => {
  assert.equal(downloads.DOWNLOADS.mac.label, 'Download for macOS');
  assert.equal(downloads.DOWNLOADS.windows.label, 'Download for Windows');
});
