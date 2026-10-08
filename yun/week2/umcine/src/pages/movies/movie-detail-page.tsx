import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );

  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  const isBookmarked = bookmarkedMovieIds.includes(movie.id);

  return (
    <main>
      <img src={movie.backdropPath} alt="" aria-hidden="true" />

      <Link to="/">영화 목록</Link>

      <img src={movie.posterPath} alt={`${movie.title} 포스터`} />

      <h1>{movie.title}</h1>
      <p>{movie.originalTitle}</p>
      <p>{movie.releaseDate}</p>
      <p>{movie.genres.join(" · ")}</p>
      <p>{movie.runtime}</p>

      <button type="button" onClick={() => toggleBookmark(movie.id)}>
        {isBookmarked ? "북마크 해제" : "북마크 추가"}
      </button>

      <h2>{movie.tagline}</h2>
      <p>{movie.overview}</p>
    </main>
  );
}
