'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const getLinea = async (formData: any) => {

    const session = await auth();
    // console.log(session?.user.token)
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    // formData.append('usuario', session?.user.uid);
    // formData.get('nombre');
    // formData.get('tipo');

    const params: any = {
        phoneNumber: formData.get('nombre')
    };
    const queryString = Object.keys(params)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
    const url = `${process.env.URL_BACKEND}/api/configuraciones/movil?${queryString}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'x-token': session?.user.token,  // Reemplaza 'tu_token_aqui' con tu token real
            'Content-Type': 'application/json', // Agrega este encabezado para especificar que el cuerpo es JSON
        },
    });
    // console.log({response:response.json()})
    const data = await response.json();
    // console.log(data);
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