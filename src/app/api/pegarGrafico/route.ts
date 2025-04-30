import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';
import { json } from "stream/consumers";

const prisma = new PrismaClient();


const dadosJson = {
  1: { name: "Janeiro", Previsto: 0, Atual: 0 },
  2: { name: "Feveiro", Previsto: 0, Atual: 0 },
  3: { name: "Maio", Previsto: 0, Atual: 0 },
  4: { name: "Abril", Previsto: 0, Atual: 0 },
  5: { name: "Março", Previsto: 0, Atual: 0 },
  6: { name: "Junho", Previsto: 0, Atual: 0 },
  7: { name: "Julho", Previsto: 0, Atual: 0 },
  8: { name: "Agosto", Previsto: 0, Atual: 0 },
  9: { name: "Setembro", Previsto: 0, Atual: 0 },
  10: { name: "Outubro", Previsto: 0, Atual: 0 },
  11: { name: "Novembro", Previsto: 0, Atual: 0 },
  12: { name: "Dezembro", Previsto: 0, Atual: 0 },
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"))

  if (isNaN(id)) {
    return new NextResponse("ID inválido", { status: 400 });
  }

  try {
    const empresa = await prisma.empresas.findUnique({
      where: { idLoja: id } 
    })

    if (!empresa) {
      return new NextResponse("ID inválido", { status: 400 });
    }

    const grafico = empresa.grafico
    if(grafico && typeof grafico === "object" && Object.values(grafico).length > 4) {
      return NextResponse.json(grafico);
    } else {
      await prisma.empresas.update({
        where: { idLoja: id },
        data: { grafico: dadosJson }
      })

      return NextResponse.json(dadosJson);
    }
  } catch(err) {
    console.error("[GET Graficos]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
