'use server';

import { auth } from '@/auth.config';

export const getDownloadItem = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return { ok: false, message: 'Unauthorized' };
  }

  return {
    ok: true,
    url: `${process.env.URL_BACKEND}/api/items/download/${id}`,
    token: session.user.token,
  };
};