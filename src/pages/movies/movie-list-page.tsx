import "../../App.css";
import MovieGrid from "../../components/movies/movie-grid.tsx";

export default function MovieListPage() {
  return (
    <main>
      <section className="content">
        <div className="container">
          <h1>영화 목록</h1>
          <MovieGrid />
        </div>
      </section>
    </main>
  );
}
