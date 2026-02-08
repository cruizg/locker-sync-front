'use client';
import { titlefont } from '@/config/fonts'
import { useUIStore } from '@/store'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'

const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu);
  const { data: session } = useSession();
  const avatarSrc = session?.user?.logo || "/imgs/user-not-found.jpeg"; // Ruta de la imagen por defecto


  return (
    <nav className='flex px-5 justify-between items-center w-full bg-blue-400'>
      {/* Logo */}
      <div>
        <Link
          href="/">
          <span className={`${titlefont.className} antialiased font-bold`} >RIMAC</span>
          {/* <span >| Soluciones Tecnologicas</span> */}
        </Link>
      </div>
      <div className="hidden sm:block">
        {/* <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/men">Hombres</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/women">Mujeres</Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/kid">Ni;os</Link> */}
      </div>
      {/* search, Cart , Menu */}
      <div className='flex items-center'>
        {/* <Link className='mx-2' href="/search">
          <IoSearchOutline className='w-5 h-5' />
        </Link> 
        <Link className='mx-2' href="/cart">
          <div className='relative'>
            <span className='absolute text-xs px-1 rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
              3
            </span>
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link> */}

        <button
          onClick={openSideMenu}
          className='flex items-center m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          {session?.user ? (
            <>
              <img
                src={avatarSrc}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-4 border-gray-200"
              />
              <span className='ml-3 text-xl flex-1'>{session?.user.name}</span>
            </>
          ) : (
            <span className='ml-3 text-xl flex-1'>Menu</span>
          )}
        </button>
      </div>
    </nav>
  )
}

export default TopMenu
