'use client'

import { Empresa } from "@/components/empresa";
import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { Compradores } from "@/types/types";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Customers() {
    const [lista,setLista] = useState<number>(6)
    const [total,setTotal] = useState<number>(0)
    const [id,setID] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [pesquisa,setPesquisar] = useState<string>("")
    const [CompradoresData,setCompradoresData] = useState<Compradores[]>([ ]) 

    const proximo = () => setLista((prev => (total - lista) > 6 ? prev + 6 : (total - lista) > 0 ? prev + (total - lista) : 6))
    const voltar = () => setLista((prev => (lista) / 2 > 6 ? prev - 6 : prev = 6))

    useEffect(() => {
        document.title = "Compradores"

        fetch(`/api/infos`)
        .then(res => res.json())
        .then(data => {
            const userId: number = data.idLoja;
            setID(userId)

            return fetch(`/api/pegarCompradores?id=${userId}`);
        })
        .then(res => res.json())
        .then(data => {
            setCompradoresData(data);
            setTotal(data.length);
            return setLoading(false); 
        })
        .catch((err) => {
            Notify("Não foi encontrado os dados! Recarregue a Página");
            console.error("Compradores: ", err)
        });
    }, []);

    const CompradoresFiltrados = useMemo(() => {
        const searchTerm = pesquisa.toLowerCase()
        return CompradoresData.filter(itens => {
            const searchContent = `
            ${itens.nome.toLowerCase()}
            ${itens.email.toLowerCase()}
            ${itens.loc.toLowerCase()}
            ${itens.cell.toLowerCase()}
            ${itens.rg.toLowerCase()}
            `;

            return searchContent.includes(searchTerm);
        })
    }, [pesquisa, CompradoresData])

    return (
        <>
            <Pagina>
                {loading ? <h1 className="text-center text-[1.5vw] text-gray-500 dark:text-white">Carregando compradores...</h1>
                    : 
                    <>
                        {!id || id === 0 ? <Empresa />
                        : 
                        <>
                            <h1 className="absolute top-[5vw] md:top-[1vw] left-[25vw] md:left-[2.7085vw] text-[10vw] md:text-[3vw] lg:text-[2vw] text-[#111827] dark:text-[#FFFFFF] select-none">Customers</h1>
                            <div className="flex absolute w-[90vw] md:w-[80vw] h-[20vw] md:h-[6vw] lg:h-[4vw] top-[20vw] md:top-[7vw] lg:top-[5vw] left-[5vw] md:left-[2.7085vw] bg-[#FFFFFF] dark:bg-[#191919] rounded items-center justify-center select-none">
                                <div className="flex absolute w-[86vw] md:w-[15vw] h-[12vw] md:h-[3vw] lg:h-[2.25vw] left-[2vw] md:left-[1vw] border-1 border-[#D1D5DB] dark:border-[#CAFF33] rounded items-center justify-center">
                                    <div className="flex absolute md:w-[8vw] lg:w-[4.5vw] left-[2vw] md:left-[.5vw] bottom-[9vw] md:bottom-[2.3vw] lg:bottom-[1.8vw] bg-[#FFFFFF] dark:bg-[#191919] text-[4vw] md:text-[.8vw] lg:text-[.5vw] text-[#6B7280] dark:text-[#CAFF33] items-center justify-center">Search customer</div>
                                    <Image
                                        className="absolute w-[6vw] md:w-[1.5vw] lg:w-[1vw] left-[.8vw]"
                                        src="/lupa.svg"
                                        alt={`Ícone para lupa`}
                                        width={180}
                                        height={38}
                                        priority
                                    />
                                    <input type="text" className="absolute left-[8vw] md:left-[3vw] lg:left-[2vw] outline-0 text-[4vw] md:text-[1.5vw] lg:text-[.8vw] dark:text-[#FFFFFF]" onChange={(e) => setPesquisar(e.target.value)}/>
                                </div>
                            </div>

                            <div className="flex absolute w-[90vw] md:w-[80vw] h-[120vw] md:h-[70vw] lg:h-[33.75vw] top-[45vw] md:top-[15vw] lg:top-[10vw] left-[5vw] md:left-[2.7085vw] bg-[#FFFFFF] dark:bg-[#191919] rounded items-center justify-center select-none overflow-hidden">
                                <h1 className="absolute top-[1vw] left-[1vw] text-[4vw] md:text-[2vw] lg:text-[1vw] text-[#111827] dark:text-[#FFFFFF] select-none">Latest Orders</h1>
                                <table className="absolute w-full h-auto top-[8vw] md:top-[5vw] lg:top-[3vw]">
                                    <thead className="h-[8vw] md:h-[7vw] lg:h-[3vw] bg-[#F3F4F6] dark:bg-[#656567] text-[2vw] md:text-[1.2vw] lg:text-[.6vw] text-[#111827] dark:text-[#CAFF33] text-center">
                                        <tr>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>LOCATION</th>
                                            <th>PHONE</th>
                                            <th>RD</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {CompradoresFiltrados.slice(lista-6,lista).map((item, index) => (
                                            <tr key={index} className="border-b border-[#E6E8F0] text-center text-[#111827] dark:text-[#FFFFFF] text-[1.5vw] md:text-[1vw] lg:text-[.7vw] h-[15vw] md:h-[8vw] lg:h-[4.2vw] hover:scale-101">
                                                <td className="flex absolute items-center justify-center w-auto h-[15vw] md:h-[8vw] lg:h-[4.2vw]">
                                                    <Image
                                                        className="hidden md:flex md:w-[2.5vw] lg:w-[2vw] ml-[1vw] mr-[1vw]"
                                                        src={item.foto}
                                                        alt={`Foto da Pessoa`}
                                                        width={180}
                                                        height={38}
                                                        priority
                                                    />
                                                    <h1 className="w-[8vw] md:w-[2vw]">{item.nome}</h1>
                                                </td>
                                                <td>{item.email}</td>
                                                <td>{item.loc}</td>
                                                <td>{item.cell}</td>
                                                <td>{item.rg}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="flex absolute w-[12vw] md:w-[6vw] lg:w-[4vw] bottom-[.2vw] right-[10vw] md:right-[2vw] h-auto items-center justify-between">
                                    <Image
                                        onClick={voltar}
                                        className="w-[10vw] md:w-[4vw] lg:w-[2.5vw]"
                                        src="/seta.svg"
                                        alt={`Ícone para Seta`}
                                        width={180}
                                        height={38}
                                        priority
                                    />

                                    <Image
                                        onClick={proximo}
                                        className="w-[10vw] md:w-[4vw] lg:w-[2.5vw] rotate-180"
                                        src="/seta.svg"
                                        alt={`Ícone para Seta`}
                                        width={180}
                                        height={38}
                                        priority
                                    />
                                </div>

                                <div className="flex absolute bottom-[2.5vw] md:bottom-[1.2vw] lg:bottom-[.75vw] right-[22vw] md:right-[8vw] lg:right-[6vw] items-center justify-center text-[#111827] dark:text-[#FFFFFF] text-[3vw] md:text-[1.2vw] lg:text-[.6vw]">{lista-5}-{lista > 6 ? lista : total} of {total}</div>
                            </div>
                        </>
                        }
                    </>
                }
            </Pagina>
        </>
    )
}