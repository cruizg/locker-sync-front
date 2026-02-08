'use server';

import { auth } from '@/auth.config';
// import prisma from '@/lib/prisma';



export const getPaginatedOrders = async () => {

    const session = await auth();

    if (session?.user.rol !== 'admin') {
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
    const orders = [
        {
        id: 'sdd-3-ddsdsd',
        nombre: 'Orden1',
        OrderAddress: {
            firstName: 'christian',
            lastName: 'Ruis'
        },
        isPaid: true
    },
    {
        id: 'sdd-3-ddslo9-oek',
        nombre: 'Orden2',
        OrderAddress: {
            firstName: 'christian 2',
            lastName: 'Ruiz 2'
        },
        isPaid: false
    }
]


    return {
        ok: true,
        orders: orders,
    }


}