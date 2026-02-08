import { titlefont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className='flex w-full justify-center text-xs mb-10'>
            <Link
                href='/'
            >
                <span className={`${titlefont.className} antialiased font-bold `} >GCC TECHNOLOGY</span>
                {/* <span>| shop</span> */}
                <span> © {new Date().getFullYear()}</span>
            </Link>
            <Link
                href='/'
                className='mx-3'
            >
                Privacidad & Legal
            </Link>
            <Link
                href='/'
                className='mx-3'
            >
                Ubicaciones
            </Link>
        </div>
    )
}