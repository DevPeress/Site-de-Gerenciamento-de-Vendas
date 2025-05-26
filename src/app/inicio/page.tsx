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
        <Empresa />
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
                <div className="flex absolute left-[2.7085vw] top-1 w-[80vw] h-40 items-center justify-between select-none">
                    {tipos.map((item, index) => {
                        const cifrao = item.n === "PROGRESSO DA TAREFA" || item.n === "CLIENTES TOTAIS" ? "" : "R$"
                        const porc = item.n === "PROGRESSO DA TAREFA" ? "%" : ""

                        return (
                            <div key={index} className="flex relative w-[22.5%] h-full bg-[#FFFFFF] rounded items-center justify-center">
                                <h1 className="absolute top-10 left-5 text-[#6B7280] text-[.5vw] font-bold">{item.n}</h1>
                                <div className="absolute top-15 left-5 text-[#111827] text-[2vw] font-bold">{cifrao}{item.v}{porc}</div>
                                <Image
                                    className="absolute w-15 top-10 right-5"
                                    src={item.i}
                                    alt={`Ícone para profit`}
                                    width={180}
                                    height={38}
                                    priority
                                />
                                {porc ? <>
                                    <div className="absolute w-[90%] h-2 bottom-10 bg-[#FFFFFF] rounded overflow-hidden">
                                        <div className="bg-[#5048E5] h-2" style={{ width:`${valores2.task}%`}}></div>
                                    </div>
                                    </>:<></>
                                }
                            </div>
                        )
                    })}
                </div>

                <div className="flex absolute left-[2.7085vw] top-45 w-[80vw] h-2/5 bg-[#FFFFFF] rounded items-center justify-center select-none">
                    <h1 className="absolute top-5 left-5 text-[#111827] text-[1vw] font-bold">ÚLTIMAS VENDAS</h1>
                    <MyBarChart />
                </div>

                <div className="flex absolute left-[2.7085vw] top-135 w-[80vw] h-[15vw] bg-[#FFFFFF] rounded items-center justify-center overflow-hidden">
                    <h1 className="absolute top-5 left-5 text-[#111827] text-[1vw] font-bold select-none">ÚLTIMOS PEDIDOS</h1>
                    <LastCostumers />
                </div>
            </Pagina>
        </>
    )
}