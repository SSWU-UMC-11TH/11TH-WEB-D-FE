// src/hooks/use-login-mutation.ts


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth/login";
import { useAuthStore } from "../stores/auth-store";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );

  return useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      setAccessToken(response.result.accessToken);

      queryClient.invalidateQueries({
        queryKey: ["members", "me"],
      });
    },
  });
}
