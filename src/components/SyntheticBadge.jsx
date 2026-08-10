import React from 'react';

export default function SyntheticBadge({ className = '' }) {
  return (
    <span
      aria-label="Fictional example using no customer data"
      title="Fictional example using no customer data"
      className={`inline-flex items-center gap-2 rounded-full border border-info/30 bg-info/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-info ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-info" aria-hidden="true" />
      Fictional example
    </span>
  );
}
