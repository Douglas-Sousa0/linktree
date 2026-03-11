import { Outlet } from 'react-router'
import { Header } from '../components/Header'

import { UsuarioProvider } from '../context/usuario'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export function Layout(){
    return(
        <UsuarioProvider>
            <Header/>
            <Outlet/>
            <ToastContainer 
            autoClose={3000}
            position='bottom-center'
            transition={Zoom}
            />
        </UsuarioProvider>
    )
}