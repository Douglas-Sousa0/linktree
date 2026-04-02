import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './App'
import { RouterProvider } from 'react-router'

import { UsuarioProvider } from './context/usuario'

import { ToastContainer, Zoom } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <UsuarioProvider>
        <RouterProvider router={router} />
        <ToastContainer 
            autoClose={3000}
            position='bottom-center'
            transition={Zoom}
            />
    </UsuarioProvider>
)
