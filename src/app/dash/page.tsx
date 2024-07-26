'use client'

import { getUser } from "@/auth/getUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { tokenService } from "@/auth/tokenService";


export default function Home() {

  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = tokenService.get();

    if (!token) {
      router.push('/login');
      return;
    } else {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    const name = getUser.get()
    if (name) {
      setUserName(name)
    }
  })

  if (loading) {
    return <div className="flex justify-center text-red-500 font-bold text-9xl">Loading...</div>
  }

  return (
    <main className="w-full h-screen">
      <div className="pt-10 flex text-center w-full justify-center gap-2">
        <h1 className="text-slate-200 text-xl font-bold">Bem-vindo ao seu Web App de controle de Finanças</h1>

        <h1 className="text-purple-500 text-xl font-bold">
          {userName}
        </h1>
      </div>

      <div className="flex justify-center mt-[100px]">
        <div className="card bg-base-100 image-full w-96 min-h-96 shadow-xl">
          <figure>
            <img src="https://img.freepik.com/vetores-gratis/conceito-de-ilustracao-de-financas_114360-769.jpg?w=740&t=st=1721854236~exp=1721854836~hmac=792df1a4528551d57cb10123a7dbbe39a5b724e4b8e231ef0218975a25a87461" alt="finanças imagem" />
          </figure>
          <div className="px-4 pt-4">
              <h3 className="text-black font-semibold pt-[0.2rem] text-center">O controle das suas finanças começa agora!</h3>
          </div>

          <div className="card-body items-center justify-center text-center">
            <div className="card-actions flex flex-col gap-5">
              <button
               type="button" 
               onClick={() => router.push('/dash/expenses')} 
               className="btn btn-primary w-40 h-[3.5rem] text-[16px]">
                Acessar</button>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
