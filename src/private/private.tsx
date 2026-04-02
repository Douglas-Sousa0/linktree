import { type ReactNode } from 'react'
import { Navigate } from 'react-router'

import { UsuarioContext } from '../context/usuario'
import { useContext } from 'react'

interface PrivateProps{
    children: ReactNode
}

export function Private( {children}: PrivateProps ){
    const { uid, loading } = useContext(UsuarioContext)
    
    if(loading){
        return <></>
    }

    if(uid.length === 0){
        return <Navigate to='/login'/>
    }

    return children
}