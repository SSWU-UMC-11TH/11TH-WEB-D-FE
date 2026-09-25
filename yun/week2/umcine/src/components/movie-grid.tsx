import type { Movie } from '../types/movie'
import MovieCard from './movie-card'
import '../styles/movie-grid.css'

interface MovieGridProps {
    movies: Movie[]
    onToggleBookmark: (movieId: number) => void
}

const MovieGrid = ({ movies, onToggleBookmark }: MovieGridProps) => {
    return (
        <section className="movie_grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onToggleBookmark={onToggleBookmark}
                />
            ))}
        </section>
    )
}

export default MovieGrid
