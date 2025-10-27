/**
 * Configuration for all page sections
 * Defines the order and components for each section of the single-page application
 */

import GalleryPage from "../Gallery/page";
import EventsPage from "../Events/page";
import DevelopersPage from "../Developers/page";
import TeamsPage from "../Teams/page";
import SponsorsPage from "../Sponsors/page";

export const SECTION_COMPONENTS = [
  { id: "gallery", Component: GalleryPage },
  { id: "events", Component: EventsPage },
  { id: "developers", Component: DevelopersPage },
  { id: "teams", Component: TeamsPage },
  { id: "sponsors", Component: SponsorsPage },
] as const;

export type SectionId = (typeof SECTION_COMPONENTS)[number]["id"];

// Extract section IDs for easier use
export const SECTION_IDS = SECTION_COMPONENTS.map((section) => section.id);
