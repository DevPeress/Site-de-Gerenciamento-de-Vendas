import { NextResponse } from "next/server";
import { Infos } from "../../../lib/dados";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dados = await Infos("Dados")
    return NextResponse.json(dados)
  } catch(err) {
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
