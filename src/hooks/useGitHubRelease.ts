import { useState, useEffect } from 'react';

export interface ReleaseLinks {
  version: string;
  publishedAt: string;
  windows: string | null;
  windowsSize: string | null;
  macSilicon: string | null;
  macSiliconSize: string | null;
  macIntel: string | null;
  macIntelSize: string | null;
  deb: string | null;
  debSize: string | null;
  rpm: string | null;
  rpmSize: string | null;
}

const API_BASE = 'https://api.byqalam.com';

export function useGitHubRelease() {
  const [links, setLinks] = useState<ReleaseLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/release/latest`)
      .then(res => {
        if (!res.ok) throw new Error(`API ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        setLinks({
          version: data.version,
          publishedAt: new Date(data.published_at).toLocaleDateString('en-US', {
            month: 'long', year: 'numeric',
          }),
          windows:          data.windows,
          windowsSize:      data.windows_size,
          macSilicon:       data.mac_silicon,
          macSiliconSize:   data.mac_silicon_size,
          macIntel:         data.mac_intel,
          macIntelSize:     data.mac_intel_size,
          deb:              data.deb,
          debSize:          data.deb_size,
          rpm:              data.rpm,
          rpmSize:          data.rpm_size,
        });
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { links, loading, error };
}
