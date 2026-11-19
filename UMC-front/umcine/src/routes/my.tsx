// src/routes/my.tsx

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/my")({
  component: Outlet,
});
