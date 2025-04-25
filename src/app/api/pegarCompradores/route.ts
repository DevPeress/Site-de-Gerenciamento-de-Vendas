import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface Usuarios {
  nome: string,
  email: string,
  loc: string,
  cell: string,
  rg: string,
  foto: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const vendas = await prisma.vendas.findMany({
      where: { idLoja: Number(id) }
    })

    const compradores: Usuarios[] = await Promise.all(
      vendas.map(async (row) => {
        const usuario = await prisma.usuario.findUnique({
          where: { id: Number(row.comprador) },
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
  } catch {
    return new NextResponse("Erro ao encontrar dados", { status: 400 })
  }
}
