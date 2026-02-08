import axios, { AxiosInstance } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const serviceApi = (token: string | null) => {
  const baseURL = process.env.URL_BACKEND || 'http://localhost:3000';

  const api: AxiosInstance = axios.create({ baseURL });
  api.defaults.timeout = 25000;

  const refreshAuthLogic = async () => {
    // Evita la ejecución en el servidor
    if (typeof window !== 'undefined' && token) {
      try {
        const response = await axios.get(`${baseURL}/api/users/auth`, {
          headers: {
            'x-token': token,
          },
        });
        // Actualiza el token si la respuesta es exitosa
        if (response.data && response.data.token) {
          token = response.data.token;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }

    return Promise.resolve();
  };

  createAuthRefreshInterceptor(api, refreshAuthLogic, {
    statusCodes: [401],
  });
//   console.log({api})
  return api;
};

export default serviceApi;
