import { useState, useEffect } from 'react';

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface GitHubRelease {
  tag_name: string;       // "v1.0.0"
  published_at: string;   // "2026-04-07T..."
  assets: ReleaseAsset[];
}

export interface ReleaseLinks {
  version: string;
  publishedAt: string;
  windows: string | null;
  windowsSize: string | null;
  macSilicon: string | null;       // Apple Silicon DMG
  macSiliconSize: string | null;
  macIntel: string | null;         // Intel DMG
  macIntelSize: string | null;
  deb: string | null;
  debSize: string | null;
  rpm: string | null;
  rpmSize: string | null;
}

const REPO = 'Tayyab-Hussayn/linkedin-hr-agent';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export function useGitHubRelease() {
  const [links, setLinks] = useState<ReleaseLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json() as Promise<GitHubRelease>;
      })
      .then(release => {
        const findAsset = (ext: string) =>
          release.assets.find(
            a => a.name.endsWith(ext) && !a.name.endsWith('.sig')
          ) ?? null;

        const fmtSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;

        const winAsset    = findAsset('-setup.exe');
        const debAsset    = findAsset('.deb');
        const rpmAsset    = findAsset('.rpm');
        // Tauri names macOS DMGs: Qalam_x.x.x_aarch64.dmg and Qalam_x.x.x_x64.dmg
        const macSiliconAsset = release.assets.find(
          a => a.name.endsWith('.dmg') && a.name.includes('aarch64') && !a.name.endsWith('.sig')
        ) ?? null;
        const macIntelAsset = release.assets.find(
          a => a.name.endsWith('.dmg') && a.name.includes('x64') && !a.name.endsWith('.sig')
        ) ?? null;

        setLinks({
          version: release.tag_name,
          publishedAt: new Date(release.published_at).toLocaleDateString('en-US', {
            month: 'long', year: 'numeric',
          }),
          windows: winAsset?.browser_download_url ?? null,
          windowsSize: winAsset ? fmtSize(winAsset.size) : null,
          macSilicon: macSiliconAsset?.browser_download_url ?? null,
          macSiliconSize: macSiliconAsset ? fmtSize(macSiliconAsset.size) : null,
          macIntel: macIntelAsset?.browser_download_url ?? null,
          macIntelSize: macIntelAsset ? fmtSize(macIntelAsset.size) : null,
          deb: debAsset?.browser_download_url ?? null,
          debSize: debAsset ? fmtSize(debAsset.size) : null,
          rpm: rpmAsset?.browser_download_url ?? null,
          rpmSize: rpmAsset ? fmtSize(rpmAsset.size) : null,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { links, loading, error };
}
