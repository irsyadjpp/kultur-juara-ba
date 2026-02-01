'use client';
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Clock, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSession } from "../../actions";

export default function WaitingRoomPage() {
    const [pin, setPin] = useState<string | null>(null);

    useEffect(() => {
        const fetchPin = async () => {
            const session = await getSession();
            if (session && session.pin) {
                setPin(session.pin);
            }
        };
        fetchPin();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto bg-yellow-100 text-yellow-600 rounded-full p-3 w-fit mb-4">
                        <Clock className="w-8 h-8" />
                    </div>
                    <CardTitle>Pendaftaran Anda Sedang Direview</CardTitle>
                    <CardDescription>
                        Profil Anda sudah lengkap. Mohon tunggu Project Director untuk memberikan penugasan (assignment).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {pin && (
                        <div className="p-4 bg-secondary/50 rounded-xl border border-border">
                            <p className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
                                <KeyRound className="w-4 h-4" /> PIN Akses Anda
                            </p>
                            <p className="text-3xl font-mono font-bold tracking-widest text-primary">
                                {pin}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                                Gunakan PIN ini untuk login jika tidak menggunakan Google.
                            </p>
                        </div>
                    )}
                    <Button onClick={() => window.location.reload()} className="w-full">
                        Cek Status Ulang
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
