import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const prisma = new PrismaClient();
const mesAtual = format(new Date(), 'MMMM', { locale: ptBR })

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id: number = Number(searchParams.get("id"))

  try {
    const valores = await prisma.empresas.findMany({
      where: { idLoja: id }
    })

    if (!valores) {
      return new NextResponse("Valores inválido", { status: 400 });
    }

    let porc = 0
    let total = 0

    const grafico = valores[0].grafico
    if(grafico && typeof grafico === "object" && Object.values(grafico).length > 4) {
      const valor = Object.values(grafico)
      valor.map((item: any) => {
        const atual = item.name.toLowerCase() === mesAtual
        if (atual) {

          if (item.Atual > 0) {
            porc = Math.round((item.Atual / item.Previsto) * 100) 
          }

          total = item.Atual
        }
      })
    }

    if (Number.isNaN(porc)) {
      porc = 100
    }

    const dados = {
      budget: valores[0].budget,
      customers: valores[0].customers,
      task: porc,
      total: total,
      nome: valores[0].nome
    }

    return NextResponse.json(dados);
  } catch(err) {
    console.error("[GET Pegar Valores]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
