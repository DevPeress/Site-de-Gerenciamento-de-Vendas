import Pagina from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { MyBarChart } from "@/components/grafico";
import { LastCostumers } from "@/components/lastCostumers";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Empresa } from "@/components/empresa";

export const metadata: Metadata = {
    title: 'Ínicio',
    description: 'Página inicial do projeto'
}

interface Valores {
    budget: number;
    customers: number;
    task: any;
    total: number;
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
        { n: "ORÇAMENTO", i: "budge.svg", v: valores2.budget },
        { n: "CLIENTES TOTAIS", i: "customers.svg", v: valores2.customers },
        { n: "PROGRESSO DA TAREFA", i: "task.svg", v: valores2.task },
        { n: "LUCRO TOTAL", i: "profit.svg", v: valores2.total }
    ]

    return (
        <>
            <SideBar />
            <Pagina>
                <div className="flex absolute left-[2.7085vw] top-[0.2vw] w-[80vw] h-[8vw] items-center justify-between select-none">
                    {tipos.map((item, index) => {
                        const cifrao = item.n === "PROGRESSO DA TAREFA" || item.n === "CLIENTES TOTAIS" ? "" : "R$"
                        const porc = item.n === "PROGRESSO DA TAREFA" ? "%" : ""

                        return (
                            <div key={index} className="flex relative w-[22.5%] h-full bg-[#FFFFFF] rounded items-center justify-center">
                                <h1 className="absolute top-[2.5vw] left-[1vw] text-[#6B7280] text-[.5vw] font-bold">{item.n}</h1>
                                <div className="absolute top-[3vw] left-[1vw] text-[#111827] text-[2vw] font-bold">{cifrao}{item.v}{porc}</div>
                                <Image
                                    className="absolute w-[3vw] top-[2.5vw] right-[1vw]"
                                    src={item.i}
                                    alt={`Ícone para profit`}
                                    width={180}
                                    height={38}
                                    priority
                                />
                                {porc ? <>
                                    <div className="absolute w-[90%] h-[.5vw] bottom-[1.5vw] bg-[#FFFFFF] rounded overflow-hidden">
                                        <div className="bg-[#5048E5] h-full" style={{ width:`${valores2.task}%`}}></div>
                                    </div>
                                    </>:<></>
                                }
                            </div>
                        )
                    })}
                </div>

                <div className="flex absolute left-[2.7085vw] top-[9vw] w-[80vw] h-[18vw] bg-[#FFFFFF] rounded items-center justify-center select-none">
                    <h1 className="absolute top-[1vw] left-[1vw] text-[#111827] text-[1vw] font-bold">ÚLTIMAS VENDAS</h1>
                    <MyBarChart />
                </div>

                <div className="flex absolute left-[2.7085vw] top-[27.5vw] w-[80vw] h-[15vw] bg-[#FFFFFF] rounded items-center justify-center overflow-hidden">
                    <h1 className="absolute top-[1vw] left-[1vw] text-[#111827] text-[1vw] font-bold select-none">ÚLTIMOS PEDIDOS</h1>
                    <LastCostumers />
                </div>
            </Pagina>
        </>
    )
}