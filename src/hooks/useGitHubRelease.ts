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
  windows: string | null;   // .exe
  deb: string | null;       // .deb
  rpm: string | null;       // .rpm
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
        const find = (ext: string) =>
          release.assets.find(
            a => a.name.endsWith(ext) && !a.name.endsWith('.sig')
          )?.browser_download_url ?? null;

        setLinks({
          version: release.tag_name,
          publishedAt: new Date(release.published_at).toLocaleDateString('en-US', {
            month: 'long', year: 'numeric',
          }),
          windows: find('-setup.exe'),
          deb: find('.deb'),
          rpm: find('.rpm'),
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { links, loading, error };
}
