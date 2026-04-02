import { Input } from '../../components/Input'
import { Label } from '../../components/Label'
import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { auth } from '../../firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { toast } from 'react-toastify'

export function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    async function verificar_logado(){
        await signOut(auth)
    }

    
    useEffect(() => {
        // Caso o usuário acessar essa página e estiver logado será realizado o logout automaticamente
        verificar_logado()
    }, [])

    async function realizar_login(e: FormEvent){
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, senha)
        .then( () => {

            navigate('/admin')
        })
        .catch(erro => {
            switch(erro.code){
                case 'auth/invalid-credential':
                    toast.warn('E-mail e/ou senha incorreto(s)')
                    break

                case 'auth/too-many-requests':
                    toast.warn('Muitas tentativas foram feitas, por favor tente novamente mais tarde')
                    break
                
                default:
                    toast.error('Um erro inesperado aconteceu, tente novamente mais tarde')
                    break         
            }
        })
    }

    return(
        <>
        <div className='flex flex-col items-center justify-center'>

            <h1 className='text-white font-medium text-2xl mt-24'>Login</h1>

            <form onSubmit={realizar_login} className='max-w-2xl w-full flex flex-col p-3 rounded-md'>
                <Label htmlFor='login-email'>Email</Label>

                <Input
                type='email'
                id='login-email'   
                placeholder='Digite seu e-mail'
                autoComplete='off'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                />

                <Label htmlFor='login-senha'>Senha</Label>

                <Input
                type='password'
                id='login-senha'   
                placeholder='Digite sua senha'
                value={senha}
                onChange={e => setSenha(e.target.value)}
                autoComplete='off'
                required
                />

                <button 
                type='submit'
                className='text-white w-full bg-cyan-900 rounded-md p-1 font-medium cursor-pointer'
                >
                    Entrar
                </button>
            </form>
        </div>
        </>
        
    )
}