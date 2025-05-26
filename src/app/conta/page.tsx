'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
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

interface Infos {
  [x: string]: string | number | readonly string[] | undefined;
  nome: string,
  email: string,
  idade: string,
  rg: string,
  loc: string,
  celular: string,
  horario: string,
  foto: string
}

export default function Conta() {
  const router = useRouter();
  const [infos,setInfos] = useState<Infos>({nome: "", email: "", idade: "", rg: "", loc: "", celular: "", horario: "", foto: ""})

  useEffect(() => {
    document.title = "Sua Conta"

    fetch(`/api/infos`)
    .then(res => res.json())
    .then(data => {
      const userId: number = data.id;

      if (!userId || userId === 0) {
        router.push('/login');
      } 

      return fetch(`/api/pegarUsuario?id=${userId}`);
    })
    .then(res => res.json())
    .then(data =>  {
      setInfos({
        nome: data.nome, email: data.email, idade: data.idade, rg: data.rg, loc: data.loc, celular: data.celular, horario: data.horario, foto: data.foto
      })
    })
    .catch((err) => { Notify("Não foi encontrado os dados! Recarregue a Página") })
  },[])

  const tipos = [
    { texto: "Primeiro Nome", variavel: "nome" },
    { texto: "Email", variavel: "email" },
    { texto: "RG", variavel: "rg" },
    { texto: "Celular", variavel: "celular" },
    { texto: "Idade", variavel: "idade" },
    { texto: "Endereço", variavel: "loc" },
  ]

  const alterarDado = (tipo: string, valor: string) => {
    console.log(tipo)
    setInfos((prevDados) => ({
      ...prevDados,
      [tipo]: valor
    }))
  }

  const salvar = () => {
    fetch(`/api/atualizarUsuario`,{
      method: "PUT",
      body: JSON.stringify({
        nome: infos.nome,
        email: infos.email,
        loc: infos.loc,
        cell: infos.celular,
        rg: infos.rg,
        idade: infos.idade
      })
    })
    .then(res => res.json())
    .then(data => {
      Notify(data.mensagem)
    })
  }

  return (
    <>
      <SideBar />
      <Pagina> 
        
          <>
            <div className="flex absolute w-120 h-80 top-10 left-60 bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
              <Image
                className="absolute w-20 top-10"
                src={infos.foto}
                alt={`Ícone da conta`}
                width={180}
                height={38}
                priority
              />
              <h1 className="absolute text-[#111827] text-2xl">{infos.nome}</h1>
              <h2 className="absolute top-45 text-[#6B7280] text-[.75vw]">{infos.loc}</h2>
              <h2 className="absolute top-50 text-[#6B7280] text-[.75vw]">{infos.horario}</h2>
              <div className="flex absolute w-full h-15 bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[#5048E5] hover:scale-110">Trocar Foto</div>
            </div>
        
            <div className="flex absolute w-150 h-120 top-10 right-60 bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
              <div className="flex absolute w-full h-20 top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
                <h1 className="absolute left-20">Cabeçalho do cartão</h1>
              </div>
        
              <div className="grid absolute grid-cols-2 w-full h-auto gap-5 p-10">
                {tipos.map((item) => {
                    const tipo = item.variavel

                    return (<>
                      <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                        <h1 className="flex absolute w-25 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">{item.texto}</h1>
                        <input className="w-full h-full outline-0" type="text" value={infos.tipo} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </div>
                    </>)
                  }
                )}
              </div>
        
              <div className="flex absolute w-full h-20 bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[#5048E5]">
                <h1 className="flex absolute right-20 bg-[#5048E5] w-25 h-10 rounded-2xl text-[#FFFFFF] items-center justify-center hover:scale-110" onClick={salvar}>Salvar</h1>
              </div>
            </div>
          </> 
          : 
          <>
            <>  
              <h1 className="text-center text-[1.5vw] text-gray-500">Carregando sua conta...</h1>
            </> 
          </>
    
      </Pagina>
    </>
  )
}
