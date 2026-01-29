
'use client';

// This is the main dashboard page.
// Since we are simplifying the roles, we can directly render the default committee view.
import CommitteeDashboard from "./committee-view";

export default function DashboardRoot() {
  // The complex role-switching logic has been removed.
  // We now directly show the main dashboard for any logged-in admin.
  return <CommitteeDashboard />;
}
