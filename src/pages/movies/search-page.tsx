import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearchText(query ?? "");
  }

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main
      className={cn(
        "min-h-[calc(100vh-91px)] bg-gray-100",
        normalizedQuery ? "pt-6 pb-16" : "pt-32",
      )}
    >
      <div className="mx-auto max-w-325.25 px-4 sm:px-7.5">
        <h1
          className={cn(
            "text-3xl font-extrabold",
            normalizedQuery ? "text-left" : "text-center",
          )}
        >
          {normalizedQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className={cn(
            "flex items-center gap-2 bg-white py-2 pl-4 pr-2",
            normalizedQuery
              ? "mt-5 rounded-lg border border-gray-200"
              : "mx-auto mt-8 max-w-lg rounded-xl border-2 border-black shadow-lg",
          )}
        >
          <img src="/icons/search.svg" alt="" className="size-5" />
          <input
            aria-label="검색어"
            placeholder="예: 스파이더맨"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="flex-1 py-1 text-sm font-medium outline-none placeholder:font-normal placeholder:text-gray-400"
          />
          {searchText && (
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => setSearchText("")}
              className="flex cursor-pointer p-1"
            >
              <img src="/icons/close.svg" alt="" className="size-5" />
            </button>
          )}
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-black px-3 py-2 text-xs font-bold text-white"
          >
            {normalizedQuery ? "다시 검색" : "검색"}
          </button>
        </form>

        {normalizedQuery && (
          <section className="mt-6">
            <div className="flex items-end justify-between border-b border-gray-200 pb-3">
              <h2 className="text-base font-bold">‘{query}’ 검색 결과</h2>
              <p className="text-xs text-gray-400">
                영화 {searchResults.length}편
              </p>
            </div>
            {searchResults.length === 0 ? (
              <p className="py-16 text-center text-sm text-gray-500">
                검색 결과가 없어요.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex gap-6 border-b border-gray-200 py-3.5"
                  >
                    <img
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                      className="h-30 w-20 shrink-0 rounded-md object-cover"
                    />
                    <div className="flex min-w-0 flex-col">
                      <h3 className="text-lg font-bold">{movie.title}</h3>
                      <p className="mt-1 text-xs text-gray-400">
                        {movie.originalTitle}
                        <span className="ml-2">{movie.releaseDate}</span>
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
                        {movie.overview}
                      </p>
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="mt-auto pt-2 text-xs font-bold text-blue-600"
                      >
                        상세 보기 →
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
