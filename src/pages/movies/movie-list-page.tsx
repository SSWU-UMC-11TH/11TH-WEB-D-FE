import MovieGrid from "../../components/movies/movie-grid.tsx";

export default function MovieListPage() {
  return (
    <main>
      <section className="min-h-296.25 rounded-2xl bg-[#f6f7f9] px-20 py-6">
        <div className="mx-auto max-w-325.25">
          <h1 className="text-5xl font-extrabold tracking-[-3px]">영화 목록</h1>
          <MovieGrid />
        </div>
      </section>
    </main>
  );
}
