import type { Movie } from "../../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="poster">
        <img src={movie.posterPath} alt={movie.title} />
        <button
          className="bookmark-btn"
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크"}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>
      <p className="title">{movie.title}</p>
      <p>{movie.releaseDate}</p>
    </div>
  );
}
