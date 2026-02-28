/* filepath: LAB 2/demo/DebounceSearchDemo.jsx */
function DebounceSearchDemo() {
  const { useState, useEffect } = React;
  const [input, setInput] = useState('');
  const [delay, setDelay] = useState(500);
  const debounced = useDebounce(input, Number(delay));

  useEffect(() => {
    if (debounced !== '') {
      // simulated API call
      console.log('Searching for:', debounced);
    }
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
window.DebounceSearchDemo = DebounceSearchDemo;
