'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { Senhas, Types } from "@/types/types";
import Image from "next/image"
import { useEffect, useState } from "react";

export default function Config() {
    const [senhas,setSenhas] = useState<Senhas>({ senhaA: "", senhaN: ""})
    const [types,setTypes] = useState<Types>({ antiga: "password", nova: "password" })

    const alterarSenha = (tipo: Senhas['senhaA'], valor: Senhas['senhaA']) => {
        setSenhas((prevDados) => ({
            ...prevDados,
            [tipo]: valor
        }))
    }

    useEffect(() => {
        document.title = "Configurações"
    },[])

    const changePassword = () => {
        if (senhas.senhaA.length < 4) {
            return Notify("Senha antiga precisa conter 4 caracteres pelo menos!")
        }

        if (senhas.senhaN.length < 4) {
            return Notify("Senha nova precisa conter 4 caracteres pelo menos!")
        }

        fetch(`/api/trocarSenha`,{
            method: "PUT",
            body: JSON.stringify({
                senha: senhas.senhaA,
                senhaN: senhas.senhaN
            })
        })
        .then(res => res.json())
        .then(data => {
          Notify(data.mensagem)
        })
        .catch(() => Notify("Erro ao tentar trocar a senha."))
    }

    const alterarTipo = (variavel: keyof Types) => {
        setTypes((prevDados) => ({
            ...prevDados,
            [variavel]: types[variavel] === "password" ? "text" : "password"
        }))
    }

    return (
        <>
            <Pagina> 
                <h1 className="absolute top-[5vw] md:top-[1vw] left-[15vw] md:left-[2.7085vw] text-[10vw] md:text-[3vw] lg:text-[2vw] text-[#111827] dark:text-[#FFFFFF] select-none">Configurações</h1>
                <div className="flex absolute w-[90vw] md:w-[30vw] lg:w-[25vw] h-[90vw] md:h-[25vw] lg:h-[18vw] top-[20vw] md:top-[7vw] lg:top-[5vw] left-[5vw] md:left-[2.7085vw] bg-[#FFFFFF] dark:bg-[#191919] items-center justify-center rounded-4xl select-none">
                    <div className="flex absolute w-[90vw] md:w-[30vw] lg:w-[25vw] h-[15vw] md:h-[4vw] lg:h-[3vw] top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] dark:text-[#FFFFFF] font-bold">
                        <h1 className="absolute left-[2.5vw] md:text-[1.5vw] lg:text-[.8vw]">Trocar Senha</h1>
                    </div>
                
                    <div className="grid absolute grid-cols-1 w-full h-auto gap-5 md:p-5 lg:p-10">
                        <div className="flex relative w-[80vw] md:w-full h-[15vw] md:h-[4vw] lg:h-[3vw] left-[5vw] md:left-0 border-1 border-[#E6E8F0] rounded-2xl items-center justify-center">
                            <h1 className="flex absolute w-[20vw] md:w-[6vw] bottom-[12vw] md:bottom-[3vw] lg:bottom-[2.5vw] left-[4vw] md:left-[1.5vw] lg:left-[1vw] bg-white dark:bg-[#191919] dark:text-[#CAFF33] text-[3vw] md:text-[1vw] lg:text-[.6vw] items-center justify-center">Senha Atual</h1>
                            <input type={types.antiga} className="flex relative w-[80%] md:w-[92%] lg:h-full outline-none left-[-2.5vw] md:left-0 md:p-4 text-[5vw] md:text-[1vw] lg:text-[.8vw] text-black dark:text-white" value={senhas.senhaA} onChange={(e) => alterarSenha('senhaA',e.target.value)} />
                            <Image
                                className="flex absolute w-[5vw] md:w-[1vw] right-[5vw] md:right-[1vw]"
                                onClick={() => alterarTipo("antiga")}
                                src="/Icon.svg"
                                alt="Logo 404 erro"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>
                        <div className="flex relative w-[80vw] md:w-full h-[15vw] md:h-[4vw] lg:h-[3vw] left-[5vw] md:left-0 border-1 border-[#E6E8F0] rounded-2xl items-center justify-center">
                            <h1 className="flex absolute w-[20vw] md:w-[6vw] bottom-[12vw] md:bottom-[3vw] lg:bottom-[2.5vw] left-[4vw] md:left-[1.5vw] lg:left-[1vw] bg-white dark:bg-[#191919] dark:text-[#CAFF33] text-[3vw] md:text-[1vw] lg:text-[.6vw] items-center justify-center">Senha nova</h1>
                            <input type={types.nova} className="w-[80%] md:w-[92%] h-full outline-none left-[-2.5vw] md:left-0 md:p-4 text-[5vw] md:text-[1vw] lg:text-[.8vw] text-black dark:text-white" value={senhas.senhaN} onChange={(e) => alterarSenha('senhaN',e.target.value)} />
                            <Image
                                className="flex absolute w-[5vw] md:w-[1vw] right-[5vw] md:right-[1vw]"
                                onClick={() => alterarTipo("nova")}
                                src="/Icon.svg"
                                alt="Logo 404 erro"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>
                    </div>
                
                    <div className="flex absolute w-[90vw] md:w-[30vw] lg:w-[25vw] h-[15vw] md:h-[4vw] lg:h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center" onClick={changePassword}>
                        <h1 className="flex absolute right-[2.5vw] bg-[#5048E5] dark:bg-[#333333] md:w-[12vw] lg:w-[8vw] md:h-[3vw] lg:h-[2vw] rounded-2xl text-[#FFFFFF] dark:text-[#FFFFFF] md:text-[1.5vw] lg:text-[.8vw] items-center justify-center hover:scale-110">Trocar Senha</h1>
                    </div>
                </div>
            </Pagina>
        </>
    )
}