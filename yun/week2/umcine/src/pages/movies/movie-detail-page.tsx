import { Link, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useState, type FormEvent } from "react";
import { useCreateRatingMutation } from "@/hooks/use-create-rating-mutation";
import { useAuthStore } from "@/stores/auth-store";
import { updateRating } from "@/api/ratings/update-rating";
import { deleteRating } from "@/api/ratings/delete-rating";
import type { RatingResponse } from "@/api/ratings/types";
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

  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  const accessToken = useAuthStore((state) => state.accessToken);
  const createRatingMutation = useCreateRatingMutation();

  const [savedRating, setSavedRating] = useState<RatingResponse | null>(null);

  const currentRating =
    savedRating?.movieId === parsedMovieId ? savedRating : null;

  const updateRatingMutation = useMutation({
    mutationFn: updateRating,
  });

  const deleteRatingMutation = useMutation({
    mutationFn: deleteRating,
  });

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

  const handleCreateRating = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidMovieId || !accessToken || createRatingMutation.isPending) {
      return;
    }

    createRatingMutation.mutate(
      {
        movieId: parsedMovieId,
        score,
        comment: comment.trim() || null,
      },
      {
        onSuccess: (response) => {
          setSavedRating(response.result);
          setScore(response.result.score);
          setComment(response.result.comment ?? "");
          alert(response.message);
        },
        onError: () => {
          alert("평점 등록에 실패했어요. 다시 시도해 주세요.");
        },
      },
    );
  };

  const handleUpdateRating = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentRating || updateRatingMutation.isPending) return;

    updateRatingMutation.mutate(
      {
        ratingId: currentRating.ratingId,
        body: {
          score,
          comment: comment.trim() || null,
        },
      },
      {
        onSuccess: (response) => {
          setSavedRating(response.result);
          alert(response.message);
        },
        onError: () => {
          alert("평점 수정에 실패했어요.");
        },
      },
    );
  };

  const handleDeleteRating = () => {
    if (!currentRating || deleteRatingMutation.isPending) return;

    if (!window.confirm("평점을 삭제하시겠습니까?")) return;

    deleteRatingMutation.mutate(currentRating.ratingId, {
      onSuccess: (response) => {
        setSavedRating(null);
        setScore(5);
        setComment("");
        alert(response.message);
      },
      onError: () => {
        alert("평점 삭제에 실패했어요.");
      },
    });
  };

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

      {accessToken ? (
        <form
          onSubmit={currentRating ? handleUpdateRating : handleCreateRating}
          className="mt-8 flex max-w-[600px] flex-col gap-4"
        >
          <h2 className="text-[20px] font-bold">
            {currentRating ? "내 평점 수정" : "내 평점 등록"}
          </h2>

          <div className="flex items-center gap-3">
            <span>별점</span>

            <select
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="rounded-lg border border-gray-300 p-2"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}점
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            placeholder="영화에 대한 후기를 작성해 주세요."
            className="min-h-[120px] rounded-lg border border-gray-300 p-3"
          />

          <button
            type="submit"
            disabled={
              createRatingMutation.isPending ||
              updateRatingMutation.isPending ||
              deleteRatingMutation.isPending
            }
            className="rounded-lg bg-[#2563EB] px-5 py-3 font-bold text-white disabled:opacity-50"
          >
            {createRatingMutation.isPending || updateRatingMutation.isPending
              ? "저장 중"
              : currentRating
                ? "평점 수정"
                : "평점 등록"}
          </button>

          {currentRating && (
            <button
              type="button"
              onClick={handleDeleteRating}
              disabled={deleteRatingMutation.isPending}
              className="rounded-lg border border-gray-300 px-5 py-3 disabled:opacity-50"
            >
              {deleteRatingMutation.isPending ? "삭제 중" : "평점 삭제"}
            </button>
          )}
        </form>
      ) : (
        <p className="mt-8">
          평점을 등록하려면 <Link to="/login">로그인</Link>이 필요해요.
        </p>
      )}
    </main>
  );
}
