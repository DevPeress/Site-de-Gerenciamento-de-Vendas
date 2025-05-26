'use client'

import { useEffect, useState } from "react"
import { Notify } from "@/components/notify"
import Image from "next/image"

interface Registro {
    email: string,
    senha: string,
    nome: string,
    idade: number,
    celular: string,
    rg: string
}

export default function Login() { 
    const [registro,setRegistro] = useState<Registro>({email: "", senha: "", nome: "", idade: 0, celular: "", rg: ""})
    const [type,setType] = useState<"text" | "password">("password")

    useEffect(() =>{
        document.title = "Registrar"
    },[])

    const email = registro.email
    const emailV: boolean = email.includes("@") && email.toLocaleLowerCase().includes(".com")

    const verifyEmail = () => { 
        if (!emailV) {  
            Notify("E-mail está incorreto!");
        }

        fetch("/api/criarConta",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: registro.email,
                senha: registro.senha,
                nome: registro.nome,
                idade: registro.idade,
                celular: registro.celular,
                rg: registro.rg
            })
        })

        Notify("Você foi registrado em nosso sistema, agora peça o registro do email pela empresa!")
    }

    function formatNumero(value: string) {
        const numericValue = value.replace(/\D/g, "");

        return numericValue.replace(/(\d{1})(\d)/, "($1$2) ").replace(/(\d{5})(\d)/, "$1-$2")
    }

    function formatRg(value: string) {
        const numericValue = value.replace(/\D/g, "");

        return numericValue.replace(/(\d{1})(\d)/, "$1$2.").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1-$2")
    }

    const alterarDados = (tipo: string, valor: string) => {
        let texto = valor
        if (tipo === "celular") {
            texto = formatNumero(valor)
        }

        if (tipo === "rg") {
            texto = formatRg(valor)
        }

        setRegistro((prevDados) => ({
            ...prevDados,
            [tipo]: texto
        }))
    }

    return (
        <>
            <div className="flex absolute w-full h-full bg-white items-center justify-center select-none">
                <div className="flex absolute w-[85.417vw] h-[441px] items-center justify-center">
                    <h1 className="absolute top-0 text-[2vw] text-[#111827]">Bem-Vindo</h1>
                    <h2 className="absolute top-[2.5vw] text-[1vw] text-[#6B7280]">Efetue seu cadastro!</h2>

                    <div className="grid grid-cols-2 absolute top-[5vw] w-[50vw] h-[12vw]">
                        <div>
                            <div className="relative w-[21.25vw] h-[2.6vw] rounded border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center text-[.8vw]" type="text" value={registro.nome} onChange={(e) => alterarDados('nome',e.target.value)} />
                            </div>
                            <h1 className="flex relative w-[4vw] bottom-[3vw] left-[.5vw] text-[.5vw] text-[#6B7280] bg-white justify-center">Nome</h1>  
                        </div>

                        <div>
                            <div className="flex relative w-[21.25vw] h-[2.6vw] rounded border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center text-[.8vw]" type={type} value={registro.senha} onChange={(e) => alterarDados('senha',e.target.value)} />
                            </div>
                            <h1 className="flex relative w-[4vw] bottom-[3vw] left-[.5vw]  text-[.5vw] text-[#6B7280] bg-white justify-center">Senha</h1>  
                            <Image
                                className="flex absolute w-[1vw] top-[.8vw] right-[5vw]"
                                onClick={() => setType((prev) => ( prev === "password" ? "text" : "password" ))}
                                src="/Icon.svg"
                                alt="Logo 404 erro"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>

                        <div>
                            <div className="relative w-[21.25vw] h-[2.6vw] rounded border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center text-[.8vw]" type="text" value={registro.email} onChange={(e) => alterarDados('email',e.target.value)} />
                            </div>
                            <h1 className="flex relative w-[4vw] bottom-[3vw] left-[.5vw]  text-[.5vw] text-[#6B7280] bg-white justify-center">Email</h1>  
                        </div>

                        <div>
                            <div className="relative w-[21.25vw] h-[2.6vw] rounded border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center text-[.8vw] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none" type="number" value={registro.idade} onChange={(e) => alterarDados('idade',e.target.value)} />
                            </div>
                            <h1 className="flex relative w-[4vw] bottom-[3vw] left-[.5vw]  text-[.5vw] text-[#6B7280] bg-white justify-center">Idade</h1>  
                        </div>

                        <div>
                            <div className="relative w-[21.25vw] h-[2.6vw] rounded border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center text-[.8vw]" type="text" value={registro.celular} maxLength={15} onChange={(e) => alterarDados('celular',e.target.value)} />
                            </div>
                            <h1 className="flex relative w-[4vw] bottom-[3vw] left-[.5vw]  text-[.5vw] text-[#6B7280] bg-white justify-center">Celular</h1>  
                        </div>

                        <div>
                            <div className="relative w-[21.25vw] h-[2.6vw] rounded border-[#D1D5DB] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center text-[.8vw]" type="text" value={registro.rg} maxLength={12} onChange={(e) => alterarDados('rg',e.target.value)} />
                            </div>
                            <h1 className="flex relative w-[4vw] bottom-[3vw] left-[.5vw]  text-[.5vw] text-[#6B7280] bg-white justify-center">RG</h1>  
                        </div>
                    </div>
                        
                    <button className="absolute top-[20vw] w-[21.25vw] h-[3vw] bg-[#5048E5] rounded text-[#FFFFFF] text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Conta</button>
                </div>
            </div>
        </>
    )
}
