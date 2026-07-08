import { useState } from 'react';

// OS detection + per-platform download config for the KRAVOK desktop app.
// Both installers are published on every kravok-lander release under stable
// asset names, so the /releases/latest/ URLs never need bumping per version.
const REL = 'https://github.com/The-Ops-King/kravok-lander/releases/latest/download';

export const DOWNLOADS = {
  mac: {
    os: 'mac',
    name: 'macOS',
    label: 'Download for macOS',
    url: `${REL}/Kravok-mac-arm64.dmg`,
    filename: 'Kravok-mac-arm64.dmg',
    meta: 'Apple Silicon · macOS 13+',
    size: '~9 MB',
    steps: [
      'Open Kravok-mac-arm64.dmg from your Downloads folder.',
      'Drag KRAVOK into the Applications folder.',
      'Launch KRAVOK from Applications and sign in with your invited email.',
    ],
  },
  windows: {
    os: 'windows',
    name: 'Windows',
    label: 'Download for Windows',
    url: `${REL}/Kravok-windows-x64-setup.exe`,
    filename: 'Kravok-windows-x64-setup.exe',
    meta: 'Windows 10+ · x64',
    size: '~4 MB',
    steps: [
      'Open Kravok-windows-x64-setup.exe from your Downloads folder.',
      'Click through the installer to add KRAVOK to your PC.',
      'Launch KRAVOK and sign in with your invited email.',
    ],
  },
};

// 'mac' | 'windows' | 'other'. 'other' (Linux, mobile, unknown) falls back to
// letting the user pick, rather than pushing an installer that won't run.
export function detectOS() {
  if (typeof navigator === 'undefined') return 'other';
  const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase();
  const ua = (navigator.userAgent || '').toLowerCase();
  // Phones/tablets can't run the desktop app and iOS UAs contain "Mac OS X" —
  // send them to the picker instead of auto-serving a dmg/exe.
  if (/iphone|ipad|ipod|android|mobile/.test(ua)) return 'other';
  if (platform.includes('win') || ua.includes('windows')) return 'windows';
  if (platform.includes('mac') || ua.includes('mac')) return 'mac';
  return 'other';
}

// The counterpart platform, for the "on the other OS?" link.
export const otherOS = (os) => (os === 'windows' ? 'mac' : 'windows');

// SPA (no SSR) — detect once on mount; the value never changes after that.
export function useOS() {
  const [os] = useState(detectOS);
  return os;
}
