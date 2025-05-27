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
  const [infos,setInfos] = useState<Infos>({nome: "", email: "", idade: "", rg: "", loc: "", celular: "", horario: "", foto: "Avatar.svg"})

  const tipos = [
    { texto: "Primeiro Nome", variavel: "nome" },
    { texto: "Email", variavel: "email" },
    { texto: "RG", variavel: "rg" },
    { texto: "Celular", variavel: "celular" },
    { texto: "Idade", variavel: "idade" },
    { texto: "Endereço", variavel: "loc" },
  ]

  function formatNumero(value: string) {
    const numericValue = value.replace(/\D/g, "");

    return numericValue.replace(/(\d{1})(\d)/, "($1$2) ").replace(/(\d{5})(\d)/, "$1-$2")
  }

  function formatRg(value: string) {
    const numericValue = value.replace(/\D/g, "");

    return numericValue.replace(/(\d{1})(\d)/, "$1$2.").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1-$2")
  }

  const alterarDado = (tipo: string, valor: string) => {
    if (tipo === "celular") {
      valor = formatNumero(valor)
    }

    if (tipo === "rg") {
      valor = formatRg(valor)
    }

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

  useEffect(() => {
    document.title = "Sua Conta"

    fetch(`/api/infos`)
    .then(res => res.json())
    .then(data => {
      const userId: number = data.id;

      return fetch(`/api/pegarUsuario?id=${userId}`);
    })
    .then(res => res.json())
    .then(data =>  {
      setInfos({
        nome: data.nome, email: data.email, idade: data.idade, rg: formatRg(data.rg), loc: data.loc, celular: formatNumero(data.celular), horario: data.horario, foto: data.foto
      })
    })
    .catch((err) => { Notify("Não foi encontrado os dados! Recarregue a Página") })
  },[])

  return (
    <>
      <SideBar />
      <Pagina> 
        <div className="flex absolute md:w-[30vw] lg:w-[25vw] md:h-[25vw] lg:h-[16.667vw] top-[2vw] md:left-[5vw] lg:left-[12.5vw] bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
          <Image
            className="absolute md:w-[7.5vw] lg:w-[5vw] top-[1.5vw]"
            src={infos.foto}
            alt={`Ícone da conta`}
            width={180}
            height={38}
            priority
          />
          <h1 className="absolute md:top-[9.5vw] lg:top-[7vw] text-[#111827] md:text-[2vw] lg:text-[1.5vw]">{infos.nome}</h1>
          <h2 className="absolute md:top-[13vw] lg:top-[9.5vw] text-[#6B7280] md:text-[1vw] lg:text-[.75vw]">{infos.loc}</h2>
          <h2 className="absolute md:top-[15vw] lg:top-[10.5vw] text-[#6B7280] md:text-[1vw] lg:text-[.75vw]">{infos.horario}</h2>
          <div className="flex absolute w-full md:h-[6vw] lg:h-[4vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center md:text-[1.5vw] lg:text-[1vw] text-[#5048E5] hover:scale-110">Trocar Foto</div>
        </div>
        
        <div className="flex absolute md:w-[45vw] lg:w-[35.417vw] md:h-[30vw] lg:h-[20vw] top-[2vw] md:right-[4vw] lg:right-[8vw] bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
          <div className="flex absolute w-full md:h-[4vw] lg:h-[3vw] top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
            <h1 className="absolute left-[2.5vw] md:text-[1.6vw] lg:text-[0.8vw]">Cabeçalho do cartão</h1>
          </div>
        
          <div className="grid absolute grid-cols-2 md:w-[50vw] lg:w-full h-auto gap-[1vw] p-10">
            {tipos.map((item, index) => {
                const tipo = item.variavel

                return (
                  <div key={index} className="relative md:w-[20vw] lg:w-full md:h-[3.5vw] lg:h-[3vw] border-1 border-[#E6E8F0] rounded-2xl md:text-[1.2vw] lg:text-[.8vw]">
                    <h1 className="flex absolute md:w-[8vw] lg:w-[6vw] md:bottom-[2.55vw] lg:bottom-[2.45vw] left-[.5vw] bg-white items-center justify-center md:text-[1vw] lg:text-[.6vw]">{item.texto}</h1>
                    {tipo === "rg" ? 
                      <> 
                        <input className="w-full h-full outline-0 text-center" type="text" maxLength={12} value={infos[tipo]} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </> : tipo === "celular" ? 
                      <>
                        <input className="w-full h-full outline-0 text-center" type="text" maxLength={15} value={infos[tipo]} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </> : <>
                        <input className="w-full h-full outline-0 text-center" type="text" value={infos[tipo]} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </>
                    }
                  </div>
                )
              }
            )}
          </div>
      
          <div className="flex absolute w-full md:h-[4vw] lg:h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center">
            <h1 className="flex absolute right-[2.5vw] bg-[#5048E5] w-[8vw] md:h-[2.5vw] lg:h-[2vw] rounded-2xl text-[#FFFFFF] md:text-[1.6vw] lg:text-[0.8vw] items-center justify-center hover:scale-110" onClick={salvar}>Salvar</h1>
          </div>
        </div>
      </Pagina>
    </>
  )
}
