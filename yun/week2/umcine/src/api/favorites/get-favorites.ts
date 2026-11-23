import { authApi } from "@/api/auth-api";

export function getFavorites() {
  return authApi.get("favorites").json<unknown>();
}
