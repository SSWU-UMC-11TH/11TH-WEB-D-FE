
type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  ariaLabel = "페이지 이동",
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const startPage = Math.floor((page - 1) / 5) * 5 + 1;

  const visiblePages = Array.from(
    { length: Math.min(5, Math.max(0, totalPages - startPage + 1)) },
    (_, index) => startPage + index
  );

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    onPageChange(nextPage);
  };

  return (
    <nav
      aria-label={ariaLabel}
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
        className="flex h-6 w-6 items-center justify-center disabled:cursor-not-allowed"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14.5 6L8.5 12L14.5 18"
            stroke={page === 1 ? "#D9E5FF" : "#606774"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => handlePageChange(pageNumber)}
            aria-current={page === pageNumber ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-[7px] font-[Pretendard,sans-serif] text-[13px] font-bold ${
              page === pageNumber
                ? "bg-[#17191E] text-white"
                : "bg-transparent text-[#606774]"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="다음 페이지"
        className="flex h-6 w-6 items-center justify-center disabled:cursor-not-allowed"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9.5 6L15.5 12L9.5 18"
            stroke={page >= totalPages ? "#D9E5FF" : "#606774"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
}
