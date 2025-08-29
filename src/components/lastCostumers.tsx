'use client';

import { useEffect, useState } from "react";
import { Notify } from "./notify";
import { Status, Usuarios } from "@/types/types";

export function LastCostumers() {
    const [dado,setDados] = useState<Usuarios[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId = data.idLoja;

            return  fetch(`/api/pegarUltimosPedidos?id=${userId}`)
        })
        .then(res => res.json())
        .then(data => { setDados(data), setLoading(false)} )
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }, []);

    const getStatusInfo = (status: Usuarios['status']): Status => {
        switch (status) {
            case 1:
                return { cor: "#FFB020", nome: "Pendente" };
            case 2:
                return { cor: "#14B8A6", nome: "Entregue" };
            default:
                return { cor: "#D14343", nome: "Refound" };
        }
    };

    if (loading) {
        return(
            <h1 className="text-center text-[1.5vw] text-gray-500 dark:text-white">Carregando últimos compradores!</h1>
        )
    }
    
    return (
        <table className="absolute w-full h-auto top-[10%] md:top-[20%]">
            <thead className="h-[10vw] md:h-[4.2vw] lg:h-[2.5vw] bg-[#F3F4F6] dark:bg-[#656567] text-[3vw] md:text-[1.2vw] lg:text-[.6vw] text-[#111827] dark:text-[#CAFF33] text-center select-none">
                <tr>
                    <th>Ordem</th>
                    <th>Comprador</th>
                    <th>Data</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody >
                {dado.map((item,index) => {
                    const statusInfo: Status = getStatusInfo(item.status);

                    return (
                        <tr key={index} className="border-b border-[#E6E8F0] text-center text-[#111827] dark:text-[#FFFFFF] text-[4vw] md:text-[1.4vw] lg:text-[.7vw] md:h-[5.3vw] lg:h-[3.2vw] hover:scale-101">
                            <td>{item.ordem}</td>
                            <td>{item.comprador}</td>
                            <td>{item.data}</td>
                            <td className="flex relative w-auto h-[15vw] md:h-[4.8vw] lg:h-[2.5vw] items-center justify-center">
                                <div className="flex relative w-[25vw] md:w-[7vw] lg:w-[4vw] h-[6vw] md:h-[2.75vw] lg:h-[1.5vw] items-center justify-center rounded dark:text-[#0B0A0A] md:text-[1.2vw] lg:text-[.5vw]" style={{background: statusInfo.cor }}>{statusInfo.nome}</div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
