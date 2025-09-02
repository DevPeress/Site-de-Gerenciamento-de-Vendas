import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

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

            if (!auth) return false

            const authData = JSON.parse(auth.value);
            return authData
    }
}
