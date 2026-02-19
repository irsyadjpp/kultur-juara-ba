'use client';

import { AthleteForm } from '@/components/admin/athlete-form';
import { Badge } from '@/components/ui/badge';
import { UserPlus } from 'lucide-react';
import { registerAthlete } from './actions';

const initialState = {
    success: false,
    message: "",
};

export default function RegisterAthletePage() {
    return (
        <div className="space-y-8 p-4 md:p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 border-primary text-primary bg-primary/10">
                            <UserPlus className="w-3 h-3 mr-2" /> PENDAFTARAN MANUAL
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                        Registrasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Atlet Baru</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                        Formulir untuk mendata atlet baru secara manual di Kultur Juara Badminton Academy.
                    </p>
                </div>
            </div>

            <AthleteForm
                action={registerAthlete}
                initialState={initialState}
                mode="create"
            />
        </div>
    );
}
