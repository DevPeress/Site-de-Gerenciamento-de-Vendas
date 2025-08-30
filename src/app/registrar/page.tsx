'use client'

import { useEffect, useState } from "react"
import { Notify } from "@/components/notify"
import { Empresa } from "@/components/empresa";
import Pagina from "@/components/pagina";
import { RegistrarType } from "@/types/types";

export default function Login() { 
    const [registro,setRegistro] = useState<RegistrarType>({ email: "", id: 0 })
    const [loading,setLoading] = useState<boolean>(true)
    const emailV: boolean = registro['email'].includes("@") && registro['email'].toLocaleLowerCase().includes(".com")

    const AlterarRegistro = (tipo: string, valor: string | number ) => {
        setRegistro((prevDados) => ({
            ...prevDados,
            [tipo]: valor
        }))
    }

    const verifyEmail = () => {
        if (!emailV) {
            return Notify("E-mail está incorreto ou não registrado!");
        }

        fetch(`/api/verifyConta?email=${registro['email']}`)
        .then(res => res.json())
        .then(data => { 
            if (data) {
                fetch("/api/registerFuncionario",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: registro['id'],
                        email: registro['email']
                    })
                })
                return Notify("E-mail cadastrado em sua empresa!")
            } else {
                return Notify("E-mail não cadastrado no sistema!")
            }
        })
        .catch((err) => {
            Notify("Não foi encontrado os dados! Recarregue a Página")
            console.error("Registrar: ", err)
        })
    }

    useEffect(() =>{
        document.title = "Registrar"
        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId: number = data.idLoja | 0;
            AlterarRegistro("id", userId)

            return setLoading(false)
        })
    },[])

    return (
        <>
            <Pagina>
                {loading ? <h1 className="text-center text-[1.5vw] text-gray-500 dark:text-white">Carregando sua empresa...</h1>
                    :  
                    <>
                        {!registro['id'] || registro['id'] === 0 ? <Empresa />
                        : 
                        <>
                            <div className="hidden md:flex absolute items-center justify-center select-none">
                                <div className="flex absolute md:w-[30vw] lg:w-[20.833vw] h-[22.969vw]">
                                    <h1 className="absolute md:top-[0vw] lg:top-[2vw] md:text-[3vw] lg:text-[2vw] text-[#111827] dark:text-[#FFFFFF]">Bem-Vindo</h1>
                                    <h2 className="absolute md:top-[4vw] lg:top-[4.5vw] md:text-[1.5vw] lg:text-[1vw] text-[#6B7280] dark:text-[#CAFF33]">Insira o Email do novo Funcionário</h2>
                        
                                    <div className="absolute w-auto top-[7vw] md:text-[1vw] lg:text-[.6vw] text-[#5048E5] border-b border-[#5048E5] dark:text-[#FFFFFF] dark:border-[#CAFF33]">Email</div>
                                    <div className="absolute w-full md:h-[4vw] lg:h-[2.5vw] rounded md:top-[11vw] lg:top-[9.5vw] border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                        <input className="absolute w-[98%] h-full outline-0 p-2 text-black dark:text-white" type="email" value={registro['email']} onChange={(e) => AlterarRegistro("Email",e.target.value)} />
                                    </div>
                                    <h1 className="flex absolute w-[4vw] md:top-[10.4vw] lg:top-[9.2vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Email</h1>    
                        
                                    <button className="absolute md:bottom-[2vw] lg:bottom-[3vw] w-full md:h-[5vw] lg:h-[3vw] bg-[#5048E5] dark:bg-[#333333] rounded text-[#000000] dark:text-[#FFFFFF] md:text-[2vw] lg:text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Funcionario</button>
                                </div>
                            </div>

                            <div className="flex md:hidden absolute items-center justify-center select-none">
                                <div className="flex absolute w-[90vw] h-[90vw] left-[5vw] top-[5vw]">
                                    <h1 className="absolute top-[1vw] text-[10vw] text-[#111827] dark:text-[#FFFFFF]">Bem-Vindo</h1>
                                    <h2 className="absolute top-[12vw] text-[5vw] text-[#6B7280] dark:text-[#CAFF33]">Insira o Email do novo Funcionário</h2>
                        
                                    <div className="absolute w-auto top-[25vw] text-[3vw] text-[#5048E5] border-b border-[#5048E5] dark:text-[#FFFFFF] dark:border-[#CAFF33]">Email</div>
                                    <div className="absolute w-full top-[36vw] h-[12vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                        <input className="absolute w-[98%] h-full outline-0 p-2 text-black dark:text-white" type="email" value={registro['email']} onChange={(e) => AlterarRegistro("Email",e.target.value)} />
                                    </div>
                                    <h1 className="flex absolute w-[15vw] top-[34vw] left-[2vw] text-[#6B7280] text-[3vw] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Email</h1>    
                        
                                    <button className="absolute bottom-[20vw] w-full h-[10vw] bg-[#5048E5] dark:bg-[#333333] rounded text-[#000000] dark:text-[#FFFFFF] text-[5vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Funcionario</button>
                                </div>
                            </div>
                        </> 
                        }
                    </>
                }
            </Pagina>
        </>
    )
}