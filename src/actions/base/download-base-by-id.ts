'use server';

import { auth } from '@/auth.config';

export const downloadBaseById = async (baseId: any) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    const url = `${process.env.URL_BACKEND}/api/files/${baseId}/descargar`;

    const response: any = await fetch(url, {
        method: 'GET',
        headers: {
            'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
        },
    });
    const blob = await response.text();  
    return blob;


}