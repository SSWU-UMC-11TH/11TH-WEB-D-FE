import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-gray-100 pb-16">
      <section className="relative h-90 overflow-hidden bg-black text-white">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/40" />

        <div className="relative mx-auto flex h-full max-w-325.25 flex-col px-4 py-6 sm:px-7.5">
          <Link
            to="/"
            className="flex w-fit items-center gap-1 text-xs font-bold"
          >
            <img
              src="/icons/chevron-left.svg"
              alt=""
              className="size-4 invert"
            />
            영화 목록
          </Link>

          <div className="mt-auto">
            <h1 className="text-4xl font-extrabold">{movie.title}</h1>
            <p className="mt-2 text-sm text-white/80">{movie.originalTitle}</p>
            <p className="mt-2 flex gap-3 text-xs font-bold">
              <span>{movie.releaseDate}</span>
              <span>{movie.genres.join(" · ")}</span>
              <span>{movie.runtime}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-325.25 flex-col gap-8 px-4 pt-6 sm:px-7.5 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6 sm:flex-row">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="aspect-2/3 w-45 shrink-0 rounded-lg object-cover shadow-xl"
          />
          <div>
            <h2 className="text-lg font-bold">{movie.tagline}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {movie.overview}
            </p>
            <BookmarkButton
              movieId={movie.id}
              className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white"
              label="즐겨찾기"
            />
          </div>
        </div>

        <aside className="border-gray-200 lg:w-75 lg:border-l lg:pl-4">
          <h2 className="text-lg font-bold">내 평점</h2>
          <p className="mt-1 text-xs text-gray-400">
            별점은 필수, 후기는 선택이에요.
          </p>
          <div className="mt-3 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                aria-label={`${score}점`}
                className="flex cursor-pointer rounded-md border border-gray-200 bg-white p-1.5"
              >
                <img src="/icons/star.svg" alt="" className="size-5" />
              </button>
            ))}
          </div>
          <textarea
            aria-label="후기"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-28 w-full resize-none rounded-md border border-gray-200 bg-white p-3 text-xs outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            className="mt-2 w-full cursor-pointer rounded-md bg-gray-900 py-3 text-sm font-bold text-white"
          >
            평점 저장
          </button>
        </aside>
      </div>
    </main>
  );
}
