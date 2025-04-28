import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { idLoja, email } = body;

  if (!idLoja || !email) {
    return new NextResponse("Erro ao cadastrar", { status: 400 })
  }

  try {
    const user = await prisma.Funcionarios.create({
        data: {
            idLoja: idLoja,
            email: email,
            cargo: "Funcionario"
        },
    });

    return NextResponse.json(user)
  } catch(err) {
    console.error("[PUT Register Conta]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
