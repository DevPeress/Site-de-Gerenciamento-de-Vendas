import { prisma } from "@/lib/prisma";
import { Produtos } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id: number = Number(searchParams.get("id"))

  try {
    const vendas = await prisma.produtos.findMany({
      where: { idLoja: id }
    })

    const produto: Produtos[] = await Promise.all(
      vendas.map(async (row: { produto: string; desc: string; icone: string; }) => {
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
