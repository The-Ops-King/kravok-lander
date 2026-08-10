import React from 'react';

export function KravokLockup({ className = '' }) {
  return (
    <span className={`kravok-lockup ${className}`.trim()}>
      <img
        src="/brand/kravok-wordmark-dark.png"
        alt="Kravok AI"
        width="2508"
        height="1673"
        decoding="async"
      />
    </span>
  );
}

export function OracleLockup({ className = '' }) {
  return (
    <span className={`oracle-lockup ${className}`.trim()}>
      <img
        src="/brand/oracle-wordmark-dark.png"
        alt="Oracle by Kravok"
        width="5017"
        height="3344"
        decoding="async"
      />
    </span>
  );
}

export function OracleIcon({ className = '', decorative = false }) {
  return (
    <img
      className={`oracle-icon ${className}`.trim()}
      src="/brand/oracle-icon-transparent.png"
      alt={decorative ? '' : 'Oracle by Kravok'}
      aria-hidden={decorative ? 'true' : undefined}
      width="856"
      height="899"
      decoding="async"
    />
  );
}

export function KravokSymbol({ className = '' }) {
  return (
    <span className={`kravok-symbol ${className}`.trim()} aria-hidden="true">
      <img
        src="/brand/kravok-wordmark-dark.png"
        alt=""
        width="2508"
        height="1673"
        decoding="async"
      />
    </span>
  );
}
