
'use server';

// Mock Data Antrean Call Room
let CALL_ROOM_QUEUE = [
  { id: "M101", category: "MD Beginner", teamA: "PB Djarum KW", teamB: "PB Jaya Raya", status: "WAITING", time: "10:00" },
  { id: "M102", category: "XD Intermediate", teamA: "PB Exist", teamB: "PB Tangkas", status: "CALLED", time: "10:10" },
  { id: "M103", category: "WD Advance", teamA: "PB Mutiara", teamB: "PB SGS", status: "READY", time: "10:20" },
];

// Mock Data Line-Up Masuk
let SUBMITTED_LINEUPS = [
  { id: "LU-001", team: "PB Djarum KW", category: "Beregu PUTRA", submittedAt: "09:45", status: "VERIFIED" },
  { id: "LU-002", team: "PB Jaya Raya", category: "Beregu PUTRA", submittedAt: "09:50", status: "PENDING" },
  { id: "LU-003", team: "PB Exist", category: "Beregu CAMPURAN", submittedAt: "09:55", status: "PENDING" },
];

export async function getCallRoomQueue() {
  return CALL_ROOM_QUEUE;
}

export async function getLineups() {
  return SUBMITTED_LINEUPS;
}

export async function updateMatchStatus(matchId: string, status: string) {
  await new Promise(r => setTimeout(r, 500));
  const index = CALL_ROOM_QUEUE.findIndex(m => m.id === matchId);
  if (index !== -1) {
    // @ts-ignore
    CALL_ROOM_QUEUE[index].status = status;
  }
  return { success: true };
}

export async function verifyLineup(lineupId: string) {
  await new Promise(r => setTimeout(r, 500));
  const index = SUBMITTED_LINEUPS.findIndex(l => l.id === lineupId);
  if (index !== -1) {
    // @ts-ignore
    SUBMITTED_LINEUPS[index].status = "VERIFIED";
  }
  return { success: true };
}
