export interface User {
    uid: string;
    name: string;
    email: string;
    emailVerified?: string;
    password: string;
    active: boolean;
    rol: string;
    image?: string|null;
    expiration?:Date;

}