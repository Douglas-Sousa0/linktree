import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input
        className="bg-white rounded-md py-1 px-2 outline-0 mb-3"
        {...props}
        />        
    )
}