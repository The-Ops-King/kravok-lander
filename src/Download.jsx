import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download as DownloadIcon, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { detectOS, DOWNLOADS, otherOS } from './platform';

// Cosmetic only — the /releases/latest/ URLs auto-rewrite to the newest tag
// and asset names are stable, so this never affects what's served. Bump it
// when a release ships if you want the displayed version to match.
const VERSION_LABEL = 'v0.4.9';

/**
 * Download — deep-link target that auto-starts the right installer for the
 * visitor's OS.
 *
 * Reached by clicking "Download" in invite / welcome emails. We detect the OS
 * and, for macOS/Windows, assign window.location to that installer's URL —
 * browsers treat it as a file-download navigation (the tab stays on /download,
 * the file streams into Downloads). On an unrecognized OS we don't guess; we
 * show both installers as click-targets instead.
 */
export default function Download() {
  const [os] = useState(detectOS);
  const [started, setStarted] = useState(false);

  const known = os === 'mac' || os === 'windows';
  const cfg = known ? DOWNLOADS[os] : null;

  useEffect(() => {
    if (!known) return; // unknown OS — let the user pick, don't auto-download
    const t = setTimeout(() => {
      window.location.href = cfg.url;
      setStarted(true);
    }, 400);
    return () => clearTimeout(t);
  }, [known, cfg]);

  return (
    <div className="relative min-h-screen bg-base text-text-body overflow-hidden">
      {/* subtle ambient accent glow to match the landing hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent, #FF4444) 0%, transparent 70%)' }}
      />

      {/* Navbar */}
      <nav className="fixed top-4 left-0 right-0 mx-auto z-50 w-[min(92%,980px)]">
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-glow">
              <span className="font-bold text-white text-sm">K</span>
            </div>
            <span className="font-semibold tracking-tight text-text-primary">KRAVOK</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to kravok.ai
          </Link>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center text-center"
      >
        {/* Status icon */}
        <div className="mb-8 flex items-center justify-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center border ${
              started
                ? 'bg-accent/15 border-accent/40 text-accent'
                : 'bg-white/5 border-white/10 text-text-secondary'
            } transition-colors`}
          >
            {started ? (
              <Check className="w-7 h-7" strokeWidth={2.5} />
            ) : (
              <DownloadIcon className="w-7 h-7" />
            )}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary mb-3">
          {!known
            ? 'Choose your download'
            : started
              ? 'Your download has started.'
              : `Getting KRAVOK for ${cfg.name}…`}
        </h1>
        <p className="text-base text-text-secondary mb-10 max-w-md">
          {known
            ? "If it didn't start automatically, use the button below."
            : 'Pick the version for your computer.'}
        </p>

        {/* Trigger(s) */}
        {known ? (
          <>
            <a
              href={cfg.url}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm tracking-wide text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_100%] animate-gradient-shift" />
              <span className="absolute inset-0 rounded-xl opacity-60 blur-md bg-accent/50 group-hover:opacity-80 transition-opacity" />
              <span className="relative flex items-center gap-2.5">
                <DownloadIcon className="w-5 h-5" />
                {cfg.label}
              </span>
            </a>
            <a
              href={DOWNLOADS[otherOS(os)].url}
              className="mt-5 text-xs text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4 decoration-white/20"
            >
              On {DOWNLOADS[otherOS(os)].name}? Get the {DOWNLOADS[otherOS(os)].name} version
            </a>
          </>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['mac', 'windows'].map((k) => (
              <a
                key={k}
                href={DOWNLOADS[k].url}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm tracking-wide text-white overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_100%] animate-gradient-shift" />
                <span className="absolute inset-0 rounded-xl opacity-60 blur-md bg-accent/50 group-hover:opacity-80 transition-opacity" />
                <span className="relative flex items-center gap-2.5">
                  <DownloadIcon className="w-5 h-5" />
                  {DOWNLOADS[k].name}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="mt-6 flex flex-col items-center gap-1 text-xs text-text-muted font-mono">
          {known ? (
            <>
              <div>{VERSION_LABEL} · {cfg.filename}</div>
              <div>{cfg.meta} · {cfg.size}</div>
            </>
          ) : (
            <div>{VERSION_LABEL} · macOS (Apple Silicon) · Windows (x64)</div>
          )}
        </div>

        {/* Install steps */}
        <div className="mt-16 w-full glass rounded-2xl p-6 text-left">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-text-primary/80 mb-4">
            After download
          </h2>
          <ol className="space-y-3 text-sm text-text-body">
            {(cfg ? cfg.steps : DOWNLOADS.mac.steps).map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-mono text-text-secondary">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Trust line — macOS builds are notarized; Windows uses a guided installer */}
        <p className="mt-8 text-xs text-text-muted max-w-md">
          {os === 'windows'
            ? 'Guided Windows installer — click through and KRAVOK is ready in seconds.'
            : 'Signed with an Apple Developer ID and notarized by Apple — no Gatekeeper warnings.'}
        </p>
      </motion.div>
    </div>
  );
}
