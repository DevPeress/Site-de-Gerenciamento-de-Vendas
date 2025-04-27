import Pagina from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { MyBarChart } from "@/components/grafico";
import { LastCostumers } from "@/components/lastCostumers";
import AuthGuard from "@/components/rota";

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
        { n: "BUDGET", i: "budge.svg", v: budget },
        { n: "TOTAL CUSTOMERS", i: "customers.svg", v: customers },
        { n: "TASK PROGRESS", i: "task.svg", v: task },
        { n: "TOTAL PROFIT", i: "profit.svg", v: total }
    ]

    return (
        <>
            <AuthGuard />
            <SideBar />
            <Pagina>
                <div className="flex absolute left-[2.7085vw] top-1 w-[80vw] h-40 items-center justify-between select-none">
                    {tipos.map((item, index) => {
                        const cifrao = item.n === "TASK PROGRESS" || item.n === "TOTAL CUSTOMERS" ? "" : "R$"
                        const porc = item.n === "TASK PROGRESS" ? "%" : ""

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
                    <h1 className="absolute top-5 left-5 text-[#111827] text-[1vw] font-bold">Latest Sales</h1>
                    <MyBarChart />
                </div>

                <div className="flex absolute left-[2.7085vw] top-135 w-[80vw] h-[15vw] bg-[#FFFFFF] rounded items-center justify-center overflow-hidden">
                    <h1 className="absolute top-5 left-5 text-[#111827] text-[1vw] font-bold select-none">Latest Orders</h1>

                    <LastCostumers />
                </div>
            </Pagina>
        </>
    )
}