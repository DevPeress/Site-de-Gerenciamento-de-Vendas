'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image"
import { useEffect, useState } from "react";

interface Senhas {
    senhaA: string,
    senhaN: string
}

interface Types {
    antiga: string,
    nova: string
}

export default function Config() {
    const [senhas,setSenhas] = useState<Senhas>({ senhaA: "", senhaN: ""})
    const [types,setTypes] = useState<Types>({ antiga: "password", nova: "password" })

    const alterarSenha = (tipo: string, valor: string) => {
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
            <SideBar />
            <Pagina> 
                <h1 className="absolute top-[1vw] left-[2.7085vw] text-[2vw] text-[#111827] select-none">Configurações</h1>
                <div className="flex absolute w-[25vw] h-[18vw] top-[5vw] left-[2.7085vw] bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
                    <div className="flex absolute w-[25vw] h-[3vw] top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
                        <h1 className="absolute left-[2.5vw] text-[.8vw]">Trocar Senha</h1>
                    </div>
                
                    <div className="grid absolute grid-cols-1 w-full h-auto gap-5 p-10">
                        <div className="relative w-full h-[3vw] border-1 border-[#E6E8F0] rounded-2xl items-center justify-center">
                            <h1 className="flex absolute w-[6vw] bottom-[2.5vw] left-[1vw] bg-white text-[0.6vw] items-center justify-center">Senha Atual</h1>
                            <input type={types.antiga} className="flex relative w-[92%] h-full outline-none p-4 text-[.8vw]" value={senhas.senhaA} onChange={(e) => alterarSenha('senhaA',e.target.value)} />
                            <Image
                                className="flex absolute w-[1vw] top-[1vw] right-[1vw]"
                                onClick={() => alterarTipo("antiga")}
                                src="/Icon.svg"
                                alt="Logo 404 erro"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>
                        <div className="relative w-full h-[3vw] border-1 border-[#E6E8F0] rounded-2xl">
                            <h1 className="flex absolute w-[6vw] bottom-[2.5vw] left-[1vw] bg-white text-[0.6vw] items-center justify-center">Senha nova</h1>
                            <input type={types.nova} className="w-[92%] h-full outline-none p-4" value={senhas.senhaN} onChange={(e) => alterarSenha('senhaN',e.target.value)} />
                            <Image
                                className="flex absolute w-[1vw] top-[1vw] right-[1vw]"
                                onClick={() => alterarTipo("nova")}
                                src="/Icon.svg"
                                alt="Logo 404 erro"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>
                    </div>
                
                    <div className="flex absolute w-[25vw] h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[#5048E5]" onClick={changePassword}>
                        <h1 className="flex absolute right-[2.5vw] bg-[#5048E5] w-[8vw] h-[2vw] rounded-2xl text-[#FFFFFF] text-[.8vw] items-center justify-center hover:scale-110">Trocar Senha</h1>
                    </div>
                </div>
            </Pagina>
        </>
    )
}