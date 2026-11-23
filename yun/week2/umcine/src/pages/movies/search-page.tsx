import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import { searchMovies } from "../../api/movies/search-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [completedQuery, setCompletedQuery] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );

  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const normalizedQuery = query?.trim() ?? "";
  const isLoading = !!normalizedQuery && completedQuery !== normalizedQuery;

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = query?.trim() ?? "";

    if (!normalizedQuery) {
      return;
    }

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) {
          setMovies(response.results);
          setErrorMessage(null);
        }
      })
      .catch(() => {
        if (!ignore) {
          setMovies([]);
          setErrorMessage("검색 결과를 불러오지 못했어요.");
        }
      })
      .finally(() => {
        if (!ignore) {
          setCompletedQuery(normalizedQuery);
        }
      });

    return () => {
      ignore = true;
    };
  }, [query]);

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

          {isLoading ? (
            <p>검색 결과를 불러오는 중이에요.</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : movies.length === 0 ? (
            <p>검색 결과가 없어요.</p>
          ) : (
            <>
              <p>영화 {movies.length}편</p>

              <ul>
                {movies.map((movie) => {
                  const isBookmarked = bookmarkedMovieIds.includes(movie.id);
                  const posterUrl = getTmdbPosterUrl(movie.poster_path);

                  return (
                    <li key={movie.id}>
                      <div className="aspect-[2/3] w-[160px] overflow-hidden">
                        {posterUrl ? (
                          <img
                            className="h-full w-full object-cover"
                            src={posterUrl}
                            alt={`${movie.title} 포스터`}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-500">
                            이미지 없음
                          </div>
                        )}
                      </div>

                      <h3>{movie.title}</h3>
                      <p>{movie.original_title}</p>
                      <p>{movie.release_date}</p>
                      <p>{movie.overview}</p>

                      <button
                        type="button"
                        onClick={() => toggleBookmark(movie.id)}
                      >
                        {isBookmarked ? "북마크 해제" : "북마크 추가"}
                      </button>

                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                      >
                        상세 보기
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
}
