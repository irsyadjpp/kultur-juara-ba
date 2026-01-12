

// src/lib/game-logic.ts

export type PlayerLevel = 'Beginner';
export type CompetitionCategory = 'Beginner';

interface ValidationResult {
  isValid: boolean;
  category?: CompetitionCategory;
  pricePerPerson?: number; // Harga per orang
  reason?: string;
}

// Harga berdasarkan KATEGORI AKHIR (bukan level individu)
const PRICE_LIST = {
  Beginner: 100000,     // 100k per orang
};

export function validateIndividualRegistration(level: PlayerLevel): ValidationResult {
  const category: CompetitionCategory = 'Beginner';

  const basePrice = PRICE_LIST[category];
  return {
    isValid: true,
    category: category,
    pricePerPerson: basePrice,
  };
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
  
  const validation = validateIndividualRegistration(newPartnerLevel);
  
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

