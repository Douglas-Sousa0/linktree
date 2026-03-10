import { Outlet } from 'react-router'
import { Header } from '../components/Header'

import { UsuarioProvider } from '../context/usuario'

export function Layout(){
    return(
        <UsuarioProvider>
            <Header/>
            <Outlet/>
        </UsuarioProvider>
    )
}