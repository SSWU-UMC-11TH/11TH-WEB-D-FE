import { Link, useParams } from "@tanstack/react-router";

import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({
    from: "/movies/$movieId",
  });

  const movie = movies.find(
    (item) => item.id === Number(movieId),
  );

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  return (
    <main className="w-full bg-[#f7f8fa]">
      {/* 상단 Hero */}
      <section className="relative h-[360px] w-full overflow-hidden">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

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
            {movie.originalTitle}
          </p>

          <div className="flex items-center gap-[8px] font-[Pretendard,sans-serif] text-[13px]">
            <span>{movie.releaseDate}</span>
            <span>·</span>
            <span>{movie.genres.join(" · ")}</span>
            <span>·</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
      </section>

      {/* 상세 정보 */}
      <section className="grid w-full grid-cols-[200px_656px_1fr] gap-x-[32px] px-[80px] pt-[20px]">
        {/* 포스터 */}
        <div>
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-[286px] w-[200px] rounded-[8px] object-cover"
          />
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
            별점을 클릭하고, 후기도 선택이에요.
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