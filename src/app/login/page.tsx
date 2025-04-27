'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Notify } from "@/components/notify"

export default function Login() { 
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [etapa,setEtapa] = useState<"1" | "2" | "3">("1")
    const [mensagem,setMensagem] = useState<"Inserir Email" | "Logar na Plataforma" | "Cadastrar na Plataforma">("Inserir Email") 
    const router = useRouter();

    useEffect(() =>{
        document.title = "Login"
    },[])

    const emailV = email.includes("@") && email.toLocaleLowerCase().includes(".com")
    const senhaV = senha.length > 4

    const verify = () => {
        switch(etapa) {
            case "1":
                verifyEmail()
                break
            case "2":
                verifyLogin()
                break
            case "3":
                verifyRegister()
                break
        }
    }

    const verifyEmail = () => {
        if (emailV) {
            fetch(`/api/verifyConta?email=${email}`)
            .then(res => res.json())
            .then(data => { 
                if (data) {
                    setEtapa("2")
                    setMensagem("Inserir Email")
                } else {
                    setEtapa("3")
                    setMensagem("Cadastrar na Plataforma")
                }
            })
            .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
        } else {
            Notify("E-mail está incorreto!")
        }
    }

    const verifyLogin = () => {
        if (emailV && senhaV) {
            fetch(`/api/login?email=${email}?senha=${senha}`)
            .then(res => res.json())
            .then(data => { 
                if (data) {
                    router.push('/inicio');
                } else {
                    Notify("Erro, reinicie a página!")
                }
            })
            .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
        } else {
            Notify("E-mail ou senha estão incorretos!")
        }
    }

    const verifyRegister = () => {
        if (emailV && senhaV) {
            fetch(`/api/register?email=${email}?senha=${senha}`)
            .then(res => res.json())
            .then(data => { 
                if (data) {
                    router.push('/inicio');
                } else {
                    Notify("Erro ao criar os Dados!")
                }
            })
            .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
        } else {
            Notify("E-mail ou senha estão incorretos!")
        }
    }

    return (
        <>
            <div className="absolute w-full min-h-screen bg-[#090E23] overflow-hidden">
                <div className="flex absolute w-1/2 min-h-screen bg-white items-center justify-center select-none">
                    <div className="flex absolute w-[400px] h-[441px]">
                        <h1 className="absolute top-10 text-[2vw] text-[#111827]">Bem-Vindo</h1>
                        <h2 className="absolute top-22 text-[1vw] text-[#6B7280]">{mensagem}</h2>

                        <div className="absolute w-auto h-5 top-35 text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                        <div className="absolute w-full h-12 rounded top-45 border-[#D1D5DB] border-1 overflow-hidden">
                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <h1 className="flex absolute w-18 top-43.5 left-2 text-[.5vw] text-[#6B7280] bg-white justify-center">Email</h1> 
                        {etapa !== "1" ? 
                        <>
                            <div className="absolute w-full h-12 rounded top-60 border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <h1 className="flex absolute w-18 top-58.5 left-2 text-[.5vw] text-[#6B7280] bg-white justify-center">Senha</h1> 
                        </> : <></> }

                        <button className="absolute bottom-20 w-full h-15 bg-[#5048E5] rounded text-[#FFFFFF] text-[1vw] items-center justify-center hover:scale-110" onClick={verify}>Continuar</button>
                    </div>
                </div>
            </div>
        </>
    )
}