
import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
    movie: TmdbMovieListItem;
}

function MovieCard({ movie }: MovieCardProps) {
    const posterUrl = getTmdbPosterUrl(movie.poster_path);

    return (
        <article>
            <div className="relative">
                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="block"
                >
                    {posterUrl ? (
                        <img
                            className="block h-[274px] w-full rounded-lg object-cover"
                            src={posterUrl}
                            alt={movie.title}
                        />
                    ) : (
                        <div className="flex h-[274px] w-full items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500">
                            이미지 없음
                        </div>
                    )}
                </Link>

                <BookmarkButton movieId={movie.id} />
            </div>

            <h2 className="mb-1 mt-2 text-left font-[Pretendard,sans-serif] text-[14px] font-extrabold">
                {movie.title}
            </h2>

            <p className="m-0 text-left text-[12px] text-gray-500">
                {movie.release_date}
            </p>
        </article>
    );
}

export default MovieCard;
