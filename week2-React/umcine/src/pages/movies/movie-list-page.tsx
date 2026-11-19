import { useState } from "react";

import MovieGrid from "../../components/movies/movie-grid";

import { movies as initialMovies } from "../../data/movies";


export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  }

  return (
    <main className="px-[80px] py-6">
      <h1 className="mb-5 text-left font-[Pretendard,sans-serif] text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>

      <MovieGrid
        movies={movies}
        onToggleBookmark={handleToggleBookmark}
      />
    </main>
  );
}