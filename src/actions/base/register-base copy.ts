'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const registerBase = async (formData: any) => {

    const session = await auth();
    // console.log(session?.user.token)
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    formData.append('usuario', session?.user.uid);
    const response = await fetch(`${process.env.URL_BACKEND}/api/files/upload`, {
        method: 'POST',
        headers: {
            'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
        },
        body: formData,
    });
    // console.log({response:response.json()})
    const data = await response.json();
    console.log(data);
    if (data.ok) {
        // La solicitud fue exitosa
        // console.log(data);
        return { data }
    } else {
        // La solicitud falló
        console.error('Error en la solicitud:', response.statusText);
        // return { ok: false, message: 'Error en la solicitud:' }
        return { data }

    }

}