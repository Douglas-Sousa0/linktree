import { Input } from '../../components/Input'
import { Label } from '../../components/Label'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { UsuarioContext } from '../../context/usuario'
import { useContext } from 'react'

export function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const { uid, alterar_uid } = useContext(UsuarioContext)

    const navigate = useNavigate()

    async function realizar_login(e: FormEvent){
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, senha)
        .then( dados => {
            console.log('Login realizado com sucesso')
            alterar_uid(dados.user.uid)

            navigate('/admin')
        })
        .catch(erro => {
            console.log('Erro ao logar')
            console.log(erro)
        })
    }

    return(
        <>
        <span className='text-white'>{uid}</span>

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