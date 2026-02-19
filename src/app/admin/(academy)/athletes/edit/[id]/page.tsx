import { AthleteForm } from '@/components/admin/athlete-form';
import { adminDb } from '@/lib/firebase-admin';
import { notFound } from 'next/navigation';
import { updateAthlete } from './actions';

export default async function EditAthletePage({ params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id) return notFound();

    const docRef = adminDb.collection('athletes').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
        return notFound();
    }

    const data = docSnap.data();

    // Pass the ID to the action
    const updateAction = updateAthlete.bind(null, id);

    return (
        <div className="space-y-8 p-4 md:p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black font-headline uppercase tracking-tighter text-foreground">
                        Edit <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Data Atlet</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-xl text-lg">
                        Perbarui data atlet.
                    </p>
                </div>
            </div>

            <AthleteForm
                action={updateAction}
                initialState={{ success: false, message: "" }}
                defaultValues={data as any}
                mode="edit"
            />
        </div>
    );
}
