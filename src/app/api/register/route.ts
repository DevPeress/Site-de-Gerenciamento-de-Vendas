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
    const senhaHash = Senhas("Hash", senha, "")
    const user = await prisma.usuario.create({
        data: {
          nome: "Teste",
          email: email,
          senha: senhaHash,
          loc: "Osasco, Brasil, São Paulo",
          cell: "(11) 999999999",
          rg: "99999999",
          foto: "Avatar.svg"
        },
    });

    return NextResponse.json(user)
  } catch(err) {
    console.error("[GET Verify Conta]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
