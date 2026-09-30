import { useState } from 'react'
import MovieGrid from '../../components/movies/movie-grid'
import Pagination from '../../components/movies/pagination'
import { movies as initialMovies } from '../../data/movies'

export const MovieListPage = () => {
    const [movies, setMovies] = useState(initialMovies)

    const handleToggleBookmark = (movieId: number) => {
        setMovies((currentMovies) =>
            currentMovies.map((movie) =>
                movie.id === movieId
                    ? { ...movie, isBookmarked: !movie.isBookmarked }
                    : movie
            )
        )
    }

    return (
        <main className="main_wrap">
            <h1 className="main_title">영화 목록</h1>

            <MovieGrid
                movies={movies}
                onToggleBookmark={handleToggleBookmark}
            />

            <Pagination />
        </main>
    )
}