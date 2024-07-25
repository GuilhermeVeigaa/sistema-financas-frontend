import { useEffect, useRef, useState } from "react";
import { authService } from "@/auth/authService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ExpensesForm({ onEdit, setOnEdit, getExpenses }:any) {

    const CreateExpensesSchema = z.object({
      desc: z.string().min(1, "Descrição obrigatória"),
      value: z.coerce.number().min(1, "Valor obrigatório")
    });

    type CreateExpensesSchema = z.infer<typeof CreateExpensesSchema>

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateExpensesSchema>({
      resolver: zodResolver(CreateExpensesSchema),
    });

    const [type, setType] = useState<"entrada" | "saida" | null>(null)

    useEffect(() => {
      if (onEdit) {
        setValue("desc", onEdit.desc);
        setValue("value", onEdit.value);

        setType(onEdit.type);
      }
    },[onEdit, setValue])

    function handleCreateExpenses(data: CreateExpensesSchema, e: any) {
      e.preventDefault()

      const desc = data.desc;
      const value = data.value;

      if (onEdit) {
        const id = onEdit.id;
        authService.updateExpenses({
          desc,
          value,
          id,
        })
        .then( () => {
          alert("Despesa/Receitra atualizada com sucesso")
          getExpenses()
          setOnEdit(null)
          setType(null)
        })
        .catch((err) => {
          alert(err.message || "Erro ao atualizar despesa")
          console.log(err)
        })
      } else {

        authService.addExpenses({
          desc,
          value,
        })
        .then( () => {
          alert("Despesa/Receita criada com sucesso")
          getExpenses()
          setOnEdit(null)
          setType(null)
        })
        .catch((error) => {
          alert(error.message || "Erro ao criar despesa")
          console.log(error)
        })
      }
    };

    function handleTypeChange(type: "entrada" | "saida") {
      setType(type);
    }


  return (
    <form onSubmit={handleSubmit(handleCreateExpenses)} className="max-w-[1120px] bg-white m-5 w-[98%] py-4 gap-2 flex justify-around">
        <div className="flex flex-col">
            <span className="text-zinc-950 font-semibold">Descrição</span>

            <input
             className="bg-white border border-zinc-950 rounded-md h-8 w-72 text-black"
             type="text" 
             { ...register('desc') } />
             {errors.desc && <span className="pt-2 text-zinc-900">{errors.desc.message}</span>}
        </div>

        <div className='flex flex-col align-middle'>
            <span className="text-zinc-950 font-semibold">Valor</span>

            <input
             className='bg-white border border-zinc-950 rounded-md h-8 w-72 text-black' 
             type="number"
             { ...register('value') } />
             {errors.value && <span className="pt-2 text-zinc-900">{errors.value.message}</span>}
        </div>

        <div className='flex gap-3 pt-5'>
            <div className='flex gap-1'>
                <input 
                type="checkbox" 
                className="checkbox checkbox-success bg-green-300"
                checked={type === "entrada"}
                onChange={() => handleTypeChange("entrada")} />
                <span>
                Entrada
                </span>
            </div>

            <div className='flex gap-1'>
                <input 
                type="checkbox" 
                className="checkbox checkbox-success bg-green-300"
                checked={type === "saida"}
                onChange={() => handleTypeChange("saida")} />
                <span>
                Saída
                </span>
            </div>
        </div>

        <button type="submit" className='btn btn-primary mt-2'>Salvar</button>
    </form>
  )
}
