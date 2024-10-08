import Image from "next/image"

interface EmptyProps {
    label : string
}

export function Empty({label} : EmptyProps) {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-80">
                <Image src='/empty.png' alt='empty' fill />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    )
}