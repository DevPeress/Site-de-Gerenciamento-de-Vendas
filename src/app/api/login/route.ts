import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senha";
import { Infos } from "../dados";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email: string | null = searchParams.get("email")
  const senha: string | null = searchParams.get("senha")

  if (!email || !senha) {
    return NextResponse.json({ status: 400, mensagem: "E-mail ou senha estão incorretos!" })
  }

  try {
    const conta = await prisma.usuario.findFirst({
      where: { email: email }
    })

    if (!conta) {
      return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" })
    }

    const funcionario = await prisma.funcionarios.findFirst({
      where: { email: conta.email }
    })

    if (!funcionario) {
      return NextResponse.json({ status: 400, mensagem: "Conta não possui empresa!" })
    }

    const verify = await Senhas("Check",senha,conta.senha)
    if (verify) {
      const dados = await Infos("Alterar",conta.id)

      return NextResponse.json(dados)
    }
  } catch(err) {
    console.error("[GET Login]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
