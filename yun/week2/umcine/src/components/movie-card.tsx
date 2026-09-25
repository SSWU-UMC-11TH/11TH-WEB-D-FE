import type { Movie } from '../types/movie'
import '../styles/movie-card.css'

interface MovieCardProps {
    movie: Movie
    onToggleBookmark: (movieId: number) => void
}

const MovieCard = ({ movie, onToggleBookmark }: MovieCardProps) => {
    return (
        <article className="movie_card">
            <div className="movie_poster_wrap">
                <img
                    className="movie_poster"
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                />

                <button
                    className={`bookmark_button ${movie.isBookmarked ? 'bookmark_active' : ''}`}
                    type="button"
                    onClick={() => onToggleBookmark(movie.id)}
                    aria-label={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
                    aria-pressed={movie.isBookmarked}
                >
                    <img
                        src={
                            movie.isBookmarked
                                ? '/icons/movie-icons/bookmark.svg'
                                : '/icons/movie-icons/bookmark-outline.svg'
                        }
                        alt=""
                    />
                </button>
            </div>

            <h2 className="movie_title">{movie.title}</h2>
            <p className="movie_date">{movie.releaseDate}</p>
        </article>
    )
}

export default MovieCard
