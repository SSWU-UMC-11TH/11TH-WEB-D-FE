import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "../pages/auth/edit-profile-page";

export const Route = createFileRoute("/my-info_/edit")({
  component: EditProfilePage,
});