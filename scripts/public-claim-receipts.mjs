export const PUBLIC_CLAIM_RECEIPTS = {
  'organizations-running-live-calls': {
    checkedOn: '2026-08-22',
    source: 'https://github.com/The-Ops-King/kravok-lander/blob/bb41c38e4affe152dbf82a840105ee7be9cab591/evidence/proofs/2026-08-22-public-claims.md',
  },
  'tenant-policy-suite': {
    checkedOn: '2026-08-20',
    source: 'https://github.com/The-Ops-King/KRAVOK/actions/runs/32320176499/job/96280698842',
  },
  'mac-trust-chain': {
    checkedOn: '2026-08-20',
    source: 'https://github.com/The-Ops-King/KRAVOK/actions/runs/32320173341/job/96280686841',
    artifactUrl: 'https://github.com/The-Ops-King/kravok-lander/releases/download/v0.7.4/Kravok-mac-universal.dmg',
    artifactSha256: '73c84861715c96438c4907efec87b6504d20ba4e452a6bd9bba0f40a1c6f6dcf',
    artifactManifestUrl: 'https://raw.githubusercontent.com/The-Ops-King/kravok-lander/bb41c38e4affe152dbf82a840105ee7be9cab591/evidence/releases/v0.7.4.sha256',
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
