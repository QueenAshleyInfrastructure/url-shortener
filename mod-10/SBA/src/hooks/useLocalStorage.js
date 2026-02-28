import { useState, useCallback, useEffect } from 'react';

/**
 * Syncs state with localStorage. Persists value across sessions.
 * @param {string} key - localStorage key
 * @param {any} initialValue - value when key is missing (will be JSON stringified)
 * @returns {[value, setValue]} - current value and setter (like useState)
 */
export function useLocalStorage(key, initialValue) {
  const read = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initialValue;
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValueState] = useState(read);

  const setValue = useCallback(
    (next) => {
      setValueState((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch (_) {}
        return resolved;
      });
    },
    [key]
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key && e.storageArea === localStorage) {
        setValueState(read());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, read]);

  return [value, setValue];
}
