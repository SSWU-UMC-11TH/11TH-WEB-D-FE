import { Outlet, createRootRoute } from "@tanstack/react-router";

import Header from "../components/layout/header";
import { TmdbAttribution } from "../components/layout/tmdb-attribution";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <TmdbAttribution />
    </div>
  );
}