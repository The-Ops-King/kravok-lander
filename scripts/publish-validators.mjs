import { createHash } from 'node:crypto';

const PINNED_GITHUB_RELEASE = /^https:\/\/github\.com\/The-Ops-King\/(?:KRAVOK|kravok-lander)\/releases\/download\/(?!latest(?:\/|$))[^/?#]+\/[^/?#]+$/i;
const PINNED_GITHUB_MANIFEST = /^https:\/\/raw\.githubusercontent\.com\/The-Ops-King\/(?:KRAVOK|kravok-lander)\/[a-f0-9]{40}\/[^?#]+$/i;
const SHA256 = /^[a-f0-9]{64}$/i;
const IMMUTABLE_RECEIPT_URLS = [
  /^https:\/\/github\.com\/The-Ops-King\/(?:KRAVOK|kravok-lander)\/actions\/runs\/\d+(?:\/job\/\d+)?$/i,
  /^https:\/\/github\.com\/The-Ops-King\/(?:KRAVOK|kravok-lander)\/commit\/[a-f0-9]{40}$/i,
  /^https:\/\/github\.com\/The-Ops-King\/(?:KRAVOK|kravok-lander)\/blob\/[a-f0-9]{40}\/[^?#]+$/i,
];

export function isImmutableReceiptSource(source) {
  return typeof source === 'string' && IMMUTABLE_RECEIPT_URLS.some((pattern) => pattern.test(source));
}

export function sourceSha256(source) {
  if (typeof source !== 'string') return null;
  const canonicalSource = source.replace(/\r\n?/g, '\n');
  return createHash('sha256').update(canonicalSource).digest('hex');
}

function withoutSourceComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^\S\r\n])\/\/.*$/gm, '$1');
}

export function hasPlatformPrivacyRoute(mainSource) {
  if (typeof mainSource !== 'string') return false;
  const activeSource = withoutSourceComments(mainSource);
  const importsPolicyComponent = /const\s+PrivacyPolicy\s*=\s*lazy\(\(\)\s*=>\s*import\(['"]\.\/PrivacyPolicy\.jsx['"]\)\);/.test(activeSource);
  const rendersPolicyComponent = /<Route\s+path=["']\/privacy-policy["']\s+element=\{<PrivacyPolicy\s*\/>\}\s*\/>/.test(activeSource);
  return importsPolicyComponent && rendersPolicyComponent;
}

export function hasPrivacyPolicyLink(source) {
  return typeof source === 'string' && /(?:to|href)=["']\/privacy-policy["']/.test(withoutSourceComments(source));
}

export function validateMacArtifactReceipt(receipt, downloadUrl) {
  const valid = receipt &&
    PINNED_GITHUB_RELEASE.test(receipt.artifactUrl || '') &&
    SHA256.test(receipt.artifactSha256 || '') &&
    PINNED_GITHUB_MANIFEST.test(receipt.artifactManifestUrl || '') &&
    receipt.artifactUrl === downloadUrl;

  return valid
    ? []
    : ['Public proof mac-trust-chain must match the served pinned release artifact, a pinned checksum manifest, and its 64-character SHA-256.'];
}

export function getManifestSha256(manifest, artifactName) {
  if (typeof manifest !== 'string' || !artifactName) return null;

  for (const line of manifest.split(/\r?\n/)) {
    const match = line.trim().match(/^([a-f0-9]{64})\s+\*?(.+)$/i);
    if (match && match[2].trim() === artifactName) return match[1].toLowerCase();
  }

  return null;
}

export function validatePlatformPrivacyReceipt(receipt, buildDate, routeEvidence) {
  if (!receipt) {
    return ['A current authorized app/platform Privacy Policy review and immutable receipt are required.'];
  }

  const blockers = [];
  if (receipt.reviewedOn !== buildDate) {
    blockers.push('The app/platform Privacy Policy must be reviewed again on publish day.');
  }
  if (receipt.route !== '/privacy-policy') {
    blockers.push('The app/platform Privacy Policy must use the canonical /privacy-policy route.');
  }
  if (!isImmutableReceiptSource(receipt.source)) {
    blockers.push('The app/platform Privacy Policy review receipt must be immutable.');
  }
  if (!receipt.reviewedBy || !receipt.reviewerRole || receipt.approvalScope !== 'app-platform-privacy-policy') {
    blockers.push('The app/platform Privacy Policy receipt must identify the reviewer, role, and approval scope.');
  }
  if (!['owner', 'counsel'].includes(receipt.approvalBasis)) {
    blockers.push('The app/platform Privacy Policy must be approved by the company owner or counsel.');
  }
  if (receipt.approvalBasis === 'owner' && receipt.acknowledgement !== 'not-counsel-reviewed') {
    blockers.push('Owner approval must accurately record that the policy was not counsel-reviewed.');
  }
  if (!SHA256.test(receipt.documentSha256 || '') || receipt.documentSha256 !== routeEvidence.documentSha256) {
    blockers.push('The app/platform Privacy Policy review is not bound to the exact published document.');
  }
  if (!routeEvidence.routeDeclared || !routeEvidence.policyFileExists) {
    blockers.push('The app/platform Privacy Policy route or document is missing from the build.');
  }
  if (!routeEvidence.linkedFromPublicFooter || !routeEvidence.linkedFromLegalAgreements) {
    blockers.push('The app/platform Privacy Policy must be linked from the public footer and both governing agreements.');
  }

  return blockers;
}

export function validateLegalBundleReceipt(receipt, buildDate, documentDigests) {
  if (!receipt) {
    return ['A current authorized owner or counsel review receipt is required for the public Terms and End User Terms.'];
  }

  const blockers = [];
  if (receipt.reviewedOn !== buildDate) {
    blockers.push('The public Terms and End User Terms must be reviewed again on publish day.');
  }
  if (!isImmutableReceiptSource(receipt.source)) {
    blockers.push('The legal-bundle review receipt must be immutable.');
  }
  if (!receipt.reviewedBy || !receipt.reviewerRole || receipt.approvalScope !== 'public-legal-bundle') {
    blockers.push('The legal-bundle receipt must identify the reviewer, role, and approval scope.');
  }
  if (!['owner', 'counsel'].includes(receipt.approvalBasis)) {
    blockers.push('The public legal bundle must be approved by the company owner or counsel.');
  }
  if (receipt.approvalBasis === 'owner' && receipt.acknowledgement !== 'not-counsel-reviewed') {
    blockers.push('Owner approval must accurately record that the legal bundle was not counsel-reviewed.');
  }

  for (const [documentName, digest] of Object.entries(documentDigests)) {
    if (!SHA256.test(receipt.documentSha256?.[documentName] || '') || receipt.documentSha256[documentName] !== digest) {
      blockers.push(`The legal review is not bound to the exact ${documentName} content.`);
    }
  }

  return blockers;
}
