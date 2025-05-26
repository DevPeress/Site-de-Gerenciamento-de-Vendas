import Image from "next/image" 

export function Empresa() {
    return(
        <div className="flex absolute w-full h-full top-0 bottom-0 left-0 right-0 m-auto items-center justify-center select-none">
            <h1 className="absolute text-black text-[1.5vw] top-[5vw]">Sua empresa não foi localizada!</h1>
            <h2 className="absolute text-black text-[.8vw] top-[8vw]">Informe sua administração ou a do site para corrigir!</h2>
            <Image
                className="absolute w-[50vw]"
                src="/404.svg"
                alt="Logo 404 erro"
                width={180}
                height={38}
                priority
            />
        </div>
    )
}