'use client'

import { useTheme } from "@/app/context/ThemeContext";

const Header = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    var dark = useTheme().dark

    return (
        <div className="flex absolute w-[85.417vw] h-[10vh] top-[0vh] left-[14.583vw] items-center justify-center " style={{ background: dark ? '#000' : '#FFFFFF' }}>
            <main>{children}</main>
        </div>
    )
}

export default Header;