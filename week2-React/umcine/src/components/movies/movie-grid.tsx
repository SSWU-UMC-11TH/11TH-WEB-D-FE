import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
    movies: Movie[];
    onToggleBookmark: (movieId: number) => void;
}

function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
    return (
        <div className="grid grid-cols-1 gap-y-5 gap-x-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={onToggleBookmark}
                />
            ))}
        </div>
    );
}

export default MovieGrid;