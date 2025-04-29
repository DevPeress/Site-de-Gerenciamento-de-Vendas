'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import AuthGuard from "@/components/rota";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Usuario {
  nome: string,
  loc: string,
  horario: string,
  foto: string
}

export default function Conta() {
  const router = useRouter();
  const [dados,setDados] = useState<Usuario>()

  useEffect(() => {
    document.title = "Sua Conta"

    fetch(`/api/infos`)
    .then(res => res.json())
    .then(data => {
      const userId = data.id;

      if (!userId || userId === 0) {
        router.push('/login');
      } 

      return fetch(`/api/pegarUsuario?id=${userId}`);
    })
    .then(res => res.json())
    .then(data =>  { setDados(data) })
    .catch((err) => { Notify("Não foi encontrado os dados! Recarregue a Página") })
  },[])

  return (
    <>
      <SideBar />
      <Pagina> 
        {dados ? 
          <>
            <div className="flex absolute w-120 h-80 top-10 left-60 bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
              <Image
                className="absolute w-20 top-10"
                src={dados.foto}
                alt={`Ícone da conta`}
                width={180}
                height={38}
                priority
              />
              <h1 className="absolute text-[#111827] text-2xl">{dados.nome}</h1>
              <h2 className="absolute top-45 text-[#6B7280] text-[.75vw]">{dados.loc}</h2>
              <h2 className="absolute top-50 text-[#6B7280] text-[.75vw]">{dados.horario}</h2>
              <div className="flex absolute w-full h-15 bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[#5048E5] hover:scale-110">Trocar Foto</div>
            </div>
        
            <div className="flex absolute w-150 h-120 top-10 right-60 bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
              <div className="flex absolute w-full h-20 top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
                <h1 className="absolute left-20">Cabeçalho do cartão</h1>
              </div>
        
              <div className="grid absolute grid-cols-2 w-full h-auto gap-5 p-10">
                <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                  <h1 className="flex absolute w-25 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Primeiro Nome</h1>
                </div>
                <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                  <h1 className="flex absolute w-25 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Segundo Nome</h1>
                </div>
                <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                  <h1 className="flex absolute w-12 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Email</h1>
                </div>
                <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                  <h1 className="flex absolute w-12 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Idade</h1>
                </div>
                <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                  <h1 className="flex absolute w-12 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">País</h1>
                </div>
                <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                  <h1 className="flex absolute w-25 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Estado/Cidade</h1>
                </div>
              </div>
        
              <div className="flex absolute w-full h-20 bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[#5048E5]">
                <h1 className="flex absolute right-20 bg-[#5048E5] w-25 h-10 rounded-2xl text-[#FFFFFF] items-center justify-center hover:scale-110">Salvar</h1>
              </div>
            </div>
          </> 
          : 
          <>
            <>  
              <h1 className="text-center text-[1.5vw] text-gray-500">Carregando sua conta...</h1>
            </> 
          </>
        }
      </Pagina>
    </>
  )
}
