'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Notify } from "@/components/notify"
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image" 

import noite from '../../../public/Noite.svg'
import dia from '../../../public/Dia.svg'

interface Registros {
    email: string,
    senha: string
}

export default function Login() { 
    const { dark, toggleTheme } = useTheme()
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
            return Notify("E-mail está incorreto!")
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
        if (!emailV || !senhaV) {
            return Notify("E-mail ou senha estão incorretos!")
        }

        fetch(`/api/login?email=${email}&senha=${senha}`)
        .then(res => res.json())
        .then(data => { 
            if (data) {
                if (data.status !== 400) {
                    router.push('/inicio');
                } else {
                    return Notify(data.mensagem)
                }
            } else {
                return Notify("E-mail ou Senha estão incorretos!")
            }
         })
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }

    return (
        <>
            <div className="absolute w-full min-h-screen overflow-hidden">
                <div className="flex absolute w-full min-h-screen items-center justify-center select-none" style={{ background: dark ? '#0B0A0A' : '#F9FAFC' }}>
                    <div className="flex absolute md:w-[45vw] md:h-[22.969vw] lg:w-[20.833vw]">
                        <h1 className="absolute md:top-[-2vw] lg:top-[2vw] md:text-[3vw] lg:text-[2vw] text-[#111827] dark:text-[#FFFFFF]">Bem-Vindo</h1>
                        <h2 className="absolute md:top-[2vw] lg:top-[5vw] md:text-[1.5vw] lg:text-[1vw] text-[#6B7280] dark:text-[#CAFF33]">{mensagem}</h2>

                        <div className="absolute w-auto md:top-[5vw] lg:top-[7vw] md:text-[1.2vw] lg:text-[.6vw] text-[#5048E5] dark:text-[#FFFFFF] border-b border-[#5048E5] dark:border-[#CAFF33]">Email</div>
                        <div className="absolute w-full md:h-[4vw] lg:h-[2.5vw] rounded top-[9vw] border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                            <input className="absolute w-[98%] h-full outline-0 p-2 md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type="email" value={login.email} onChange={(e) => alterarDados("email", e.target.value)} />
                        </div>
                        <h1 className="flex absolute w-[4vw] md:top-[8.35vw] lg:top-[8.6vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Email</h1> 
                        {etapa !== "1" ? 
                            <>
                                <div className="absolute w-full md:h-[4vw] lg:h-[2.5vw] rounded md:top-[14vw] lg:top-[12vw] border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                    <input className="absolute w-[98%] h-full outline-0 p-2 md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type="password" value={login.senha} onChange={(e) => alterarDados("senha", e.target.value)} />
                                </div>
                                <h1 className="flex absolute w-[4vw] md:top-[13.35vw] lg:top-[11.6vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] justify-center">Senha</h1> 
                            </> : <></> 
                        }

                        <button className="absolute md:top-[20vw] lg:top-[16vw] w-full md:h-[4vw] lg:h-[3vw] bg-[#5048E5] dark:bg-[#333333] rounded text-[#000000] dark:text-[#FFFFFF] md:text-[2vw] lg:text-[1vw] items-center justify-center hover:scale-110" onClick={verify}>Continuar</button>
                    </div>
                </div>
            </div>

            <div className="flex absolute w-[85.417vw] h-[10vh] top-[0vh] left-[14.583vw]">
                <div className="flex absolute w-[2vw] h-full right-[5vw] items-center justify-center" onClick={toggleTheme}>
                    <Image
                        className="w-auto"
                        src={dark ? '/Noite.svg' : '/Dia.svg'}
                        alt={`Ícone para do tema`}
                        width={180}
                        height={38}
                        priority
                    />
                </div>
            </div>
        </>
    )
}