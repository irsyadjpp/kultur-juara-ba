// src/lib/bcc-team-rules.ts

export type PlayerLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCE" | "3ON3";

export interface TeamSlotRule {
  id: string;
  label: string;
  level: PlayerLevel;
  capacity: number; // 2 untuk ganda, 3 untuk 3on3
  required: boolean; // Wajib diisi atau Cadangan
}

export interface CategoryRule {
  minTotalPlayers: number;
  slots: TeamSlotRule[];
}

export const BCC_RULES: Record<string, CategoryRule> = {
  // ATURAN BEREGU PUTRA (Min 10 Orang)
  "MD_TEAM": {
    minTotalPlayers: 10,
    slots: [
      // CORE SLOTS (Wajib)
      { id: "md_beg_1", label: "Ganda Beginner 1", level: "BEGINNER", capacity: 2, required: true },
      { id: "md_beg_2", label: "Ganda Beginner 2", level: "BEGINNER", capacity: 2, required: true },
      { id: "md_int_1", label: "Ganda Intermediate 1", level: "INTERMEDIATE", capacity: 2, required: true },
      { id: "md_int_2", label: "Ganda Intermediate 2", level: "INTERMEDIATE", capacity: 2, required: true },
      { id: "md_adv_1", label: "Ganda Advance 1", level: "ADVANCE", capacity: 2, required: true },
      // RESERVE SLOTS (Opsional)
      { id: "res_beg", label: "Cadangan Beginner", level: "BEGINNER", capacity: 2, required: false },
      { id: "res_int", label: "Cadangan Intermediate", level: "INTERMEDIATE", capacity: 2, required: false },
      { id: "res_adv", label: "Cadangan Advance", level: "ADVANCE", capacity: 2, required: false },
    ]
  },
  // ATURAN BEREGU PUTRI (Min 11 Orang)
  "WD_TEAM": {
    minTotalPlayers: 11,
    slots: [
      // CORE SLOTS (Wajib)
      { id: "wd_beg_1", label: "Ganda Beginner 1", level: "BEGINNER", capacity: 2, required: true },
      { id: "wd_beg_2", label: "Ganda Beginner 2", level: "BEGINNER", capacity: 2, required: true },
      { id: "wd_int_1", label: "Ganda Intermediate 1", level: "INTERMEDIATE", capacity: 2, required: true },
      { id: "wd_int_2", label: "Ganda Intermediate 2", level: "INTERMEDIATE", capacity: 2, required: true },
      { id: "wd_3on3_1", label: "Tim 3-on-3", level: "3ON3", capacity: 3, required: true },
      // RESERVE SLOTS (Opsional)
      { id: "res_beg", label: "Cadangan Beginner", level: "BEGINNER", capacity: 2, required: false },
      { id: "res_int", label: "Cadangan Intermediate", level: "INTERMEDIATE", capacity: 2, required: false },
      { id: "res_3on3", label: "Cadangan 3-on-3", level: "3ON3", capacity: 3, required: false },
    ]
  }
};