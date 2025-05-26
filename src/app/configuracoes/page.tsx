'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Senhas {
    senhaA: string,
    senhaN: string
}

export default function Config() {
    const router = useRouter();
    const [senhas,setSenhas] = useState<Senhas>({ senhaA: "", senhaN: ""})

    const alterarSenha = (tipo: string, valor: string) => {
        setSenhas((prevDados) => ({
            ...prevDados,
            [tipo]: valor
        }))
    }

    useEffect(() => {
        document.title = "Configurações"
        fetch(`/api/infos`)
            .then(res => res.json())
            .then(data => {
            const userId: number = data.id;

            if (!userId || userId === 0) {
                router.push('/login');
            } 
        })
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
    }

    return (
        <>
            <SideBar />
            <Pagina> 
                <h1 className="absolute top-5 left-[2.7085vw] text-[2vw] text-[#111827] select-none">Configurações</h1>
                <div className="flex absolute w-[40vw] h-80 top-20 left-[2.7085vw] bg-[#FFFFFF] items-center justify-center rounded-4xl select-none">
                    <div className="flex absolute w-full h-15 top-0 border-b border-[#E6E8F0] items-center justify-center text-[#111827] font-bold">
                        <h1 className="absolute left-20">Trocar Senha</h1>
                    </div>
                
                    <div className="grid absolute grid-cols-1 w-full h-auto gap-5 p-10">
                        <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                            <h1 className="flex absolute w-25 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Senha Atual</h1>
                            <input type="password" className="w-full h-full outline-none p-4" value={senhas.senhaA} onChange={(e) => alterarSenha('senhaA',e.target.value)} />
                        </div>
                        <div className="relative w-full h-15 border-1 border-[#E6E8F0] rounded-2xl">
                            <h1 className="flex absolute w-25 bottom-12.5 left-5 bg-white text-[0.6vw] items-center justify-center">Senha nova</h1>
                            <input type="password" className="w-full h-full outline-none p-4" value={senhas.senhaN} onChange={(e) => alterarSenha('senhaN',e.target.value)} />
                        </div>
                    </div>
                
                    <div className="flex absolute w-full h-15 bottom-0 border-t border-[#E6E8F0] items-center justify-center text-[#5048E5]">
                        <h1 className="flex absolute right-20 bg-[#5048E5] w-35 h-10 rounded-2xl text-[#FFFFFF] items-center justify-center hover:scale-110" onClick={changePassword}>Trocar Senha</h1>
                    </div>
                </div>
            </Pagina>
        </>
    )
}