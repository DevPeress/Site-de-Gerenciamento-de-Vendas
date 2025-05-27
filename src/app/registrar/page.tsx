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
                                    <div className="flex absolute md:w-[30vw] lg:w-[20.833vw] h-[22.969vw]">
                                        <h1 className="absolute md:top-[0vw] lg:top-[2vw] md:text-[3vw] lg:text-[2vw] text-[#111827]">Bem-Vindo</h1>
                                        <h2 className="absolute md:top-[4vw] lg:top-[4.5vw] md:text-[1.5vw] lg:text-[1vw] text-[#6B7280]">Insira o Email do novo Funcionário</h2>
                        
                                        <div className="absolute w-auto top-[7vw] md:text-[1vw] lg:text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                                        <div className="absolute w-full md:h-[4vw] lg:h-[2.5vw] rounded md:top-[11vw] lg:top-[9.5vw] border-[#D1D5DB] border-1 overflow-hidden">
                                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <h1 className="flex absolute w-[4vw] md:top-[10.4vw] lg:top-[9.2vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] bg-[#F9FAFC] justify-center">Email</h1>    
                        
                                        <button className="absolute md:bottom-[2vw] lg:bottom-[3vw] w-full md:h-[5vw] lg:h-[3vw] bg-[#5048E5] rounded text-[#FFFFFF] md:text-[2vw] lg:text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Funcionario</button>
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
