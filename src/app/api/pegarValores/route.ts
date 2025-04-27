import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"))

  if (isNaN(id)) {
    return new NextResponse("ID inválido", { status: 400 });
  }

  try {
    const valores = await prisma.empresas.findMany({
      where: { idLoja: id }
    })

    const dados = {
      budget: valores[0].budget,
      customers: valores[0].customers,
      task: valores[0].task,
      total: valores[0].total
    }

    return NextResponse.json(dados);
  } catch(err) {
    console.error("[GET Pegar Valores]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
