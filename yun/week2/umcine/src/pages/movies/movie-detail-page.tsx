import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import {
  getTmdbPosterUrl,
  getTmdbBackdropUrl,
} from "../../utils/movies/tmdb-image";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });

  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", parsedMovieId],
    queryFn: () => getMovieDetail(parsedMovieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
  });

  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );

  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  if (!isValidMovieId) {
    return <main>올바르지 않은 영화 번호예요.</main>;
  }

  if (movieDetailQuery.isPending) {
    return <main>영화 정보를 불러오는 중이에요.</main>;
  }

  if (movieDetailQuery.isError) {
    return <main>{getMovieDetailErrorMessage(movieDetailQuery.error)}</main>;
  }

  const movie = movieDetailQuery.data;

  const isBookmarked = bookmarkedMovieIds.includes(movie.id);

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  const genres = movie.genres.map((genre) => genre.name).join(", ");

  const runtime =
    movie.runtime !== null
      ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
      : "상영 시간 정보가 없어요.";

  return (
    <main>
      <div className="aspect-video w-full overflow-hidden">
        {backdropUrl ? (
          <img
            className="h-full w-full object-cover"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-500">
            이미지 없음
          </div>
        )}
      </div>

      <Link to="/">영화 목록</Link>

      <div className="aspect-[2/3] w-[200px] overflow-hidden">
        {posterUrl ? (
          <img
            className="h-full w-full object-cover"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-500">
            이미지 없음
          </div>
        )}
      </div>

      <h1>{movie.title}</h1>
      <p>{movie.original_title}</p>
      <p>{movie.release_date}</p>
      <p>{genres}</p>
      <p>{runtime}</p>

      <button type="button" onClick={() => toggleBookmark(movie.id)}>
        {isBookmarked ? "북마크 해제" : "북마크 추가"}
      </button>

      <h2>{movie.tagline}</h2>
      <p>{movie.overview}</p>
    </main>
  );
}
