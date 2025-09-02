import { NextResponse } from "next/server";
import { Infos } from "../../../lib/dados";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
    const body = await req.json()
    const { nome, email, loc, cell, rg, idade } = body as { nome: string, email: string, loc: string, cell: string, rg: string, idade: number }
    
    const dados = await Infos("Dados")
    if (!dados) return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" })

    const id: number = dados.json().id

    try {
        const conta = await prisma.usuario.findFirst({
            where: { id: id }
        })

        if (!conta) return NextResponse.json({ status: 400, mensagem: "Conta não encontrada!" })

        await prisma.usuario.update({
            where: { id: id },
                data: {
                    nome: nome,
                    email: email,
                    loc: loc,
                    cell: cell,
                    rg: rg,
                    idade: idade
                }
            }
        )

        return NextResponse.json("Senha alterada com sucesso!")
    } catch(err) {
        console.error("[GET Login]:", err)
        return new NextResponse("Erro ao encontrar dados", { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
