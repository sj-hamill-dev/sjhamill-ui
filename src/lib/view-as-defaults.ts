import type { ViewAsTarget } from "../components/view-as-picker";

export const DEFAULT_VIEW_AS_TARGETS: ViewAsTarget[] = [
  { id: "role-pm", name: "PM User", email: "pm@sjhamill.com", role: "pm", initials: "PM" },
  {
    id: "role-exec",
    name: "Executive User",
    email: "executive@sjhamill.com",
    role: "executive",
    initials: "EX",
  },
  {
    id: "role-viewer",
    name: "Viewer User",
    email: "viewer@sjhamill.com",
    role: "viewer",
    initials: "VW",
  },
];
