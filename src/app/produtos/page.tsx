'use client'

import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import AuthGuard from "@/components/authguard";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Produtos {
  nome: string,
  desc: string,
  icone: string
}

export default function Products() {
    const id = 1 

    const [produtosData,setprodutosData] = useState<Produtos[]>([]) 

    useEffect(() => {
      document.title = "Produtos"
      fetch(`/api/pegarProdutos?id=${id}`)
        .then(res => res.json())
        .then(data =>  { setprodutosData(data) })
        .catch((err) => Notify("Não foi encontrado os dados! Recarregue a Página"))
    },[])

    const tableRef = useRef<HTMLTableSectionElement>(null);
    const Pesquisar = (texto: string) => {
        const searchTerm = texto.toLowerCase()
        const table = tableRef.current

        if (table) { 
            const rows = Array.from(table.getElementsByTagName('main'));
          
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
            <AuthGuard />
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

                <div ref={tableRef} className="absolute w-[80vw] grid grid-cols-3 h-max-150 top-55 left-[2.7085vw] rounded items-center justify-between select-none overflow-hidden gap-8 ">
                  {produtosData.map((item, index) => (
                    <main key={index}>
                      <div className="flex relative w-[26vw] h-60 bg-[#FFFFFF] rounded items-center justify-center hover:scale-105">
                        <Image
                          className="absolute w-10 top-10"
                          src={item.icone}
                          alt={`Ícone do produto`}
                          width={180}
                          height={38}
                          priority
                        />
                        <h1 className="absolute top-20 text-[#111827] text-[1vw] font-bold">{item.nome}</h1>
                        <h2 className="absolute top-35 text-[#111827] text-[.6vw] text-center w-75">{item.desc}</h2>
                        <div className="flex absolute w-full h-12 bottom-0 border-t border-[#E6E8F0] items-center justify-center">
                          <div className="flex absolute w-[90%] h-full left-[5%] items-center justify-between">
                            <div className="flex relative w-auto h-fullitems-center justify-center">
                              <Image
                                className="w-6"
                                src="relogio.svg"
                                alt={`Ícone do relogio`}
                                width={180}
                                height={38}
                                priority
                              />
                              <h1 className="text-[#6B7280] text-[.8vw]">Updated 2 hr ago</h1>
                            </div>
                            <div className="flex relative w-auto h-fullitems-center justify-center">
                              <Image
                                className="w-6"
                                src="baixar.svg"
                                alt={`Ícone do baixar`}
                                width={180}
                                height={38}
                                priority
                              />
                              <h1 className="text-[#6B7280] text-[.8vw]">Updated 2 hr ago</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  ))}
                </div>
            </Pagina>
        </>
    )
}