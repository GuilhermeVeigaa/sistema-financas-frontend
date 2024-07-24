'use client'

import React, { useEffect, useState } from 'react'
import { getUser } from '@/auth/getUser';

export default function page() {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = getUser.get()
    if (name) {
      setUserName(name)
    }
  })

  return (
    <main>
      <header className='w-full h-24 bg-purple-800 flex'>
          <div className='flex w-full justify-start items-center px-10 py-5'>
            <p className='font-semibold text-white'>
              Seja Bem-Vindo
            </p>
          </div>

          <div className='flex w-full justify-end items-center px-10 py-5'>
              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  <p className='font-semibold text-white'>
                    Usuário:
                  </p>
                  <p className='font-bold text-green-400 pe-12'>{userName}</p>
                </div>

                <picture className='rounded-full'>
                  <img src="" alt="user image" />
                </picture>
              </div>
          </div>
      </header>
    </main>
  )
}
