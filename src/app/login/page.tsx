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
    const [etapa,setEtapa] = useState<"1" | "2" | "3">("1")
    const [mensagem,setMensagem] = useState<"Inserir Email" | "Logar na Plataforma" | "Cadastrar na Plataforma">("Inserir Email") 
    const router = useRouter();

    const alterarDados = (tipo: string, valor: string) => {
        setLogin((prevDados) => ({
            ...prevDados,
            [tipo]: valor
        }))
    }

    useEffect(() =>{
        document.title = "Login"
        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId = data.id;

            if (userId && userId !== 0) {
                router.push('/inicio');
            } 
        })
    },[])

    const email = login.email
    const senha = login.senha
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
                    setMensagem("Logar na Plataforma")
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
        } else {
            Notify("E-mail ou senha estão incorretos!")
        }
    }

    const verifyRegister = () => {
        if (emailV && senhaV) {
            fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    senha,
                    email
                })
            })
            .then(res => res.json())
            .then(data => { 
                if (data) {
                    Notify("Peça para o dono registrar seu email!")
                } else {
                    Notify("Erro ao criar os Dados!")
                }
            })
            .catch((err) => Notify("Não foi cadastrar a conta! Recarregue a Página"))
        } else {
            Notify("E-mail ou senha estão incorretos!")
        }
    }

    return (
        <>
            <div className="absolute w-full min-h-screen bg-[#090E23] overflow-hidden">
                <div className="flex absolute w-full min-h-screen bg-white items-center justify-center select-none">
                    <div className="flex absolute w-[400px] h-[441px]">
                        <h1 className="absolute top-10 text-[2vw] text-[#111827]">Bem-Vindo</h1>
                        <h2 className="absolute top-22 text-[1vw] text-[#6B7280]">{mensagem}</h2>

                        <div className="absolute w-auto h-5 top-35 text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                        <div className="absolute w-full h-12 rounded top-45 border-[#D1D5DB] border-1 overflow-hidden">
                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={login.email} onChange={(e) => alterarDados("email", e.target.value)} />
                        </div>
                        <h1 className="flex absolute w-18 top-43.5 left-2 text-[.5vw] text-[#6B7280] bg-white justify-center">Email</h1> 
                        {etapa !== "1" ? 
                        <>
                            <div className="absolute w-full h-12 rounded top-60 border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2" type="password" value={login.senha} onChange={(e) => alterarDados("senha", e.target.value)} />
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