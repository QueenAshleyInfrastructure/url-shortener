/* filepath: LAB 2/custom-hooks/usePagination.js */
function usePagination({ totalItems = 0, itemsPerPage = 10, initialPage = 1 }) {
  const { useState, useMemo, useCallback } = React;
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
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
  };
}
window.usePagination = usePagination;
