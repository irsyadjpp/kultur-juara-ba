
'use server';

import { protestFormSchema, type ProtestFormValues } from "@/lib/schemas/protest";

export async function submitProtest(data: ProtestFormValues) {
    const validation = protestFormSchema.safeParse(data);
    
    if (!validation.success) {
        console.error("Validation Error:", validation.error.flatten().fieldErrors);
        return { success: false, message: "Data tidak valid. Cek kembali isian Anda." };
    }
    
    await new Promise(r => setTimeout(r, 1500));
    
    const protestId = `PRT-${Date.now().toString().slice(-5)}`;
    console.log("Protest Submitted:", { id: protestId, ...data });

    return { 
        success: true, 
        message: "Protes Anda berhasil dicatat dan sedang menunggu verifikasi pembayaran deposit.",
        protestId: protestId
    };
}

    