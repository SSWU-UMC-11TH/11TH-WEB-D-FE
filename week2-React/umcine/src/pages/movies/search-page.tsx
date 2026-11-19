
import {
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { useEffect, useState, type SubmitEvent } from "react";

import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  const navigate = useNavigate({
    from: "/search",
  });

  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery =
    query?.trim().toLowerCase() ?? "";

  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title
            .toLowerCase()
            .includes(normalizedQuery) ||
          movie.originalTitle
            .toLowerCase()
            .includes(normalizedQuery),
      )
    : [];

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery
        ? { query: nextQuery }
        : {},
    });
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-8 lg:px-16">
      <h1 className="mb-8 text-left font-[Pretendard,sans-serif] text-4xl font-bold text-[#17191e] sm:text-5xl">
        영화 검색
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 flex w-full max-w-[500px] gap-2"
      >
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#17191e] outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="shrink-0 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="text-left text-gray-500">
          검색어를 입력해 주세요.
        </p>
      ) : (
        <>
          <h2 className="mb-2 text-left text-2xl font-semibold text-[#17191e]">
            '{query}' 검색 결과
          </h2>

          <p className="mb-6 text-left text-gray-500">
            영화 {searchResults.length}편
          </p>

          {searchResults.length === 0 ? (
            <p className="text-left text-gray-500">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="grid grid-cols-1 justify-items-start gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="w-full max-w-[200px]"
                >
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="block text-left no-underline"
                  >
                    <img
                      className="mb-3 block h-[274px] w-full rounded-lg object-cover"
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                    />

                    <h3 className="mb-1 font-[Pretendard,sans-serif] text-[14px] font-extrabold text-[#17191e]">
                      {movie.title}
                    </h3>

                    <p className="mb-1 text-[12px] text-gray-500">
                      {movie.originalTitle}
                    </p>

                    <p className="mb-1 text-[12px] text-gray-500">
                      {movie.releaseDate}
                    </p>

                    <p className="line-clamp-3 text-[12px] leading-5 text-gray-600">
                      {movie.overview}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

