'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import AuthGuard from "@/components/authguard";
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
    const [lista,setLista] = useState(6)
    const [total,setTotal] = useState(0)
    const proximo = () => setLista((prev => (total - lista) > 6 ? prev + 6 : (total - lista) > 0 ? prev + (total - lista) : 6))
    const voltar = () => setLista((prev => (lista) / 2 > 6 ? prev - 6 : prev = 6))

    const [CompradoresData,setCompradoresData] = useState<Compradores[]>([ ]) 

    const id = 1 // API PUXAR LOJA

    useEffect(() => {
        document.title = "Compradores"
        fetch(`/api/pegarCompradores?id=${id}`)
        .then(res => res.json())
        .then(data =>  { setCompradoresData(data); setTimeout(() => {
            setTotal(data.length)
        }, 300);})
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    }, []);

    const tableRef = useRef<HTMLTableSectionElement>(null);
    const Pesquisar = (texto: string) => {
        total > 0 ? setTotal(0) : setTotal(total)
        const searchTerm = texto.toLowerCase()
        const table = tableRef.current

        if (table) { 
            const rows = Array.from(table.getElementsByTagName('tr'));
          
            rows.forEach((row, index) => {
              const loja = CompradoresData[index];
          
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
            <AuthGuard />
            <SideBar />
            <Pagina> 
                <h1 className="absolute top-5 left-[2.7085vw] text-[2vw] text-[#111827] select-none">Customers</h1>
                <div className="flex absolute w-[80vw] h-20 top-25 left-[2.7085vw] bg-[#FFFFFF] rounded items-center justify-center select-none">
                    <div className="flex absolute w-[15vw] h-10 left-5 border-1 border-[#D1D5DB] rounded items-center justify-center">
                        <div className="absolute left-3 bottom-[1.7vw] bg-white text-[.5vw] text-[#6B7280]">Search customer</div>
                        <Image
                            className="absolute w-5 left-3"
                            src="lupa.svg"
                            alt={`Ícone para lupa`}
                            width={180}
                            height={38}
                            priority
                        />

                        <input type="text" className="absolute left-10 outline-0" onChange={(e) => Pesquisar(e.target.value)}/>
                    </div>
                </div>

                <div className="flex absolute w-[80vw] h-150 top-55 left-[2.7085vw] bg-[#FFFFFF] rounded items-center justify-center select-none overflow-hidden">
                    <h1 className="absolute top-5 left-6 text-[1vw] text-[#111827] select-none">Latest Orders</h1>
                    <table className="absolute w-full h-auto top-[10%]">
                        <thead className="h-15 bg-[#F3F4F6] text-[.6vw] text-[#111827] text-center">
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
                                <tr key={index} className="border-b border-[#E6E8F0] text-center text-[#111827] text-[.7vw] h-18 hover:scale-101">
                                    <td>
                                        <Image
                                            className="relative w-8 top-2.5 left-2.5"
                                            src={item.foto}
                                            alt={`Foto da Pessoa`}
                                            width={180}
                                            height={38}
                                            priority
                                        />
                                        <h1 className="relative bottom-4 left-3">{item.nome}</h1>
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.loc}</td>
                                    <td>{item.cell}</td>
                                    <td>{item.rg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex absolute w-20 bottom-[.5vw] right-15 h-auto items-center justify-between">
                    <Image
                        onClick={voltar}
                        className="w-10"
                        src="seta.svg"
                        alt={`Ícone para Seta`}
                        width={180}
                        height={38}
                        priority
                    />

                    <Image
                        onClick={proximo}
                        className="w-10 rotate-180"
                        src="seta.svg"
                        alt={`Ícone para Seta`}
                        width={180}
                        height={38}
                        priority
                    />
                </div>

                <div className="flex absolute bottom-[1.1vw] right-35 items-center justify-center text-[#111827] text-[.6vw]">{lista-5}-{lista > 6 ? lista : total} of {total}</div>
            </Pagina>
        </>
    )
}