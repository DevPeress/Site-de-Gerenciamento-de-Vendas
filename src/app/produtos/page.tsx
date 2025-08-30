'use client'

import { Empresa } from "@/components/empresa";
import { Notify } from "@/components/notify";
import Pagina  from "@/components/pagina";
import { Produtos } from "@/types/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      return fetch(`/api/pegarProdutos?id=${userId}`);
    })
    .then(res => res.json())
    .then(data =>  { setprodutosData(data); setLoading(false) })
    .catch((err) => { 
      Notify("Não foi encontrado os dados! Recarregue a Página"); 
      setLoading(true)
      console.error("Produtos: ", err)
    })
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
      <Pagina> 
        {loading ? <h1 className="text-center text-[1.5vw] text-gray-50 dark:text-white">Carregando produtos...</h1> 
        : 
          <>
            {!id || id === 0 ? <Empresa />
            : 
            <>
              <h1 className="absolute top-[5vw] md:top-[1vw] left-[25vw] md:left-[2.7085vw] text-[10vw] md:text-[3vw] lg:text-[2vw] text-[#111827] dark:text-[#FFFFFF] select-none">Products</h1>
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
                  
                  <input type="text" className="absolute left-[8vw] md:left-[3vw] lg:left-[2vw] outline-0 text-[4vw] md:text-[1.5vw] lg:text-[.8vw] dark:text-[#FFFFFF]" onChange={(e) => Pesquisar(e.target.value)}/>
                </div>
              </div>

              <div ref={tableRef} className="absolute w-[90vw] md:w-[80vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 top-[45vw] md:top-[15vw] lg:top-[12.5vw] left-[5vw] md:left-[2.7085vw] rounded items-center justify-between select-none gap-8">
                {produtosData.map((item, index) => (
                  <main key={index}>
                    <div className="flex relative w-[90vw] md:w-[35vw] lg:w-[26vw] h-[60vw] md:h-[18vw] lg:h-[13vw] bg-[#FFFFFF] dark:bg-[#191919] rounded items-center justify-center hover:scale-105">
                      <Image
                        className="absolute w-[10vw] md:w-[4vw] lg:w-[2vw] top-[2vw]"
                        src={item.icone}
                        alt={`Ícone do produto`}
                        width={180}
                        height={38}
                        priority
                      />
                      <h1 className="absolute top-[12vw] md:top-[6vw] lg:top-[4vw] text-[#111827] dark:text-[#CAFF33] text-[5vw] md:text-[1.5vw] lg:text-[1vw] font-bold">{item.nome}</h1>
                      <h2 className="absolute top-[20vw] md:top-[8.5vw] lg:top-[6vw] text-[#111827] dark:text-[#FFFFFF] text-[3.5vw] md:text-[1vw] lg:text-[.6vw] text-center w-[80vw] md:w-[30vw] lg:w-[20vw] h-[22vw] md:h-[5vw] lg:h-[4vw] overflow-hidden">{item.desc}</h2>
                      <div className="flex absolute w-full h-[15vw] md:h-[4vw] lg:h-[3vw] bottom-0 border-t border-[#E6E8F0] items-center justify-center">
                        <div className="flex absolute w-[90%] h-full left-[5%] items-center justify-between">
                          <div className="flex relative w-auto h-full items-center justify-center">
                            <Image
                              className="w-[5vw] md:w-[1.5vw] lg:w-[1vw]"
                              src="/relogio.svg"
                              alt={`Ícone do relogio`}
                              width={180}
                              height={38}
                              priority
                            />
                            <h1 className="text-[#6B7280] dark:text-[#FFFFFF] text-[3.5vw] md:text-[1.2vw] lg:text-[.8vw]">Updated 2 hr ago</h1>
                          </div>
                          <div className="flex relative w-auto h-fullitems-center justify-center">
                            <Image
                              className="w-[5vw] md:w-[1.5vw] lg:w-[1vw]"
                              src="/baixar.svg"
                              alt={`Ícone do baixar`}
                              width={180}
                              height={38}
                              priority
                            />
                            <h1 className="text-[#6B7280] dark:text-[#FFFFFF] text-[3.5vw] md:text-[1.2vw] lg:text-[.8vw]">Updated 2 hr ago</h1>
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