import { Link } from '@tanstack/react-router'
import type { Movie } from '../../types/movie'
import { cn } from '../../utils/cn'

interface MovieCardProps {
    movie: Movie
    onToggleBookmark: (movieId: number) => void
}

const MovieCard = ({ movie, onToggleBookmark }: MovieCardProps) => {
    return (
        <article className="w-[241px]">
            <div className="relative w-[241px] aspect-[241/274] overflow-hidden rounded-[8px]">
                <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="block h-full w-full"
                >
                    <img
                        className="block h-full w-full object-cover"
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                    />
                </Link>

                <button
                    className={cn(
                        'absolute top-[7.5px] right-[6px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[8px] p-0',
                        movie.isBookmarked
                            ? 'border-0 bg-[#2563EB]'
                            : 'border border-white bg-[#17191E]',
                    )}
                    type="button"
                    onClick={() => onToggleBookmark(movie.id)}
                    aria-label={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
                    aria-pressed={movie.isBookmarked}
                >
                    <img
                        className="block h-[24px] w-[24px] brightness-0 invert"
                        src={
                            movie.isBookmarked
                                ? '/icons/movie-icons/bookmark.svg'
                                : '/icons/movie-icons/bookmark-outline.svg'
                        }
                        alt=""
                    />
                </button>
            </div>

            <h2 className="mt-[10px] mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-extrabold leading-[1.4]">
                {movie.title}
            </h2>

            <p className="m-0 text-[12px] font-normal leading-[1.4] text-[#969DA8]">
                {movie.releaseDate}
            </p>
        </article>
    )
}

export default MovieCard