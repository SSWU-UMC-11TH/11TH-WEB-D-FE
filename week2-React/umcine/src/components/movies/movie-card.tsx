import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (movieId: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
    return (
        <article>
            <div className="relative">
                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="block"
                >
                    <img
                        className="block h-[274px] w-full rounded-lg object-cover"
                        src={movie.posterPath}
                        alt={movie.title}
                    />
                </Link>

                <button
                    className={cn(
                        "absolute right-3 top-3 flex size-[34px] cursor-pointer items-center justify-center rounded-lg p-0",
                        movie.isBookmarked
                            ? "border-0 bg-[#2563eb]"
                            : "border border-white bg-[rgba(17,24,39,0.8)]"
                    )}
                    type="button"
                    onClick={() => onToggleBookmark(movie.id)}
                    aria-label={`${movie.title} ${
                        movie.isBookmarked
                            ? "북마크 삭제"
                            : "북마크 추가"
                    }`}
                    aria-pressed={movie.isBookmarked}
                >
                    <img
                        className="size-6 brightness-0 invert"
                        src={
                            movie.isBookmarked
                                ? "/icons/bookmark.svg"
                                : "/icons/bookmark-outline.svg"
                        }
                        alt=""
                    />
                </button>
            </div>

                <h2 className="mb-1 mt-2 text-left font-[Pretendard,sans-serif] text-[14px] font-extrabold">
        {movie.title}
                </h2>

            <p className="m-0 text-left text-[12px] text-gray-500">
                {movie.releaseDate}
            </p>
        </article>
    );
}

export default MovieCard;