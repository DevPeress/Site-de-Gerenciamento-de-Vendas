'use client'

import { useEffect, useState } from "react"
import { Notify } from "@/components/notify"
import Image from "next/image"
import { useTheme } from "../context/ThemeContext"

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
    const { dark, toggleTheme } = useTheme()
    
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
            <div className="flex absolute w-full h-full items-center justify-center select-none" style={{ background: dark ? '#0B0A0A' : '#F9FAFC' }}>
                <div className="flex absolute md:w-[90vw] lg:w-[85.417vw] md:h-[35vw] lg:h-[22.969vw] items-center justify-center">
                    <h1 className="absolute top-[-2vw] md:text-[3vw] lg:text-[2vw] text-[#111827] dark:text-[#FFFFFF]">Bem-Vindo</h1>
                    <h2 className="absolute md:top-[2vw] lg:top-[1vw] md:text-[1.5vw] lg:text-[1vw] text-[#6B7280] dark:text-[#CAFF33]">Efetue seu cadastro!</h2>

                    <div className="grid grid-cols-2 absolute md:top-[7vw] lg:top-[5vw] md:w-[60vw] lg:w-[50vw] md:h-[20vw] lg:h-[12vw]">
                        <div>
                            <div className="relative md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[2.6vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type="text" value={registro.nome} onChange={(e) => alterarDados('nome',e.target.value)} />
                            </div>
                            <h1 className="flex relative md:w-[5vw] lg:w-[4vw] md:bottom-[4.75vw] lg:bottom-[3vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Nome</h1>  
                        </div>

                        <div>
                            <div className="flex relative md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[2.6vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                <input className="absolute w-[85%] h-full outline-0 p-2 text-center md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type={type} value={registro.senha} onChange={(e) => alterarDados('senha',e.target.value)} />
                            </div>
                            <h1 className="flex relative md:w-[5vw] lg:w-[4vw] md:bottom-[4.75vw] lg:bottom-[3vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Senha</h1>  
                            <Image
                                className="flex absolute md:w-[2vw] lg:w-[1vw] md:top-[1vw] lg:top-[.8vw] right-[5vw]"
                                onClick={() => setType((prev) => ( prev === "password" ? "text" : "password" ))}
                                src="/Icon.svg"
                                alt="Logo 404 erro"
                                width={180}
                                height={38}
                                priority
                            />
                        </div>

                        <div>
                            <div className="relative md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[2.6vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type="text" value={registro.email} onChange={(e) => alterarDados('email',e.target.value)} />
                            </div>
                            <h1 className="flex relative md:w-[5vw] lg:w-[4vw] md:bottom-[4.75vw] lg:bottom-[3vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Email</h1>  
                        </div>

                        <div>
                            <div className="relative md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[2.6vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center md:text-[1.6vw] lg:text-[.8vw] appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none text-[#000000] dark:text-[#FFFFFF]" type="number" value={registro.idade} onChange={(e) => alterarDados('idade',e.target.value)} />
                            </div>
                            <h1 className="flex relative md:w-[5vw] lg:w-[4vw] md:bottom-[4.75vw] lg:bottom-[3vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Idade</h1>  
                        </div>

                        <div>
                            <div className="relative md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[2.6vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type="text" value={registro.celular} maxLength={15} onChange={(e) => alterarDados('celular',e.target.value)} />
                            </div>
                            <h1 className="flex relative md:w-[5vw] lg:w-[4vw] md:bottom-[4.75vw] lg:bottom-[3vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">Celular</h1>  
                        </div>

                        <div>
                            <div className="relative md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[2.6vw] rounded border-[#D1D5DB] dark:border-[#CAFF33] border-1 overflow-hidden">
                                <input className="absolute w-[98%] h-full outline-0 p-2 text-center md:text-[1.6vw] lg:text-[.8vw] dark:text-[#FFFFFF]" type="text" value={registro.rg} maxLength={12} onChange={(e) => alterarDados('rg',e.target.value)} />
                            </div>
                            <h1 className="flex relative md:w-[5vw] lg:w-[4vw] md:bottom-[4.75vw] lg:bottom-[3vw] left-[.5vw] md:text-[1vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] bg-[#F9FAFC] dark:bg-[#0B0A0A] justify-center">RG</h1>  
                        </div>
                    </div>
                        
                    <button className="absolute md:top-[27.5vw] lg:top-[20vw] md:w-[26vw] lg:w-[21.25vw] md:h-[4vw] lg:h-[3vw] bg-[#5048E5] dark:bg-[#333333] rounded text-[#000000] dark:text-[#FFFFFF] md:text-[2vw] lg:text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Conta</button>
                </div>
            </div>

            <div className="flex absolute w-[85.417vw] h-[10vh] top-[0vh] left-[14.583vw]">
                <div className="flex absolute w-[2vw] h-full right-[5vw] items-center justify-center" onClick={toggleTheme}>
                    <Image
                        className="w-auto"
                        src={dark ? 'noite.svg' : 'dia.svg'}
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
