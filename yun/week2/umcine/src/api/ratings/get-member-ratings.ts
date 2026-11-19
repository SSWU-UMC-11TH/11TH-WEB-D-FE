import { authApi } from "@/api/auth-api";
import type { RatingResponse } from "./types";

export function getMemberRatings(memberId: number) {
  return authApi.get(`members/${memberId}/ratings`).json<RatingResponse[]>();
}
