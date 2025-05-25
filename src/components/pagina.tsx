const Pagina = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex absolute w-[85.417vw] h-[90vh] top-[10vh] left-[14.583vw] items-center justify-center bg-[#F9FAFC]">
            <main>{children}</main>
        </div>
    )
}

export default Pagina;