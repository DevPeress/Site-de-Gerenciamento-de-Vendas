import { prisma } from "@/lib/prisma";
import { Compradores } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id: number = Number(searchParams.get("id"))

  try {
    const vendas = await prisma.vendas.findMany({
      where: { idLoja: id }
    })

    const compradores: Compradores[] = await Promise.all(
      vendas.map(async (row: { comprador: number; rg: string }) => {
        const usuario = await prisma.usuario.findUnique({
          where: { id: row.comprador },
        });

        if (!usuario) throw new Error("Usuário não encontrado");

        return {
          nome: usuario.nome,
          email: usuario.email,
          loc: usuario.loc,
          cell: usuario.cell,
          rg: row.rg,
          foto: usuario.foto,
        };
      })
    );

    return NextResponse.json(compradores);
  } catch(err) {
    console.error("[GET Compradores]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
