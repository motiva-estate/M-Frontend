import { createFileRoute } from "@tanstack/react-router";
import { LandListing } from "./land";

export const Route = createFileRoute("/land/")({
  component: LandListing,
});
