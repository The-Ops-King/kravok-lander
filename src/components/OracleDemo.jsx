import React, { useId, useState } from 'react';
import { Check, MessageSquareText } from 'lucide-react';

import { getKeyboardTabId, getOracleDemoExchange } from './demoState.js';
import { OracleIcon } from './BrandIdentity.jsx';
import SyntheticBadge from './SyntheticBadge.jsx';

const EXCHANGES = [
  { id: 'ordinary', label: 'No help needed' },
  { id: 'objection', label: 'Delay objection' },
];

export default function OracleDemo() {
  const [exchangeId, setExchangeId] = useState('ordinary');
  const id = useId();
  const exchange = getOracleDemoExchange(exchangeId);

  return (
    <section
      className="overflow-hidden rounded-xl border border-border-default bg-primary"
      aria-labelledby={`${id}-title`}
    >
      <header className="flex flex-col gap-4 border-b border-border-default px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div className="flex items-center gap-4">
          <OracleIcon decorative className="h-12 w-12 shrink-0" />
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-text-primary">
              <span className="h-2 w-2 rounded-full bg-accent-hover" aria-hidden="true" />
              Oracle / Live call
            </div>
            <h3 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-text-primary">
              Help only when it matters
            </h3>
          </div>
        </div>
        <SyntheticBadge />
      </header>

      <div className="p-5 sm:p-7">
        <div
          className="mb-6 inline-flex max-w-full rounded-xl border border-border-default bg-base p-1"
          role="tablist"
          aria-label="Choose a prospect moment"
        >
          {EXCHANGES.map(({ id: exchangeOption, label }) => {
            const selected = exchangeOption === exchangeId;
            return (
              <button
                key={exchangeOption}
                id={`${id}-tab-${exchangeOption}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setExchangeId(exchangeOption)}
                onKeyDown={(event) => {
                  const nextId = getKeyboardTabId(EXCHANGES.map(({ id: option }) => option), exchangeOption, event.key);
                  if (nextId === exchangeOption) return;
                  event.preventDefault();
                  setExchangeId(nextId);
                  document.getElementById(`${id}-tab-${nextId}`)?.focus();
                }}
                className={`rounded-lg px-3.5 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hover sm:text-sm ${
                  selected
                    ? 'bg-elevated text-text-primary'
                    : 'text-text-muted hover:text-text-primary'
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
          aria-labelledby={`${id}-tab-${exchange.id}`}
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-hover"
        >
          <div className="mb-5 border-l-2 border-border-hover pl-4">
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Prospect</p>
            <blockquote className="text-base leading-relaxed text-text-body sm:text-lg">
              &quot;{exchange.prospect}&quot;
            </blockquote>
          </div>

          {exchange.decision === 'silence' ? (
            <div className="rounded-xl border border-success/35 bg-success/10 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-success/40 bg-success/15">
                  <Check className="h-4 w-4 text-text-primary" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    Oracle stays quiet
                  </p>
                  <p className="mt-2 text-lg font-semibold text-text-primary">{exchange.explanation}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-accent-hover/45 bg-accent-subtle/60 p-5">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-text-primary">
                <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                Oracle suggests
              </div>
              <p className="text-xl font-semibold tracking-tight text-text-primary">{exchange.cue}</p>
              <div className="mt-4 border-t border-accent-hover/20 pt-4">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">What you could say</p>
                <p className="text-sm leading-relaxed text-text-body">&quot;{exchange.wordTrack}&quot;</p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-text-secondary">{exchange.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
