// ALWAYS the current release, never a pinned tag.
//
// This was pinned to v0.6.4 and silently went stale through the whole 0.7.x
// line, so the public download handed every new visitor a build from before the
// updater was fixed -- 0.6.4 is specifically the version that records an update
// and then relaunches itself unchanged, forever. The one page whose job is to
// onboard a stranger was shipping the one build that cannot get itself out of
// trouble.
//
// GitHub's /releases/latest/download/ redirects to the newest published asset,
// which is the same source the in-app updater already reads. Nothing to bump on
// release day, so nothing to forget.
const BASE = 'https://github.com/The-Ops-King/kravok-lander/releases/latest/download';

export const DOWNLOADS = {
  mac: {
    os: 'mac',
    url: `${BASE}/Kravok-mac-universal.dmg`,
    filename: 'KRAVOK macOS installer (.dmg)',
    label: 'Download for macOS',
    note: 'macOS 13+',
  },
  windows: {
    os: 'windows',
    url: `${BASE}/Kravok-windows-x64-setup.exe`,
    filename: 'Kravok-windows-x64-setup.exe',
    label: 'Download for Windows',
    note: 'Windows 10/11 · 64-bit',
  },
};

const INSTALL_GUIDES = {
  mac: {
    heading: 'Install on macOS',
    steps: [
      'Open the KRAVOK .dmg file from your Downloads folder.',
      'Drag KRAVOK into the Applications folder.',
      'Launch KRAVOK from Applications and sign in with your invited email.',
    ],
    trust: null,
  },
  windows: {
    heading: 'Install on Windows',
    steps: [
      'Open Kravok-windows-x64-setup.exe from your Downloads folder.',
      'Follow the Windows installer to complete setup.',
      'Launch KRAVOK from the Start menu and sign in with your invited email.',
    ],
    trust: 'For invited users on 64-bit Windows 10 or Windows 11.',
  },
};

export function isSupportedOS(os) {
  return os === 'mac' || os === 'windows';
}

export function getInitialSelection(detectedOS) {
  return isSupportedOS(detectedOS) ? detectedOS : null;
}

export function getDownloadOptions(preferredOS) {
  if (preferredOS === 'windows') return [DOWNLOADS.windows, DOWNLOADS.mac];
  return [DOWNLOADS.mac, DOWNLOADS.windows];
}

export function getInstallGuide(os) {
  return INSTALL_GUIDES[os] || null;
}

// Only desktop macOS and Windows are supported. Mobile, Linux, server
// rendering, and unknown clients remain unsupported until the visitor
// explicitly chooses a computer download.
export function detectOS(client = typeof navigator === 'undefined' ? undefined : navigator) {
  if (!client) return 'unsupported';

  const platform = [
    client.userAgentData?.platform,
    client.platform,
    client.userAgent,
  ].filter(Boolean).join(' ').toLowerCase();

  const isMobileApple = /iphone|ipad|ipod/.test(platform) ||
    (platform.includes('mac') && Number(client.maxTouchPoints) > 1);

  if (isMobileApple) return 'unsupported';
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'mac';
  return 'unsupported';
}
