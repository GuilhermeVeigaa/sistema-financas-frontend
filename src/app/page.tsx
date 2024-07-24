'use client'

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  return (
    <main className="w-full h-screen">
      <div className="text-center pt-10">
        <h1 className="text-slate-200 text-xl font-bold">Bem-vindo ao seu Web App de controle de Finanças</h1>
      </div>

      <div className="flex justify-center mt-[100px]">
        <div className="card bg-slate-200 w-96 min-h-96 shadow-xl">
          <div className="px-4 pt-4">
              <h3 className="text-zinc-600 font-semibold pt-[0.2rem]">Entre ou registre-se para ter controle total da sua vida financeira</h3>
          </div>

          <div className="card-body items-center justify-center text-center">
            <div className="card-actions flex flex-col gap-5">
              <button
               type="button" 
               onClick={() => router.push('/login')} 
               className="btn btn-primary w-40 h-[3.5rem] text-[16px]">
                Entrar</button>

              <button
               type="button" 
               onClick={() => router.push('/register')}
                className="btn btn-primary w-40 h-[3.5rem] text-[16px]">
                  Registrar</button>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
