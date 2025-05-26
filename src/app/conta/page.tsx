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
        <div className="flex absolute w-[25vw] h-[16.667vw] top-[2vw] left-[12.5vw] bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
          <Image
            className="absolute w-[5vw] top-[1.5vw]"
            src={infos.foto}
            alt={`Ícone da conta`}
            width={180}
            height={38}
            priority
          />
          <h1 className="absolute text-[#111827] text-[1.5vw]">{infos.nome}</h1>
          <h2 className="absolute top-[9.5vw] text-[#6B7280] text-[.75vw]">{infos.loc}</h2>
          <h2 className="absolute top-[10.5vw] text-[#6B7280] text-[.75vw]">{infos.horario}</h2>
          <div className="flex absolute w-full h-[4vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[1vw] text-[#5048E5] hover:scale-110">Trocar Foto</div>
        </div>
        
        <div className="flex absolute w-[35.417vw] h-[20vw] top-[2vw] right-[8vw] bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
          <div className="flex absolute w-full h-[3vw] top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
            <h1 className="absolute left-[2.5vw] text-[0.8vw]">Cabeçalho do cartão</h1>
          </div>
        
          <div className="grid absolute grid-cols-2 w-full h-auto gap-[1vw] p-10">
            {tipos.map((item, index) => {
                const tipo = item.variavel

                return (
                  <div key={index} className="relative w-full h-[3vw] border-1 border-[#E6E8F0] rounded-2xl text-[.8vw]">
                    <h1 className="flex absolute w-[6vw] bottom-[2.45vw] left-[.5vw] bg-white items-center justify-center text-[.6vw]">{item.texto}</h1>
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
      
          <div className="flex absolute w-full h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center">
            <h1 className="flex absolute right-[2.5vw] bg-[#5048E5] w-[8vw] h-[2vw] rounded-2xl text-[#FFFFFF] text-[.8vw] items-center justify-center hover:scale-110" onClick={salvar}>Salvar</h1>
          </div>
        </div>
      </Pagina>
    </>
  )
}
