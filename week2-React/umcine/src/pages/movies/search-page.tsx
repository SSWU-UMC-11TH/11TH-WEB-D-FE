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
    <main className="mx-auto max-w-[1200px] px-16 py-10">
      <h1 className="mb-8 text-5xl font-bold">
        영화 검색
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-10 flex gap-2"
      >
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value)
          }
          className="w-[400px] rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="text-gray-500">
          검색어를 입력해 주세요.
        </p>
      ) : (
        <>
          <h2 className="mb-2 text-2xl font-semibold">
            '{query}' 검색 결과
          </h2>

          <p className="mb-6 text-gray-500">
            영화 {searchResults.length}편
          </p>

          {searchResults.length === 0 ? (
            <p className="text-gray-500">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="grid grid-cols-3 gap-x-5 gap-y-10">
              {searchResults.map((movie) => (
                <li key={movie.id}>
                    <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                    >
                        <img
                        className="mb-3 aspect-[2/3] w-full rounded-lg object-cover"
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        />

                        <h3 className="mb-1 text-lg font-semibold">
                        {movie.title}
                        </h3>

                        <p className="mb-1 text-sm text-gray-500">
                        {movie.originalTitle}
                        </p>

                        <p className="mb-1 text-sm text-gray-500">
                        {movie.releaseDate}
                        </p>

                        <p className="text-sm text-gray-600">
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