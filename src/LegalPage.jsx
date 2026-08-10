import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMetadata } from './usePageMetadata.js';
import { KravokLockup } from './components/BrandIdentity.jsx';

export default function LegalPage({ title, children, embedded = false, description }) {
  usePageMetadata({
    title: `${title} | KRAVOK`,
    description: description || `${title} for the KRAVOK website and services.`,
  });

  if (embedded) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          {title}
        </h1>
        <div className="legal-content">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base text-text-body">
      <a className="skip-link" href="#legal-content">Skip to content</a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="KRAVOK home">
          <KravokLockup />
        </Link>
        <span aria-hidden="true" />
        <Link to="/" className="header-back-link">
          <ArrowLeft aria-hidden="true" />
          <span>Back to kravok.ai</span>
        </Link>
      </header>

      <main id="legal-content" className="mx-auto max-w-3xl px-6 pb-24 pt-24">
        <h1 className="mb-10 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
          {title}
        </h1>
        <div className="legal-content">{children}</div>
      </main>

      <footer className="site-footer">
        <div>
          <span className="brand footer-brand">
            <KravokLockup />
          </span>
        </div>
        <nav aria-label="Legal links">
          <Link to="/website-privacy">Website privacy notice</Link>
          <Link to="/privacy-policy">Platform privacy policy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <Link to="/user-agreement">User agreement</Link>
        </nav>
        <p className="copyright">&copy; {new Date().getFullYear()} KRAVOK.</p>
      </footer>
    </div>
  );
}
