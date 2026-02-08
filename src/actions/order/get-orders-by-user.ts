'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const getOrdersByUser = async () => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    //   const orders = await prisma.order.findMany({
    //     where: {
    //       userId: session.user.id
    //     },
    //     include: {
    //       OrderAddress: {
    //         select: {
    //           firstName: true,
    //           lastName: true
    //         }
    //       }
    //     }
    //   })
    const orders = {
        id:'sdd-3-ddsdsd',
        nombre: 'Orden1',
        OrderAddress:{
            firstName:'christian',
            lastName:'Ruis'
        },
        isPaid:true
    }


    return {
        ok: true,
        orders: [orders],
    }


}