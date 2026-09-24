import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
    return (
        <article>
            <img src={movie.posterPath} alt={movie.title} />

            <button type="button">
                {movie.isBookmarked ? "북마크됨" : "북마크"}
            </button>

            <h2>{movie.title}</h2>
            <p>{movie.releaseDate}</p>
        </article>
    );
}

export default MovieCard;