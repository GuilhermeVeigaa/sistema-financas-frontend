'use client'

import React, { useEffect, useState } from 'react'
import { getUser } from '@/auth/getUser';
import Card from '@/components/Card';
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaDollarSign } from 'react-icons/fa';
import ExpensesForm from '@/components/ExpensesForm';
import ExpensesGrid from '@/components/ExpensesGrid';
import axios from 'axios';
import { tokenService } from '@/auth/tokenService';


interface Expense {
  desc: string;
  value: number;
  type: string
}


export default function page() {

  const [userName, setUserName] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [onEdit, setOnEdit] = useState(null);

  const [valuesByType, SetValuesByType] = useState<{ [key: string]: number[] }>({});
  const [totalByType, setTotalByType] = useState<{ [key: string]: number }>({});
  
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);

  useEffect(() => {
    const name = getUser.get()
    if (name) {
      setUserName(name)
    }
  }, [])

  const getExpenses = async () => {
    try {

      const token = tokenService.get()

      if (!token) {
        throw new Error("Token não encontrado")
      };

      const res = await axios.get<Expense[]>("http://localhost:8800/expenses", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )
      const sortedExpenses = res.data.sort((a, b) => a.desc.localeCompare(b.desc))
      setExpenses(sortedExpenses)

      const valuesByType: { [key: string]: number[] } = {};
      sortedExpenses.forEach(expenses => {
        if(!valuesByType[expenses.type]) {
          valuesByType[expenses.type] = [];
        }
        valuesByType[expenses.type].push(expenses.value);
      });

      SetValuesByType(valuesByType);
    } catch (err) {
      console.error("erro ao carreagar despesas", err)
    }
  }

  const calculateTotalValuesByType = (valuesByType: { [key: string]: number[] }) => {
    const totals: { [key: string]: number } = {}

    for (const type in valuesByType) {
      totals[type] = valuesByType[type].reduce((acc, curr) => acc + curr, 0);
    }

    setTotalByType(totals);
  }

  useEffect(() => {
    getExpenses()
  }, []);

  useEffect(() => {
    calculateTotalValuesByType(valuesByType)
  }, [valuesByType]);

  useEffect(() => {
    let totalEntrada = 0;
    let totalSaida = 0;
    expenses.forEach(expenses => {
      if (expenses.type === "entrada") {
        totalEntrada += expenses.value;
      } else if (expenses.type === "saida") {
        totalSaida += expenses.value;
      }
    });

    setEntrada(totalEntrada);
    setSaida(totalSaida);
  }, [expenses]);

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
              <span className='font-bold text-lg text-green-600'>{entrada}</span>
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
              <span className='font-bold text-lg text-red-700'>{saida * -1}</span>
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
              <span className='font-bold text-lg text-black'>{entrada + (saida * -1)}</span>
            </div>
          </Card>
      </section>

      <section>
        <ExpensesForm onEdit={onEdit} setOnEdit={setOnEdit} getExpenses={getExpenses}/>
      </section>

      <section>
        <ExpensesGrid expenses={expenses} setExpenses={setExpenses} setOnEdit={setOnEdit} getExpenses={getExpenses} />
      </section>
    </main>
  )
}
