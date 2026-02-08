import NextAuth, { DefaultSession } from "next-auth";
declare module 'next-auth' {
    interface Session {
        user: {
            ok: boolean;
            uid: string;
            name: string;
            email: string;
            rol: string;
            logo?: string;
            avatar?: string;
            last_login?: string;
            active: boolean;
            token: string;
        } & DefaultSession['user']

    }
}