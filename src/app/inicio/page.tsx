import Pagina from "@/components/pagina";
import Image from "next/image";
import { MyBarChart } from "@/components/grafico";
import { LastCostumers } from "@/components/lastCostumers";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Empresa } from "@/components/empresa";
import { Valores } from "@/types/types";

export const metadata: Metadata = {
    title: 'Ínicio',
    description: 'Página inicial do projeto'
}

export default async function DashBoard() {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    if (!auth) return 
    
    let valores = await JSON.parse(auth.value)
    let id: number = valores.id

    const resp = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pegarValores?id=${id}`);
    if (resp.status !== 200) {
        return <Empresa />
    }

    const valores2: Valores = await resp.json();
        
    if (!valores2) {
       return
    }

    const tipos = [
        { n: "ORÇAMENTO", i: "/budge.svg", v: valores2.budget },
        { n: "CLIENTES TOTAIS", i: "/customers.svg", v: valores2.customers },
        { n: "PROGRESSO DA TAREFA", i: "/task.svg", v: valores2.task },
        { n: "LUCRO TOTAL", i: "/profit.svg", v: valores2.total }
    ]

    return (
        <>
            <Pagina>
                <div className="grid grid-cols-1 md:grid-cols-4 absolute left-[5vw] top-[2vw] md:top-[0.2vw] w-[90vw] md:w-[80vw] h-[60vh] md:h-[12vw] lg:h-[8vw] items-center justify-between select-none">
                    {tipos.map((item, index) => {
                        const cifrao = item.n === "PROGRESSO DA TAREFA" || item.n === "CLIENTES TOTAIS" ? "" : "R$"
                        const porc = item.n === "PROGRESSO DA TAREFA" ? "%" : ""

                        return (
                            <div key={index} className="flex relative w-full md:w-[15vw] h-[13.5vh] md:h-full bg-[#FFFFFF] dark:bg-[#191919] rounded items-center justify-center">
                                <h1 className="absolute top-[5vw] md:top-[4vw] lg:top-[2.5vw] left-[8vw] md:left-[1vw] text-[#6B7280] dark:text-[#CAFF33] text-[4.5vw] md:text-[.8vw] lg:text-[.5vw] font-bold">{item.n}</h1>
                                <div className="absolute md:top-[5vw] lg:top-[3vw] left-[8vw] md:left-[1vw] text-[#111827] dark:text-[#FFFFFF] text-[5vw] md:text-[2vw] lg:text-[2vw] font-bold">{cifrao}{item.v}{porc}</div>
                                <Image
                                    className="absolute w-[18vw] md:w-[3vw] right-[5vw] md:right-[1vw]"
                                    src={item.i}
                                    alt={`Ícone para profit`}
                                    width={180}
                                    height={38}
                                    priority
                                />
                                {porc ? <>
                                    <div className="absolute w-[90%] h-[2vw] md:h-[1vw] lg:h-[.5vw] bottom-[3vw] md:bottom-[2vw] lg:bottom-[1.5vw] bg-[#FFFFFF] dark:bg-[#191919] rounded overflow-hidden">
                                        <div className="bg-[#5048E5] dark:bg-[#D8FF66] h-full" style={{ width:`${valores2.task}%`}}></div>
                                    </div>
                                    </>:<></>
                                }
                            </div>
                        )
                    })}

                     <div className="flex absolute top-[160vw] md:top-[15vw] lg:top-[9vw] w-[90vw] md:w-[75vw] h-[80vw] md:h-[50vw] lg:h-[18vw] bg-[#FFFFFF] dark:bg-[#191919] rounded items-center justify-center select-none">
                        <h1 className="absolute top-[1vw] left-[1vw] text-[#111827] dark:text-[#FFFFFF] text-[4vw] md:text-[1.5vw] lg:text-[1vw] font-bold">ÚLTIMAS VENDAS</h1>
                        <MyBarChart />
                    </div>

                    <div className="flex absolute top-[245vw] md:top-[67.5vw] lg:top-[27.5vw] w-[90vw] md:w-[75vw] h-[62vw] md:h-[25vw] lg:h-[15vw] bg-[#FFFFFF] dark:bg-[#191919] rounded items-center justify-center overflow-hidden">
                        <h1 className="absolute top-[1vw] left-[1vw] text-[#111827] dark:text-[#FFFFFF] text-[4vw] md:text-[1.5vw] lg:text-[1vw] font-bold select-none">ÚLTIMOS PEDIDOS</h1>
                        <LastCostumers />
                    </div>
                </div>
            </Pagina>
        </>
    )
}