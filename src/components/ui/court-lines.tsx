"use client";

import { cn } from "@/lib/utils";

export function CourtLines() {
  // Ikon Shuttlecock (Lebih Aerodinamis)
  const ShuttlecockIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn("text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]", className)}
      style={style}
    >
      {/* Kepala Gabus */}
      <path d="M12 18a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" fill="white" />
      {/* Bulu-bulu (Bentuk V Aerodinamis) */}
      <path d="M12 18L5 3h14l-7 15Z" fillOpacity="0.8" />
      <path d="M12 18 8.5 3M12 18l3.5-15" strokeOpacity="0.5" />
    </svg>
  );

  // Garis Kecepatan (Speed Lines) ala Manga/Komik
  const SpeedLine = ({ className, delay }: { className?: string, delay: string }) => (
    <div 
      className={cn("absolute h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full", className)}
      style={{ animation: `pulse-slow 2s infinite ${delay}` }}
    />
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* === LAYER 1: LAPANGAN "KAPUR" (CHALKY) === 
          Garis putus-putus dan agak transparan memberi kesan lapangan warga/gor lama 
      */}
      <div className="absolute top-[15%] bottom-[15%] left-[5%] right-[5%] opacity-20 transform -skew-x-12 scale-95">
        {/* Border Luar */}
        <div className="absolute inset-0 border-2 border-dashed border-white/40 rounded-sm"></div>
        {/* Garis Tengah (Net Area) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/20"></div>
        {/* Garis Servis Depan */}
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-white/20"></div>
        <div className="absolute bottom-[30%] left-0 right-0 h-[1px] bg-white/20"></div>
      </div>

      {/* === LAYER 2: ANIMASI RALLY (LOB & SMASH) === */}
      
      {/* A. SERVIS MELAMBUNG (LOB) 
          Muncul dari Kiri Bawah -> Melambung ke Kanan Atas
      */}
      <div className="absolute inset-0 animate-rally-lob" style={{ animationDuration: '7s' }}>
        <ShuttlecockIcon className="w-12 h-12" />
        {/* Ekor Angin (Trail) */}
        <div className="absolute top-1/2 left-0 w-24 h-full -translate-x-full -translate-y-1/2 bg-gradient-to-r from-transparent to-white/10 blur-sm transform -skew-x-12"></div>
      </div>

      {/* B. SMASH BALASAN (SMASH) 
          Muncul dari Kanan Atas -> Menukik ke Kiri Bawah (Warna Merah Gen Z)
          Delay diatur agar muncul setelah servis
      */}
      <div className="absolute inset-0 animate-rally-smash opacity-0" style={{ animationDelay: '3.5s', animationDuration: '7s' }}>
        <ShuttlecockIcon className="w-14 h-14 text-primary" /> {/* Warna Merah Utama */}
        {/* Efek Api/Speed Smash */}
        <div className="absolute -top-4 -right-10 w-40 h-8 bg-gradient-to-l from-primary/50 to-transparent rounded-full blur-md transform rotate-12"></div>
      </div>

      {/* === LAYER 3: ATMOSFER AMATIR/KOMUNITAS === */}
      
      {/* Shuttlecock "Nyangkut" atau "Jatuh" (Elemen Lucu/Humanis) */}
      <ShuttlecockIcon 
        className="absolute bottom-10 left-[15%] w-8 h-8 text-white/30 rotate-[200deg]" 
      />
      
      {/* Manga Speed Lines (Untuk kesan dramatis) */}
      <SpeedLine className="top-[20%] left-0 w-[40%] rotate-3" delay="0s" />
      <SpeedLine className="bottom-[40%] right-0 w-[30%] -rotate-6" delay="1s" />
      <SpeedLine className="top-[60%] left-[10%] w-[20%] rotate-12" delay="2.5s" />

    </div>
  );
}
