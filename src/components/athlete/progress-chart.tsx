'use client';

import { cn } from '@/lib/utils';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';

type EvalData = Record<string, any>;

// 6 core pillar dimensions for the chart
const DIMENSIONS = [
    {
        key: 'anthropometry',
        label: 'Antropometri',
        color: '#3b82f6',
        fields: ['ant_height_cm', 'ant_weight_kg', 'ant_arm_span_cm'],
    },
    {
        key: 'biomotor',
        label: 'Biomotor',
        color: '#f59e0b',
        fields: ['bio_t_test_sec', 'bio_split_step_lat', 'bio_vertical_jump'],
    },
    {
        key: 'technical',
        label: 'Teknik',
        color: '#10b981',
        fields: ['tec_smash_velocity', 'tec_serve_short_acc', 'tec_backhand_depth'],
    },
    {
        key: 'cognitive',
        label: 'Kognitif',
        color: '#8b5cf6',
        fields: ['cog_shot_logic', 'cog_anticipation', 'cog_focus_duration'],
    },
    {
        key: 'physiology',
        label: 'Fisiologi',
        color: '#ef4444',
        fields: ['phy_vo2max_est', 'phy_hr_recovery', 'phy_fatigue_index'],
    },
    {
        key: 'mental',
        label: 'Mental',
        color: '#ec4899',
        fields: ['men_grit_score', 'men_academic_pressure', 'men_poms_index'],
    },
];

function getScore(data: EvalData, fields: string[]): number {
    const values = fields.map(f => data[f]).filter(v => v != null && v !== '' && !isNaN(Number(v)));
    if (values.length === 0) return 0;
    // Normalize to 0-100 scale (simple avg)
    return Math.round(values.reduce((sum, v) => sum + Number(v), 0) / values.length);
}

function getTrend(current: number, previous: number | null): 'up' | 'down' | 'same' {
    if (previous === null) return 'same';
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'same';
}

export function ProgressChart({
    evaluations,
    className,
}: {
    evaluations: EvalData[];
    className?: string;
}) {
    if (!evaluations || evaluations.length === 0) {
        return (
            <div className={cn("text-center py-10 text-muted-foreground", className)}>
                <p className="text-sm font-bold">Belum ada data evaluasi.</p>
                <p className="text-xs mt-1">Data evaluasi sport science akan tampil di sini setelah evaluasi pertama.</p>
            </div>
        );
    }

    const latestEval = evaluations[evaluations.length - 1];
    const prevEval = evaluations.length > 1 ? evaluations[evaluations.length - 2] : null;

    const dimensionScores = DIMENSIONS.map(dim => {
        const current = getScore(latestEval, dim.fields);
        const previous = prevEval ? getScore(prevEval, dim.fields) : null;
        return { ...dim, current, previous, trend: getTrend(current, previous) };
    });

    const maxScore = Math.max(...dimensionScores.map(d => d.current), 100);

    return (
        <div className={cn("space-y-4", className)}>
            {/* Period indicator */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Periode: {latestEval.period || 'Baseline'}
                    </span>
                    {prevEval && (
                        <span className="text-[10px] text-muted-foreground">
                            vs {prevEval.period || 'Baseline'}
                        </span>
                    )}
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                    {evaluations.length} evaluasi
                </span>
            </div>

            {/* Bar Chart */}
            <div className="space-y-3">
                {dimensionScores.map((dim) => (
                    <div key={dim.key} className="group">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground">{dim.label}</span>
                                {dim.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                                {dim.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
                                {dim.trend === 'same' && <Minus className="w-3 h-3 text-muted-foreground" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold" style={{ color: dim.color }}>
                                    {dim.current}
                                </span>
                                {dim.previous !== null && (
                                    <span className={cn(
                                        "text-[10px] font-mono",
                                        dim.current > dim.previous ? "text-green-500" : dim.current < dim.previous ? "text-red-500" : "text-muted-foreground"
                                    )}>
                                        {dim.current > dim.previous ? '+' : ''}{dim.current - dim.previous}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                            {/* Previous bar (ghost) */}
                            {dim.previous !== null && (
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full opacity-20"
                                    style={{
                                        width: `${(dim.previous / maxScore) * 100}%`,
                                        backgroundColor: dim.color,
                                    }}
                                />
                            )}
                            {/* Current bar */}
                            <div
                                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                                style={{
                                    width: `${(dim.current / maxScore) * 100}%`,
                                    backgroundColor: dim.color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Timeline dots */}
            {evaluations.length > 1 && (
                <div className="flex items-center gap-1 pt-2">
                    <span className="text-[10px] text-muted-foreground mr-2">Timeline:</span>
                    {evaluations.map((ev, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                i === evaluations.length - 1
                                    ? "bg-primary w-3 h-3"
                                    : "bg-muted-foreground/30"
                            )}
                            title={ev.period || `Evaluasi ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
