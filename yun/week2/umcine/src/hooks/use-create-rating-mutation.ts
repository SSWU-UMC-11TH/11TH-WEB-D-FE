import { useMutation } from "@tanstack/react-query";
import { createRating } from "@/api/ratings/create-rating";

export function useCreateRatingMutation() {
  return useMutation({
    mutationFn: createRating,
  });
}
