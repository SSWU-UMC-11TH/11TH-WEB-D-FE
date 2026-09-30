import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import MovieCard from "./movie-card";
import "./movie-grid.css";

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
      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleBookmark={handleToggleBookmark}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
