import { z } from 'zod';
import { ai } from '../genkit';

const EvaluationSchema = z.record(z.string(), z.any());

const AnalysisOutputSchema = z.object({
    summary: z.string().describe('Ringkasan profil atlet dalam 2-3 kalimat.'),
    strengths: z.array(z.object({
        pillar: z.string(),
        detail: z.string(),
    })).describe('Top 3 kekuatan utama atlet berdasarkan data.'),
    improvements: z.array(z.object({
        pillar: z.string(),
        detail: z.string(),
        recommendation: z.string(),
    })).describe('Top 3 area prioritas perbaikan dengan rekomendasi spesifik.'),
    riskFlags: z.array(z.object({
        flag: z.string(),
        severity: z.enum(['low', 'medium', 'high']),
        action: z.string(),
    })).describe('Flag risiko kesehatan atau cedera (kosong jika tidak ada).'),
    overallScore: z.number().min(0).max(100).describe('Skor kesiapan atlet 0-100 berdasarkan keseluruhan data.'),
});

export type SportScienceAnalysis = z.infer<typeof AnalysisOutputSchema>;

export const analyzeSportScienceFlow = ai.defineFlow(
    {
        name: 'analyzeSportScience',
        inputSchema: z.object({
            athleteName: z.string(),
            evaluation: EvaluationSchema,
        }),
        outputSchema: AnalysisOutputSchema,
    },
    async ({ athleteName, evaluation }) => {
        const { output } = await ai.generate({
            model: 'googleai/gemini-2.5-flash',
            prompt: `
Kamu adalah Sport Scientist dan Pelatih Expert untuk cabang olahraga Bulutangkis.

Analisis data evaluasi sport science berikut untuk atlet bernama **${athleteName}**:

\`\`\`json
${JSON.stringify(evaluation, null, 2)}
\`\`\`

**Panduan Interpretasi:**
- Skor 1-10: nilai rendah di bawah 5 umumnya berarti perlu perbaikan
- Waktu (detik/ms): untuk agility/T-Test, semakin kecil semakin baik
- VO2Max: >55 ml/kg/min elite, 45-55 baik, <45 butuh peningkatan
- HRV (rec_hrv_rmssd): >80ms sangat baik, <30ms perlu perhatian
- GRF Asymmetry (load_grf_asymmetry): >15% berisiko cedera ACL
- Tetosteron/Cortisol ratio: >0.35 optimal
- Urine color >6 artinya dehidrasi
- Sleep efficiency <80% adalah masalah

Berikan analisis dalam format JSON yang diminta. Semua teks dalam **Bahasa Indonesia**.
      `,
            output: { schema: AnalysisOutputSchema },
        });

        if (!output) throw new Error('Gemini failed to return structured output');
        return output;
    }
);
