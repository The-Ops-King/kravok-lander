import React, { useId, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { getHindsightDebrief } from '../experience.js';
import { getHindsightMoment, getKeyboardTabId } from './demoState.js';
import SyntheticBadge from './SyntheticBadge.jsx';

export default function HindsightDemo() {
  const debrief = getHindsightDebrief('discovery');
  const [momentId, setMomentId] = useState(debrief.moments[0].id);
  const id = useId();
  const moment = getHindsightMoment(momentId);

  return (
    <section
      className="overflow-hidden rounded-xl border border-border-default bg-primary"
      aria-labelledby={`${id}-title`}
    >
      <header className="flex flex-col gap-4 border-b border-border-default px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-info">Hindsight / Call review</p>
          <h3 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-text-primary">
            See what happened. Know what to do next.
          </h3>
        </div>
        <SyntheticBadge />
      </header>

      <div className="p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-xl border border-success/30 bg-success/10 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
              <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
              {debrief.status}
            </div>
            <div className="mt-4 flex items-end gap-2">
              <strong className="text-5xl font-semibold tracking-[-0.06em] text-text-primary">{debrief.score}</strong>
              <span className="pb-1 text-sm text-text-muted">/ 100</span>
            </div>
          </div>

          <div className="rounded-xl border border-border-default bg-base p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">What happened</p>
            <p className="mt-3 text-sm leading-relaxed text-text-body">{debrief.outcome}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {debrief.objections.map((objection) => (
                <span key={objection} className="rounded-full border border-warning/30 bg-warning/10 px-2.5 py-1 text-xs text-text-secondary">
                  {objection}
                </span>
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-default bg-border-default sm:grid-cols-4">
          {debrief.stats.map(({ label, value }) => (
            <div key={label} className="bg-card px-4 py-3">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <div
            className="flex flex-wrap gap-1 rounded-xl border border-border-default bg-base p-1"
            role="tablist"
            aria-label="Choose a Hindsight debrief moment"
          >
            {debrief.moments.map(({ id: option, label }) => {
              const selected = option === momentId;
              return (
                <button
                  key={option}
                  id={`${id}-tab-${option}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setMomentId(option)}
                  onKeyDown={(event) => {
                    const nextId = getKeyboardTabId(debrief.moments.map(({ id: momentOption }) => momentOption), option, event.key);
                    if (nextId === option) return;
                    event.preventDefault();
                    setMomentId(nextId);
                    document.getElementById(`${id}-tab-${nextId}`)?.focus();
                  }}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info ${
                    selected ? 'bg-elevated text-text-primary' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${moment.id}`}
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
            className="mt-3 rounded-xl border border-info/25 bg-info/10 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-info"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-info">{moment.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-body">{moment.detail}</p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-xl border border-border-hover bg-elevated/50 p-5">
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-text-primary" aria-hidden="true" />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Try this next</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-text-primary">{debrief.nextFocus}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
