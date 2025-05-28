'use client'

import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image" 
import { useEffect, useState } from "react";
import { Notify } from "./notify";
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface Escolhas {
    nome: string,
    off: string,
    on: string
}

const Header = () => {
    const { dark, toggleTheme } = useTheme()
    const [foto,setFoto] = useState<string>("/User.svg")
    const [logado,setLogado] = useState<boolean>(false)
    const pathname: string = usePathname();
    const urlSemBarraInicial: string = pathname.replace(/^\/+/, '');
    const [menu,setMenu] = useState<boolean>(false)

    const escolhas: Escolhas[] = [
        { nome: "Inicio", off: "/dashboard-d.svg", on:"/dashboard-a.svg" },
        { nome: "Compradores", off: "/customers-d.svg", on:"/customers-a.svg" },
        { nome: "Produtos", off: "/products-d.svg", on:"/products-a.svg" },
        { nome: "Conta", off: "/account-d.svg", on:"/account-a.svg" },
        { nome: "Configuracoes", off: "/settings-d.svg", on:"/settings-a.svg" },
        { nome: "Registrar", off: "/register-d.svg", on:"/register-a.svg" },
    ]

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
        <div className="flex absolute w-full md:w-[85.417vw] h-[10vh] top-[0vh] md:left-[14.583vw]" style={{ background: dark ? '#111' : '#FFFFFF' }}>
            <header>
                <div className="flex md:hidden absolute w-[10vw] h-[4vh] top-[3vh] right-[5vw] items-center justify-center border-white border-1 rounded-[1vw]" onClick={() => setMenu(!menu)}>
                    <div className="flex relative w-[1vw] h-[3vh] bg-white rounded mr-[1.5vw]"></div>
                    <div className="flex relative w-[1vw] h-[3vh] bg-white rounded mr-[1.5vw]"></div>
                    <div className="relative w-[1vw] h-[3vh] bg-white rounded"></div>

                    {menu ? 
                        <>
                            <div className="flex absolute w-[45vw] bg-[#111827] h-[60vw] top-[-.3vw] right-[-.3vw] rounded">
                                <nav className="flex absolute w-full h-full items-center justify-center flex-wrap">
                                    {escolhas.map((item) => {
                                        const pagina: string = item.nome.toLowerCase()
                                        const isActive: boolean = urlSemBarraInicial === pagina;
                                        const textColor: string = isActive ? 'text-[#10B981]' : 'text-[#D1D5DB]';
                                        const iconSrc: string = isActive ? item.on : item.off;
                                        const config: string = item.nome === "Configuracoes" ? "Configurações" : item.nome

                                        return (
                                            <Link key={item.nome} href={pagina} className="flex relative w-full h-[5vw] items-center justify-center">
                                                <Image
                                                    className="relative w-[5vw] mr-[1vw]"
                                                    src={iconSrc}
                                                    alt={`Ícone para ${item.nome}`}
                                                    width={180}
                                                    height={38}
                                                    priority
                                                />
                                                <h1 className={`relative text-[4vw] ${textColor}`}>{config}</h1>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </> 
                        
                        : <></>
                    }
                </div>

                <div className="hidden md:flex absolute md:w-[3vw] md:right-[6vw] h-full items-center justify-center" onClick={toggleTheme}>
                    <Image
                        className="w-auto"
                        src={dark ? '/Noite.svg' : '/Dia.svg'}
                        alt={`Ícone para do tema`}
                        width={180}
                        height={38}
                        priority
                    />
                </div>

                <div className="md:hidden flex absolute w-[10vw] h-full items-center justify-center" onClick={toggleTheme} style={{ right: menu ? '55vw' : '25vw' }}>
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
                        <div className="hidden md:flex absolute w-[3vw] h-full right-[2vw] items-center justify-center">
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