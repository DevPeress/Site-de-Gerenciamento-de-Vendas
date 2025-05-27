'use client'

import { Empresa } from "@/components/empresa";
import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Compradores {
    nome: string,
    email: string,
    loc: string,
    cell: string,
    rg: string,
    foto: string
}

export default function Customers() {
    const [lista,setLista] = useState<number>(6)
    const [total,setTotal] = useState<number>(0)
    const [id,setID] = useState<number>(0)

    const proximo = () => setLista((prev => (total - lista) > 6 ? prev + 6 : (total - lista) > 0 ? prev + (total - lista) : 6))
    const voltar = () => setLista((prev => (lista) / 2 > 6 ? prev - 6 : prev = 6))

    const [loading, setLoading] = useState<boolean>(true)
    const [CompradoresData,setCompradoresData] = useState<Compradores[]>([ ]) 


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
            setLoading(false); 
        })
        .catch(() => {
            Notify("Não foi encontrado os dados! Recarregue a Página");
            setLoading(false); 
        });
    }, []);

    const tableRef = useRef<HTMLTableSectionElement>(null);
    
    const Pesquisar = (texto: string) => {
        total > 0 ? setTotal(0) : setTotal(total)
        const searchTerm: string = texto.toLowerCase()
        const table = tableRef.current

        if (table) { 
            const rows = Array.from(table.getElementsByTagName('tr'));
          
            rows.forEach((row, index) => {
              const loja: Compradores = CompradoresData[index];
          
              const searchContent = `
                ${loja.nome.toLowerCase()}
                ${loja.email.toLowerCase()}
                ${loja.loc.toLowerCase()}
                ${loja.cell.toLowerCase()}
                ${loja.rg.toLowerCase()}
              `;
        
              if (searchContent.includes(searchTerm)) {
                (row as HTMLElement).style.display = ''; 
                setTotal((prev) => prev + 1)
              } else {
                (row as HTMLElement).style.display = 'none';
              }
            });
        }
    }

    return (
        <>
            <SideBar />
            <Pagina>
                {loading ? 
                    <>  
                        <h1 className="text-center text-[1.5vw] text-gray-500">Carregando compradores...</h1>
                    </> 
                
                    : 
                    
                    <>
                        {!id || id === 0 ? <><Empresa /></> 
                            : 
                            
                            <>
                                <h1 className="absolute top-[1vw] left-[2.7085vw] md:text-[3vw] lg:text-[2vw] text-[#111827] select-none">Customers</h1>
                                <div className="flex absolute w-[80vw] md:h-[6vw] lg:h-[4vw] md:top-[7vw] lg:top-[5vw] left-[2.7085vw] bg-[#FFFFFF] rounded items-center justify-center select-none">
                                    <div className="flex absolute w-[15vw] md:h-[3vw] lg:h-[2.25vw] left-[1vw] border-1 border-[#D1D5DB] rounded items-center justify-center">
                                        <div className="flex absolute md:w-[8vw] lg:w-[4.5vw] left-[.5vw] md:bottom-[2.3vw] lg:bottom-[1.8vw] bg-[#FFFFFF] md:text-[.8vw] lg:text-[.5vw] text-[#6B7280] items-center justify-center">Search customer</div>
                                        <Image
                                            className="absolute md:w-[1.5vw] lg:w-[1vw] left-[.8vw]"
                                            src="lupa.svg"
                                            alt={`Ícone para lupa`}
                                            width={180}
                                            height={38}
                                            priority
                                        />

                                        <input type="text" className="absolute md:left-[3vw] lg:left-[2vw] outline-0 md:text-[1.5vw] lg:text-[.8vw]" onChange={(e) => Pesquisar(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="flex absolute w-[80vw] md:h-[70vw] lg:h-[33.75vw] md:top-[15vw] lg:top-[10vw] left-[2.7085vw] bg-[#FFFFFF] rounded items-center justify-center select-none overflow-hidden">
                                    <h1 className="absolute top-[1vw] left-[1vw] md:text-[2vw] lg:text-[1vw] text-[#111827] select-none">Latest Orders</h1>
                                    <table className="absolute w-full h-auto md:top-[5vw] lg:top-[3vw]">
                                        <thead className="md:h-[7vw] lg:h-[3vw] bg-[#F3F4F6] md:text-[1.2vw] lg:text-[.6vw] text-[#111827] text-center">
                                            <tr>
                                                <th>NAME</th>
                                                <th>EMAIL</th>
                                                <th>LOCATION</th>
                                                <th>PHONE</th>
                                                <th>REGISTRATION DATE</th>
                                            </tr>
                                        </thead>

                                        <tbody ref={tableRef}>
                                            {CompradoresData.slice(lista-6,lista).map((item, index) => (
                                                <tr key={index} className="border-b border-[#E6E8F0] text-center text-[#111827] md:text-[1vw] lg:text-[.7vw] md:h-[8vw] lg:h-[4.2vw] hover:scale-101">
                                                    <td className="flex absolute items-center justify-center w-auto md:h-[8vw] ld:h-[4.2vw]">
                                                        <Image
                                                            className="md:w-[2.5vw] lg:w-[2vw] ml-[1vw] mr-[1vw]"
                                                            src={item.foto}
                                                            alt={`Foto da Pessoa`}
                                                            width={180}
                                                            height={38}
                                                            priority
                                                        />
                                                        <h1 className="w-[2vw]">{item.nome}</h1>
                                                    </td>
                                                    <td>{item.email}</td>
                                                    <td>{item.loc}</td>
                                                    <td>{item.cell}</td>
                                                    <td>{item.rg}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="flex absolute md:w-[6vw] lg:w-[4vw] bottom-[.2vw] right-[2vw] h-auto items-center justify-between">
                                        <Image
                                            onClick={voltar}
                                            className="md:w-[4vw] lg:w-[2.5vw]"
                                            src="seta.svg"
                                            alt={`Ícone para Seta`}
                                            width={180}
                                            height={38}
                                            priority
                                        />

                                        <Image
                                            onClick={proximo}
                                            className="md:w-[4vw] lg:w-[2.5vw] rotate-180"
                                            src="seta.svg"
                                            alt={`Ícone para Seta`}
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                    </div>

                                    <div className="flex absolute md:bottom-[1.2vw] lg:bottom-[.75vw] md:right-[8vw] lg:right-[6vw] items-center justify-center text-[#111827] md:text-[1.2vw] lg:text-[.6vw]">{lista-5}-{lista > 6 ? lista : total} of {total}</div>
                                </div>
                            </>
                        }
                    </>
                }
            </Pagina>
        </>
    )
}