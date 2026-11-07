import { Fragment } from "react";
import type { PaginationComponentProps } from "../props/PaginationComponentProps";

function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationComponentProps) {
  // With 197 pages we can't show them all: first, last, and the current page's neighbours
  const pages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav className="pagination" aria-label="Pages">
      {pages.map((page, index) => (
        <Fragment key={page}>
          {index > 0 && page - pages[index - 1] > 1 && <span>…</span>}
          <button
            type="button"
            className="pagination-button"
            aria-current={page === currentPage ? "page" : undefined}
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </Fragment>
      ))}
    </nav>
  );
}

export default PaginationComponent;
