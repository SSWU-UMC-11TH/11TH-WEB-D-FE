import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
    onToggleBookmark: (movieId: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
    return (
        <article>
            <img src={movie.posterPath} alt={movie.title} />

            <button type="button"
            onClick={() => onToggleBookmark(movie.id)}>
                {movie.isBookmarked ? "북마크됨" : "북마크"}
            </button>

            <h2>{movie.title}</h2>
            <p>{movie.releaseDate}</p>
        </article>
    );
}

export default MovieCard;