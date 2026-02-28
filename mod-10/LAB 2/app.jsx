/* filepath: LAB 2/app.jsx */
const App = () => {
  return (
    <div className="container">
      <div className="demo-row" style={{justifyContent:'center'}}>
        <div style={{display:'flex',gap:20,flexWrap:'wrap',justifyContent:'center'}}>
          <DebounceSearchDemo />
          <PaginationDemo />
        </div>
      </div>

      <div className="card small">
        <h3>Notes</h3>
        <ul>
          <li>useDebounce(value, delay) — returns debounced value with cleanup using clearTimeout.</li>
          <li>usePagination({totalItems, itemsPerPage, initialPage}) — returns currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage, setPage, nextPage, prevPage, canNextPage, canPrevPage.</li>
        </ul>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
