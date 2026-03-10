import  { type FormEvent, useState } from 'react'
import { Input } from '../../components/Input'
import { Label } from '../../components/Label'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export function Cadastrar(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    function cadastrar_conta(e: FormEvent){
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, senha)
        .then( () => {
            console.log('Cadastro realizado com sucesso')

            setEmail('')
            setSenha('')
        })
        .catch(erro => {
            console.log('Erro ao cadastrar')
            console.log(erro)
        })
    }

    return(
        <>
        <div className='flex flex-col items-center justify-center'>

            <h1 className='text-white font-medium text-2xl mt-24'>Cadastrar</h1>
            
            <form onSubmit={cadastrar_conta} className='max-w-2xl w-full flex flex-col p-3 rounded-md'>
                <Label htmlFor='cadastrar-email'>Email</Label>

                <Input
                type='email'
                id='cadastrar-email'   
                placeholder='Digite seu e-mail'
                value={email}
                onChange={ e => setEmail(e.target.value)}
                autoComplete='off'
                required
                />

                <Label htmlFor='cadastrar-senha'>Senha</Label>

                <Input
                type='password'
                id='cadastrar-senha'   
                placeholder='Digite sua senha'
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                />

                <button 
                type='submit'
                className='text-white w-full bg-cyan-900 rounded-md p-1 font-medium cursor-pointer'
                >Cadastrar</button>
            </form>
        </div>
        </>
    )
}