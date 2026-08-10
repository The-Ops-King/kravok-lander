import React from 'react';
import LegalPage from './LegalPage.jsx';

const SUPPORT_EMAIL = 'support@kravok.ai';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Platform Privacy Policy"
      description="How KRAVOK handles information in its invited desktop app and organization services."
    >
      <p className="legal-subtitle">For KRAVOK clients, invited users, and people whose calls are processed</p>
      <p className="legal-meta">Effective Date: August 10, 2026 | Last Updated: August 10, 2026</p>

      <hr />

      <h2>1. SCOPE</h2>
      <p>
        This policy describes information handled by the KRAVOK desktop application, organization workspaces,
        Kravok Manager, Forge, Hindsight, and related services (collectively, the &ldquo;Platform&rdquo;). The separate
        Website Privacy Notice describes the public kravok.ai website.
      </p>

      <h2>2. INFORMATION THE PLATFORM HANDLES</h2>
      <ul>
        <li><strong>Account and organization information</strong>, such as name, email address, role, organization, invitations, and access status.</li>
        <li><strong>Call and practice information</strong>, including call transcripts, speaker labels, structured notes, coaching cues, checklist progress, objections, outcomes, compliance flags, and practice responses.</li>
        <li><strong>Performance and review information</strong>, such as scores, coaching feedback, manager decisions, cue-quality reviews, and training progress.</li>
        <li><strong>Device and usage information</strong>, including app version, operating system, architecture, timestamps, feature activity, reliability events, and diagnostic reports.</li>
        <li><strong>Client-provided materials</strong>, such as scripts, playbooks, products, training documents, personas, and configuration.</li>
        <li><strong>Support communications</strong>, including information submitted in bug reports, access requests, and messages to support.</li>
      </ul>
      <p>
        The Platform processes microphone and system audio while an authorized user runs Oracle or Forge. KRAVOK
        is designed to process that audio for transcription and guidance without retaining raw call-audio files in
        the Platform database. Transcripts and other derived information are retained as described below.
      </p>

      <h2>3. HOW INFORMATION IS USED</h2>
      <p>Information is used to:</p>
      <ul>
        <li>provide live guidance, practice calls, post-call review, and manager tools;</li>
        <li>authenticate users and apply organization and role access rules;</li>
        <li>configure the Platform around a client&rsquo;s scripts and playbooks;</li>
        <li>detect reliability, security, abuse, and compliance issues;</li>
        <li>support users, investigate reports, and improve Platform quality; and</li>
        <li>meet contractual, legal, accounting, and security obligations.</li>
      </ul>

      <h2>4. SERVICE PROVIDERS AND DISCLOSURE</h2>
      <p>
        KRAVOK uses service providers for hosting, database infrastructure, authentication, speech processing,
        artificial intelligence, voice generation, email delivery, monitoring, and support. These providers process
        information on KRAVOK&rsquo;s behalf under their applicable agreements. Information may also be disclosed when
        required by law, to protect rights or security, in connection with a business transaction, or with the
        direction of the relevant client or user. KRAVOK does not sell personal information for money.
      </p>

      <h2>5. CLIENTS, MANAGERS, AND OTHER CALL PARTICIPANTS</h2>
      <p>
        An invited user&rsquo;s organization controls that user&rsquo;s workspace and can access call, practice, performance,
        and review information according to assigned roles. Clients and users are responsible for providing notices
        and obtaining consent required for call monitoring, audio processing, workplace monitoring, and use of the
        Platform. KRAVOK does not provide those notices to prospects or other call participants on a client&rsquo;s behalf.
      </p>

      <h2>6. RETENTION</h2>
      <p>
        KRAVOK retains information for as long as reasonably necessary to provide and secure the Platform, support
        the client relationship, maintain business records, resolve disputes, and meet contractual or legal
        obligations. Retention periods vary by data category, account configuration, and applicable requirements.
        KRAVOK does not promise automatic deletion on a fixed schedule unless a separate written agreement says so.
      </p>

      <h2>7. SECURITY</h2>
      <p>
        KRAVOK uses administrative, technical, and organizational safeguards intended to protect information.
        No service or transmission method can guarantee absolute security. Users are responsible for protecting
        their credentials and reporting suspected unauthorized access promptly.
      </p>

      <h2>8. REQUESTS AND CHOICES</h2>
      <p>
        To request access to, correction of, export of, or deletion of available information, contact{' '}
        <span className="select-all font-mono text-text-primary">{SUPPORT_EMAIL}</span>. KRAVOK may need to verify
        identity, authority, and the relevant organization before responding. Requests are handled subject to
        technical availability, contractual obligations, and applicable law. Users may also need to contact their
        organization because the organization controls its workspace and employment-related use of Platform data.
      </p>

      <h2>9. INTERNATIONAL PROCESSING</h2>
      <p>
        KRAVOK operates from the United States and uses service providers that may process information in the United
        States and other countries. Laws in those locations may differ from the laws where a user or call participant
        lives.
      </p>

      <h2>10. CHILDREN</h2>
      <p>The Platform is intended for business users who are at least eighteen years old.</p>

      <h2>11. CHANGES AND CONTACT</h2>
      <p>
        This policy may be updated as the Platform or applicable requirements change. The date above identifies the
        current version. Questions about this policy can be sent to{' '}
        <span className="select-all font-mono text-text-primary">{SUPPORT_EMAIL}</span>.
      </p>
    </LegalPage>
  );
}
