
'use client';

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Import Komponen Dashboard Spesifik
import { DirectorDashboard } from "@/components/admin/dashboards/director-dashboard";
import { FinanceDashboard } from "@/components/admin/dashboards/finance-dashboard";
import CommitteeDashboard from "./committee-view";

// Helper Session
const getSession = () => {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(sessionStorage.getItem('admin_session') || '{}');
  } catch {
    return null;
  }
};

export default function DashboardRoot() {
  const [role, setRole] = useState<string | null>(null);
  const [division, setDivision] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch session (Real-nya pakai Server Action / Context)
    const session = getSession();
    if (session) {
      setRole(session.role); // DIRECTOR, STAFF, HEAD
      setDivision(session.division); // FINANCE, MATCH_CONTROL, dll
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin w-10 h-10 text-primary"/></div>;
  }

  // --- LOGIC ROUTING TAMPILAN ---

  // 1. Tampilan Khusus Project Director
  if (role === 'DIRECTOR') {
    return <DirectorDashboard />;
  }

  // 2. Tampilan Khusus Finance (Opsional, jika ingin beda view)
  if (division === 'FINANCE') {
    // Bisa return <FinanceDashboard /> jika ada, atau gabung ke Committee tapi dengan widget tambahan
    // Untuk sekarang kita arahkan ke Committee View dulu tapi dengan akses penuh
    return <CommitteeDashboard />; 
  }

  // 3. Tampilan Default: Staff Lapangan (Committee View)
  // Ini adalah tampilan Absensi, Makan, SOS yang kita buat sebelumnya
  return <CommitteeDashboard />;
}
