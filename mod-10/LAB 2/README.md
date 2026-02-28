Lab 2 — Custom Hooks Implementation

How to run:
1. Open index.html in the LAB 2 folder in your browser.
2. Or run a simple server:
   cd "/Users/ashleyhenderson/Desktop/2025-RTT-74/mod-10/LAB 2"
   python3 -m http.server 5174
   Then open http://localhost:5174

What is implemented:
- useDebounce hook in custom-hooks/useDebounce.js
  * Inputs: value, delay (ms)
  * Returns: debounced value after delay, with cleanup
- usePagination hook in custom-hooks/usePagination.js
  * Inputs: totalItems, itemsPerPage, initialPage
  * Returns: currentPage, totalPages, startIndex, endIndex, itemsOnCurrentPage, setPage, nextPage, prevPage, canNextPage, canPrevPage
- Demo components:
  * demo/DebounceSearchDemo.jsx
  * demo/PaginationDemo.jsx

Notes:
- Hooks are implemented for direct use by components loaded in the browser via Babel.
- For production or submission, convert to a module-based (Vite/CRA) app and add TypeScript if required.
