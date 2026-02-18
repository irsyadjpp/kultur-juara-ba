'use server';

import { initializeFirebase } from "@/firebase/index";
import { collection, getDocs, doc, setDoc, query, orderBy, serverTimestamp, getFirestore } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export type AthleteSelectOption = {
  id: string;
  name: string;
  nickname?: string;
};

// Helper to get DB instance
function getDb() {
  const { firestore } = initializeFirebase();
  return firestore;
}

export async function getAthletesForSelect(): Promise<AthleteSelectOption[]> {
  try {
    const db = getDb();
    const athletesRef = collection(db, 'athletes');
    const q = query(athletesRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name as string,
      nickname: doc.data().nickname as string,
    }));
  } catch (error) {
    console.error('Error fetching athletes:', error);
    return [];
  }
}

export async function savePhysicalEvaluation(prevState: any, formData: FormData) {
  try {
    const db = getDb();
    const athleteId = formData.get('athleteId') as string;
    const period = formData.get('period') as string; // YYYY-MM
    const evaluator = formData.get('evaluator') as string;

    if (!athleteId || !period) {
      return { success: false, message: 'Data atlet dan periode wajib diisi.' };
    }

    const data = {
      athleteId,
      period,
      evaluator,
      createdAt: serverTimestamp(),
      type: 'physical',

      // Antropometri
      ant_height_cm: Number(formData.get('ant_height_cm')) || 0,
      ant_weight_kg: Number(formData.get('ant_weight_kg')) || 0,
      ant_arm_span_cm: Number(formData.get('ant_arm_span_cm')) || 0,
      ant_sitting_height: Number(formData.get('ant_sitting_height')) || 0,
      ant_leg_length: Number(formData.get('ant_leg_length')) || 0,

      // Vitals & Body Comp
      vit_heart_rate_resting: Number(formData.get('vit_heart_rate_resting')) || 0,
      vit_blood_pressure_sys: Number(formData.get('vit_blood_pressure_sys')) || 0,
      vit_blood_pressure_dia: Number(formData.get('vit_blood_pressure_dia')) || 0,
      ant_body_fat_percent: Number(formData.get('ant_body_fat_percent')) || 0,
      ant_muscle_mass_percent: Number(formData.get('ant_muscle_mass_percent')) || 0,
      ant_somatotype: formData.get('ant_somatotype') as string,

      // Physical Tests
      phy_vertical_jump_cm: Number(formData.get('phy_vertical_jump_cm')) || 0,
      phy_push_up_reps: Number(formData.get('phy_push_up_reps')) || 0,
      phy_sit_up_reps: Number(formData.get('phy_sit_up_reps')) || 0,
      phy_vo2max: Number(formData.get('phy_vo2max')) || 0,
      phy_sprint_10m_sec: Number(formData.get('phy_sprint_10m_sec')) || 0,
      phy_agility_test_sec: Number(formData.get('phy_agility_test_sec')) || 0,
      phy_flexibility_cm: Number(formData.get('phy_flexibility_cm')) || 0,

      notes: formData.get('notes') as string,
    };

    const evalRef = doc(collection(db, 'evaluations'));
    await setDoc(evalRef, data);

    revalidatePath('/admin/evaluations/physical');
    return { success: true, message: 'Evaluasi fisik berhasil disimpan!' };

  } catch (error) {
    console.error('Error saving physical evaluation:', error);
    return { success: false, message: 'Gagal menyimpan evaluasi.' };
  }
}

export async function saveTechnicalEvaluation(prevState: any, formData: FormData) {
  try {
    const db = getDb();
    const athleteId = formData.get('athleteId') as string;
    const date = formData.get('date') as string;
    const evaluator = formData.get('evaluator') as string;

    if (!athleteId || !date) {
      return { success: false, message: 'Data atlet dan tanggal wajib diisi.' };
    }

    const data = {
      athleteId,
      date,
      evaluator,
      createdAt: serverTimestamp(),
      type: 'technical',

      // Strokes (1-5)
      tec_service_short: Number(formData.get('tec_service_short')) || 0,
      tec_service_long: Number(formData.get('tec_service_long')) || 0,
      tec_netting: Number(formData.get('tec_netting')) || 0,
      tec_lob: Number(formData.get('tec_lob')) || 0,
      tec_dropshot: Number(formData.get('tec_dropshot')) || 0,
      tec_smash: Number(formData.get('tec_smash')) || 0,
      tec_drive: Number(formData.get('tec_drive')) || 0,
      tec_defense: Number(formData.get('tec_defense')) || 0,
      tec_footwork: Number(formData.get('tec_footwork')) || 0,

      // Stats
      stat_smash_accuracy: Number(formData.get('stat_smash_accuracy')) || 0,
      stat_error_rate: Number(formData.get('stat_error_rate')) || 0,
      stat_rally_consistency: Number(formData.get('stat_rally_consistency')) || 0,

      notes: formData.get('notes') as string,
    };

    const evalRef = doc(collection(db, 'evaluations'));
    await setDoc(evalRef, data);

    revalidatePath('/admin/evaluations/technical');
    return { success: true, message: 'Evaluasi teknik berhasil disimpan!' };

  } catch (error) {
    console.error('Error saving technical evaluation:', error);
    return { success: false, message: 'Gagal menyimpan evaluasi.' };
  }
}
