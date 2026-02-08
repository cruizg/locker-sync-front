'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const getPaginatedItems = async (page = 1, path = null) => {

    const session = await auth();
    const params: any = {
        pagina: page,
        path
    };
    // console.log(session?.user.token)
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    if (path === "/") {
        delete params.path
    }

    // console.log({ params });
    // console.log("SE EJECUTARA EL CODIGO DE LA PAGINA : ",page)
    const queryString = Object.keys(params)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    const url = `${process.env.URL_BACKEND}/api/items?${queryString}`;
    console.log({ queryString })
    const response: any = await fetch(url, {
        method: 'GET',
        headers: {
            'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
        },
    });
    const items = await response.json();

    // console.log(data);
    if (items.ok) {
        // La solicitud fue exitosa
        // console.log(data);
        return {
            ok: true,
            total: Math.ceil(items.total / 10),
            items
        }
    } else {
        // La solicitud falló
        console.error('Error en la solicitud:', response.statusText);
        // return { ok: false, message: 'Error en la solicitud:' }
        return { items }

    }

}