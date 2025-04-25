'use client';
import Image from "next/image" 
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Escolhas {
    nome: string,
    off: string,
    on: string
}

export function SideBar() {
    const pathname = usePathname();
    const urlSemBarraInicial = pathname.replace(/^\/+/, '');
    
    const escolhas: Escolhas[] = [
        { nome: "Inicio", off: "dashboard-d.svg", on:"dashboard-a.svg" },
        { nome: "Compradores", off: "customers-d.svg", on:"customers-a.svg" },
        { nome: "Produtos", off: "products-d.svg", on:"products-a.svg" },
        { nome: "Conta", off: "account-d.svg", on:"account-a.svg" },
        { nome: "Configurações", off: "settings-d.svg", on:"settings-a.svg" },
        { nome: "Logar", off: "login-d.svg", on:"login-a.svg" },
        { nome: "Registrar", off: "register-d.svg", on:"register-a.svg" },
        { nome: "Erros", off: "error-d.svg", on:"error-a.svg" }
    ]

    return(
        <main className="flex fixed items-center justify-center bg-[#111827] w-[14.583vw] h-full select-none">
            <div className="flex absolute w-full h-20 top-5 items-center justify-center">
                <Image
                    className="absolute w-1/5 left-8"
                    src="/P-Free.svg"
                    alt="Logo versão free"
                    width={180}
                    height={38}
                    priority
                />
                <div className="flex absolute items-center justify-center text-[#FFFFFF] text-[.45vw] bg-[#828DF8] w-12 h-6 rounded left-23 top-4">FREE</div>
            </div>

            <div className="flex absolute top-30 bg-[rgb(255,255,255,0.04)] w-5/6 h-15 rounded items-center">
                <h1 className="absolute top-2 left-5 text-[#FFFFFF] text-lg">Acme Inc</h1>
                <h2 className="absolute top-8 left-5 text-[#9CA3AF] text-xs">Your tier: Premium</h2>
            </div>
            
            <div className="absolute top-60 w-full h-[0.1vw] bg-[#1F2937]"></div>

            <div className="flex absolute w-full h-100 items-center justify-center flex-wrap">
                {escolhas.map((item) => {
                    const pagina = item.nome.toLowerCase()
                    const isActive = urlSemBarraInicial === pagina;
                    const textColor = isActive ? 'text-[#10B981]' : 'text-[#D1D5DB]';
                    const iconSrc = isActive ? item.on : item.off;

                    return (
                        <div key={item.nome} className="flex relative w-4/5 h-10 items-center justify-center rounded-[.5vw] hover:scale-105">
                            <Link href={pagina}>
                                <Image
                                    className="absolute w-5 left-5"
                                    src={iconSrc}
                                    alt={`Ícone para ${item.nome}`}
                                    width={180}
                                    height={38}
                                    priority
                                />
                                <h1 className={`absolute left-12 text-[1vw] ${textColor}`}>{item.nome}</h1>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </main>
    )
}