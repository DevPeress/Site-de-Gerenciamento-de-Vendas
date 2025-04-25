"use client"

import { useState } from "react"

export function Header() {
    const [open, setOpen] = useState(false)

    return(
        <header className="flex fixed w-full h-25 bg-white items-center justify-between">
            <div className="logo">a</div>
            <div className="menu">a</div>
        </header>
    )
}