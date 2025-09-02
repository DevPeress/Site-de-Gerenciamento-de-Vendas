import { NextResponse } from "next/server";
import { CheckPassword } from "../../../lib/senha";
import { Infos } from "../../../lib/dados";
import { prisma } from "@/lib/prisma";
import { LoginType } from "@/types/types";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, senha } = body as LoginType

  if (!email || !senha) return NextResponse.json({ status: 400, mensagem: "E-mail ou senha estão incorretos!" })

  try {
    const conta = await prisma.usuario.findFirst({
      where: { email: email }
    })

    if (!conta) return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" })

    const funcionario = await prisma.funcionarios.findFirst({
      where: { email: conta.email }
    })

    if (!funcionario) return NextResponse.json({ status: 400, mensagem: "Conta não possui empresa!" })

    const verify = await CheckPassword(senha,conta.senha)
    if (verify) {
      const dados = await Infos("Alterar",conta.id)

      return NextResponse.json(dados)
    }

    return NextResponse.json({ status: 400, mensagem: "E-mail ou senha estão incorretos!" })
  } catch(err) {
    console.error("[GET Login]:", err)
    return new NextResponse("Erro ao efetuar login!", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
