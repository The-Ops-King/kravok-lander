import React from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildAccessRequestMailto } from './experience.js';
import { KravokLockup, KravokSymbol } from './components/BrandIdentity.jsx';

const SUPPORT_EMAIL = 'support@kravok.ai';

/**
 * Invitation-only access handoff.
 *
 * This intentionally is not a form: the visitor chooses what to share in
 * their own email client, and the lander never presents an unearned confirmation
 * state for an application it cannot submit.
 */
export default function RequestAccess() {
  return (
    <section
      id="request-access"
      aria-labelledby="request-access-title"
      className="access-section"
      data-reveal
    >
      <div className="access-frame">
        <KravokSymbol className="access-symbol" />
        <div className="access-copy">
          <p className="access-kicker">Request access</p>
          <h2 id="request-access-title" className="access-title">
            Built around the way your team sells.
          </h2>
          <p className="access-lede">
            Tell us about your team. We&apos;ll help set up KRAVOK around your calls,
            coaching, and playbook.
          </p>

          <div className="access-actions">
            <a
              href={buildAccessRequestMailto()}
              aria-describedby="request-access-email-note"
              className="button button-primary access-primary"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              Request access
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <p id="request-access-email-note" className="access-note">
              Opens your email app. Nothing sends until you choose to send it.
            </p>
          </div>

          <p className="access-fallback">
            If the button does not open your email app, write to{' '}
            <span>{SUPPORT_EMAIL}</span>.
          </p>
        </div>

        <aside aria-labelledby="invited-download-title" className="access-invited">
          <KravokLockup className="kravok-lockup--access" />
          <p id="invited-download-title" className="access-invited-title">
            Already have an invite code?
          </p>
          <p className="access-invited-copy">
            Download KRAVOK and sign in with the email connected to your invite.
          </p>
          <Link to="/download" className="access-download">
            <Download aria-hidden="true" className="h-4 w-4" />
            Download KRAVOK
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
