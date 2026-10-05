import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieCard from "./movie-card";

export default function MovieGrid() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} onToggleBookmark={handleToggleBookmark} />
          </li>
        ))}
      </ul>
    </div>
  );
}
