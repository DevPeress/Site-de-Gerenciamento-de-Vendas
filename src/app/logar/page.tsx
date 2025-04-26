'use client'

import { useState } from "react"

export default function Login() { 
    const [email,setEmail] = useState("")
    const [etapa,setEtapa] = useState<"1" | "2" | "3">("1")

    const verifyEmail = () => {
        if (email.includes("@") && email.includes(".com")) {
            setEtapa("2")
        } else {

        }
    }

    const verifyLogin = () => {
        if (email.includes("@") && email.includes(".com")) {
            // Lógica de Login
        } else {
            // Lógica de Erro
        }
    }

    const verifyRegister = () => {
        if (email.includes("@") && email.includes(".com")) {
            // Lógica de Registrar conta nova
        } else {
            // Lógica de Erro
        }
    }

    return (
        <>
            <div className="absolute w-full min-h-screen bg-[#090E23] overflow-hidden">
                <div className="flex absolute w-1/2 min-h-screen bg-white items-center justify-center select-none">
                    <div className="flex absolute w-[400px] h-[441px]">
                        <h1 className="absolute top-10 text-[2vw] text-[#111827]">Welcome</h1>
                        <h2 className="absolute top-22 text-[1vw] text-[#6B7280]">Sign up on the internal platform</h2>

                        <div className="absolute w-auto h-5 top-35 text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                        <div className="absolute w-full h-12 rounded top-45 border-[#D1D5DB] border-1 overflow-hidden">
                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <h1 className="flex absolute w-18 top-43.5 left-2 text-[.5vw] text-[#6B7280] bg-white justify-center">Email Address</h1> 

                        <button className="absolute bottom-20 w-full h-15 bg-[#5048E5] rounded text-[#FFFFFF] text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Continuar</button>
                    </div>
                </div>
            </div>
        </>
    )
}