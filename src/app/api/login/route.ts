import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senha";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email")
  const senha = searchParams.get("senhas")

  if (!email) {
    return new NextResponse("Email inválido", { status: 400 });
  }

  if (!senha) {
    return new NextResponse("Senha inválido", { status: 400 });
  }

  try {
    const conta = await prisma.usuario.findFirst({
      where: { email: email }
    })

    if (!conta) {
        return new NextResponse("Conta não encontrada", { status: 400 });
    }

    const verify = Senhas("Check",senha,conta.senha)
    return NextResponse.json(verify)
  } catch(err) {
    console.error("[GET Verify Conta]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
