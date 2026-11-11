
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { HTTPError } from "ky";

import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/common/pagination";
import { useBookmarkStore } from "../../stores/bookmark-store";

const MOVIES_PER_PAGE = 10;

// 임시 사용자 정보 (추후 사용자 API 연동)
const mockUser = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

export function ProfilePage() {
  const [page, setPage] = useState(1);

  // Zustand에 저장된 즐겨찾기 영화 ID
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds
  );

  const totalPages = Math.ceil(
    bookmarkedMovieIds.length / MOVIES_PER_PAGE
  );

  // 북마크 해제로 페이지 수가 줄어들면 현재 페이지 보정
  useEffect(() => {
    setPage((currentPage) =>
      Math.min(currentPage, Math.max(1, totalPages))
    );
  }, [totalPages]);

  // 현재 페이지에 해당하는 영화 ID
  const currentPage = Math.min(
    page,
    Math.max(1, totalPages)
  );

  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;

  const currentMovieIds = bookmarkedMovieIds.slice(
    startIndex,
    startIndex + MOVIES_PER_PAGE
  );

  // 기존 TMDB 영화 상세 조회 API 재사용
  const movieQueries = useQueries({
    queries: currentMovieIds.map((movieId) => ({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),

      // 존재하지 않는 영화(404)는 재시도하지 않음
      retry: (failureCount: number, error: Error) => {
        if (
          error instanceof HTTPError &&
          error.response.status === 404
        ) {
          return false;
        }

        return failureCount < 2;
      },
    })),
  });

  const isLoading = movieQueries.some(
    (query) => query.isPending
  );

  const isError =
    movieQueries.length > 0 &&
    movieQueries.every((query) => query.isError);

  const hasPartialError = movieQueries.some(
    (query) => query.isError
  );

  // 영화 상세 데이터를 MovieGrid에서 사용하는 타입으로 변환
  const movies: TmdbMovieListItem[] = movieQueries.flatMap(
    (query) => {
      if (!query.data) return [];

      const movie = query.data;

      return [
        {
          ...movie,
          genre_ids: movie.genres.map(
            (genre) => genre.id
          ),
        },
      ];
    }
  );

  return (
    <main className="min-h-full bg-[#F7F8FA] px-4 py-6 font-[Pretendard,sans-serif] sm:pl-[80px] sm:pr-4">
      <div className="mx-auto w-full max-w-[1280px]">

        {/* 내 정보 제목 및 정보 수정 버튼 */}
        <div className="mb-7 flex items-center justify-between">
          <h1 className="m-0 text-left text-[31px] font-bold leading-[37px] text-[#17191E]">
            내 정보
          </h1>

          <button
            type="button"
            className="flex h-[42px] shrink-0 items-center justify-center rounded-[8px] border-0 bg-[#2563EB] px-4 text-[14px] font-extrabold text-white"
          >
            정보 수정
          </button>
        </div>

        {/* 기본 정보 */}
        <section className="border-y border-[#E3E6EB] py-3">
          <h2 className="mb-4 mt-0 text-left text-[17px] font-bold leading-[20px] text-[#17191E]">
            기본 정보
          </h2>

          <div className="flex flex-wrap items-center gap-6">

            {/* 프로필 아이콘 */}
            <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="24"
                  cy="17"
                  r="8"
                  fill="#17191E"
                />
                <path
                  d="M8 40C8 31.2 15.2 26 24 26C32.8 26 40 31.2 40 40"
                  fill="#17191E"
                />
              </svg>
            </div>

            {/* 닉네임 및 이메일 */}
            <div className="grid w-full grid-cols-1 gap-6 sm:w-auto sm:grid-cols-2 sm:gap-x-6">

            {/* 닉네임 */}
            <div className="flex min-w-0 flex-col gap-[6px] sm:w-[366px]">
                <span className="m-0 text-left text-[11px] font-normal leading-[13px] text-[#969DA8]">
                    닉네임
                </span>

                <strong className="m-0 text-left text-[14px] font-bold leading-[17px] text-[#17191E]">
                    {mockUser.nickname}
                </strong>
            </div>

            {/* 이메일 */}
            <div className="flex min-w-0 flex-col gap-[6px] sm:w-[366px]">
                <span className="m-0 text-left text-[11px] font-normal leading-[13px] text-[#969DA8]">
                    이메일
                </span>

                <strong className="m-0 break-all text-left text-[14px] font-bold leading-[17px] text-[#17191E]">
                    {mockUser.email}
                </strong>
            </div>
            </div>
          </div>
        </section>

        {/* 내 즐겨찾기 */}
        <section className="mt-8">
          <h2 className="mb-5 mt-0 text-left text-[17px] font-bold leading-[20px] text-[#17191E]">
            내 즐겨찾기
          </h2>

          {/* 즐겨찾기한 영화가 없는 경우 */}
          {bookmarkedMovieIds.length === 0 ? (
            <p className="py-10 text-center text-[14px] text-[#969DA8]">
              아직 즐겨찾기한 영화가 없어요.
            </p>

          ) : isLoading ? (
            <p className="py-10 text-center text-[14px] text-[#969DA8]">
              즐겨찾기한 영화를 불러오는 중이에요.
            </p>

          ) : isError ? (
            <p className="py-10 text-center text-[14px] text-[#969DA8]">
              영화 정보를 불러오지 못했어요.
            </p>

          ) : (
            <>
              {/* 일부 영화 조회 실패 안내 */}
              {hasPartialError && (
                <p
                  role="status"
                  className="mb-4 text-left text-[13px] text-[#969DA8]"
                >
                  일부 영화 정보를 불러오지 못했어요.
                </p>
              )}

              {/* 기존 영화 카드 및 그리드 재사용 */}
              <MovieGrid movies={movies} />

              {/* 기존 공통 페이지네이션 재사용 */}
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
                ariaLabel="즐겨찾기 영화 페이지"
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
