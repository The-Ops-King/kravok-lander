import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

import { DOWNLOADS } from '../src/downloads.js';
import { PUBLIC_PROOFS, assertProofsPublishable } from '../src/experience.js';
import {
  PLATFORM_PRIVACY_POLICY_RECEIPT,
  PUBLIC_CLAIM_RECEIPTS,
  LEGAL_DOCUMENTS_REVIEW_RECEIPT,
} from './public-claim-receipts.mjs';
import {
  isImmutableReceiptSource,
  getManifestSha256,
  hasPlatformPrivacyRoute,
  hasPrivacyPolicyLink,
  validateLegalBundleReceipt,
  validateMacArtifactReceipt,
  validatePlatformPrivacyReceipt,
} from './publish-validators.mjs';

const phoenixDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Phoenix',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const buildDate = phoenixDate;
const blockers = [];

async function fetchSha256(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok || !response.body) {
    throw new Error(`artifact request returned HTTP ${response.status}`);
  }

  const hash = createHash('sha256');
  for await (const chunk of response.body) hash.update(chunk);
  return hash.digest('hex');
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`manifest request returned HTTP ${response.status}`);
  return response.text();
}

try {
  assertProofsPublishable(buildDate);
} catch (error) {
  blockers.push(error.message);
}

for (const claim of PUBLIC_PROOFS) {
  const receipt = PUBLIC_CLAIM_RECEIPTS[claim.id];
  if (!receipt || receipt.checkedOn !== buildDate || !receipt.source) {
    blockers.push(`Public proof ${claim.id} is missing a current verification receipt.`);
    continue;
  }
  if (!isImmutableReceiptSource(receipt.source)) {
    blockers.push(`Public proof ${claim.id} is not bound to an immutable receipt.`);
  }
  if (claim.receiptUrl !== receipt.source) {
    blockers.push(`Public proof ${claim.id} is not bound to its verification receipt.`);
  }
  if (claim.kind === 'mac-trust') {
    const receiptBlockers = validateMacArtifactReceipt(receipt, DOWNLOADS.mac.url);
    blockers.push(...receiptBlockers);

    if (receiptBlockers.length === 0) {
      try {
        const artifactName = decodeURIComponent(new URL(receipt.artifactUrl).pathname.split('/').pop());
        const [servedDigest, manifest] = await Promise.all([
          fetchSha256(receipt.artifactUrl),
          fetchText(receipt.artifactManifestUrl),
        ]);
        const manifestDigest = getManifestSha256(manifest, artifactName);

        if (servedDigest !== receipt.artifactSha256.toLowerCase() || manifestDigest !== servedDigest) {
          blockers.push('The served macOS artifact, recorded SHA-256, and pinned checksum manifest do not match.');
        }
      } catch (error) {
        blockers.push(`The exact macOS release artifact could not be re-verified: ${error.message}.`);
      }
    }
  }
}

const sourceAt = (relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8');
const mainSource = sourceAt('../src/main.jsx');
const appSource = sourceAt('../src/App.jsx');
const legalPageSource = sourceAt('../src/LegalPage.jsx');
const termsSource = sourceAt('../src/TermsOfService.jsx');
const userAgreementSource = sourceAt('../src/UserAgreement.jsx');
const endUserAgreementSource = sourceAt('../src/EndUserAgreement.jsx');
const privacyPolicyUrl = new URL('../src/PrivacyPolicy.jsx', import.meta.url);
const privacyPolicyExists = existsSync(privacyPolicyUrl);
const sha256 = (content) => createHash('sha256').update(content).digest('hex');

blockers.push(...validatePlatformPrivacyReceipt(
  PLATFORM_PRIVACY_POLICY_RECEIPT,
  buildDate,
  {
    routeDeclared: hasPlatformPrivacyRoute(mainSource),
    policyFileExists: privacyPolicyExists,
    linkedFromPublicFooter: hasPrivacyPolicyLink(appSource) && hasPrivacyPolicyLink(legalPageSource),
    linkedFromLegalAgreements: hasPrivacyPolicyLink(termsSource) && hasPrivacyPolicyLink(userAgreementSource),
    documentSha256: privacyPolicyExists ? sha256(readFileSync(privacyPolicyUrl, 'utf8')) : null,
  },
));

blockers.push(...validateLegalBundleReceipt(
  LEGAL_DOCUMENTS_REVIEW_RECEIPT,
  buildDate,
  {
    'TermsOfService.jsx': sha256(termsSource),
    'UserAgreement.jsx': sha256(userAgreementSource),
    'EndUserAgreement.jsx': sha256(endUserAgreementSource),
  },
));

if (blockers.length > 0) {
  throw new Error(`Publication blocked:\n- ${blockers.join('\n- ')}`);
}

console.log(`Publication gate passed: ${PUBLIC_PROOFS.length} claims and required legal evidence verified on ${buildDate}.`);
