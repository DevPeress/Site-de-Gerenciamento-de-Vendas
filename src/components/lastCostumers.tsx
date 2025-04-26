'use client';

import { useEffect, useState } from "react";
import { Notify } from "./notify";

interface Usuarios {
    ordem: number,
    comprador: string,
    data: string,
    status: number
}

export function LastCostumers() {
    // API PUXANDO O GRÁFICO PELA LOJA
    const id = 1

    const [dado,setDados] = useState<Usuarios[]>([])

    useEffect(() => {
        fetch(`/api/pegarUltimosPedidos?id=${id}`)
        .then(res => res.json())
        .then(data => setDados(data))
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }, []);

    return (

        <table className="absolute w-full h-auto top-[20%]">
            <thead className="h-12 bg-[#F3F4F6] text-[.6vw] text-[#111827] text-center">
                <tr>
                    <th>Order ref</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody >
                {dado.map((item,index) => {
                    const color = item.status === 1 ? "#FFB020" : item.status === 2 ? "#14B8A6" : "#D14343"

                    return (
                        <tr key={index} className="border-b border-[#E6E8F0] text-center text-[#111827] text-[.7vw] h-15 hover:scale-101">
                            <td>{item.ordem}</td>
                            <td>{item.comprador}</td>
                            <td>{item.data}</td>
                            <td className="flex relative w-auto h-15 items-center justify-center">
                                <div className="flex relative w-1/3 h-8 items-center justify-center rounded text-[#FFFFFF] text-[.5vw]" style={{background: color }}>PENDING</div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
  );
}
