// Definisi Tipe untuk Level dan Tier
export type PlayerLevel = 'Beginner' | 'Intermediate' | 'Advance' | 'Pro';
export type PlayerTier = 1 | 2 | 3 | 4; // 1 = Tertinggi, 4 = Terendah

interface PlayerProfile {
  id: string;
  name: string;
  level: PlayerLevel;
  tier: PlayerTier;
  communityCode?: string; // Tambahkan communityCode
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  allowedCategory?: string;
}

/**
 * MATRIKS ATURAN (Contoh Logika Sporty/Kompetitif)
 * - Advance tidak boleh berpasangan dengan Advance Tier 1.
 * - Beginner boleh dengan siapa saja kecuali Pro.
 */
export function validatePairing(
  p1: PlayerProfile, 
  p2: PlayerProfile,
  mode: 'independent' | 'community' = 'independent' // Tambahkan parameter mode
): ValidationResult {
  
  // 1. Validasi SOP 4.3: Cek Kelengkapan Data TPF (Asumsi level ada jika profil ada)
  if (!p1.level || !p2.level) {
    return { valid: false, message: "Salah satu pemain belum dinilai oleh TPF (SOP 4.3)." };
  }

  // 2. Validasi SOP 4.4.B: Cek Kesamaan Komunitas (KHUSUS MODE KOMUNITAS)
  if (mode === 'community') {
    if (p1.communityCode !== p2.communityCode) {
      return { 
        valid: false, 
        message: "Dalam Mode Komunitas, kedua pemain wajib berasal dari kode komunitas yang sama (SOP 4.4.B)." 
      };
    }
  }

  // 3. Validasi SOP 4.5: Matriks Level-Tier
  const levels = [p1.level, p2.level];
  
  if (levels.includes('Pro') && levels.includes('Beginner')) {
    return {
      isValid: false,
      message: "Kombinasi 'Pro' & 'Beginner' dilarang untuk menjaga keseimbangan kompetisi."
    };
  }
  
  // Cek Double Advance (Misal dibatasi)
  if (p1.level === 'Advance' && p2.level === 'Advance') {
    // Jika keduanya Tier 1 (Jago banget), dilarang
    if (p1.tier === 1 && p2.tier === 1) {
      return {
        isValid: false,
        message: "Duet 'Advance Tier 1' terlalu OP (Overpowered). Harap cari pasangan Tier dibawahnya."
      };
    }
  }

  // Jika Valid, tentukan masuk kategori mana
  const categoryMap: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advance': 3, 'Pro': 4 };
  const score = Math.max(categoryMap[p1.level], categoryMap[p2.level]);
  
  let categoryName = 'Beginner Open';
  if (score === 2) categoryName = 'Intermediate Cup';
  if (score === 3) categoryName = 'Advance Championship';
  if (score === 4) categoryName = 'Pro League';

  return {
    isValid: true,
    message: "Pasangan Valid! Siap mendominasi lapangan.",
    allowedCategory: categoryName
  };
}
