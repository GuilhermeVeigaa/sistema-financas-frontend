'use client'

import React, { useEffect, useState } from 'react'
import { getUser } from '@/auth/getUser';
import Card from '@/components/Card';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaDollarSign } from 'react-icons/fa';
import ExpensesForm from '@/components/ExpensesForm';
import ExpensesGrid from '@/components/ExpensesGrid';
import axios from 'axios';

interface Expense {
  desc: string;
  value: number;
}


export default function page() {

  const [userName, setUserName] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [onEdit, setOnEdit] = useState(null)

  useEffect(() => {
    const name = getUser.get()
    if (name) {
      setUserName(name)
    }
  }, [])

  const getExpenses = async () => {
    try {
      const res = await axios.get<Expense[]>("http://localhost:8800/expenses")
      setExpenses(res.data.sort((a, b) => a.desc.localeCompare(b.desc)))
    } catch (err) {
      console.error("erro ao carreagar despesas", err)
    }
  }

  useEffect(() => {
    getExpenses()
  }, [])

  return (
    <main>
      <header className='w-full h-24 bg-red-800 flex'>
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
                  <p className='font-bold text-white pe-12'>{userName}</p>
                </div>

                <picture className='rounded-full'>
                  <img src="" alt="user image" />
                </picture>
              </div>
          </div>
      </header>

      <section className='flex mt-5 gap-2 mx-2'>
          <Card>
            <div className='flex'>
              <p className='text-black font-semibold'>Entradas</p>

              <picture>
                <FaRegArrowAltCircleUp />
              </picture>
            </div>

            <div className='text-center pt-5'>
              <span className='font-bold text-lg text-green-600'>Valor</span>
            </div>
          </Card>

          <Card>
          <div className='flex'>
              <p className='text-black font-semibold'>Saídas</p>

              <picture>
                <FaRegArrowAltCircleDown />
              </picture>
            </div>

            <div className='text-center pt-5'>
              <span className='font-bold text-lg text-red-700'>Valor</span>
            </div>
          </Card>

          <Card>
          <div className='flex'>
              <p className='text-black font-semibold'>Total</p>

              <picture>
                <FaDollarSign />
              </picture>
            </div>

            <div className='text-center pt-5'>
              <span className='font-bold text-lg text-black'>Valor</span>
            </div>
          </Card>
      </section>

      <section>
        <ExpensesForm onEdit={onEdit} setOnEdit={setOnEdit} getExpenses={getExpenses}/>
      </section>

      <section>
        <ExpensesGrid expenses={expenses} setExpenses={setExpenses} setOnEdit={setOnEdit}/>
      </section>
    </main>
  )
}
