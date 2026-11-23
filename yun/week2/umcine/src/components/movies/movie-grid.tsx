import type { Movie } from '../../types/movie'
import MovieCard from './movie-card'

interface MovieGridProps {
    movies: Movie[]
    onToggleBookmark: (movieId: number) => void
}

const MovieGrid = ({ movies, onToggleBookmark }: MovieGridProps) => {
    return (
        <section className="grid w-full grid-cols-[repeat(5,minmax(241px,1fr))] gap-x-[18px] gap-y-[20px]">
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