const clone = (value) => JSON.parse(JSON.stringify(value));

const syntheticProvenance = (sourceFixture) => ({
  contentOrigin: 'synthetic',
  synthetic: true,
  sourceFixture,
  clearedUnder: 'owner-synthetic-only-rule-2026-08-07',
});

const ORACLE_EXCHANGES = {
  ordinary: {
    id: 'ordinary',
    prospect: 'Sure, I have got about twenty minutes before my next call.',
    decision: 'silence',
    cue: null,
    wordTrack: null,
    explanation: 'The conversation is moving forward. No cue is needed.',
    ...syntheticProvenance('demo-run/ordinary-opening'),
  },
  objection: {
    id: 'objection',
    prospect: 'I need to think about it.',
    decision: 'cue',
    cue: 'Ask what waiting costs.',
    wordTrack: 'Totally fair. What does waiting another quarter cost the team?',
    explanation: 'Oracle recognizes a clear delay objection and suggests a useful next question.',
    ...syntheticProvenance('cue-presentation-test/delay-objection'),
  },
};

const FORGE_TURNS = {
  'guarded-operator': {
    guided: {
      persona: 'guarded-operator',
      personaName: 'The Skeptic',
      personaDescription: 'Careful, skeptical, and looking for proof before committing.',
      difficulty: 'guided',
      difficultyLabel: 'Normal',
      closer: 'It pays for itself inside a quarter - want me to show the math?',
      prospect: "I've heard that before. What happens when it doesn't?",
      behavior: 'Pushes back, but leaves room for proof.',
      ...syntheticProvenance('manifest/forge-skeptic-normal'),
    },
    adversarial: {
      persona: 'guarded-operator',
      personaName: 'The Skeptic',
      personaDescription: 'Careful, skeptical, and looking for proof before committing.',
      difficulty: 'adversarial',
      difficultyLabel: 'Hard',
      closer: 'It pays for itself inside a quarter - want me to show the math?',
      prospect: 'Can you prove the value?',
      behavior: 'Compresses the exchange into a direct proof demand.',
      ...syntheticProvenance('database-test/forge-skeptic-hard'),
    },
  },
};

const HINDSIGHT_DEBRIEFS = {
  discovery: {
    id: 'discovery',
    status: 'Closed',
    score: 78,
    outcome: 'The concern was resolved, but the close stopped before a specific commitment.',
    stats: [
      { label: 'You talked', value: '43%' },
      { label: 'Turns', value: '18' },
      { label: 'Cues', value: '2' },
      { label: 'Checklist', value: '5 / 6' },
    ],
    objections: ['Timing concern'],
    nextFocus: 'After resolving the concern, ask for a specific commitment.',
    moments: [
      { id: 'worked', label: 'What worked', detail: 'The closer let the ordinary opening breathe instead of forcing a cue.' },
      { id: 'turning-point', label: 'Turning points', detail: 'The delay objection surfaced and the conversation moved to the cost of waiting.' },
      { id: 'next-time', label: 'Next time', detail: 'Convert the resolved concern into one dated next step.' },
    ],
    ...syntheticProvenance('marketing-fixture/hindsight-discovery'),
  },
};

const MANAGER_WORKSPACES = {
  'synthetic-org-a': {
    id: 'synthetic-org-a',
    name: 'Example Team A',
    note: 'Only this team’s settings and reviews are shown.',
    records: [
      {
        id: 'org-a-cue-1',
        orgId: 'synthetic-org-a',
        kind: 'cue-quality',
        label: 'Cue quality',
        prospect: 'Honestly it sounds great but the price feels like a stretch for a team my size.',
        cue: 'Reframe to cost-per-closed-deal - one extra deal a month per rep pays for it. Ask what one more close is worth to them.',
        state: 'Awaiting review',
        ...syntheticProvenance('demo-run/price-stretch'),
      },
      {
        id: 'org-a-compliance-1',
        orgId: 'synthetic-org-a',
        kind: 'compliance',
        label: 'Absolute guarantee',
        severity: 'HIGH',
        closer: 'And honestly I can promise you will double your booked calls in the first month, guaranteed.',
        state: 'Manager review',
        ...syntheticProvenance('demo-run/absolute-guarantee'),
      },
    ],
  },
  'synthetic-org-b': {
    id: 'synthetic-org-b',
    name: 'Example Team B',
    note: 'Switch teams to see a separate set of settings and reviews.',
    records: [
      {
        id: 'org-b-cue-1',
        orgId: 'synthetic-org-b',
        kind: 'cue-quality',
        label: 'Cue quality',
        prospect: 'I need to think about it.',
        cue: 'Ask what waiting costs.',
        state: 'Correct',
        ...syntheticProvenance('cue-presentation-test/delay-objection'),
      },
    ],
  },
};

