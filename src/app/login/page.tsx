'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Notify } from "@/components/notify"

interface Registros {
    email: string,
    senha: string
}

export default function Login() { 
    const [login,setLogin] = useState<Registros>({ email: "", senha: "" })
    const [etapa,setEtapa] = useState<"1" | "2">("1")
    const [mensagem,setMensagem] = useState<"Inserir Email" | "Logar na Plataforma">("Inserir Email") 
    const router = useRouter();

    const alterarDados = (tipo: string, valor: string) => {
        setLogin((prevDados) => ({
            ...prevDados,
            [tipo]: valor
        }))
    }

    useEffect(() =>{
        document.title = "Login"
    },[])

    const email: string = login.email
    const senha: string = login.senha

    const emailV: boolean = email.includes("@") && email.toLocaleLowerCase().includes(".com")
    const senhaV: boolean = senha.length > 4

    const verify = () => {
        switch(etapa) {
            case "1":
                verifyEmail()
                break
            case "2":
                verifyLogin()
                break
        }
    }

    const verifyEmail = () => {
        if (!emailV) {
            Notify("E-mail está incorreto!")
        }

        fetch(`/api/verifyConta?email=${email}`)
        .then(res => res.json())
        .then(data => { 
            if (data) {
                setEtapa("2")
                setMensagem("Logar na Plataforma")
            } else {
                router.push('/cadastro');
            }
        })
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }

    const verifyLogin = () => {
        if (emailV && senhaV) {
            Notify("E-mail ou senha estão incorretos!")
        }

        fetch(`/api/login?email=${email}&senha=${senha}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => { 
            if (data) {
                if (data.status !== 400) {
                    router.push('/inicio');
                } else {
                    Notify(data.mensagem)
                }
            } else {
                Notify("E-mail ou Senha estão incorretos!")
            }
         })
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }

    return (
        <>
            <div className="absolute w-full min-h-screen bg-[#090E23] overflow-hidden">
                <div className="flex absolute w-full min-h-screen bg-white items-center justify-center select-none">
                    <div className="flex absolute w-[20.833vw] h-[22.969vw]">
                        <h1 className="absolute top-[2vw] text-[2vw] text-[#111827]">Bem-Vindo</h1>
                        <h2 className="absolute top-[5vw] text-[1vw] text-[#6B7280]">{mensagem}</h2>

                        <div className="absolute w-auto h-[1vw] top-[7vw] text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                        <div className="absolute w-full h-[2.5vw] rounded top-[9vw] border-[#D1D5DB] border-1 overflow-hidden">
                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={login.email} onChange={(e) => alterarDados("email", e.target.value)} />
                        </div>
                        <h1 className="flex absolute w-[4vw] top-[8.6vw] left-[.5vw] text-[.5vw] text-[#6B7280] bg-white justify-center">Email</h1> 
                        {etapa !== "1" ? 
                        <>
                            <div className="absolute w-full h-[2.5vw] rounded top-[12vw] border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2" type="password" value={login.senha} onChange={(e) => alterarDados("senha", e.target.value)} />
                            </div>
                            <h1 className="flex absolute w-[4vw] top-[11.6vw] left-[.5vw] text-[.5vw] text-[#6B7280] bg-white justify-center">Senha</h1> 
                        </> : <></> }

                        <button className="absolute top-[16vw] w-full h-[3vw] bg-[#5048E5] rounded text-[#FFFFFF] text-[1vw] items-center justify-center hover:scale-110" onClick={verify}>Continuar</button>
                    </div>
                </div>
            </div>
        </>
    )
}