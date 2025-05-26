'use client'

import { Empresa } from "@/components/empresa";
import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { SideBar } from "@/components/sidebar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Produtos {
  nome: string,
  desc: string,
  icone: string
}

export default function Products() {
  const [produtosData,setprodutosData] = useState<Produtos[]>([]) 
  const [loading,setLoading] = useState<boolean>(true)
  const [id,setID] = useState<number>(0)

  useEffect(() => {
    document.title = "Produtos"
    fetch(`/api/infos`)
    .then(res => res.json())
    .then(data => {
      const userId: number = data.idLoja;
      setID(userId)
      setLoading(false)
      return fetch(`/api/pegarProdutos?id=${userId}`);
    })
    .then(res => res.json())
    .then(data =>  { setprodutosData(data) })
    .catch((err) => { Notify("Não foi encontrado os dados! Recarregue a Página"), setLoading(false) })
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
      <SideBar />
      <Pagina> 
        {loading ? 
          <>  
            <h1 className="text-center text-[1.5vw] text-gray-500">Carregando produtos...</h1>
          </> 

          : 

          <>
            {!id || id === 0 ? <><Empresa /></> 
              : 
              <>
                <h1 className="absolute top-[1vw] left-[2.7085vw] text-[2vw] text-[#111827] select-none">Products</h1>
                <div className="flex absolute w-[80vw] h-[4vw] top-[5vw] left-[2.7085vw] bg-[#FFFFFF] rounded items-center justify-center select-none">
                  <div className="flex absolute w-[15vw] h-[2.25vw] left-[1vw] border-1 border-[#D1D5DB] rounded items-center justify-center">
                    <div className="flex absolute w-[4.5vw] left-[.5vw] bottom-[1.8vw] bg-[#FFFFFF] text-[.5vw] text-[#6B7280] items-center justify-center">Search product</div>
                      <Image
                        className="absolute w-[1vw] left-[.8vw]"
                        src="lupa.svg"
                        alt={`Ícone para lupa`}
                        width={180}
                        height={38}
                        priority
                      />

                      <input type="text" className="absolute left-[2vw] outline-0" onChange={(e) => Pesquisar(e.target.value)}/>
                    </div>
                  </div>

                  <div ref={tableRef} className="absolute w-[80vw] grid grid-cols-3 top-[12.5vw] left-[2.7085vw] rounded items-center justify-between select-none overflow-hidden gap-8 ">
                    {produtosData.map((item, index) => (
                      <main key={index}>
                        <div className="flex relative w-[26vw] h-[13vw] bg-[#FFFFFF] rounded items-center justify-center hover:scale-105">
                          <Image
                            className="absolute w-[2vw] top-[2vw]"
                            src={item.icone}
                            alt={`Ícone do produto`}
                            width={180}
                            height={38}
                            priority
                          />
                          <h1 className="absolute top-[4vw] text-[#111827] text-[1vw] font-bold">{item.nome}</h1>
                          <h2 className="absolute top-[7vw] text-[#111827] text-[.6vw] text-center w-[20vw]">{item.desc}</h2>
                          <div className="flex absolute w-full h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center">
                            <div className="flex absolute w-[85%] h-full left-[5%] items-center justify-between">
                              <div className="flex relative w-auto h-full items-center justify-center">
                                <Image
                                  className="w-[1vw]"
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
                                  className="w-[1vw]"
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
              </> 
            }
          </>
        }
      </Pagina>
    </>
  )
}