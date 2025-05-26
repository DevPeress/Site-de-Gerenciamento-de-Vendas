import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Produto {
  nome: string,
  desc: string,
  icone: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id: number = Number(searchParams.get("id"))

  if (isNaN(id)) {
    return new NextResponse("ID inválido", { status: 400 });
  }

  try {
    const vendas = await prisma.produtos.findMany({
      where: { idLoja: id }
    })

    const produto: Produto[] = await Promise.all(
      vendas.map(async (row) => {
        return {
          nome: row.produto,
          desc: row.desc,
          icone: row.icone
        };
      }
    ))

    return NextResponse.json(produto);
  } catch(err) {
    console.error("[GET Produtos]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
