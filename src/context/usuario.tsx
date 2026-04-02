import { createContext, useState, useEffect, type ReactNode } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

interface UsuarioProviderProps{
    children: ReactNode
}

interface UsuarioContextProps{
    uid: string
    loading: boolean
    alterar_uid: (uid: string) => void
}

export const UsuarioContext = createContext({} as UsuarioContextProps)

export function UsuarioProvider({ children }: UsuarioProviderProps){
    const [uid, setUid] = useState('')
    const [loading, setLoading] = useState(true)

     function alterar_uid(uid: string){
        setUid(uid)
    }

     useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if(user){
                alterar_uid(user.uid)
                setLoading(false)
            }
            else{
                alterar_uid('')
                setLoading(false)
            }
        })
        
        return () => {
            unsub()
        }
    }, [])

    return(
        <UsuarioContext.Provider value={ { uid, alterar_uid, loading }}>
            {children}
        </UsuarioContext.Provider>
    )
}
