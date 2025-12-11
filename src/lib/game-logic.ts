// src/lib/game-logic.ts

export type PlayerLevel = 'beginner' | 'intermediate' | 'advance';
export type CompetitionCategory = 'beginner' | 'intermediate' | 'advance';

interface ValidationResult {
  isValid: boolean;
  category?: CompetitionCategory;
  pricePerTeam?: number; // Harga total per pasang
  pricePerPerson?: number; // Harga per orang (split bill)
  reason?: string;
}

// Harga berdasarkan KATEGORI AKHIR (bukan level individu)
const PRICE_LIST = {
  beginner: 100000,     // 100k per orang
  intermediate: 150000, // 150k per orang
  advance: 150000       // 150k per orang
};

export function validatePairingAndGetPrice(level1: PlayerLevel, level2: PlayerLevel): ValidationResult {
  // 1. Normalisasi level (sort agar urutan tidak berpengaruh, misal: Int-Beg sama dengan Beg-Int)
  const levels = [level1, level2].sort(); // Alfabetis: advance, beginner, intermediate
  
  // Custom logic sorting manual biar gampang dibaca (Beginner -> Intermediate -> Advance)
  const rank = { beginner: 1, intermediate: 2, advance: 3 };
  const p1 = rank[level1] <= rank[level2] ? level1 : level2; // Level lebih rendah
  const p2 = rank[level1] > rank[level2] ? level1 : level2;  // Level lebih tinggi

  const pairKey = `${p1}-${p2}`;

  let category: CompetitionCategory | null = null;

  // 2. MATRIX LOGIC
  switch (pairKey) {
    case 'beginner-beginner':
      category = 'beginner';
      break;
    case 'beginner-intermediate':
      category = 'intermediate'; // Naik kategori
      break;
    case 'intermediate-intermediate':
      category = 'intermediate';
      break;
    case 'intermediate-advance':
      category = 'advance'; // Naik kategori
      break;
    case 'advance-advance':
      category = 'advance';
      break;
    case 'beginner-advance':
      return { 
        isValid: false, 
        reason: "Pasangan tidak valid: Gap level terlalu jauh (Beginner & Advance)." 
      };
    default:
      return { isValid: false, reason: "Kombinasi level tidak dikenali." };
  }

  // 3. PRICING LOGIC (Based on Category)
  if (category) {
    const basePrice = PRICE_LIST[category];
    return {
      isValid: true,
      category: category,
      pricePerPerson: basePrice,
      pricePerTeam: basePrice * 2
    };
  }

  return { isValid: false, reason: "System Error" };
}

// Helper untuk Generate Code (Bisa ditaruh di utils)
export function generateUniqueCode(prefix: 'ATH' | 'COM' = 'ATH'): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${random}`;
}
// Feature 6: Swap Player Logic Validator
export function calculateSwapCostDiff(
  oldCategory: CompetitionCategory, 
  newPartnerLevel: PlayerLevel, 
  currentUserLevel: PlayerLevel
): { allowed: boolean, priceDiff: number, newCategory?: CompetitionCategory, message?: string } {
  
  const validation = validatePairingAndGetPrice(currentUserLevel, newPartnerLevel);
  
  if (!validation.isValid) {
      return { allowed: false, priceDiff: 0, message: validation.reason };
  }

  const newCategory = validation.category!;
  const oldPrice = PRICE_LIST[oldCategory];
  const newPrice = PRICE_LIST[newCategory];

  // Aturan: Tidak ada refund jika turun level, tapi harus bayar jika naik level.
  const diff = Math.max(0, newPrice - oldPrice); 

  return {
      allowed: true,
      priceDiff: diff,
      newCategory: newCategory,
      message: diff > 0 
        ? `Upgrade Kategori: Anda perlu menambah Rp ${diff.toLocaleString()}.` 
        : `Downgrade/Same Kategori: Tidak ada biaya tambahan (No Refund).`
  };
}

// Feature 7: Mock NIK Validation (Gunakan di Server Action Registration)
export async function isNikUnique(nik: string): Promise<boolean> {
    // Simulasi DB Check
    // const existing = await db.user.findFirst({ where: { nik } });
    const mockExistingNIKS = ["1234567890", "0987654321"];
    return !mockExistingNIKS.includes(nik);
}