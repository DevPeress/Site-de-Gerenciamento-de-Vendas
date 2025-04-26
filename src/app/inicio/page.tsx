import Pagina from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { MyBarChart } from "@/components/grafico";
import { LastCostumers } from "@/components/lastCostumers";

export default async function DashBoard() {
    let budget = 0
    let customers = 0
    let task = 0
    let total = 0

    let id = 1

    const resp = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/pegarValores?id=${id}`);
    const valores = await resp.json();
    
    if (valores) {
        budget = valores.budget
        customers = valores.customers
        task = valores.task
        total = valores.total
    }

    return (
        <>
            <SideBar />
            <Pagina>
                <div className="flex absolute left-[2.7085vw] top-1 w-[80vw] h-40 items-center justify-between">
                    <div className="flex relative w-[22.5%] h-full bg-[#FFFFFF] rounded items-center justify-center">
                        <h1 className="absolute top-10 left-5 text-[#6B7280] text-[.5vw] font-bold">BUDGET</h1>
                        <div className="absolute top-15 left-5 text-[#111827] text-[2vw] font-bold">R${budget}</div>
                        <Image
                            className="absolute w-15 top-10 right-5"
                            src="budge.svg"
                            alt={`Ícone para budge`}
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                    <div className="flex relative w-[22.5%] h-full bg-[#FFFFFF] rounded items-center justify-center">
                        <h1 className="absolute top-10 left-5 text-[#6B7280] text-[.5vw] font-bold">Total Customers</h1>
                        <div className="absolute top-15 left-5 text-[#111827] text-[2vw] font-bold">{customers}</div>
                        <Image
                            className="absolute w-15 top-10 right-5"
                            src="customers.svg"
                            alt={`Ícone para Customers`}
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                    <div className="flex relative w-[22.5%] h-full bg-[#FFFFFF] rounded items-center justify-center">
                        <h1 className="absolute top-10 left-5 text-[#6B7280] text-[.5vw] font-bold">Task Progress</h1>
                        <div className="absolute top-15 left-5 text-[#111827] text-[2vw] font-bold">{task}%</div>
                        <Image
                            className="absolute w-15 top-10 right-5"
                            src="task.svg"
                            alt={`Ícone para Task`}
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                    <div className="flex relative w-[22.5%] h-full bg-[#FFFFFF] rounded items-center justify-center">
                        <h1 className="absolute top-10 left-5 text-[#6B7280] text-[.5vw] font-bold">Total Profit</h1>
                        <div className="absolute top-15 left-5 text-[#111827] text-[2vw] font-bold">R${total}k</div>
                        <Image
                            className="absolute w-15 top-10 right-5"
                            src="profit.svg"
                            alt={`Ícone para profit`}
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                </div>

                <div className="flex absolute left-[2.7085vw] top-45 w-[80vw] h-2/5 bg-[#FFFFFF] rounded items-center justify-center">
                    <h1 className="absolute top-5 left-5 text-[#111827] text-[1vw] font-bold">Latest Sales</h1>
                    <MyBarChart />
                </div>

                <div className="flex absolute left-[2.7085vw] top-135 w-[80vw] h-[15vw] bg-[#FFFFFF] rounded items-center justify-center overflow-hidden">
                    <h1 className="absolute top-5 left-5 text-[#111827] text-[1vw] font-bold">Latest Orders</h1>

                    <LastCostumers />
                </div>
            </Pagina>
        </>
    )
}