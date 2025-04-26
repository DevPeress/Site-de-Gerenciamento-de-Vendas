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
    const vendas = await prisma.vendas.findMany({
      where: { idLoja: id }
    })

    const compradores: Usuarios[] = await Promise.all(
      vendas.map(async (row) => {
        const usuario = await prisma.usuario.findUnique({
          where: { id: row.comprador },
        });

        if (!usuario) throw new Error("Usuário não encontrado");

        return {
          ordem: 1,
          comprador: usuario.nome,
          data: "12/04/2025",
          status: 1
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
