// src/hooks/use-signup-mutation.ts

import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/members/signup";

export function useSignupMutation() {
  return useMutation({
    mutationFn: signup,
  });
}
