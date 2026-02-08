'use server';



import { signIn } from '@/auth.config';

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // console.log("ENTRO ACA")
        // await sleep(2);
        // console.log({formData:Object.fromEntries(formData)});
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });
        return 'Success';

    } catch (error) {
        console.log(error);
        if ((error as any).type === 'CredentialsSignin') {
            return 'CredentialsSignin';
        }
        return 'UnknowError';
        // return 'CredentialsSignin'
    }
}

export const login = async (email: string, password: string) => {

    try {
        await signIn('credentials', { email, password });
        return { ok: true };
    } catch (error) {
        // console.log(error);
        return {
            ok: false,
            msg: ' No se pudo iniciar sesion'
        }

    }

}