import axios from 'axios';
import { getSession } from 'next-auth/react';
import { auth } from "@/auth.config";
// TODO: MANEJO DE REFRESCAR TOKEN CUANDO EXPIRA
const baseURL = process.env.NEXT_PUBLIC_URL_BACKEND || 'http://localhost:3000';

export const serviceApi = axios.create({ baseURL });
serviceApi.defaults.timeout = 25000; // 25 segundos de timeout

serviceApi.interceptors.request.use(
  async (config: any) => {
    let session;

    if (typeof window === 'undefined') {
      // Estamos en el lado del servidor
      session = await auth();
      if (session?.user?.token) {
        config.headers['x-token'] = session.user.token;
      }
    } else {
      // Estamos en el lado del cliente
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['x-token'] = token;
      }
      // session = await getSession();
    }
    // if (session?.user?.token) {
    //   config.headers['x-token'] = token;
    //   // config.headers['x-token'] = session.user.token;
    // }
    // console.log({config})
    return config;
  }
);
export default serviceApi;


