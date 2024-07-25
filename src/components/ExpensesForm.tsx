import { FormEvent, useEffect, useRef, useState } from "react";
import { authService } from "@/auth/authService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ExpensesForm({ onEdit, setOnEdit, getExpenses }:any) {

    const CreateExpensesSchema = z.object({
      desc: z.string(),
      value: z.coerce.number()
    });

    type CreateExpensesSchema = z.infer<typeof CreateExpensesSchema>

    const { register, handleSubmit } = useForm<CreateExpensesSchema>({
      resolver: zodResolver(CreateExpensesSchema),
    });

    function handleCreateExpenses(data: CreateExpensesSchema, e: any) {
      e.preventDefault()

      const desc = data.desc;
      const value = data.value;

      authService.addExpenses({
        desc,
        value,
      })
      .then( () => {
        alert("Despesa/Receita criada com sucesso")
        getExpenses()
      })
      .catch((error) => {
        alert(error.message || "Erro ao criar despesa")
        console.log(error)
      })
    };

  return (
    <form onSubmit={handleSubmit(handleCreateExpenses)} className="max-w-[1120px] bg-white m-5 w-[98%] py-4 gap-2 flex justify-around">
        <div className="flex flex-col">
            <span className="text-zinc-950 font-semibold">Descrição</span>

            <input
             className="bg-white border border-zinc-950 rounded-md h-8 w-72 text-black"
             type="text" 
             { ...register('desc') } />
        </div>

        <div className='flex flex-col align-middle'>
            <span className="text-zinc-950 font-semibold">Valor</span>

            <input
             className='bg-white border border-zinc-950 rounded-md h-8 w-72 text-black' 
             type="number"
             { ...register('value') } />
        </div>

        <div className='flex gap-3 pt-5'>
            <div className='flex gap-1'>
                <input type="checkbox" className="checkbox checkbox-success bg-green-300"/>
                <span>
                Entrada
                </span>
            </div>

            <div className='flex gap-1'>
                <input type="checkbox" className="checkbox checkbox-success bg-green-300" />
                <span>
                Saída
                </span>
            </div>
        </div>

        <button type="submit" className='btn btn-primary mt-2'>Salvar</button>
    </form>
  )
}
