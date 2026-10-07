import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );

  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

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

    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get("query") ?? "").trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main>
      <h1>영화 검색</h1>

      <form onSubmit={handleSubmit}>
        <input
          key={query ?? ""}
          name="query"
          aria-label="검색어"
          defaultValue={query ?? ""}
        />
        <button type="submit">검색</button>
      </form>

      {!normalizedQuery ? (
        <p>검색어를 입력해 주세요.</p>
      ) : (
        <>
          <h2>‘{query}’ 검색 결과</h2>
          <p>영화 {searchResults.length}편</p>

          {searchResults.length === 0 ? (
            <p>검색 결과가 없어요.</p>
          ) : (
            <ul>
              {searchResults.map((movie) => {
                const isBookmarked = bookmarkedMovieIds.includes(movie.id);

                return (
                  <li key={movie.id}>
                    <img src={movie.posterPath} alt={`${movie.title} 포스터`} />
                    <h3>{movie.title}</h3>
                    <p>{movie.originalTitle}</p>
                    <p>{movie.releaseDate}</p>
                    <p>{movie.overview}</p>

                    <button
                      type="button"
                      onClick={() => toggleBookmark(movie.id)}
                    >
                      {isBookmarked ? "북마크 해제" : "북마크 추가"}
                    </button>

                    <Link
                      to="/movies/$movieId"
                      params={{
                        movieId: String(movie.id),
                      }}
                    >
                      상세 보기
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
