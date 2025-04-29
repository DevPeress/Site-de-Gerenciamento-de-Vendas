'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Config() {
    const router = useRouter();
    const [senha,setSenha] = useState("")

    useEffect(() => {
      document.title = "Configurações"
    },[])

    const changePassword = () => {
        fetch(`/api/trocarSenha`,{
            method: "POST",
            body: JSON.stringify({
                senha
            })
        })
        .then(res => res.json())
        .then(data => {
          if (data) {
            Notify("Senha alterada com sucesso!")
          }
        })
    }

    return (
        <>
            <SideBar />
            <Pagina> 
                <h1 className="absolute top-5 left-[2.7085vw] text-[2vw] text-[#111827] select-none">Configurações</h1>
                <div></div>
            </Pagina>
        </>
    )
}