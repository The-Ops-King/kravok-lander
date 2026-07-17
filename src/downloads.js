// Central download config + OS detection. The GitHub /releases/latest/download
// URLs are stable and asset names are fixed across releases, so these never
// need touching. The /download page's VERSION_LABEL is bumped separately by CI.
import { useEffect, useState } from 'react';

const BASE = 'https://github.com/The-Ops-King/kravok-lander/releases/latest/download';

export const DOWNLOADS = {
  mac: {
    os: 'mac',
    url: `${BASE}/Kravok-mac-universal.dmg`,
    filename: 'Kravok-mac-universal.dmg',
    label: 'Download for macOS',
    note: 'Universal (Apple Silicon + Intel) · macOS 13+',
  },
  windows: {
    os: 'windows',
    url: `${BASE}/Kravok-windows-x64-setup.exe`,
    filename: 'Kravok-windows-x64-setup.exe',
    label: 'Download for Windows',
    note: 'Windows 10/11 · 64-bit',
  },
};

// Best-effort OS sniff. userAgentData.platform is the modern signal; fall back
// to legacy navigator.platform / userAgent. Defaults to mac (primary audience).
export function detectOS() {
  if (typeof navigator === 'undefined') return 'mac';
  const p = (
    navigator.userAgentData?.platform ||
    navigator.platform ||
    navigator.userAgent ||
    ''
  ).toLowerCase();
  if (p.includes('win')) return 'windows';
  if (p.includes('mac') || p.includes('iphone') || p.includes('ipad')) return 'mac';
  return 'mac';
}

// Returns the visitor's platform download + the other one (for a secondary
// link). Defaults to mac on first render, corrects after mount — no SSR here.
export function usePlatformDownload() {
  const [os, setOs] = useState('mac');
  useEffect(() => { setOs(detectOS()); }, []);
  return {
    os,
    primary: DOWNLOADS[os],
    secondary: DOWNLOADS[os === 'mac' ? 'windows' : 'mac'],
  };
}
