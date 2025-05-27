'use client'

import { useTheme } from "@/app/context/ThemeContext";

const Pagina = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    var dark = useTheme().dark

    return (
        <div className="flex absolute w-[85.417vw] h-[90vh] top-[10vh] left-[14.583vw] items-center justify-center " style={{ background: dark ? '#0B0A0A' : '#F9FAFC' }}>
            <main>{children}</main>
        </div>
    )
}

export default Pagina;