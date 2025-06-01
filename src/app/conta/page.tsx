'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { Infos } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Conta() {
  const [infos,setInfos] = useState<Infos>({nome: "", email: "", idade: "", rg: "", loc: "", celular: "", horario: "", foto: "/Avatar.svg"})

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
      <Pagina> 
        <div className="flex absolute w-[90vw] md:w-[30vw] lg:w-[25vw] h-[70vw] md:h-[25vw] lg:h-[16.667vw] top-[5vw] md:top-[2vw] left-[5vw] md:left-[5vw] lg:left-[12.5vw] bg-[#FFFFFF] dark:bg-[#191919] items-center justify-center rounded-4xl select-none">
          <Image
            className="absolute w-[20vw] md:w-[7.5vw] lg:w-[5vw] top-[5vw] md:top-[1.5vw]"
            src={infos.foto}
            alt={`Ícone da conta`}
            width={180}
            height={38}
            priority
          />
          <h1 className="absolute top-[25vw] md:top-[9.5vw] lg:top-[7vw] text-[#111827] dark:text-[#CAFF33] text-[8vw] md:text-[2vw] lg:text-[1.5vw]">{infos.nome}</h1>
          <h2 className="absolute top-[35vw] md:top-[13vw] lg:top-[9.5vw] text-[#6B7280] dark:text-[#FFFFFF] text-[5vw] md:text-[1vw] lg:text-[.75vw]">{infos.loc}</h2>
          <h2 className="absolute top-[42.5vw] md:top-[15vw] lg:top-[10.5vw] text-[#6B7280] dark:text-[#FFFFFF] text-[5vw] md:text-[1vw] lg:text-[.75vw]">{infos.horario}</h2>
          <div className="flex absolute w-full h-[15vw] md:h-[6vw] lg:h-[4vw] bottom-0 border-t border-[#E6E8F0] dark:border-[#FFFFFF]"></div> 
          <button className="flex absolute w-full h-[15vw] md:h-[6vw] lg:h-[4vw] bottom-0 items-center justify-center text-[5vw] md:text-[1.5vw] lg:text-[1vw] text-[#5048E5] dark:text-[#CAFF33] hover:scale-110">Trocar Foto</button>
        </div>
        
        <div className="flex absolute w-[90vw] md:w-[45vw] lg:w-[35.417vw] h-[130vw] md:h-[30vw] lg:h-[20vw] top-[80vw] md:top-[2vw] right-[5vw] md:right-[4vw] lg:right-[8vw] bg-[#FFFFFF] dark:bg-[#191919] items-center justify-center rounded-4xl select-none">
          <div className="flex absolute w-full h-[15vw] md:h-[4vw] lg:h-[3vw] top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
            <h1 className="absolute left-[2.5vw] text-[5vw] md:text-[1.6vw] lg:text-[0.8vw] dark:text-[#FFFFFF]">Cabeçalho do cartão</h1>
          </div>
        
          <div className="grid absolute grid-cols-1 md:grid-cols-2 w-[90vw] md:w-[50vw] lg:w-full h-auto gap-[4vw] md:gap-[1vw] p-2 md:p-10">
            {tipos.map((item, index) => {
                const tipo = item.variavel

                return (
                  <div key={index} className="relative w-[85vw] md:w-[20vw] lg:w-full h-[12vw] md:h-[3.5vw] lg:h-[3vw] border-1 border-[#E6E8F0] dark:border-[#CAFF33] rounded-2xl text-[4vw] md:text-[1.2vw] lg:text-[.8vw]">
                    <h1 className="flex absolute w-[25vw] md:w-[8vw] lg:w-[6vw] bottom-[9vw] md:bottom-[2.55vw] lg:bottom-[2.45vw] left-[4vw] md:left-[.5vw] bg-white dark:bg-[#191919] items-center justify-center text-[3vw] md:text-[1vw] lg:text-[.6vw] dark:text-[#CAFF33]">{item.texto}</h1>
                    {tipo === "rg" ? 
                      <> 
                        <input className="w-full h-full outline-0 text-center dark:text-[#FFFFFF]" type="text" maxLength={12} value={infos[tipo]} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </> : tipo === "celular" ? 
                      <>
                        <input className="w-full h-full outline-0 text-center dark:text-[#FFFFFF]" type="text" maxLength={15} value={infos[tipo]} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </> : <>
                        <input className="w-full h-full outline-0 text-center dark:text-[#FFFFFF]" type="text" value={infos[tipo]} onChange={(e) => alterarDado(tipo,e.target.value)} />
                      </>
                    }
                  </div>
                )
              }
            )}
          </div>
      
          <div className="flex absolute w-full h-[15vw] md:h-[4vw] lg:h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center">
            <h1 className="flex absolute right-[2.5vw] bg-[#5048E5] dark:bg-[#333333] w-[25vw] md:w-[15vw] lg:w-[10vw] md:h-[2.5vw] lg:h-[2vw] rounded-2xl text-[#FFFFFF] text-[5vw] md:text-[1.6vw] lg:text-[0.8vw] items-center justify-center hover:scale-110" onClick={salvar}>Salvar</h1>
          </div>
        </div>
      </Pagina>
    </>
  )
}
