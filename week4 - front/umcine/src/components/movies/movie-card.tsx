import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
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

                <BookmarkButton movieId={movie.id} />
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