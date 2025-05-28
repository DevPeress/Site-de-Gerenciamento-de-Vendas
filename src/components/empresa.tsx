import Image from "next/image" 

export function Empresa() {
    return(
        <div className="flex absolute w-full h-full top-0 bottom-0 left-0 right-0 m-auto items-center justify-center select-none">
            <h1 className="absolute text-black text-[5vw] md:text-[2.5vw] lg:text-[1.5vw] top-[10vw] md:top-[5vw]">Sua empresa não foi localizada!</h1>
            <h2 className="absolute text-black text-[1.8vw] md:text-[1.2vw] lg:text-[.8vw] top-[18vw] md:top-[8vw]">Informe sua administração ou a do site para corrigir!</h2>
            <Image
                className="absolute w-[80vw] md:w-[70vw] lg:w-[50vw]"
                src="/404.svg"
                alt="Logo 404 erro"
                width={180}
                height={38}
                priority
            />
        </div>
    )
}