'use server';

import { initializeFirebase } from "@/firebase/index";
import { collection, doc, getDocs, limit, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export type AthleteSelectOption = {
    id: string;
    name: string;
    nickname?: string;
};

function getDb() {
    const { firestore } = initializeFirebase();
    return firestore;
}

export async function getAthletesForSelect(): Promise<AthleteSelectOption[]> {
    try {
        const db = getDb();
        const athletesRef = collection(db, 'athletes');
        const snapshot = await getDocs(athletesRef);
        return snapshot.docs
            .map(d => ({
                id: d.id,
                name: (d.data().fullName || d.data().name || 'Unknown') as string,
                nickname: d.data().nickname as string | undefined,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error('Error fetching athletes:', error);
        return [];
    }
}

export async function savePhysicalEvaluation(prevState: any, formData: FormData) {
    try {
        const db = getDb();
        const athleteId = formData.get('athleteId') as string;
        const period = formData.get('period') as string;
        const evaluator = formData.get('evaluator') as string;
        if (!athleteId || !period) return { success: false, message: 'Data atlet dan periode wajib diisi.' };

        const data = {
            athleteId, period, evaluator, createdAt: serverTimestamp(), type: 'physical',
            ant_height_cm: Number(formData.get('ant_height_cm')) || 0,
            ant_weight_kg: Number(formData.get('ant_weight_kg')) || 0,
            ant_arm_span_cm: Number(formData.get('ant_arm_span_cm')) || 0,
            ant_sitting_height: Number(formData.get('ant_sitting_height')) || 0,
            ant_leg_length: Number(formData.get('ant_leg_length')) || 0,
            vit_heart_rate_resting: Number(formData.get('vit_heart_rate_resting')) || 0,
            vit_blood_pressure_sys: Number(formData.get('vit_blood_pressure_sys')) || 0,
            vit_blood_pressure_dia: Number(formData.get('vit_blood_pressure_dia')) || 0,
            ant_body_fat_percent: Number(formData.get('ant_body_fat_percent')) || 0,
            ant_muscle_mass_percent: Number(formData.get('ant_muscle_mass_percent')) || 0,
            ant_somatotype: formData.get('ant_somatotype') as string,
            phy_vertical_jump_cm: Number(formData.get('phy_vertical_jump_cm')) || 0,
            phy_push_up_reps: Number(formData.get('phy_push_up_reps')) || 0,
            phy_sit_up_reps: Number(formData.get('phy_sit_up_reps')) || 0,
            phy_vo2max: Number(formData.get('phy_vo2max')) || 0,
            phy_sprint_10m_sec: Number(formData.get('phy_sprint_10m_sec')) || 0,
            phy_agility_test_sec: Number(formData.get('phy_agility_test_sec')) || 0,
            phy_flexibility_cm: Number(formData.get('phy_flexibility_cm')) || 0,
            notes: formData.get('notes') as string,
        };

        await setDoc(doc(collection(db, 'evaluations')), data);
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
        if (!athleteId || !date) return { success: false, message: 'Data atlet dan tanggal wajib diisi.' };

        const data = {
            athleteId, date, evaluator, createdAt: serverTimestamp(), type: 'technical',
            tec_service_short: Number(formData.get('tec_service_short')) || 0,
            tec_service_long: Number(formData.get('tec_service_long')) || 0,
            tec_netting: Number(formData.get('tec_netting')) || 0,
            tec_lob: Number(formData.get('tec_lob')) || 0,
            tec_dropshot: Number(formData.get('tec_dropshot')) || 0,
            tec_smash: Number(formData.get('tec_smash')) || 0,
            tec_drive: Number(formData.get('tec_drive')) || 0,
            tec_defense: Number(formData.get('tec_defense')) || 0,
            tec_footwork: Number(formData.get('tec_footwork')) || 0,
            stat_smash_accuracy: Number(formData.get('stat_smash_accuracy')) || 0,
            stat_error_rate: Number(formData.get('stat_error_rate')) || 0,
            stat_rally_consistency: Number(formData.get('stat_rally_consistency')) || 0,
            notes: formData.get('notes') as string,
        };

        await setDoc(doc(collection(db, 'evaluations')), data);
        revalidatePath('/admin/evaluations/technical');
        return { success: true, message: 'Evaluasi teknik berhasil disimpan!' };
    } catch (error) {
        console.error('Error saving technical evaluation:', error);
        return { success: false, message: 'Gagal menyimpan evaluasi.' };
    }
}

// ─── 13-PILLAR SPORT SCIENCE EVALUATION ──────────────────────────────────────

export async function saveSportScienceEvaluation(prevState: any, formData: FormData) {
    try {
        const db = getDb();
        const athleteId = formData.get('athleteId') as string;
        const period = formData.get('period') as string;
        const evaluator = formData.get('evaluator') as string;

        if (!athleteId || !period) {
            return { success: false, message: 'Data atlet dan periode wajib diisi.' };
        }

        const getNum = (key: string): number | null => {
            const val = formData.get(key);
            return val !== null && val !== '' ? Number(val) : null;
        };

        const data = {
            athleteId,
            period,
            evaluator,
            createdAt: serverTimestamp(),
            type: 'sport_science',

            // PILAR 1: ANTHROPOMETRY
            ant_height_cm: getNum('ant_height_cm'),
            ant_weight_kg: getNum('ant_weight_kg'),
            ant_arm_span_cm: getNum('ant_arm_span_cm'),
            ant_sitting_height: getNum('ant_sitting_height'),
            ant_leg_length: getNum('ant_leg_length'),

            // PILAR 2: KINEMATICS
            kin_grip_switch_speed: getNum('kin_grip_switch_speed'),
            kin_wrist_extension: getNum('kin_wrist_extension'),
            kin_elbow_alignment: getNum('kin_elbow_alignment'),
            kin_kinetic_linkage: getNum('kin_kinetic_linkage'),
            kin_contact_height: getNum('kin_contact_height'),

            // PILAR 3: BIOMOTOR
            bio_t_test_sec: getNum('bio_t_test_sec'),
            bio_split_step_lat: getNum('bio_split_step_lat'),
            bio_vertical_jump: getNum('bio_vertical_jump'),
            bio_med_ball_throw: getNum('bio_med_ball_throw'),
            bio_sit_reach_cm: getNum('bio_sit_reach_cm'),

            // PILAR 4: TECHNICAL
            tec_backhand_depth: getNum('tec_backhand_depth'),
            tec_smash_velocity: getNum('tec_smash_velocity'),
            tec_smash_angle: getNum('tec_smash_angle'),
            tec_net_error_rate: getNum('tec_net_error_rate'),
            tec_serve_short_acc: getNum('tec_serve_short_acc'),
            tec_def_wide_reach: getNum('tec_def_wide_reach'),

            // PILAR 5: COGNITIVE
            cog_shot_logic: getNum('cog_shot_logic'),
            cog_anticipation: getNum('cog_anticipation'),
            cog_clutch_error: getNum('cog_clutch_error'),
            cog_focus_duration: getNum('cog_focus_duration'),

            // PILAR 6: PHYSIOLOGY
            phy_vo2max_est: getNum('phy_vo2max_est'),
            phy_fatigue_index: getNum('phy_fatigue_index'),
            phy_hr_recovery: getNum('phy_hr_recovery'),

            // PILAR 7: NUTRITION
            nut_caloric_intake: getNum('nut_caloric_intake'),
            nut_urine_color: getNum('nut_urine_color'),
            nut_iron_ferritin: getNum('nut_iron_ferritin'),

            // PILAR 8: RECOVERY
            rec_sleep_efficiency: getNum('rec_sleep_efficiency'),
            rec_hrv_rmssd: getNum('rec_hrv_rmssd'),
            rec_doms_perceived: getNum('rec_doms_perceived'),

            // PILAR 9: MENTAL HEALTH
            men_grit_score: getNum('men_grit_score'),
            men_academic_pressure: getNum('men_academic_pressure'),
            men_poms_index: getNum('men_poms_index'),

            // PILAR 10: SOCIO-ECON
            soc_travel_time: getNum('soc_travel_time'),

            // PILAR 11: BLOOD & BIOMARKER
            phy_hemoglobin_lvl: getNum('phy_hemoglobin_lvl'),
            phy_creatine_kinase: getNum('phy_creatine_kinase'),
            phy_testosteron_cort: getNum('phy_testosteron_cort'),

            // PILAR 12: VISUAL & PERCEPTUAL
            cog_saccadic_speed: getNum('cog_saccadic_speed'),
            cog_peripheral_deg: getNum('cog_peripheral_deg'),
            cog_choice_reaction: getNum('cog_choice_reaction'),

            // PILAR 13: BIOMECHANICAL LOAD
            load_grf_asymmetry: getNum('load_grf_asymmetry'),
            load_shoulder_torque: getNum('load_shoulder_torque'),
            load_racket_vibration: getNum('load_racket_vibration'),

            notes: formData.get('notes') as string,
        };

        // Upsert by athlete + period (one document per period per athlete)
        const docId = `${athleteId}_${period.replace('-', '')}`;
        await setDoc(doc(db, 'sport_science_evaluations', docId), data, { merge: true });

        revalidatePath('/admin/evaluations/sport-science');
        return { success: true, message: 'Profil Sport Science berhasil disimpan!' };
    } catch (error) {
        console.error('Error saving sport science evaluation:', error);
        return { success: false, message: 'Gagal menyimpan evaluasi.' };
    }
}

export async function getSportScienceEvaluation(athleteId: string) {
    try {
        const db = getDb();
        const evalRef = collection(db, 'sport_science_evaluations');
        const q = query(evalRef, where('athleteId', '==', athleteId), orderBy('period', 'desc'), limit(1));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Record<string, any>;
    } catch (error) {
        console.error('Error fetching sport science evaluation:', error);
        return null;
    }
}

export async function getAllSportScienceEvaluations(athleteId: string): Promise<Record<string, any>[]> {
    try {
        const db = getDb();
        const evalRef = collection(db, 'sport_science_evaluations');
        const q = query(evalRef, where('athleteId', '==', athleteId), orderBy('period', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
        console.error('Error fetching all sport science evaluations:', error);
        return [];
    }
}

