import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { Infos } from "../dados";

const prisma = new PrismaClient();

export async function GET() {
  try {

    const dados = await Infos("Dados",0)
    
    return NextResponse.json(dados)

  } catch(err) {
    return new NextResponse("Erro ao encontrar dados", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
