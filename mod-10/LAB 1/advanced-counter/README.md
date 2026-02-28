Advanced Counter - Lab 1 (React + useEffect)

How to run:
1. Open mod-10/LAB 1/advanced-counter/index.html in a browser. No build step required.
   Or run a simple static server in that folder:
   - Python 3:
     python3 -m http.server 5173
     then open http://localhost:5173 in your browser.

Features implemented:
- Display current count (initial 0 or value from localStorage)
- Increment / Decrement buttons
- Keyboard ArrowUp / ArrowDown listeners
- History tracking (adds each new count to history)
- Auto-save to localStorage with cleanup (debounced simulated save)
- Reset button clears count, history, and localStorage
- Step input to change increment/decrement step

Notes:
- This uses React + Babel via CDN for quick local testing without a bundler.
- For production or a submission that needs compiled code, we can scaffold a Vite React app next.