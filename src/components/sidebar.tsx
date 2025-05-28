'use client';

import Image from "next/image" 
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { Notify } from "./notify";

interface Escolhas {
    nome: string,
    off: string,
    on: string
}

export function SideBar() {
    const pathname: string = usePathname();
    const urlSemBarraInicial: string = pathname.replace(/^\/+/, '');
    const [nome,setNome] = useState<Escolhas['nome']>('')
    
    const escolhas: Escolhas[] = [
        { nome: "Inicio", off: "/dashboard-d.svg", on:"/dashboard-a.svg" },
        { nome: "Compradores", off: "/customers-d.svg", on:"/customers-a.svg" },
        { nome: "Produtos", off: "/products-d.svg", on:"/products-a.svg" },
        { nome: "Conta", off: "/account-d.svg", on:"/account-a.svg" },
        { nome: "Configuracoes", off: "/settings-d.svg", on:"/settings-a.svg" },
        { nome: "Registrar", off: "/register-d.svg", on:"/register-a.svg" },
    ]

    useEffect(() => {
        const savedNome = localStorage.getItem('nome');

        if (savedNome) {
            setNome(savedNome);
        } else {
            fetch(`/api/infos`)
            .then(res => res.json())
            .then(data => {
                const userId = data.id;

                return fetch(`/api/pegarValores?id=${userId}`);
            })
            .then(res => res.json())
            .then(data => {
                setNome(data.nome);
                localStorage.setItem('nome', data.nome);
            })
            .catch((err) => Notify("Não foi possivel carregar toda a sidebar! Recarregue a Página"));
        }
    }, []);

    return(
        <main className="hidden md:flex fixed items-center justify-center bg-[#111827] w-[14.583vw] h-full select-none">
            <div className="flex absolute w-[12.1525vw] h-[8vh] top-[2vh] right-[2vw] items-center justify-center">
                <Image
                    className="relative w-[5vw] lg:w-[3vw] lg:mr-[3vw] top-[1.5vh]"
                    src="/P-Free.svg"
                    alt="Logo versão free"
                    width={180}
                    height={38}
                    priority
                />
                <div className="flex relative items-center justify-center text-[#FFFFFF] md:text-[1vw] lg:text-[.5vw] bg-[#828DF8] md:w-[5vw] lg:w-[3.5vw] md:h-[2vw] lg:h-[1vw] lg:right-[4vh] rounded">FREE</div>
            </div>

            <div className="flex absolute top-[12vh] bg-[rgb(255,255,255,0.04)] w-[12.1525vw] h-[6vh] rounded items-center">
                <h1 className="absolute md:top-[2vw] lg:top-[1vh] left-[1vw] text-[#FFFFFF] text-[1vw]">{nome}</h1>
                <h2 className="absolute md:top-[3.5vw] lg:top-[3.5vh] left-[1vw] text-[#9CA3AF] md:text-[.8vw] lg:text-[.5vw]">Your tier: Premium</h2>
            </div>
            
            <div className="absolute top-[25vh] w-full h-[0.1vw] bg-[#1F2937]"></div>

            <nav className="flex absolute w-full items-center justify-center flex-wrap">
                {escolhas.map((item) => {
                    const pagina: string = item.nome.toLowerCase()
                    const isActive: boolean = urlSemBarraInicial === pagina;
                    const textColor: string = isActive ? 'text-[#10B981]' : 'text-[#D1D5DB]';
                    const iconSrc: string = isActive ? item.on : item.off;
                    const config: string = item.nome === "Configuracoes" ? "Configurações" : item.nome

                    return (
                        <Link key={item.nome} href={pagina} className="flex relative w-4/5 md:h-[3vw] lg:h-[2vw] items-center hover:scale-110">
                            <Image
                                className="relative w-[1.2vw] mr-[1vw]"
                                src={iconSrc}
                                alt={`Ícone para ${item.nome}`}
                                width={180}
                                height={38}
                                priority
                            />
                            <h1 className={`relative md:text-[1.25vw] lg:text-[1vw] ${textColor}`}>{config}</h1>
                        </Link>
                    );
                })}
            </nav>
        </main>
    )
}
