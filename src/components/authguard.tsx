'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const AuthGuard = () => {
    // API PARA IDENTIFICAR SE ESTÁ AUTENTICADO
    const auth = true
    const router = useRouter();

    useEffect(() => {
        if (!auth) {
            router.push('/login');
        }
    }, [])

    return (<></>)
}

export default AuthGuard;