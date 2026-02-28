const { useState, useEffect, useRef } = React;

function AdvancedCounter() {
  const [count, setCount] = useState(() => {
    try {
      const v = localStorage.getItem('advanced-counter-count');
      return v !== null ? parseInt(v, 10) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [history, setHistory] = useState(() => {
    try {
      const v = localStorage.getItem('advanced-counter-history');
      return v ? JSON.parse(v) : [0];
    } catch (e) {
      return [0];
    }
  });
  const [step, setStep] = useState(1);
  const [savedMessage, setSavedMessage] = useState('');

  const saveTimerRef = useRef(null);

  // Track history when count changes
  useEffect(() => {
    setHistory((prev) => {
      // Only add last value if it's different than last
      if (prev.length === 0 || prev[prev.length - 1] !== count) {
        return [...prev, count];
      }
      return prev;
    });
  }, [count]);

  // Auto-save with cleanup to avoid race conditions
  useEffect(() => {
    // Clear any pending timer
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    // Simulate async save with small timeout
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem('advanced-counter-count', String(count));
        localStorage.setItem('advanced-counter-history', JSON.stringify(history));
        setSavedMessage('Changes saved.');
        // Clear message after a short moment
        setTimeout(() => setSavedMessage(''), 1500);
      } catch (e) {
        // ignore
      }
    }, 300);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [count, history]);

  // Keyboard listeners
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowUp') {
        setCount((c) => c + Number(step));
      } else if (e.key === 'ArrowDown') {
        setCount((c) => c - Number(step));
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [step]);

  function increment() {
    setCount((c) => c + Number(step));
  }
  function decrement() {
    setCount((c) => c - Number(step));
  }
  function resetAll() {
    setCount(0);
    setHistory([0]);
    try {
      localStorage.removeItem('advanced-counter-count');
      localStorage.removeItem('advanced-counter-history');
    } catch (e) {}
  }

  return (
    <div className="card">
      <h2>Counter</h2>
      <div className="count">Current Count: <span className="count-value">{count}</span></div>

      <div className="controls">
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
        <button className="reset" onClick={resetAll}>Reset</button>
      </div>

      <div className="step">
        <label>
          Step Value:
          <input
            type="number"
            min="1"
            value={step}
            onChange={(e) => setStep(Number(e.target.value || 1))}
          />
        </label>
      </div>

      <div className="saved">{savedMessage}</div>

      <div className="history">
        <h3>Count History:</h3>
        <div className="history-list">
          {history && history.length > 0 ? history.join(', ') : '—'}
        </div>
      </div>

      <div className="hint">Use ArrowUp to increment and ArrowDown to decrement.</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdvancedCounter />);
