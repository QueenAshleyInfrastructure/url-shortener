/* FilterContext: state 'all' | 'active' | 'completed', action setFilter(filter). */
const FilterContext = React.createContext(null);

function FilterProvider({ children }) {
  const [filter, setFilterState] = React.useState('all');

  const setFilter = React.useCallback((newFilter) => {
    if (['all', 'active', 'completed'].includes(newFilter)) {
      setFilterState(newFilter);
    }
  }, []);

  const value = React.useMemo(
    () => ({ filter, setFilter }),
    [filter, setFilter]
  );

  return React.createElement(FilterContext.Provider, { value }, children);
}

window.FilterContext = FilterContext;
window.FilterProvider = FilterProvider;
