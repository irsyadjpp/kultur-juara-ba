
import type { ReactNode } from 'react';

// This layout is now handled by the root admin layout.
// This file is kept to simply pass children through.
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
