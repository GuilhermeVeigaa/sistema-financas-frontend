'use client'

import { authService } from "@/auth/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {

  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex justify-center mt-[100px]">
        <div className="card bg-slate-200 w-96 min-h-96 shadow-xl">
          <div className="pt-14">
              <h3 className="text-zinc-900 font-bold text-xl pt-[0.2rem] text-center">Login</h3>
          </div>
          
          <div className="card-body items-center justify-center text-center">
            <div className="card-actions flex flex-col gap-5">
              <form 
               className="" 
               onSubmit={(e) => {
                e.preventDefault();
                
                authService.login({
                  email,
                  password,
                }).then(() => {
                  router.push('/register')
                }).catch(() => {
                  alert('Credenciais inválidas')
                })
              }}>
                <div className="pb-2 flex flex-col">
                  <span className="text-start text-zinc-800 font-semibold">Email</span>

                  <input onChange={(e) => {setEmail(e.target.value)}} className="h-[2.2rem] w-72 bg-slate-200 border border-zinc-800 rounded-md text-black px-2" type="email" name="email"/>
                </div>

                <div className="flex flex-col">
                  <span className="text-start text-zinc-800 font-semibold">Senha</span>

                  <input onChange={(e) => {setPassword(e.target.value)}} className="bg-slate-200 border border-zinc-800 rounded-md px-2 text-black h-[2.2rem] w-72" type="password" name="password"/>
                </div>

                <div>
                  <button type="submit" className="btn btn-primary mt-10 w-40 h-[3.5rem] text-[16px]">Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
