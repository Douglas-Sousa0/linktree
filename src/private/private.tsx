import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { type ReactNode, useState, useEffect } from 'react'
import { Navigate } from 'react-router'

import { UsuarioContext } from '../context/usuario'
import { useContext } from 'react'

interface PrivateProps{
    children: ReactNode
}

export function Private( {children}: PrivateProps ){
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    const { alterar_uid } = useContext(UsuarioContext)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if(user){
                setLoading(false)
                setSigned(true)
                alterar_uid(user.uid)
            } else{
                setLoading(false)
                setSigned(false)
            }
        })

        return () => {
            unsub()
        }
    }, [])

    if(loading){
        return <></>
    }

    if(!signed){
        return <Navigate to='/login'/>
    }

    if(signed){
        return children
    }
}