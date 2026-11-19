import { authApi } from "@/api/auth-api";
import type { ApiResponse, CreateRatingRequest, RatingResponse } from "./types";

export function createRating(body: CreateRatingRequest) {
  return authApi
    .post("ratings", { json: body })
    .json<ApiResponse<RatingResponse>>();
}
