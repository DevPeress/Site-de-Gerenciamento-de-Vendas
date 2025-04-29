'use client'

import Pagina  from "@/components/pagina";
import AuthGuard from "@/components/authguard";
import { SideBar } from "@/components/sidebar";
import { useEffect } from "react";

export default function Config() {
    useEffect(() => {
      document.title = "Configurações"
    },[])

    return (
        <>
            <AuthGuard />
            <SideBar />
            <Pagina> 
                <h1 className="absolute top-5 left-[2.7085vw] text-[2vw] text-[#111827] select-none">Configurações</h1>
                <div></div>
            </Pagina>
        </>
    )
}