
// src/lib/bcc-team-rules.ts

export type PlayerLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCE";

export interface TeamSlotRule {
  id: string;
  label: string;
  level: PlayerLevel;
  capacity: number; 
  required: boolean;
}

export interface CategoryRule {
  minPlayers: number;
  maxPlayers: number;
  slots: TeamSlotRule[];
}

// Aturan baru yang disederhanakan untuk tim independen (Ganda)
// Min 1 (jika main tunggal) dan Max 2 (jika main ganda)
const INDEPENDENT_TEAM_RULE: CategoryRule = {
    minPlayers: 1,
    maxPlayers: 2,
    slots: [
      { id: "player_1", label: "Pemain 1", level: "BEGINNER", capacity: 1, required: true }, // Level di sini hanya placeholder
      { id: "player_2", label: "Pemain 2 (Opsional)", level: "BEGINNER", capacity: 1, required: false },
    ]
};


export const BCC_RULES: Record<string, CategoryRule> = {
  "BEGINNER": INDEPENDENT_TEAM_RULE,
  "INTERMEDIATE": INDEPENDENT_TEAM_RULE,
  "ADVANCE": INDEPENDENT_TEAM_RULE
};
