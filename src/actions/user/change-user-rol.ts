'use server';

import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';

export const changeUserRol = async (userId: string, rol: string) => {

    const session = await auth();

    if (session?.user.rol !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    try {

        const newRol = rol === 'admin' ? 'admin' : 'user';
        const url=`${process.env.URL_BACKEND}/api/users/${userId}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
                'Content-Type': 'application/json', // Agrega este encabezado para especificar que el cuerpo es JSON
            },
            body: JSON.stringify({ rol: newRol }),
        });
        const data = await response.json();
        // console.log({data});
   
        revalidatePath('/admin/users');

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el role, revisar logs'
        }
    }

}