/* filepath: LAB 2/demo/PaginationDemo.jsx */
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
window.PaginationDemo = PaginationDemo;
