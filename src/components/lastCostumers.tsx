'use client';

import { useEffect, useState } from "react";
import { Notify } from "./notify";

interface Usuarios {
    ordem: number,
    comprador: string,
    data: string,
    status: number
}

interface Infos {
    cor: string,
    nome: string
}

export function LastCostumers() {
    const [dado,setDados] = useState<Usuarios[]>([])
    const [loading,setLoading] = useState(true)

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

    const getStatusInfo = (status: number): Infos => {
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
            <h1 className="text-center text-[1.5vw] text-gray-500">Carregando últimos compradores!</h1>
        )
    }
    
    return (
        <table className="absolute w-full h-auto top-[20%]">
            <thead className="h-12 bg-[#F3F4F6] text-[.6vw] text-[#111827] text-center select-none">
                <tr>
                    <th>Ordem</th>
                    <th>Comprador</th>
                    <th>Data</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody >
                {dado.map((item,index) => {
                    const statusInfo = getStatusInfo(item.status);

                    return (
                        <tr key={index} className="border-b border-[#E6E8F0] text-center text-[#111827] text-[.7vw] h-15 hover:scale-101">
                            <td>{item.ordem}</td>
                            <td>{item.comprador}</td>
                            <td>{item.data}</td>
                            <td className="flex relative w-auto h-15 items-center justify-center">
                                <div className="flex relative w-1/3 h-8 items-center justify-center rounded text-[#FFFFFF] text-[.5vw]" style={{background: statusInfo.cor }}>{statusInfo.nome}</div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}
