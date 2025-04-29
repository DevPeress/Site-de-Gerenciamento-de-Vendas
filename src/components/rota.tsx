'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const AuthGuard = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [])

    return (<></>)
}

export default AuthGuard;