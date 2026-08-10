import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from './usePageMetadata.js';
import { KravokLockup } from './components/BrandIdentity.jsx';

export default function NotFound() {
  usePageMetadata({
    title: 'Page not found | KRAVOK',
    description: 'This KRAVOK page does not exist.',
    robots: 'noindex,nofollow',
  });

  return (
    <div className="flex min-h-screen flex-col bg-base text-text-body">
      <a className="skip-link" href="#not-found-content">Skip to content</a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="KRAVOK home">
          <KravokLockup />
        </Link>
      </header>

      <main id="not-found-content" className="mx-auto flex w-full max-w-4xl flex-1 items-center px-6 py-24">
        <div className="w-full border-y border-border-default py-16">
          <p className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-text-primary">Error 404</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-text-primary md:text-7xl">
            This page does not exist.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary">
            The route may have moved, or the address may be incomplete.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-bold text-[#F5F5F5] transition-colors hover:bg-accent-hover"
          >
            Return to KRAVOK
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} KRAVOK.</p>
      </footer>
    </div>
  );
}
