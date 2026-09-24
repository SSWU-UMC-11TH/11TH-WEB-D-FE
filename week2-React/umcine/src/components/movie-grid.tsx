import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
    movies: Movie[];
}

function MovieGrid({ movies }: MovieGridProps) {
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default MovieGrid;