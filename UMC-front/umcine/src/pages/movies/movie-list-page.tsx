
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  // 현재 페이지를 기준으로 5개 페이지 번호 표시
  const startPage = Math.floor((page - 1) / 5) * 5 + 1;

  const visiblePages = Array.from(
    { length: Math.min(5, Math.max(0, totalPages - startPage + 1)) },
    (_, index) => startPage + index
  );

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  return (
    <main className="px-[80px] py-6">
      <h1 className="mb-5 text-left font-[Pretendard,sans-serif] text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>

      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p>{moviesQuery.error.message}</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} />

          <nav
            aria-label="영화 목록 페이지"
            className="mt-8 flex items-center justify-center gap-4"
          >
            {/* 이전 페이지 */}
            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              aria-label="이전 페이지"
              className="flex h-6 w-6 items-center justify-center disabled:cursor-not-allowed"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14.5 6L8.5 12L14.5 18"
                  stroke={page === 1 ? "#D9E5FF" : "#606774"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 페이지 번호 */}
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

            {/* 다음 페이지 */}
            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="다음 페이지"
              className="flex h-6 w-6 items-center justify-center disabled:cursor-not-allowed"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
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
        </>
      )}
    </main>
  );
}
