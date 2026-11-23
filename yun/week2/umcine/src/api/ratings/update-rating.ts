import { authApi } from "@/api/auth-api";
import type { ApiResponse, RatingResponse, UpdateRatingRequest } from "./types";

interface UpdateRatingParams {
  ratingId: number;
  body: UpdateRatingRequest;
}

export function updateRating({ ratingId, body }: UpdateRatingParams) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<ApiResponse<RatingResponse>>();
}
