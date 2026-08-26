import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PUBLIC_PROOFS,
  REQUIRED_PUBLIC_PROOF_IDS,
  assertProofsPublishable,
  buildAccessRequestMailto,
  getForgeTurn,
  getHindsightDebrief,
  getManagerWorkspace,
  getOracleExchange,
} from './experience.js';

test('Oracle distinguishes correct silence from a real objection cue', () => {
  const ordinary = getOracleExchange('ordinary');
  const objection = getOracleExchange('objection');

  assert.equal(ordinary.decision, 'silence');
  assert.equal(ordinary.cue, null);
  assert.equal(ordinary.contentOrigin, 'synthetic');
  assert.equal(ordinary.synthetic, true);
  assert.match(ordinary.sourceFixture, /\S/);
  assert.match(ordinary.clearedUnder, /owner-synthetic-only-rule/);

  assert.equal(objection.decision, 'cue');
  assert.match(objection.cue, /\S/);
  assert.equal(objection.contentOrigin, 'synthetic');
  assert.equal(objection.synthetic, true);
});

test('Forge changes the prospect behavior when difficulty changes', () => {
  const guided = getForgeTurn({ persona: 'guarded-operator', difficulty: 'guided' });
  const adversarial = getForgeTurn({ persona: 'guarded-operator', difficulty: 'adversarial' });

  assert.notEqual(guided.prospect, adversarial.prospect);
  assert.equal(guided.persona, 'guarded-operator');
  assert.equal(adversarial.persona, 'guarded-operator');
  assert.equal(guided.contentOrigin, 'synthetic');
  assert.equal(adversarial.contentOrigin, 'synthetic');
  assert.equal(guided.synthetic, true);
  assert.equal(adversarial.synthetic, true);
  assert.match(guided.sourceFixture, /\S/);
  assert.match(adversarial.sourceFixture, /\S/);
});

test('Hindsight returns an actionable debrief rather than a decorative score', () => {
  const debrief = getHindsightDebrief('discovery');

  assert.equal(typeof debrief.score, 'number');
  assert.match(debrief.outcome, /\S/);
  assert.match(debrief.nextFocus, /\S/);
  assert.ok(debrief.moments.length >= 2);
  assert.equal(debrief.contentOrigin, 'synthetic');
  assert.equal(debrief.synthetic, true);
  assert.match(debrief.sourceFixture, /\S/);
});

test('Manager never returns records from a different demo organization', () => {
  const northstar = getManagerWorkspace('synthetic-org-a');
  const harbor = getManagerWorkspace('synthetic-org-b');

  assert.ok(northstar.records.every((record) => record.orgId === 'synthetic-org-a'));
  assert.ok(harbor.records.every((record) => record.orgId === 'synthetic-org-b'));
  assert.ok(northstar.records.every((record) => record.contentOrigin === 'synthetic'));
  assert.ok(harbor.records.every((record) => record.contentOrigin === 'synthetic'));
  assert.ok(northstar.records.every((record) => record.synthetic && record.sourceFixture));
  assert.ok(harbor.records.every((record) => record.synthetic && record.sourceFixture));
  assert.notDeepEqual(northstar.records, harbor.records);
  assert.throws(() => getManagerWorkspace('missing-org'), /Unknown demo organization/);
});

test('Request-access handoff sends no applicant data through the page URL', () => {
  const href = buildAccessRequestMailto();

  assert.match(href, /^mailto:support@kravok\.ai\?/);
  assert.match(href, /subject=Request%20access%20to%20KRAVOK/);
  assert.ok(!href.includes('body='));
  assert.ok(!href.includes('email='));
});

test('Public proof publishes immutable dated snapshots without pretending every claim was checked today', () => {
  assert.ok(PUBLIC_PROOFS.every((claim) => /^2026-08-(20|22)$/.test(claim.verifiedOn)));
  assert.ok(PUBLIC_PROOFS.every((claim) => !['cue-latency', 'windows-signing', 'price'].includes(claim.kind)));
  assert.ok(PUBLIC_PROOFS.every((claim) => claim.snapshot?.title));
  assert.ok(PUBLIC_PROOFS.every((claim) => claim.snapshot?.result));
  assert.ok(PUBLIC_PROOFS.every((claim) => claim.snapshot?.scope));
  assert.deepEqual(REQUIRED_PUBLIC_PROOF_IDS, [
    'organizations-running-live-calls',
    'tenant-policy-suite',
    'mac-trust-chain',
  ]);
  assert.deepEqual(PUBLIC_PROOFS.map(({ id }) => id), REQUIRED_PUBLIC_PROOF_IDS);
  assert.doesNotThrow(() => assertProofsPublishable('2026-08-22'));
  assert.throws(() => assertProofsPublishable('2026-08-19'), /future/i);
});
