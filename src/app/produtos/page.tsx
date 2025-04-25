'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Produtos {
  nome: string,
  desc: string
}

export default function Products() {
    const [lista,setLista] = useState(6)
    const proximo = () => setLista((prev => prev + 1 > prev ? 1 : prev + 1))
    const voltar = () => setLista((prev => prev - 1 <= 0 ? 1 : prev - 1))   

    const [produtosData,setprodutosData] = useState<Produtos[]>([ ]) 

    const tableRef = useRef<HTMLTableSectionElement>(null);
    const Pesquisar = (texto: string) => {
        const searchTerm = texto.toLowerCase()
        const table = tableRef.current

        if (table) { 
            const rows = Array.from(table.getElementsByTagName('tr'));
          
            rows.forEach((row, index) => {
              const loja = produtosData[index];
          
              const searchContent = `
                ${loja.nome.toLowerCase()}
                ${loja.desc.toLowerCase()}
              `;
        
              if (searchContent.includes(searchTerm)) {
                (row as HTMLElement).style.display = ''; 
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
                <h1 className="absolute top-5 left-[2.7085vw] text-[2vw] text-[#111827] select-none">Products</h1>
                <div className="flex absolute w-[80vw] h-20 top-25 left-[2.7085vw] bg-[#FFFFFF] rounded items-center justify-center select-none">
                    <div className="flex absolute w-[15vw] h-10 left-5 border-1 border-[#D1D5DB] rounded items-center justify-center">
                        <div className="absolute left-3 bottom-[1.7vw] bg-white text-[.5vw] text-[#6B7280]">Search product</div>
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
                </div>
            </Pagina>
        </>
    )
}