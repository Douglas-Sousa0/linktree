import { Outlet } from 'react-router'
import { Header } from '../components/Header'

import 'react-toastify/dist/ReactToastify.css'

export function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
        </>
    )
}