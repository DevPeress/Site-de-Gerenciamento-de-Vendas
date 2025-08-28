import { NextResponse } from "next/server";
import { hashPassword } from "../../../lib/senha";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, senha, nome, idade, celular, rg } = body as { email: string, senha: string, nome: string, idade: string, celular: string, rg: string }

  try {
    const senhaHash = await hashPassword(senha);

    if (typeof senhaHash !== "string") {
      return new NextResponse("Erro ao gerar senha", { status: 500 });
    }

    const user = await prisma.usuario.create({
        data: {
          nome: nome,
          email: email,
          senha: senhaHash,
          idade: idade,
          loc: "Osasco, Brasil, São Paulo",
          cell: celular,
          rg: rg,
          foto: "/Avatar.svg"
        },
    });

    return NextResponse.json(user)
  } catch(err) {
    console.error("[POST Register Conta]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
