import { Link } from 'react-router'
import { useContext } from 'react'

import { UsuarioContext } from '../../context/usuario'

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export function Header(){
    const { uid, alterar_uid } = useContext(UsuarioContext)    

    async function logout(){
        await signOut(auth)
        alterar_uid('')
    }

    return(
        <header className="w-full h-12 bg-neutral-100 flex items-center justify-between px-3">
            <nav className='flex items-center gap-4'>
                <Link to='/'>Home</Link>
                <Link to='/admin'>Meus Links</Link>
            </nav>

            <div className='flex items-center gap-4'>
                {uid.length > 0 &&
                <>
                <span>{uid}</span>
                <button onClick={ logout } className='px-4 py-1 text-white bg-cyan-900 border-0 rounded-md cursor-pointer'>Sair</button>
                </>
            
                }

                {uid.length === 0 &&
                <>
                    <Link to='/cadastrar' className='font-medium'>Cadastrar</Link>
                    <Link to='/login' className='font-medium'>Login</Link>
                </>
                }
            </div>
        </header>
    )
}