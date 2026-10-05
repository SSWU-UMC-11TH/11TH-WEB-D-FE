import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="h-79.5 w-full">
      <div className="relative h-68.5 w-60.25">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block size-full"
        >
          <img
            className="block size-full rounded-xl object-cover"
            src={movie.posterPath}
            alt={movie.title}
          />
        </Link>
        <button
          className={cn(
            "absolute right-2 top-2 flex cursor-pointer rounded-full p-2 text-white",
            movie.isBookmarked ? "bg-blue-600" : "bg-black/60",
          )}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크"}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            className="size-6"
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>
      <p className="font-extrabold">{movie.title}</p>
      <p>{movie.releaseDate}</p>
    </div>
  );
}
