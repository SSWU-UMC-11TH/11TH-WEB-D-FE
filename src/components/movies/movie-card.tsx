import { Link } from "@tanstack/react-router";
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
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img src={movie.posterPath} alt={movie.title} />
        </Link>
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
