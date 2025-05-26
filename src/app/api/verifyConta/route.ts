import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email: string | null = searchParams.get("email")

  if (!email) {
    return new NextResponse("Email inválido", { status: 400 });
  }

  try {
    const vendas = await prisma.usuario.findFirst({
      where: { email: email }
    })

    return NextResponse.json(vendas);
  } catch(err) {
    console.error("[GET Verify Conta]:", err)
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
