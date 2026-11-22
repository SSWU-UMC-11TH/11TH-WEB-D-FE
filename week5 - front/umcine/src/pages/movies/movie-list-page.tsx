import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";

export function MovieListPage() {
  
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
  let ignore = false;

  async function loadMovies() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getMovies();

      if (!ignore) {
        setMovies(response.results);
      }
    } catch (error) {
      if (!ignore) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "영화 목록을 불러오지 못했습니다."
        );
      }
    } finally {
      if (!ignore) {
        setIsLoading(false);
      }
    }
  }

  loadMovies();

  return () => {
    ignore = true;
  };
}, []);

  return (
    <main className="px-[80px] py-6">
      <h1 className="mb-5 text-left font-[Pretendard,sans-serif] text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>

      {isLoading ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
}