export const PUBLIC_PROOFS = [
  {
    id: 'organizations-running-live-calls',
    kind: 'live-organizations',
    value: '4',
    label: 'organizations used KRAVOK on live calls this week',
    detail: 'Counted from non-practice calls with prospect transcript evidence in the last seven days.',
    verifiedOn: '2026-08-10',
    status: 'verified',
    receiptUrl: 'https://github.com/The-Ops-King/kravok-lander/blob/db04a47288881ae519f6a1afa29dd035e5c98888/evidence/proofs/2026-08-10-public-claims.md',
    snapshot: {
      actionLabel: 'View activity verification',
      title: 'Live call activity',
      result: '4 organizations / 9 evidenced calls',
      scope: 'Seven-day aggregate; practice drills and zero-transcript calls excluded',
      note: 'Only aggregate counts are shown. Organization names and call content remain private.',
    },
  },
  {
    id: 'tenant-policy-suite',
    kind: 'policy-suite',
    value: '340',
    label: 'access checks passed',
    detail: 'Automated tests confirm that access rules work as intended.',
    verifiedOn: '2026-08-10',
    status: 'verified',
    receiptUrl: 'https://github.com/The-Ops-King/KRAVOK/actions/runs/31220917565/job/93005143912',
    snapshot: {
      actionLabel: 'View access verification',
      title: 'Access rules check',
      result: '340 of 340 checks passed',
      scope: 'Database access policies and role permissions',
      note: 'The full technical record remains private and is reviewed before release.',
    },
  },
  {
    id: 'mac-trust-chain',
    kind: 'mac-trust',
    value: 'Signed',
    label: 'and notarized for Mac',
    detail: 'The Mac app passed signing, notarization, and final package checks.',
    verifiedOn: '2026-08-10',
    status: 'verified',
    receiptUrl: 'https://github.com/The-Ops-King/KRAVOK/actions/runs/31435411864/job/93608409342',
    snapshot: {
      actionLabel: 'View Mac verification',
      title: 'Mac release check',
      result: 'All release checks passed',
      scope: 'Signing, notarization, and package stapling',
      note: 'Publication binds this check to the exact Mac installer offered for download.',
    },
  },
];

// Owner-approved proof contract. Publication must fail closed unless each
// subject has a current public claim and an immutable verification receipt.
export const REQUIRED_PUBLIC_PROOF_IDS = [
  'organizations-running-live-calls',
  'tenant-policy-suite',
  'mac-trust-chain',
];

const PROHIBITED_PROOF_KINDS = new Set(['cue-latency', 'windows-signing', 'price']);
const PROHIBITED_PROOF_COPY = [
  /(?:cue )?latency|300\s*ms/i,
  /windows.{0,30}(?:signed|signing|authenticode)/i,
  /\bprice\b/i,
];

export function getOracleExchange(id) {
  const exchange = ORACLE_EXCHANGES[id];
  if (!exchange) throw new Error(`Unknown Oracle exchange: ${id}`);
  return clone(exchange);
}

export function getForgeTurn({ persona, difficulty }) {
  const turn = FORGE_TURNS[persona]?.[difficulty];
  if (!turn) throw new Error(`Unknown Forge scenario: ${persona}/${difficulty}`);
  return clone(turn);
}

export function getHindsightDebrief(id) {
  const debrief = HINDSIGHT_DEBRIEFS[id];
  if (!debrief) throw new Error(`Unknown Hindsight debrief: ${id}`);
  return clone(debrief);
}

export function getManagerWorkspace(id) {
  const workspace = MANAGER_WORKSPACES[id];
  if (!workspace) throw new Error(`Unknown demo organization: ${id}`);
  return clone(workspace);
}

export function buildAccessRequestMailto() {
  return `mailto:support@kravok.ai?subject=${encodeURIComponent('Request access to KRAVOK')}`;
}

export function assertProofsPublishable(buildDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(buildDate)) {
    throw new Error('A YYYY-MM-DD build date is required to verify public proof.');
  }

  const proofIds = new Set();

  for (const claim of PUBLIC_PROOFS) {
    if (proofIds.has(claim.id)) {
      throw new Error(`Duplicate public proof id: ${claim.id}.`);
    }
    proofIds.add(claim.id);

    if (claim.status !== 'verified') {
      throw new Error(`Public proof ${claim.id} is not verified.`);
    }
    if (claim.verifiedOn !== buildDate) {
      throw new Error(`Public proof ${claim.id} must be re-verified on publish day.`);
    }
    if (PROHIBITED_PROOF_KINDS.has(claim.kind)) {
      throw new Error(`Prohibited public proof class: ${claim.kind}.`);
    }

    const publicCopy = `${claim.value} ${claim.label} ${claim.detail}`;
    if (PROHIBITED_PROOF_COPY.some((pattern) => pattern.test(publicCopy))) {
      throw new Error(`Public proof ${claim.id} contains prohibited or unverified copy.`);
    }
  }

  const missingProofIds = REQUIRED_PUBLIC_PROOF_IDS.filter((id) => !proofIds.has(id));
  if (missingProofIds.length > 0) {
    throw new Error(`Missing required public proof: ${missingProofIds.join(', ')}.`);
  }

  return clone(PUBLIC_PROOFS);
}
