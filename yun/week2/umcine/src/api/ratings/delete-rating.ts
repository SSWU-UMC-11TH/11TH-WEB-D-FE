import { authApi } from "@/api/auth-api";
import type { ApiResponse } from "./types";

export function deleteRating(ratingId: number) {
  return authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
}
