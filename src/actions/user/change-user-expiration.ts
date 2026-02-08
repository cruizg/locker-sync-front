'use server';

import { auth } from '@/auth.config';
import { addMonths } from 'date-fns';
import { revalidatePath } from 'next/cache';

export const changeUserExpiration = async (userId: string, expiration?: Date) => {

    const session = await auth();

    if (session?.user.rol !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    try {
        if (expiration) {
            console.log({expiration});

            // const nextMonth = addMonths(expiration, 1); // Aumenta un mes a la fecha actual
            const nextMonthExpiration = addMonths(new Date(expiration), 1);
            const url = `${process.env.URL_BACKEND}/api/users/${userId}`
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
                    'Content-Type': 'application/json', // Agrega este encabezado para especificar que el cuerpo es JSON
                },
                body: JSON.stringify({ expiration: nextMonthExpiration }),
            });
            const data = await response.json();
            console.log({data});

            revalidatePath('/admin/users');

            return {
                ok: true
            }
        } else { 
            return;
        }


    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el role, revisar logs'
        }
    }

}