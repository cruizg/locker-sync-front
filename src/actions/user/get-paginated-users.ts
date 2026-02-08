'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const getPaginatedUsers = async (page: any) => {

    const session = await auth();

    if (session?.user.rol !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    // const users = [
    //     {
    //         id: 'sdd-3-4343-5454-434dss',
    //         name: 'Prueba1',
    //         email: 'oli@oli.com',
    //         emailVerified: 'oli',
    //         password: 'oli',
    //         rol: 'admin',
    //         image: 'rutadeimagen',
    //     },
    //     {
    //         id: 'sdd-3-ddsdsd',
    //         name: 'Prueba2',
    //         email: 'oli2@oli2.com',
    //         emailVerified: 'oli',
    //         password: 'oli',
    //         rol: 'user',
    //         image: 'rutadeimagen',
    //     },
    // ]
    const params: any = {
        page
    };
    const queryString = Object.keys(params)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    const url = `${process.env.URL_BACKEND}/api/users?${queryString}`;

    const response: any = await fetch(url, {
        method: 'GET',
        headers: {
            'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
        },
    });
    const data = await response.json();

    return {
        ok: true,
        total: Math.ceil(data.total / 10),
        users: data.usuarios,
    }


}