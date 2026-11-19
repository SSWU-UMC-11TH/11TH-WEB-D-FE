export interface RatingResponse {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string | null;
}

export interface UpdateRatingRequest {
  score: number;
  comment: string | null;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
