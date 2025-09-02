import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { idLoja, email } = body as { idLoja: number, email: string };

  if (!idLoja || !email) return new NextResponse("Erro ao cadastrar", { status: 400 })

  try {
    const user = await prisma.funcionarios.create({
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