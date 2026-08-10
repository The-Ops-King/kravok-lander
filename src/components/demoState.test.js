import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getForgeDemoTurn,
  getHindsightMoment,
  getKeyboardTabId,
  getOracleDemoExchange,
  setManagerRecordDecision,
} from './demoState.js';

test('tab keyboard navigation moves, wraps, and honors boundary keys', () => {
  const tabs = ['ordinary', 'objection', 'close'];

  assert.equal(getKeyboardTabId(tabs, 'ordinary', 'ArrowRight'), 'objection');
  assert.equal(getKeyboardTabId(tabs, 'ordinary', 'ArrowLeft'), 'close');
  assert.equal(getKeyboardTabId(tabs, 'objection', 'Home'), 'ordinary');
  assert.equal(getKeyboardTabId(tabs, 'objection', 'End'), 'close');
  assert.equal(getKeyboardTabId(tabs, 'objection', 'Enter'), 'objection');
});

test('Oracle opens on correct silence and can move to the objection cue', () => {
  const ordinary = getOracleDemoExchange('ordinary');
  const objection = getOracleDemoExchange('objection');

  assert.equal(ordinary.decision, 'silence');
  assert.equal(ordinary.cue, null);
  assert.equal(ordinary.explanation, 'The conversation is moving forward. No cue is needed.');
  assert.equal(objection.decision, 'cue');
  assert.equal(objection.cue, 'Ask what waiting costs.');
});

test('Forge difficulty changes the prospect response without changing persona', () => {
  const normal = getForgeDemoTurn('guided');
  const hard = getForgeDemoTurn('adversarial');

  assert.equal(normal.personaName, 'The Skeptic');
  assert.equal(hard.personaName, 'The Skeptic');
  assert.notEqual(normal.prospect, hard.prospect);
  assert.notEqual(normal.behavior, hard.behavior);
});

test('Hindsight moment selection returns the requested actionable detail', () => {
  const turningPoint = getHindsightMoment('turning-point');
  const nextTime = getHindsightMoment('next-time');

  assert.equal(turningPoint.label, 'Turning points');
  assert.match(turningPoint.detail, /delay objection/i);
  assert.equal(nextTime.label, 'Next time');
  assert.match(nextTime.detail, /dated next step/i);
  assert.throws(() => getHindsightMoment('missing'), /Unknown Hindsight moment/);
});

test('Manager decisions use the real workflow vocabulary and stay inside one synthetic org', () => {
  const initial = {
    'synthetic-org-a': {},
    'synthetic-org-b': {},
  };

  const cueDecision = setManagerRecordDecision(
    initial,
    'synthetic-org-a',
    'org-a-cue-1',
    'misfire',
  );
  const complianceDecision = setManagerRecordDecision(
    cueDecision,
    'synthetic-org-a',
    'org-a-compliance-1',
    'false-positive',
  );

  assert.equal(cueDecision['synthetic-org-a']['org-a-cue-1'], 'misfire');
  assert.equal(cueDecision['synthetic-org-b']['org-b-cue-1'], undefined);
  assert.equal(complianceDecision['synthetic-org-a']['org-a-compliance-1'], 'false-positive');
  assert.equal(initial['synthetic-org-a']['org-a-cue-1'], undefined);
});

test('Manager decisions reject cross-org records and actions from the wrong workflow', () => {
  assert.throws(
    () => setManagerRecordDecision({}, 'synthetic-org-a', 'org-b-cue-1', 'correct'),
    /does not belong to synthetic-org-a/,
  );
  assert.throws(
    () => setManagerRecordDecision({}, 'synthetic-org-a', 'org-a-cue-1', 'resolved'),
    /not valid for cue-quality/,
  );
});
