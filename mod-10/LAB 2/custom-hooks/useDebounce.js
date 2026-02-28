/* filepath: LAB 2/custom-hooks/useDebounce.js */
function useDebounce(value, delay = 500) {
  const { useState, useEffect } = React;
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
}
window.useDebounce = useDebounce;
