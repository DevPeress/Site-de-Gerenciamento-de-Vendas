import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senha";
import { Infos } from "../dados";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const body = await req.json()
  const { senha, senhaNova } = body

  if (!senha || !senhaNova) {
    return NextResponse.json({ status: 400, mensagem: "Ocorreu um erro!" })
  }
  
  const dados = await Infos("Dados",0)
  const id: number = dados.json().id

  try {
    const conta = await prisma.usuario.findFirst({
      where: { id: id }
    })

    if (!conta) {
      return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" })
    }

    const verify = await Senhas("Check",senha,conta.senha)
    if (verify) {
      const senhaProtegida = await Senhas("Hash",senhaNova,senha)

      if (typeof senhaProtegida !== "string") {
        return new NextResponse("Erro ao gerar senha", { status: 500 });
      }

      await prisma.usuario.update({
        where: { id: id },
        data: {
          senha: senhaProtegida
        }
      })

      return NextResponse.json("Senha alterada com sucesso!")
    } else {
      return NextResponse.json({ status: 400, mensagem: "Senha errada!" })
    }
  } catch(err) {
    console.error("[GET Login]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
