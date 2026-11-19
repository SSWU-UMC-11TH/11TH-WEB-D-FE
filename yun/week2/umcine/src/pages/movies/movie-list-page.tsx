import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export const MovieListPage = () => {
  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page: 1 }],
    queryFn: () => getMovies({ page: 1 }),
  });

  const movies = moviesQuery.data?.results ?? [];

  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );

  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const moviesWithBookmark = movies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <main className="main_wrap">
      <h1 className="main_title">영화 목록</h1>

      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p>영화 목록을 불러오지 못했어요.</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid
            movies={moviesWithBookmark}
            onToggleBookmark={toggleBookmark}
          />
          <Pagination />
        </>
      )}
    </main>
  );
};
