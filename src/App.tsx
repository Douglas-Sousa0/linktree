import { createBrowserRouter } from "react-router"

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Admin } from './pages/Admin'
import { Cadastrar } from './pages/Cadastrar'

import { Private } from './private/private'

import { Layout } from './layout'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/admin',
        element: <Private><Admin/></Private>
      },
      {
        path: '/cadastrar',
        element: <Cadastrar/>
      }
    ]
  }
  
])

export { router }