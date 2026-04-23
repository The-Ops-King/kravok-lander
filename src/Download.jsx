import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download as DownloadIcon, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Update this constant (and the hero button in App.jsx) whenever a new
// release ships. GitHub's /releases/latest/... URL rewrites to the newest
// tag but preserves whatever filename you request, so the app version in
// the filename has to be kept in sync.
const DMG_URL =
  'https://github.com/The-Ops-King/kravok-lander/releases/download/v0.1.1/KRAVOK-0.1.1-arm64.dmg';
const DMG_FILENAME = 'KRAVOK-0.1.1-arm64.dmg';
const VERSION_LABEL = 'v0.1.1';

/**
 * Download — deep-link target that auto-starts the DMG download.
 *
 * Reached by clicking "Download" in invite / welcome emails. On mount we
 * assign window.location to the DMG URL, which browsers treat as a
 * file-download navigation (the tab stays on /download, the file streams
 * into the user's Downloads folder).
 *
 * If the auto-nav is blocked (Safari strict mode, popup blocker, offline),
 * the same URL is available as a click-target on the page.
 */
export default function Download() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Give the page a beat to paint, then kick the download.
    const t = setTimeout(() => {
      window.location.href = DMG_URL;
      setStarted(true);
    }, 400);
    return () => clearTimeout(t);
  }, []);

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
          {started ? 'Your download has started.' : 'Getting KRAVOK ready…'}
        </h1>
        <p className="text-base text-text-secondary mb-10 max-w-md">
          If it didn't start automatically, use the button below.
        </p>

        {/* Manual trigger */}
        <a
          href={DMG_URL}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm tracking-wide text-white overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_100%] animate-gradient-shift" />
          <span className="absolute inset-0 rounded-xl opacity-60 blur-md bg-accent/50 group-hover:opacity-80 transition-opacity" />
          <span className="relative flex items-center gap-2.5">
            <DownloadIcon className="w-5 h-5" />
            Download KRAVOK.dmg
          </span>
        </a>

        {/* Meta */}
        <div className="mt-6 flex flex-col items-center gap-1 text-xs text-text-muted font-mono">
          <div>{VERSION_LABEL} · {DMG_FILENAME}</div>
          <div>Apple Silicon · macOS 13+ · ~138 MB</div>
        </div>

        {/* Install steps */}
        <div className="mt-16 w-full glass rounded-2xl p-6 text-left">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-text-primary/80 mb-4">
            After download
          </h2>
          <ol className="space-y-3 text-sm text-text-body">
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-mono text-text-secondary">1</span>
              <span>Open <span className="font-mono text-text-primary">{DMG_FILENAME}</span> from your Downloads folder.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-mono text-text-secondary">2</span>
              <span>Drag <strong className="text-text-primary">KRAVOK</strong> into the <strong className="text-text-primary">Applications</strong> folder.</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[11px] font-mono text-text-secondary">3</span>
              <span>Launch KRAVOK from Applications and sign in with your invited email.</span>
            </li>
          </ol>
        </div>

        {/* Trust line */}
        <p className="mt-8 text-xs text-text-muted max-w-md">
          Signed with an Apple Developer ID and notarized by Apple — no Gatekeeper warnings.
        </p>
      </motion.div>
    </div>
  );
}
