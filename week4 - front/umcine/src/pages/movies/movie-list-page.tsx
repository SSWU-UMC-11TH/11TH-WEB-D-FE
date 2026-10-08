import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="px-[80px] py-6">
      <h1 className="mb-5 text-left font-[Pretendard,sans-serif] text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191e]">
        영화 목록
      </h1>

      <MovieGrid movies={movies} />
    </main>
  );
}