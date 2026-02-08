import { titlefont } from '@/config/fonts'
import Link from 'next/link'
import React from 'react'
// <span className={`${titlefont.className} antialiased font-bold `} >GCC TECHNOLOGY</span>

export const Alert = ({ message, visible, closeAlert }: any) => {
    // console.log({visible})
    return (
        <div className={`flex flex-col gap-4 ${visible ? "" : "hidden"}`}>
            {visible && (
                <div className="flex rounded-md bg-blue-50 p-4 text-sm text-blue-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>
                    <div className={`${titlefont.className} antialiased font-bold `} >{message}</div>
                    <button
                        onClick={closeAlert}
                        className="ml-auto mr-2 text-blue-500 hover:text-blue-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>



    )
}