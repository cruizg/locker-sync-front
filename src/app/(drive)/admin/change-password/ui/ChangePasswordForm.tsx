'use client';

// import {  login, registerUser } from '@/actions';
// import { Alert } from '@/components';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

type FormInputs = {
    password: string
    repassword: string
}

export const ChangePasswordForm = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('')
    const [message, setMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [alertVisible, setAlertVisible] = useState(false);
    const closeAlert = () => {
        setAlertVisible(false);
        setErrorMessage('');
    };
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('')
        const { password, repassword } = data;
        console.log({ password, repassword });
        if (password !== repassword) {
            setErrorMessage('Ambos passwords deben ser iguales');
            // console.log('Tiene que ingresar el mismo password');
            return;
        }
        // const resp = await changeUserPassword(password);
        // console.log({ resp })
        // if (!resp.ok) {
        //     // setErrorMessage(resp.message);
        //     return;
        // } else {
        //     setMessage('Password actualizado correctamente');
        //     setAlertVisible(true);
        // }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="w-full sm:w-1/2 mb-2">
                {/* <Alert message={message} visible={alertVisible} closeAlert={closeAlert} /> */}
                <div className="flex flex-col">
                    <label htmlFor="email">Ingrese la Contraseña</label>
                    <input
                        className={
                            clsx(
                                "px-5 py-2 border bg-gray-200 rounded mb-5",
                                {
                                    "border-red-500": !!errors.password
                                }
                            )
                        }
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                    <label htmlFor="email">Ingrese nuevamente la Contraseña</label>
                    <input
                        className={
                            clsx(
                                "px-5 py-2 border bg-gray-200 rounded mb-5",
                                {
                                    "border-red-500": !!errors.password
                                }
                            )
                        }
                        type="password"
                        {...register('repassword', { required: true, minLength: 6 })}
                    />
                    <span className='text-red-500'>{errorMessage}</span>

                    <button

                        className="btn-primary">
                        Actualizar
                    </button>
                </div>
            </div>
        </form>
    )
}
