'use client'

import { useEffect, useState } from "react"
import { Notify } from "@/components/notify"
import { SideBar } from "@/components/sidebar"
import { useRouter } from "next/navigation";

export default function Login() { 
    const router = useRouter();
    const [email,setEmail] = useState("")
    const [id,setID] = useState(0)

    useEffect(() =>{
        document.title = "Registrar"
        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId = data.idLoja;

            if (!userId || userId === 0) {
                router.push('/login');
            } 

            return setID(userId)
        })
    },[])

    const emailV = email.includes("@") && email.toLocaleLowerCase().includes(".com")

    const verifyEmail = () => {
        if (emailV) {
            fetch(`/api/verifyConta?email=${email}`)
            .then(res => res.json())
            .then(data => { 
                console.log(data)
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
                    Notify("E-mail não cadastrado  no sistema!")
                }
            })
            .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
        } else {
            Notify("E-mail está incorreto ou não registrado!");
        }
    }

    return (
        <>
            <div className="absolute w-full min-h-screen bg-[#090E23] overflow-hidden">
                <div className="flex absolute w-full min-h-screen bg-white items-center justify-center select-none">
                    <div className="flex absolute w-[400px] h-[441px]">
                        <h1 className="absolute top-10 text-[2vw] text-[#111827]">Bem-Vindo</h1>
                        <h2 className="absolute top-22 text-[1vw] text-[#6B7280]">Insira o Email do novo Funcionário</h2>

                        <div className="absolute w-auto h-5 top-35 text-[.6vw] text-[#5048E5] border-b border-[#5048E5]">Email</div>
                        <div className="absolute w-full h-12 rounded top-45 border-[#D1D5DB] border-1 overflow-hidden">
                            <input className="absolute w-[98%] h-full outline-0 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <h1 className="flex absolute w-18 top-43.5 left-2 text-[.5vw] text-[#6B7280] bg-white justify-center">Email</h1>    

                        <button className="absolute bottom-20 w-full h-15 bg-[#5048E5] rounded text-[#FFFFFF] text-[1vw] items-center justify-center hover:scale-110" onClick={verifyEmail}>Registrar Funcionario</button>
                    </div>
                </div>
            </div>
            <SideBar />
        </>
    )
}
