export const PUBLIC_CLAIM_RECEIPTS = {
  'organizations-running-live-calls': {
    checkedOn: '2026-08-10',
    source: 'https://github.com/The-Ops-King/kravok-lander/blob/db04a47288881ae519f6a1afa29dd035e5c98888/evidence/proofs/2026-08-10-public-claims.md',
  },
  'tenant-policy-suite': {
    checkedOn: '2026-08-10',
    source: 'https://github.com/The-Ops-King/KRAVOK/actions/runs/31220917565/job/93005143912',
  },
  'mac-trust-chain': {
    checkedOn: '2026-08-10',
    source: 'https://github.com/The-Ops-King/KRAVOK/actions/runs/31435411864/job/93608409342',
    artifactUrl: 'https://github.com/The-Ops-King/kravok-lander/releases/download/v0.6.4/Kravok-mac-universal.dmg',
    artifactSha256: 'e7c245a3fbe00f7c7e7680b7d8e0fde198874b22f64e0620786cb5212667c5e0',
    artifactManifestUrl: 'https://raw.githubusercontent.com/The-Ops-King/kravok-lander/db04a47288881ae519f6a1afa29dd035e5c98888/evidence/releases/v0.6.4.sha256',
  },
};

// Owner-approved publication path. This accurately records that the review was
// not performed by legal counsel and binds approval to the exact document.
export const PLATFORM_PRIVACY_POLICY_RECEIPT = {
  reviewedOn: '2026-08-10',
  route: '/privacy-policy',
  source: 'https://github.com/The-Ops-King/kravok-lander/blob/db04a47288881ae519f6a1afa29dd035e5c98888/evidence/approvals/2026-08-10-owner-publication.md',
  reviewedBy: 'KRAVOK owner',
  reviewerRole: 'Company owner',
  approvalScope: 'app-platform-privacy-policy',
  approvalBasis: 'owner',
  acknowledgement: 'not-counsel-reviewed',
  documentSha256: '6c56e8243254113de1138f758813aa5622ef3b1fdb242ff501626e959857f246',
};

export const LEGAL_DOCUMENTS_REVIEW_RECEIPT = {
  reviewedOn: '2026-08-10',
  source: 'https://github.com/The-Ops-King/kravok-lander/blob/db04a47288881ae519f6a1afa29dd035e5c98888/evidence/approvals/2026-08-10-owner-publication.md',
  reviewedBy: 'KRAVOK owner',
  reviewerRole: 'Company owner',
  approvalScope: 'public-legal-bundle',
  approvalBasis: 'owner',
  acknowledgement: 'not-counsel-reviewed',
  documentSha256: {
    'TermsOfService.jsx': '4d207905ff3296f85b8e7800f095c3dba437e7bf05eb6c5bfbfa92ec5d025621',
    'UserAgreement.jsx': '66a9b1bef1ba3220ed3a80558cbf8aa742cff8796da869dd837e097689073e50',
    'EndUserAgreement.jsx': 'b725a35ae2fe5033a90c940b190a8436c8580acfc52f748a269e7ea36c81da1b',
  },
};
