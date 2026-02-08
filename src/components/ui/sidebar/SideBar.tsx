'use client';
import { logout } from '@/actions';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { IoIosCloseCircleOutline, IoIosSearch, IoMdDocument } from 'react-icons/io'
import { IoFileTrayStackedOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearch, IoSearchCircle, IoSearchCircleOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

export const SideBar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    const { data: session } = useSession();
    // console.log({session});
    const isAutenticated = !!session?.user;
    const isAdmin = (session?.user.rol === 'admin');
    // console.log({ isAutenticated });
    // console.log({ isAdmin });
    return (
        <div>
            {/* Black Background */}
            {isSideMenuOpen && (
                <div
                    className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
                />)}


            {/* Blur */}
            {isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
                />
            )}


            {/* Side Menu */}
            <nav
                //TODO: efecto de slide
                // style={{
                //     // maxHeight: 'calc(100vh - 70px)', // ajusta la altura según tus necesidades
                //     overflowY: 'auto', // añade desbordamiento vertical
                // }}
                className={
                    clsx('fixed p-5 right-0 top-0 w-[50%] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }
            >
                <div>
                    <IoIosCloseCircleOutline
                        size={50}
                        className='absolute top-5 right-5 cursor-pointer'
                        onClick={closeMenu}
                    />

                </div>

                {/* Menu */}
                {isAutenticated && (

                    <>

                        <Link
                            href='/profile'
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            onClick={closeMenu}
                        >
                            <IoPersonOutline size={30} />
                            <span className='ml-3 text-xl'>Perfil</span>
                        </Link>
                        <Link
                            href='/bases'
                            onClick={closeMenu}
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoFileTrayStackedOutline size={30} />
                            <span className='ml-3 text-xl'>Bases</span>
                        </Link>
                        <Link
                            href='/linea'
                            onClick={closeMenu}
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoSearch size={30} />
                            <span className='ml-3 text-xl'>Consultar Linea</span>
                        </Link>


                    </>
                )}
                {
                    isAutenticated && (
                        <button
                            // href='/'
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            onClick={() => logout()}
                        >
                            <IoLogOutOutline size={30} />
                            <span className='ml-3 text-xl'>Salir</span>
                        </button>

                    )

                }
                {
                    !isAutenticated && (
                        <Link
                            href='/auth/login'
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            onClick={closeMenu}
                        >
                            <IoLogInOutline size={30} />
                            <span className='ml-3 text-xl'>Ingresar</span>
                        </Link>

                    )

                }



                {/* {isAdmin && ( */}
                    <>
                        {/* Line Separetor */}

                        <div className='w-full h-px bg-gray-200 my-10' />
                        <Link
                            href="/admin/users"
                            onClick={closeMenu}
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoPeopleOutline size={30} />
                            <span className='ml-3 text-xl'>Usuarios</span>
                        </Link>
                    </>
                {/* )} */}


            </nav>
        </div>
    )
}

