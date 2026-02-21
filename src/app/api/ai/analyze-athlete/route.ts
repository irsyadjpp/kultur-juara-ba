'use server';

import { analyzeSportScienceFlow } from '@/ai/flows/analyze-sport-science';
import { getSportScienceEvaluation } from '@/app/admin/(academy)/evaluations/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { athleteId, athleteName } = await req.json();
        if (!athleteId) {
            return NextResponse.json({ error: 'athleteId required' }, { status: 400 });
        }

        const evalData = await getSportScienceEvaluation(athleteId);
        if (!evalData) {
            return NextResponse.json({ error: 'Tidak ada data evaluasi untuk atlet ini.' }, { status: 404 });
        }

        const analysis = await analyzeSportScienceFlow({ athleteName: athleteName || 'Atlet', evaluation: evalData });
        return NextResponse.json({ success: true, analysis });
    } catch (error: any) {
        console.error('AI Analysis error:', error);
        return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 });
    }
}
