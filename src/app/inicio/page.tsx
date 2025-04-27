import Pagina from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { MyBarChart } from "@/components/grafico";
import { LastCostumers } from "@/components/lastCostumers";
import AuthGuard from "@/components/authguard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Ínicio',
    description: 'Página inicial do projeto'
}

export default async function DashBoard() {
    let budget, customers, task, total = 0

    let id = 1

    const resp = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pegarValores?id=${id}`);
    const valores = await resp.json();
    
    if (valores) {
        budget = valores.budget
        customers = valores.customers
        task = valores.task
        total = valores.total
    }

    const tipos = [
        { n: "ORÇAMENTO", i: "budge.svg", v: budget },
        { n: "CLIENTES TOTAIS", i: "customers.svg", v: customers },
        { n: "PROGRESSO DA TAREFA", i: "task.svg", v: task },
        { n: "LUCRO TOTAL", i: "profit.svg", v: total }
    ]

    return (
        <>
            <AuthGuard />
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