import React, { useId, useState } from 'react';
import { ShieldQuestion } from 'lucide-react';

import { getForgeDemoTurn, getKeyboardTabId } from './demoState.js';
import SyntheticBadge from './SyntheticBadge.jsx';

const DIFFICULTIES = [
  { id: 'guided', label: 'Normal' },
  { id: 'adversarial', label: 'Hard' },
];

export default function ForgeDemo() {
  const [difficulty, setDifficulty] = useState('guided');
  const id = useId();
  const turn = getForgeDemoTurn(difficulty);

  return (
    <section
      className="overflow-hidden rounded-xl border border-border-default bg-primary"
      aria-labelledby={`${id}-title`}
    >
      <header className="flex flex-col gap-4 border-b border-border-default px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="mb-2 font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-text-primary">Forge / Practice call</p>
          <h3 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-text-primary">
            Change the difficulty. Change the buyer.
          </h3>
        </div>
        <SyntheticBadge />
      </header>

      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-border-default bg-base p-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Persona</p>
          <div className="mt-4 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-warning/30 bg-warning/10">
              <ShieldQuestion className="h-5 w-5 text-warning" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-text-primary">{turn.personaName}</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">{turn.personaDescription}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Difficulty</p>
            <div
              className="inline-flex rounded-xl border border-border-default bg-primary p-1"
              role="tablist"
              aria-label="Choose Forge difficulty"
            >
              {DIFFICULTIES.map(({ id: option, label }) => {
                const selected = option === difficulty;
                return (
                  <button
                    key={option}
                    id={`${id}-tab-${option}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${id}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setDifficulty(option)}
                    onKeyDown={(event) => {
                      const nextId = getKeyboardTabId(DIFFICULTIES.map(({ id: difficultyId }) => difficultyId), option, event.key);
                      if (nextId === option) return;
                      event.preventDefault();
                      setDifficulty(nextId);
                      document.getElementById(`${id}-tab-${nextId}`)?.focus();
                    }}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning ${
                      selected ? 'bg-warning text-[#F5F5F5]' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${difficulty}`}
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
          className="rounded-xl border border-border-default bg-elevated/35 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warning"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Practice call</p>
            <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-text-primary">
              {turn.difficultyLabel}
            </span>
          </div>

          <div className="space-y-4">
            <div className="ml-auto max-w-[90%] rounded-xl rounded-br-sm bg-text-body px-4 py-3 text-sm leading-relaxed text-[#0A0A0A]">
              <span className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-text-disabled">You</span>
              {turn.closer}
            </div>
            <div className="max-w-[92%] rounded-xl rounded-bl-sm border border-border-hover bg-card px-4 py-3 text-sm leading-relaxed text-text-body">
              <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider text-text-primary">{turn.personaName}</span>
              {turn.prospect}
            </div>
          </div>

          <p className="mt-5 border-t border-border-default pt-4 text-xs leading-relaxed text-text-secondary">
            {turn.behavior}
          </p>
        </div>
      </div>
    </section>
  );
}
