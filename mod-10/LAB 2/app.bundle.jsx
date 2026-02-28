/* Combined script so Babel runs everything in order (avoids async load race). */

function useDebounce(value, delay = 500) {
  const { useState, useEffect } = React;
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debouncedValue;
}

function usePagination({ totalItems = 0, itemsPerPage = 10, initialPage = 1 }) {
  const { useState, useCallback } = React;
  const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, itemsPerPage)));
  const clamp = (n) => Math.max(1, Math.min(n, totalPages));
  const [currentPage, setCurrentPage] = useState(clamp(initialPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(totalItems - 1, startIndex + itemsPerPage - 1);
  const itemsOnCurrentPage = Math.max(0, Math.min(itemsPerPage, totalItems - startIndex));
  const setPage = useCallback((pageNumber) => setCurrentPage((_) => clamp(pageNumber)), [totalPages, itemsPerPage, totalItems]);
  const nextPage = useCallback(() => setCurrentPage((p) => clamp(p + 1)), [totalPages]);
  const prevPage = useCallback(() => setCurrentPage((p) => clamp(p - 1)), [totalPages]);
  return {
    currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage,
    setPage, nextPage, prevPage,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
  };
}

function DebounceSearchDemo() {
  const { useState, useEffect } = React;
  const [input, setInput] = useState('');
  const [delay, setDelay] = useState(500);
  const debounced = useDebounce(input, Number(delay));
  useEffect(() => {
    if (debounced !== '') console.log('Searching for:', debounced);
  }, [debounced]);
  return (
    <div className="card" style={{width: '420px'}}>
      <h2>Debounce Search Demo</h2>
      <div className="row">
        <label className="small">Debounce Delay (ms):
          <input className="input" type="number" min="0" value={delay} onChange={(e)=>setDelay(Number(e.target.value||0))} style={{width:100, marginLeft:12}}/>
        </label>
      </div>
      <div style={{marginTop:12}}>
        <input className="input" placeholder="Type to search..." value={input} onChange={(e)=>setInput(e.target.value)} />
      </div>
      <div style={{marginTop:12}}>
        <div className="small">Current Input:</div>
        <div style={{fontWeight:600}}>{input || <span className="small">—</span>}</div>
        <div style={{marginTop:8}} className="small">Debounced Value (after {delay}ms):</div>
        <div style={{fontStyle:'italic', fontWeight:600}}>{debounced || <span className="small">—</span>}</div>
        <div style={{marginTop:10}} className="small">Simulated Search Results: <span className="small">Type to see results (console).</span></div>
      </div>
    </div>
  );
}

function PaginationDemo() {
  const { useState, useMemo } = React;
  const totalItems = 123;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const hook = usePagination({ totalItems, itemsPerPage, initialPage: 1 });
  const items = useMemo(() => Array.from({length: totalItems}, (_,i) => `Item ${i+1}`), [totalItems]);
  const visible = items.slice(hook.startIndex, hook.startIndex + hook.itemsOnCurrentPage);
  return (
    <div className="card" style={{width:'420px'}}>
      <h2>Pagination Demo</h2>
      <div className="row">
        <label className="small">Items per page:
          <select value={itemsPerPage} onChange={(e)=>setItemsPerPage(Number(e.target.value||10))} style={{marginLeft:8}}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
        <div className="small">Total Items: {totalItems}</div>
      </div>
      <ol className="list">
        {visible.map((it, idx) => <li key={idx}>{it}</li>)}
      </ol>
      <div className="row" style={{marginTop:6}}>
        <button className="btn" onClick={hook.prevPage} disabled={!hook.canPrevPage}>Previous</button>
        <div className="small">Page {hook.currentPage} of {hook.totalPages}</div>
        <button className="btn" onClick={hook.nextPage} disabled={!hook.canNextPage}>Next</button>
      </div>
      <div className="pager">
        {Array.from({length:hook.totalPages},(_,i)=>i+1).slice(0,50).map(n => (
          <div key={n} className={`page-num ${n===hook.currentPage ? 'active':''}`} onClick={()=>hook.setPage(n)}>{n}</div>
        ))}
      </div>
      <div className="small" style={{marginTop:8}}>Showing items {hook.startIndex+1} - {hook.startIndex + hook.itemsOnCurrentPage} (Total on this page: {hook.itemsOnCurrentPage})</div>
    </div>
  );
}

const App = () => (
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
        <li>usePagination(&#123;totalItems, itemsPerPage, initialPage&#125;) — returns currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage, setPage, nextPage, prevPage, canNextPage, canPrevPage.</li>
      </ul>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
