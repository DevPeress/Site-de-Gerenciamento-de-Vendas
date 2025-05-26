import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Senhas } from "../senha";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { senha, email } = body;

  if (!senha || !email) {
    return new NextResponse("Erro ao cadastrar", { status: 400 });
  }

  try {
    const senhaHash = await Senhas("Hash", senha, "");

    if (typeof senhaHash !== "string") {
      return new NextResponse("Erro ao gerar senha", { status: 500 });
    }

    const user = await prisma.usuario.create({
        data: {
          nome: "Teste",
          email: email,
          senha: senhaHash,
          idade: 21,
          loc: "Osasco, Brasil, São Paulo",
          cell: "(11) 999999999",
          rg: "99999999",
          foto: "Avatar.svg"
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
