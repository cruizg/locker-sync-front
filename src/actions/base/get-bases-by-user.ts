'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const getBasesByUser = async (page: any) => {

    const session = await auth();
    // console.log(session?.user.uid)
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    const params: any = {
        tipo: 'movil',
        page
    };
    console.log("Entro por aca a obtener datos de la pagina: ", page)
    const queryString = Object.keys(params)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    const url = `${process.env.URL_BACKEND}/api/files?${queryString}`;

    const response: any = await fetch(url, {
        method: 'GET',
        headers: {
            'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
            // 'x-token': 'oli',  // Reemplaza 'tu_token_aqui' con tu token real
        },
    });
    const data = await response.json();
    // console.log(data);
    if (!data.ok && data.mensaje) {
        return {
            ok: false,
            message: 'Enviarlo a Login'
        }
    }
    // console.log('ceil',Math.ceil(5 / 10));
    return {
        ok: true,
        userId:session?.user.uid,
        bases: data.files,
        total: Math.ceil(data.total / 10)
    }

}