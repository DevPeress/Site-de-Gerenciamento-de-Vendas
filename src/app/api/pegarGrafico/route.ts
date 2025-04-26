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
        { name: '1 Aug', current: 16000, previous: 11000 },
        { name: '2 Aug', current: 4000, previous: 19000 },
        { name: '3 Aug', current: 17000, previous: 11000 },
        { name: '4 Aug', current: 21000, previous: 23000 },
        { name: '5 Aug', current: 22000, previous: 22000 },
        { name: '6 Aug', current: 17500, previous: 19500 },
        { name: '7 Aug', current: 17500, previous: 19500 },
        { name: '8 Aug', current: 17500, previous: 19500 },
        { name: '9 Aug', current: 17500, previous: 19500 },
        { name: '10 Aug', current: 17500, previous: 19500 },
        { name: '11 Aug', current: 17500, previous: 19500 },
        { name: '12 Aug', current: 17500, previous: 19500 },
    ]

    return NextResponse.json(dados);
  } catch(err) {
    console.error("[GET Graficos]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
