import type { ReactNode } from "react"

interface LabelProps{
    children: ReactNode
    htmlFor: string
}

export function Label({ children, htmlFor }: LabelProps){
    return(
        <label 
        className="text-white font-medium"
        htmlFor={htmlFor}>{children}</label>
    )   
}