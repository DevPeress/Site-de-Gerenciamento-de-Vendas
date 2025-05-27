'use client'

import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image" 
import { useEffect, useState } from "react";
import { Notify } from "./notify";

const Header = () => {
    const { dark, toggleTheme } = useTheme()
    const [foto,setFoto] = useState<string>("/User.svg")
    const [logado,setLogado] = useState<boolean>(false)

    useEffect(() => {
        const savedDark = localStorage.getItem('tema');
        if (!savedDark) {
            localStorage.setItem('tema', dark ? "escuro" : "claro");
        } else {
            if (dark) {
                savedDark === "escuro" ? "" : toggleTheme
            } else {
                savedDark === "claro" ? toggleTheme : ""
            }
        }
        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId: number = data.id;
        
            return fetch(`/api/pegarUsuario?id=${userId}`);
        })
        .then(res => res.json())
        .then(data =>  {
            setFoto(data.foto)
            setLogado(true)
        })
        .catch((err) => { Notify("Não foi encontrado os dados! Recarregue a Página") })
    },[])

    return (
        <div className="flex absolute w-[85.417vw] h-[10vh] top-[0vh] left-[14.583vw]" style={{ background: dark ? '#111' : '#FFFFFF' }}>
            <header>
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
                {logado ? 
                    <>
                        <div className="flex absolute w-[2vw] h-full right-[2vw] items-center justify-center">
                            <Image
                                className="w-auto"
                                src={foto}
                                alt={`Ícone da conta`}
                                width={180}
                                height={38}
                                priority
                            />
                        </div>
                    </> : ""
                }
            </header>
        </div>
    )
}

export default Header;