import { createContext, useState, useEffect, type ReactNode } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

interface UsuarioProviderProps{
    children: ReactNode
}

interface UsuarioContextProps{
    usuario: string
    uid: string
    loading: boolean
}

export const UsuarioContext = createContext({} as UsuarioContextProps)

export function UsuarioProvider({ children }: UsuarioProviderProps){
    const [usuario, setUsuario] = useState('')
    const [uid, setUid] = useState('')
    const [loading, setLoading] = useState(true)

     useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if(user){
                setUsuario(user.displayName as string)
                setUid(user.uid)
                setLoading(false)
            }
            else{
                setUsuario('')
                setUid('')
                setLoading(false)
            }
        })
        
        return () => {
            unsub()
        }
    }, [])

    return(
        <UsuarioContext value={ { usuario, uid, loading }}>
            {children}
        </UsuarioContext>
    )
}
