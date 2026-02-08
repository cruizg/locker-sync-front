import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { refreshToken } from './utils';
import api from './actions/api/service';
// import serviceApi from './actions/api/service';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  session: {
    strategy: "jwt",
    // maxAge: 10,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      // console.log('JWT')
      // console.log({ token, user });
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }) {
      // console.log({ session, token, user });
      session.user = token.data as any;
      return session;
    },



  },
  providers: [

    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        try {
          const response = await fetch(`${process.env.URL_BACKEND}/api/clients/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const respuesta = await response.json();

          if (respuesta.ok) {
            const user = {
              ...respuesta.cliente,
              token: respuesta.token
            }
            // console.log({ user })
            return user;
          } else {
            // Manejar caso en el que el inicio de sesión no fue exitoso
            console.log('Error', respuesta)
            // return (respuesta);
            return null;
          }
        } catch (error) {
          // Manejar errores de la llamada al API
          console.error('Error al llamar al API de login:', error);
          return null;
        }
      },

    },),

  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);