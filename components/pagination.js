import Link from 'next/link';

// Numbered pager: Previous | 1 | 2 | ... | N | Next. Hidden when one page.
export default function Pagination({ currentPage, totalPages, basePath }) {

  if (totalPages <= 1) return null;

  const pageHref = (p) => (p === 1 ? basePath : `${ basePath }/page/${ p }`);

  // page numbers to show: all if <= 7, else windowed with ellipsis
  let pages = [];
  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const set = new Set([1, 2, totalPages - 1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
    pages = [...set].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  }

  const items = [];
  let prev = 0;
  for (const p of pages) {
    if (p - prev > 1) items.push('…');
    items.push(p);
    prev = p;
  }

  return (

    <nav className="pagination" aria-label="Pagination">

      {currentPage > 1 ? (
        <Link href={ pageHref(currentPage - 1) }><a className="pagination-prev">Previous</a></Link>
      ) : (
        <span className="pagination-prev pagination-disabled">Previous</span>
      )}

      {items.map((it, i) =>
        it === '…' ? (
          <span key={ `e${ i }` } className="pagination-ellipsis">…</span>
        ) : it === currentPage ? (
          <span key={ it } className="pagination-current" aria-current="page">{ it }</span>
        ) : (
          <Link key={ it } href={ pageHref(it) }><a className="pagination-page">{ it }</a></Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link href={ pageHref(currentPage + 1) }><a className="pagination-next">Next</a></Link>
      ) : (
        <span className="pagination-next pagination-disabled">Next</span>
      )}

    </nav>

  );

}
