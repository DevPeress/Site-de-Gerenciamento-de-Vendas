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
    const vendas = await prisma.vendas.findMany({
      where: { idLoja: id },
      orderBy: { id: 'desc' },
      take: 3
    })

    const compradores = await Promise.all(
      vendas.map(async (row) => {
        const usuario = await prisma.usuario.findUnique({
          where: { id: row.comprador },
        });

        if (!usuario) throw new Error("Usuário não encontrado");

        return {
          ordem: row.order,
          comprador: usuario.nome,
          data: row.rg,
          status: row.status
        };
      })
    );

    return NextResponse.json(compradores);
  } catch(err) {
    console.error("[GET Ultimos Pedidos]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
