'use server';

import { auth } from '@/auth.config';

export const getItemName = async (id: string) => {
    const session = await auth();
    if (!session?.user) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.URL_BACKEND}/api/items/${id}`, {
            method: 'GET',
            headers: {
                'x-token': session.user.token,
            },
        });

        const data = await response.json();
        console.log({datita:data})
        if (data.ok) {
            return data.item.name;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching item name:', error);
        return null;
    }
};
