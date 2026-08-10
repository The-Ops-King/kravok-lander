import React, { useId, useState } from 'react';
import { BellRing, Check, ShieldAlert } from 'lucide-react';

import { getManagerWorkspace } from '../experience.js';
import { getKeyboardTabId, setManagerRecordDecision } from './demoState.js';
import SyntheticBadge from './SyntheticBadge.jsx';

const WORKSPACES = [
  { id: 'synthetic-org-a', shortLabel: 'Team A' },
  { id: 'synthetic-org-b', shortLabel: 'Team B' },
];

export default function ManagerDemo() {
  const [workspaceId, setWorkspaceId] = useState('synthetic-org-a');
  const [decisionState, setDecisionState] = useState({});
  const id = useId();
  const workspace = getManagerWorkspace(workspaceId);

  return (
    <section
      className="overflow-hidden rounded-xl border border-border-default bg-primary"
      aria-labelledby={`${id}-title`}
    >
      <header className="flex flex-col gap-4 border-b border-border-default px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-success">Kravok Manager / Team view</p>
          <h3 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-text-primary">
            See what needs a manager&apos;s attention
          </h3>
        </div>
        <SyntheticBadge />
      </header>

      <div className="p-5 sm:p-7">
        <div
          className="mb-5 inline-flex max-w-full rounded-xl border border-border-default bg-base p-1"
          role="tablist"
          aria-label="Choose an example team"
        >
          {WORKSPACES.map(({ id: option, shortLabel }) => {
            const selected = option === workspaceId;
            return (
              <button
                key={option}
                id={`${id}-tab-${option}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setWorkspaceId(option)}
                onKeyDown={(event) => {
                  const nextId = getKeyboardTabId(WORKSPACES.map(({ id: workspaceOption }) => workspaceOption), option, event.key);
                  if (nextId === option) return;
                  event.preventDefault();
                  setWorkspaceId(nextId);
                  document.getElementById(`${id}-tab-${nextId}`)?.focus();
                }}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success sm:text-sm ${
                  selected ? 'bg-elevated text-text-primary' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${workspace.id}`}
          aria-live="polite"
          aria-atomic="false"
          tabIndex={0}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-success"
        >
          <div className="mb-4 flex flex-col gap-2 rounded-xl border border-border-default bg-base px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-text-primary">{workspace.name}</p>
              <p className="mt-1 text-xs text-text-secondary">{workspace.note}</p>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
              {workspace.records.length} {workspace.records.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="space-y-3">
            {workspace.records.map((record) => {
              const decision = decisionState[workspace.id]?.[record.id];
              const isCompliance = record.kind === 'compliance';
              const actions = isCompliance
                ? [
                  { id: 'resolved', label: 'Resolve' },
                  { id: 'false-positive', label: 'False positive' },
                ]
                : [
                  { id: 'correct', label: 'Correct' },
                  { id: 'misfire', label: 'Misfire' },
                ];

              return (
                <article key={record.id} className="rounded-xl border border-border-default bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isCompliance ? 'bg-error/10' : 'bg-info/10'}`}>
                        {isCompliance ? (
                          <ShieldAlert className="h-4 w-4 text-error" aria-hidden="true" />
                        ) : (
                          <BellRing className="h-4 w-4 text-info" aria-hidden="true" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{record.label}</p>
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                          {isCompliance ? `${record.severity} / Manager review` : record.state}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-wrap justify-end gap-2"
                      role="group"
                      aria-label={`${record.label} demo decision`}
                    >
                      {actions.map((action) => {
                        const selected = decision === action.id;

                        return (
                          <button
                            key={action.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setDecisionState((current) => (
                              setManagerRecordDecision(current, workspace.id, record.id, action.id)
                            ))}
                            className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success ${
                              selected
                                ? 'border-success/30 bg-success/10 text-text-primary'
                                : 'border-border-hover bg-elevated text-text-secondary hover:border-success/40 hover:text-text-primary'
                            }`}
                          >
                            {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 border-l-2 border-border-hover pl-3">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
                      {isCompliance ? 'Closer' : 'Prospect'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-body">
                      &quot;{isCompliance ? record.closer : record.prospect}&quot;
                    </p>
                  </div>

                  {!isCompliance && (
                    <div className="mt-4 rounded-xl border border-accent-hover/25 bg-accent-subtle/45 p-3">
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-text-primary">Cue under review</p>
                      <p className="mt-1 text-xs leading-relaxed text-text-body">{record.cue}</p>
                    </div>
                  )}

                  {decision && (
                    <p className="mt-4 text-xs text-success" role="status">
                      Selected: {actions.find(({ id: actionId }) => actionId === decision)?.label}.
                    </p>
                  )}
                </article>
              );
            })}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            Changes stay in this preview. Nothing is sent or saved.
          </p>
        </div>
      </div>
    </section>
  );
}
