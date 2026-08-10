import React from 'react';
import LegalPage from './LegalPage.jsx';

const SUPPORT_EMAIL = 'support@kravok.ai';

/**
 * A narrow notice for the public website, not a policy for the KRAVOK app.
 * Keep this synchronized with observable lander behavior if that changes.
 */
export default function PrivacyNotice() {
  return (
    <LegalPage
      title="Website privacy notice"
      description="Privacy notice for the public KRAVOK website only."
    >
      <article aria-label="KRAVOK website privacy notice">
        <p>
          This notice describes the public KRAVOK website build. It does not describe the KRAVOK desktop app,
          organization workspaces, or services used after an invitation.
        </p>

        <section aria-labelledby="privacy-current-build">
          <h2 id="privacy-current-build">What this website build does</h2>
          <ul>
            <li>No analytics or advertising scripts are included.</li>
            <li>No cookies are set by the website code.</li>
            <li>There are no applicant forms, account-creation forms, or other data-entry forms.</li>
            <li>
              On GitHub Pages, a direct route may be kept briefly in browser session storage while the app opens,
              then removed. Query parameters are not stored by that redirect.
            </li>
          </ul>
          <p>
            This is a description of the current website code, not a claim about technical request logs that may be
            handled by hosting providers, internet providers, browsers, or other services outside this build.
          </p>
        </section>

        <section aria-labelledby="privacy-email">
          <h2 id="privacy-email">Request-access email</h2>
          <p>
            The request-access link opens your device&apos;s email app with KRAVOK&apos;s support address and a subject line.
            The website does not send the email or collect its contents. If you choose to send the message, your email
            provider and the recipient&apos;s email provider handle it under their own terms and privacy practices.
          </p>
        </section>

        <section aria-labelledby="privacy-downloads">
          <h2 id="privacy-downloads">Downloads</h2>
          <p>
            The download page directs your browser to a release file hosted on GitHub Releases. GitHub receives
            and handles that download request under its own terms and privacy practices.
          </p>
        </section>

        <section aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">Contact</h2>
          <p>
            Questions about this website notice can be sent to{' '}
            <span className="select-all font-mono text-text-primary">{SUPPORT_EMAIL}</span>.
          </p>
        </section>
      </article>
    </LegalPage>
  );
}
