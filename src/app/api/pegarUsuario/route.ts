import { NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id: number = Number(searchParams.get("id"))
  
  try {
    const usuario = await prisma.usuario.findUnique({
        where: { id: id }
    })

    if (!usuario) {
        return new NextResponse("Usuário não encontrado", { status: 400 });
    }

    const dados = {
        nome: usuario.nome,
        loc: usuario.loc,
        email: usuario.email,
        idade: "21",
        rg: usuario.rg,
        celular: usuario.cell,
        horario: "GTM-5",
        foto: usuario.foto
    }

    return NextResponse.json(dados);
  } catch(err) {
    console.error("[GET Pegar Valores]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
