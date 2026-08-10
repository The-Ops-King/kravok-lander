import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getManifestSha256,
  hasPlatformPrivacyRoute,
  hasPrivacyPolicyLink,
  isImmutableReceiptSource,
  validateLegalBundleReceipt,
  validateMacArtifactReceipt,
  validatePlatformPrivacyReceipt,
} from './publish-validators.mjs';

test('immutable receipt sources reject arbitrary text', () => {
  assert.equal(isImmutableReceiptSource('approved by somebody'), false);
  assert.equal(
    isImmutableReceiptSource('https://github.com/The-Ops-King/KRAVOK/actions/runs/31207340439'),
    true,
  );
  assert.equal(isImmutableReceiptSource('a'.repeat(64)), false);
  assert.equal(isImmutableReceiptSource(`approval-${'a'.repeat(40)}`), false);
  assert.equal(
    isImmutableReceiptSource(`https://github.com/The-Ops-King/kravok-lander/commit/${'a'.repeat(40)}`),
    true,
  );
});

test('platform privacy route must render the actual policy component and be linked explicitly', () => {
  const validRoute = `
    const PrivacyPolicy = lazy(() => import('./PrivacyPolicy.jsx'));
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  `;
  const wrongComponent = `
    const PrivacyPolicy = lazy(() => import('./PrivacyPolicy.jsx'));
    <Route path="/privacy-policy" element={<PrivacyNotice />} />
  `;

  assert.equal(hasPlatformPrivacyRoute(validRoute), true);
  assert.equal(hasPlatformPrivacyRoute(wrongComponent), false);
  assert.equal(hasPlatformPrivacyRoute('<Route path="/privacy-policy" element={<PrivacyPolicy />} />'), false);
  assert.equal(hasPlatformPrivacyRoute(`{/* ${validRoute} */}`), false);
  assert.equal(hasPrivacyPolicyLink('<Link to="/privacy-policy">Privacy policy</Link>'), true);
  assert.equal(hasPrivacyPolicyLink('plain text /privacy-policy'), false);
  assert.equal(hasPrivacyPolicyLink('{/* <Link to="/privacy-policy">Privacy policy</Link> */}'), false);
  assert.equal(hasPrivacyPolicyLink('// <Link to="/privacy-policy">Privacy policy</Link>'), false);
});

test('legal review must be current, immutable, and bound to every document digest', () => {
  const documentDigests = {
    'TermsOfService.jsx': 'a'.repeat(64),
    'UserAgreement.jsx': 'b'.repeat(64),
  };
  const receipt = {
    reviewedOn: '2026-08-07',
    source: `https://github.com/The-Ops-King/kravok-lander/commit/${'c'.repeat(40)}`,
    reviewedBy: 'Brenden Dearie',
    reviewerRole: 'Company owner',
    approvalBasis: 'owner',
    acknowledgement: 'not-counsel-reviewed',
    approvalScope: 'public-legal-bundle',
    documentSha256: { ...documentDigests },
  };

  assert.deepEqual(validateLegalBundleReceipt(receipt, '2026-08-07', documentDigests), []);
  assert.notDeepEqual(validateLegalBundleReceipt({ ...receipt, reviewedOn: '2026-08-06' }, '2026-08-07', documentDigests), []);
  assert.notDeepEqual(validateLegalBundleReceipt({ ...receipt, approvalScope: 'something-else' }, '2026-08-07', documentDigests), []);
  assert.notDeepEqual(validateLegalBundleReceipt({ ...receipt, acknowledgement: null }, '2026-08-07', documentDigests), []);
  assert.notDeepEqual(validateLegalBundleReceipt({ ...receipt, reviewerRole: null }, '2026-08-07', documentDigests), []);
  assert.notDeepEqual(validateLegalBundleReceipt({ ...receipt, documentSha256: {} }, '2026-08-07', documentDigests), []);
  assert.notDeepEqual(validateLegalBundleReceipt(null, '2026-08-07', documentDigests), []);
});

test('mac trust requires a pinned served artifact and an exact SHA-256', () => {
  const pinned = 'https://github.com/The-Ops-King/kravok-lander/releases/download/v0.6.4/Kravok-mac.dmg';
  const valid = {
    artifactUrl: pinned,
    artifactSha256: 'a'.repeat(64),
    artifactManifestUrl: `https://raw.githubusercontent.com/The-Ops-King/kravok-lander/${'b'.repeat(40)}/release/SHA256SUMS.txt`,
  };

  assert.deepEqual(validateMacArtifactReceipt(valid, pinned), []);
  assert.notDeepEqual(validateMacArtifactReceipt({ ...valid, artifactUrl: pinned.replace('v0.6.4', 'latest') }, pinned), []);
  assert.notDeepEqual(validateMacArtifactReceipt({ ...valid, artifactSha256: 'x' }, pinned), []);
  assert.notDeepEqual(validateMacArtifactReceipt({ ...valid, artifactManifestUrl: 'https://example.com/checksums.txt' }, pinned), []);
  assert.notDeepEqual(validateMacArtifactReceipt(valid, `${pinned}?floating=1`), []);
});

test('checksum manifest lookup binds the digest to the exact artifact name', () => {
  const digest = 'a'.repeat(64);
  const manifest = `${digest}  Kravok-mac.dmg\n${'b'.repeat(64)}  Kravok-windows.exe\n`;

  assert.equal(getManifestSha256(manifest, 'Kravok-mac.dmg'), digest);
  assert.equal(getManifestSha256(manifest, 'another.dmg'), null);
  assert.equal(getManifestSha256('not a checksum', 'Kravok-mac.dmg'), null);
});

test('platform privacy requires its canonical route, document, links, and immutable review', () => {
  const receipt = {
    reviewedOn: '2026-08-07',
    route: '/privacy-policy',
    source: `https://github.com/The-Ops-King/kravok-lander/commit/${'b'.repeat(40)}`,
    reviewedBy: 'Brenden Dearie',
    reviewerRole: 'Company owner',
    approvalBasis: 'owner',
    acknowledgement: 'not-counsel-reviewed',
    approvalScope: 'app-platform-privacy-policy',
    documentSha256: 'd'.repeat(64),
  };
  const evidence = {
    routeDeclared: true,
    policyFileExists: true,
    linkedFromPublicFooter: true,
    linkedFromLegalAgreements: true,
    documentSha256: 'd'.repeat(64),
  };

  assert.deepEqual(validatePlatformPrivacyReceipt(receipt, '2026-08-07', evidence), []);
  assert.notDeepEqual(validatePlatformPrivacyReceipt({ ...receipt, source: 'trust me' }, '2026-08-07', evidence), []);
  assert.notDeepEqual(validatePlatformPrivacyReceipt({ ...receipt, acknowledgement: null }, '2026-08-07', evidence), []);
  assert.notDeepEqual(validatePlatformPrivacyReceipt({ ...receipt, approvalBasis: 'agent' }, '2026-08-07', evidence), []);
  assert.notDeepEqual(validatePlatformPrivacyReceipt({ ...receipt, documentSha256: 'e'.repeat(64) }, '2026-08-07', evidence), []);
  assert.notDeepEqual(validatePlatformPrivacyReceipt(receipt, '2026-08-07', { ...evidence, routeDeclared: false }), []);
  assert.notDeepEqual(validatePlatformPrivacyReceipt(null, '2026-08-07', evidence), []);
});
