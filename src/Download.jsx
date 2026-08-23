import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download as DownloadIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DOWNLOADS,
  detectOS,
  getDownloadOptions,
  getInitialSelection,
  getInstallGuide,
} from './downloads';
import { usePageMetadata } from './usePageMetadata.js';
import { KravokLockup } from './components/BrandIdentity.jsx';

export default function Download() {
  usePageMetadata({
    title: 'Download KRAVOK',
    description: 'Already have an invite code? Download KRAVOK for macOS or Windows.',
    robots: 'noindex,follow',
  });

  const [detectedOS, setDetectedOS] = useState(null);
  const [selectedOS, setSelectedOS] = useState(null);

  useEffect(() => {
    const platform = detectOS();
    setDetectedOS(platform);
    setSelectedOS(getInitialSelection(platform));
  }, []);

  const options = getDownloadOptions(detectedOS);
  const selected = selectedOS ? DOWNLOADS[selectedOS] : null;
  const guide = getInstallGuide(selectedOS);
  const isUnsupported = detectedOS === 'unsupported' && !selected;

  return (
    <div className="relative min-h-screen bg-base text-text-body overflow-hidden">
      <a className="skip-link" href="#download-content">Skip to content</a>
      <nav className="fixed top-4 left-0 right-0 mx-auto z-50 w-[min(92%,980px)]">
        <div className="rounded-xl border border-border-default bg-primary px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <KravokLockup />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            <span className="hidden sm:inline">Back to kravok.ai</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </nav>

      <main
        id="download-content"
        className="relative max-w-xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center text-center"
      >
        <div className="mb-8 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center border border-border-default bg-primary text-text-secondary">
            <DownloadIcon aria-hidden="true" className="w-7 h-7" />
          </div>
        </div>

        <p className="mb-3 text-xs font-mono font-extrabold uppercase tracking-[0.18em] text-text-primary">
          Invite code required
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary mb-3">
          {isUnsupported ? 'Continue on a Mac or Windows PC.' : 'Choose your download.'}
        </h1>
        <p className="text-base text-text-secondary mb-8 max-w-md">
          {isUnsupported
            ? "KRAVOK isn't available for this device. Choose the computer you'll use, then open this page there."
            : 'Already have an invite code? Select your computer below.'}
        </p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md" role="group" aria-label="Choose your computer">
          {options.map((option) => {
            const active = selectedOS === option.os;
            const name = option.os === 'mac' ? 'macOS' : 'Windows';

            return (
              <button
                key={option.os}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedOS(option.os)}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-accent bg-accent-subtle text-text-primary'
                    : 'border-border-default bg-primary text-text-secondary hover:border-border-hover hover:text-text-primary'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {selected && (
          <>
            <a
              href={selected.url}
              className="mt-6 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-accent hover:bg-accent-hover font-bold text-sm tracking-wide text-[#F5F5F5] transition-colors"
            >
              <DownloadIcon aria-hidden="true" className="w-5 h-5" />
              {selected.label}
            </a>

            <div className="mt-6 flex flex-col items-center gap-1 text-xs text-text-muted font-mono">
              <div>Release file / {selected.filename}</div>
              <div>{selected.note}</div>
            </div>
          </>
        )}

        {guide && (
          <div className="mt-16 w-full rounded-xl border border-border-default bg-primary p-6 text-left">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-text-primary/80 mb-4">
              {guide.heading}
            </h2>
            <ol className="space-y-3 text-sm text-text-body">
              {guide.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-lg border border-border-default bg-elevated flex items-center justify-center text-xs leading-none font-mono text-text-secondary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {guide?.trust && (
          <p className="mt-8 text-xs text-text-muted max-w-md">
            {guide.trust}
          </p>
        )}
      </main>
    </div>
  );
}
