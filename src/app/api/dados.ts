import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function Infos(tipo: string, usuario?: number) {
    const cookieStore = await cookies(); 

    switch (tipo) {
        case "Alterar":
            const funcionarios = await prisma.funcionarios.findUnique({
                where: { id: usuario }
            });

            if (!funcionarios) return false;

            cookieStore.set('auth', JSON.stringify({
                id: usuario,
                idLoja: funcionarios.idLoja
            }), {
                httpOnly: true, 
                sameSite: 'lax', 
                maxAge: 60 * 60 * 24,
                path: '/'
            });

            return true;

        case "Dados":
            const auth = cookieStore.get('auth');

            if (!auth) {
                return false
            }

            const authData = JSON.parse(auth.value);
            return authData
        case "Login":
            return !!cookieStore.get('auth');
    }
}
