
import { createFileRoute } from "@tanstack/react-router";
import { MyInfoPage } from "@/pages/auth/my-info-page";

export const Route = createFileRoute(
  "/(protected)/_authenticated/my-info",
)({
  component: MyInfoPage,
});
