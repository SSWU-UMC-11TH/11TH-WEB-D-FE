import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";

import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";

import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({
    from: "/movies/$movieId",
  });

  const parsedMovieId = Number(movieId);

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
  useEffect(() => {
    let ignore = false;

    async function loadMovie() {
      setMovie(null);
      setErrorMessage(null);

      // 영화 ID 유효성 검사
      if (
        !Number.isInteger(parsedMovieId) ||
        parsedMovieId <= 0
      ) {
        setIsLoading(false);
        setErrorMessage("올바르지 않은 영화 번호예요.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await getMovieDetail(parsedMovieId);

        if (!ignore) {
          setMovie(response);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(
            getMovieDetailErrorMessage(error)
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [parsedMovieId]);


  if (isLoading) {
    return <main>영화 상세 정보를 불러오는 중이에요.</main>;
  }

  if (errorMessage) {
    return <main>{errorMessage}</main>;
  }

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main className="w-full bg-[#f7f8fa]">
      {/* 상단 Hero */}
      <section className="relative h-[360px] w-full overflow-hidden">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
            이미지 없음
          </div>
        )}

        {/* 배경 위 어두운 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

        {/* 영화 목록으로 돌아가기 */}
        <Link
          to="/"
          className="absolute left-[80px] top-[32px] font-[Pretendard,sans-serif] text-[14px] text-white no-underline"
        >
          ← 영화 목록
        </Link>

        {/* 영화 기본 정보 */}
        <div className="absolute bottom-[24px] left-[80px] flex h-[99px] w-[800px] flex-col justify-end gap-[8px] text-left text-white">
          <h1 className="m-0 font-[Pretendard,sans-serif] text-[40px] font-bold leading-none text-white">
            {movie.title}
          </h1>

          <p className="m-0 font-[Pretendard,sans-serif] text-[14px]">
            {movie.original_title}
          </p>

          <div className="flex items-center gap-[8px] font-[Pretendard,sans-serif] text-[13px]">
            <span>{movie.release_date}</span>
            <span>·</span>
            <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            <span>·</span>
            <span>
              {movie.runtime !== null
                ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                : "상영 시간 정보가 없어요."}
            </span>
          </div>
        </div>
      </section>

      {/* 상세 정보 */}
      <section className="grid w-full grid-cols-[200px_656px_1fr] gap-x-[32px] px-[80px] pt-[20px]">
        {/* 포스터 */}
        <div>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="h-[286px] w-[200px] rounded-[8px] object-cover"
            />
          ) : (
            <div className="flex h-[286px] w-[200px] items-center justify-center rounded-[8px] bg-gray-200 text-sm text-gray-500">
              이미지 없음
            </div>
          )}
        </div>

        {/* 줄거리 */}
        <section className="flex h-[163px] w-[656px] flex-col items-start gap-[12px] text-left">
          <h2 className="m-0 font-[Pretendard,sans-serif] text-[22px] font-bold text-[#17191e]">
            {movie.tagline}
          </h2>

          <p className="m-0 font-[Pretendard,sans-serif] text-[14px] leading-[22px] text-[#606774]">
            {movie.overview}
          </p>

          <BookmarkButton
            movieId={movie.id}
            variant="detail" />
        </section>

        {/* 내 평점 */}
        <section className="border-l border-[#e3e6eb] pl-[32px] text-left">
          <h2 className="m-0 font-[Pretendard,sans-serif] text-[20px] font-bold text-[#17191e]">
            내 평점
          </h2>

          <p className="mt-[8px] font-[Pretendard,sans-serif] text-[12px] text-[#969da8]">
            별점은 필수, 후기도 선택이에요.
          </p>

          <div className="mt-[10px] flex gap-[8px]">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[8px] border border-[#e3e6eb] bg-white text-[22px] text-[#606774]"
                aria-label={`${score}점`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-[12px] h-[100px] w-full resize-none rounded-[8px] border border-[#e3e6eb] bg-white p-[14px] font-[Pretendard,sans-serif] text-[13px] outline-none placeholder:text-[#969da8]"
          />

          <button
            type="button"
            className="mt-[10px] h-[42px] w-full rounded-[8px] border-0 bg-[#17191e] font-[Pretendard,sans-serif] text-[13px] font-semibold text-white"
          >
            평점 저장
          </button>
        </section>
      </section>
    </main>
  );
}