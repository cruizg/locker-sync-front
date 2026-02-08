'use server';
import { auth } from '@/auth.config';

export const getLoginByUser = async () => {

    const session = await auth();
    // console.log({session});
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }
    try{
     const url = `${process.env.URL_BACKEND}/api/clients/${session?.user.uid}`;
     const response: any = await fetch(url, {
         method: 'GET',
         headers: {
             'x-token': session?.user.token,
         },
     });
    //  console.log("first")
     const cliente = await response.json();
    // console.log({ cliente });
    if(cliente.ok){
        return {
            ok: true,
            cliente,
        }
    }else{
        return {
            ok: false,
            cliente,
        }
    }
   
    }catch (error) {
        // Handle error
        console.error('Error:', error);
        return {
            ok: false,
            message: 'Error al obtener el cliente',
        };
    }
}