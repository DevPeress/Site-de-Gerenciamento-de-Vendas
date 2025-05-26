'use client'

import { useEffect, useState } from "react"
import { Notify } from "@/components/notify"
import { SideBar } from "@/components/sidebar"
import { Empresa } from "@/components/empresa";
import Pagina from "@/components/pagina";

export default function Login() { 
    const [email,setEmail] = useState<string>("")
    const [id,setID] = useState<number>(0)
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() =>{
        document.title = "Registrar"
        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId: number = data.idLoja;
            setID(userId)

            return setLoading(false)
        })
    },[])

    const emailV: boolean = email.includes("@") && email.toLocaleLowerCase().includes(".com")

    const verifyEmail = () => {
        if (!emailV) {
            Notify("E-mail está incorreto ou não registrado!");
        }

        fetch(`/api/verifyConta?email=${email}`)
        .then(res => res.json())
        .then(data => { 
            if (data) {
                fetch("/api/registerFuncionario",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        email
                    })
                })
                Notify("E-mail cadastrado em sua empresa!")
            } else {
                Notify("E-mail não cadastrado no sistema!")
            }
        })
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }

    return (
        <>
            <SideBar />
            <Pagina>
                {loading ? 
                    <>
                        <h1 className="text-center text-[1.5vw] text-gray-500">Carregando sua empresa...</h1>
                    </> 
                    :  
                    <>
                        {!id || id === 0 ? 
                            <> <Empresa /> </> 
                            : 
                            <>
                                <div className="flex absolute bg-white items-center justify-center select-none">
                                    <div className="flex absolute w-[20.833vw] h-[22.969vw]">
                                        <h1 className="absolute top-[2vw] text-[2vw] text-[#111827]">Bem-Vindo</h1>
                                        <h2 className="absolute top-[4.5vw] text-[1vw] text-[#6B7280]">Insira o Email do novo Funcionário</h2>
                        
                                        <div className="absolute w-auto h-[1vw] top-[7vw] text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                                        <div className="absolute w-full h-[2.5vw] rounded top-[9.5vw] border-[#D1D5DB] border-1 overflow-hidden">
                                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <h1 className="flex absolute w-[4vw] top-[9.2vw] left-[.5vw] text-[.5vw] text-[#6B7280] bg-[#F9FAFC] justify-center">Email</h1>    
                        
                                        <button className="absolute bottom-[3vw] w-full h-[3vw] bg-[#5048E5] rounded text-[#FFFFFF] text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Funcionario</button>
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
