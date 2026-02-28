import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic hook for data fetching. Manages data, loading, and error state.
 * @param {string|(() => Promise<any>)|null} urlOrFetcher - URL string (fetched with fetch()) or a function that returns a Promise
 * @param {object} options - { enabled: boolean, deps: any[] } - deps: when provided, effect depends on these so fetcher can use latest values
 * @returns {{ data: any, loading: boolean, error: Error|null, refetch: () => void }}
 */
export function useFetch(urlOrFetcher, options = {}) {
  const { enabled = true, deps = null } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState(null);
  const fetcherRef = useRef(urlOrFetcher);
  fetcherRef.current = urlOrFetcher;

  const doFetch = useCallback(async () => {
    const current = fetcherRef.current;
    if (current == null) return;
    setLoading(true);
    setError(null);
    try {
      const result =
        typeof current === 'function'
          ? await current()
          : await fetch(current).then((r) => r.json());
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    doFetch();
  }, [enabled, doFetch, ...(Array.isArray(deps) ? deps : [])]);

  return { data, loading, error, refetch: doFetch };
}
