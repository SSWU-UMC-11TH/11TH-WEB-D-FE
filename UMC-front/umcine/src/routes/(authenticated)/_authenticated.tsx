// src/routes/(authenticated)/_authenticated.tsx

import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { useAuthStore } from "../../stores/auth-store";

export const Route = createFileRoute("/(authenticated)/_authenticated")({
  beforeLoad: () => {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Outlet,
});