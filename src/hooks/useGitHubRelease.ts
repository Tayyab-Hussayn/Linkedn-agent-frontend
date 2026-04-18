import { useState, useEffect } from 'react';

export interface ReleaseLinks {
  version: string;
  publishedAt: string;
  windows: string | null;
  windowsSize: string | null;
  macSilicon: string | null;
  macSiliconSize: string | null;
  deb: string | null;
  debSize: string | null;
  rpm: string | null;
  rpmSize: string | null;
}

const REPO = 'Tayyab-Hussayn/linkedin-hr-agent';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(0)} MB`;
}

function findAsset(assets: { name: string; browser_download_url: string; size: number }[], patterns: RegExp[]) {
  const asset = assets.find(a => patterns.some(p => p.test(a.name)));
  if (!asset) return { url: null, size: null };
  return { url: asset.browser_download_url, size: formatSize(asset.size) };
}

export function useGitHubRelease() {
  const [links, setLinks] = useState<ReleaseLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
    };
    if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then(data => {
        const assets: { name: string; browser_download_url: string; size: number }[] = data.assets ?? [];

        const win = findAsset(assets, [/_x64-setup\.exe$/i, /windows.*\.exe$/i]);
        const mac = findAsset(assets, [/_aarch64\.dmg$/i, /apple.*silicon.*\.dmg$/i, /\.dmg$/i]);
        const deb = findAsset(assets, [/_amd64\.deb$/i, /\.deb$/i]);
        const rpm = findAsset(assets, [/\.x86_64\.rpm$/i, /\.rpm$/i]);

        setLinks({
          version: data.tag_name,
          publishedAt: new Date(data.published_at).toLocaleDateString('en-US', {
            month: 'long', year: 'numeric',
          }),
          windows: win.url,
          windowsSize: win.size,
          macSilicon: mac.url,
          macSiliconSize: mac.size,
          deb: deb.url,
          debSize: deb.size,
          rpm: rpm.url,
          rpmSize: rpm.size,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { links, loading, error };
}
