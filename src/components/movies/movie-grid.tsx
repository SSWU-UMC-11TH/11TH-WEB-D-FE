import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieCard from "./movie-card";
import { readBookmarkIds, saveBookmarkIds } from "../../utils/bookmark-storage";

export default function MovieGrid() {
  const [bookmarkIds, setBookmarkIds] = useState<number[]>(() =>
    readBookmarkIds(),
  );
  const [movies, setMovies] = useState(() =>
    initialMovies.map((movie) => ({
      ...movie,
      isBookmarked: readBookmarkIds().includes(movie.id),
    })),
  );

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) => {
      const updatedMovies = currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      );

      const nextBookmarkIds = updatedMovies
        .filter((movie) => movie.isBookmarked)
        .map((movie) => movie.id);

      setBookmarkIds(nextBookmarkIds);

      saveBookmarkIds(nextBookmarkIds);

      return updatedMovies;
    });
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              movie={movie}
              isBookmarked={bookmarkIds.includes(movie.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
