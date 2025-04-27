import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Usuarios {
    ordem: number,
    comprador: string,
    data: string,
    status: number
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"))

  if (isNaN(id)) {
    return new NextResponse("ID inválido", { status: 400 });
  }

  try {
    const dados = [
        { name: 'Janeiro', Atual: 16000, Previsto: 11000 },
        { name: 'Fevereiro', Atual: 4000, Previsto: 19000 },
        { name: 'Maio', Atual: 17000, Previsto: 11000 },
        { name: 'Abril', Atual: 21000, Previsto: 23000 },
        { name: 'Março', Atual: 0, Previsto: 45000 },
        { name: 'Junho', Atual: 0, Previsto: 35000 },
        { name: 'Julho', Atual: 0, Previsto: 20000 },
        { name: 'Agosto', Atual: 0, Previsto: 25000 },
        { name: 'Setembro', Atual: 0, Previsto: 32000 },
        { name: 'Outubro', Atual: 0, Previsto: 37500 },
        { name: 'Novembro', Atual: 0, Previsto: 45000 },
        { name: 'Dezembro', Atual: 0, Previsto: 50000 },
    ]

    return NextResponse.json(dados);
  } catch(err) {
    console.error("[GET Graficos]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
