import { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';

export const metadata: Metadata = {
    title: '404',
    description: 'Página não encontrada'
}

export default function NotFound() {
    return(
        <div className="flex absolute w-full h-full dark:bg-black top-0 bottom-0 left-0 right-0 m-auto items-center justify-center select-none">
            <h1 className="absolute text-black text-[1.5vw] top-[5vw]">404: Página não encontrada!</h1>
            <h2 className="absolute text-black text-[.8vw] top-[8vw]">Ou você tentou alguma rota suspeita ou chegou aqui por engano. Seja qual for, tente usar a navegação</h2>
            <Image
                className="absolute w-[50vw]"
                src="/404.svg"
                alt="Logo 404 erro"
                width={180}
                height={38}
                priority
            />

            <Link href="/inicio" className="flex absolute items-center justify-center bottom-[10vw]">
                <div className="flex absolute w-[10vw] h-[2.5vw] bg-[#5048E5] items-center justify-center rounded-[.5vw] hover:scale-110">
                    <Image
                        className="absolute w-[1.5vw] left-[1vw]"
                        src="/arrow-back.svg"
                        alt="Seta para voltar ao painel"
                        width={180}
                        height={38}
                        priority
                    />
                    <h2 className="absolute text-[#FFFFFF] text-[.8vw] left-[3vw]">Página Inicial</h2>
                </div>
            </Link>
        </div>
    )
}