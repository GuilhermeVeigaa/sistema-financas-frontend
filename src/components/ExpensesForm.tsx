import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { authService } from "@/auth/authService"

export default function ExpensesForm({ onEdit, setOnEdit, getExpenses }:any) {

    

    const [desc, setDesc] = useState('')
    const [value, setValue] = useState('')

  return (
    <form onSubmit={(e) => {
        e.preventDefault();

        authService.addExpenses({
          desc,
          value,
        }).then(() => {
          alert("Receita cadastrada com sucesso")
        }).catch((err) => {
          console.error(err)
          alert("erro ao cadastrar receita")
        })
      }} className="max-w-[1120px] bg-white m-5 w-[98%] py-4 gap-2 flex justify-around">
        <div className="flex flex-col">
            <span className="text-zinc-950 font-semibold">Descrição</span>

            <input onChange={(e) => {setDesc(e.target.value)}} className="bg-white border border-zinc-950 rounded-md h-8 w-72 text-black" type="text" name="desc" />
        </div>

        <div className='flex flex-col align-middle'>
            <span className="text-zinc-950 font-semibold">
                Valor
            </span>
            <input onChange={(e) => {setValue(e.target.value)}} className='bg-white border border-zinc-950 rounded-md h-8 w-72 text-black' type="number" name="value" />
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
