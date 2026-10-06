import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
  isBookmarked: boolean;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie }: MovieCardProps) {
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
        <BookmarkButton
          movieId={movie.id}
          className={cn(
            "absolute right-2 top-2 flex cursor-pointer rounded-full p-2 text-white",
          )}
        />
      </div>
      <p className="font-extrabold">{movie.title}</p>
      <p>{movie.releaseDate}</p>
    </div>
  );
}
