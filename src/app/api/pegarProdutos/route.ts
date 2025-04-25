import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Produtos {
  nome: string,
  desc: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const vendas = await prisma.produtos.findMany({
      where: { idLoja: Number(id) }
    })

    const produt: Produtos[] = await Promise.all(
      vendas.map(async (row) => {

        return {
          nome: row.produto,
          desc: row.desc
        };
      })
    );

    return NextResponse.json(produt);
  } catch {
    return new NextResponse("Erro ao encontrar dados", { status: 400 })
  }
}
