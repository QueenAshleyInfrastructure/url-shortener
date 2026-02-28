function FilterButtons() {
  const { filter, setFilter } = React.useContext(FilterContext);
  const filters = ['all', 'active', 'completed'];
  return (
    <div className="filter-row">
      {filters.map((f) => (
        <button
          key={f}
          type="button"
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
window.FilterButtons = FilterButtons;
