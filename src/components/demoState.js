import {
  getForgeTurn,
  getHindsightDebrief,
  getManagerWorkspace,
  getOracleExchange,
} from '../experience.js';

export function getKeyboardTabId(tabIds, currentId, key) {
  const currentIndex = tabIds.indexOf(currentId);

  if (key === 'Home') return tabIds[0];
  if (key === 'End') return tabIds[tabIds.length - 1];
  if (key === 'ArrowRight') return tabIds[(currentIndex + 1) % tabIds.length];
  if (key === 'ArrowLeft') return tabIds[(currentIndex - 1 + tabIds.length) % tabIds.length];
  return currentId;
}

export function getOracleDemoExchange(id) {
  return getOracleExchange(id);
}

export function getForgeDemoTurn(difficulty) {
  return getForgeTurn({ persona: 'guarded-operator', difficulty });
}

export function getHindsightMoment(momentId) {
  const debrief = getHindsightDebrief('discovery');
  const moment = debrief.moments.find(({ id }) => id === momentId);

  if (!moment) {
    throw new Error(`Unknown Hindsight moment: ${momentId}`);
  }

  return moment;
}

const MANAGER_DECISIONS = {
  'cue-quality': new Set(['correct', 'misfire']),
  compliance: new Set(['resolved', 'false-positive']),
};

export function setManagerRecordDecision(reviewState, workspaceId, recordId, decision) {
  const workspace = getManagerWorkspace(workspaceId);
  const record = workspace.records.find(({ id }) => id === recordId);

  if (!record) {
    throw new Error(`Record ${recordId} does not belong to ${workspaceId}.`);
  }
  if (!MANAGER_DECISIONS[record.kind]?.has(decision)) {
    throw new Error(`Decision ${decision} is not valid for ${record.kind}.`);
  }

  return {
    ...reviewState,
    [workspaceId]: {
      ...reviewState[workspaceId],
      [recordId]: decision,
    },
  };
}
