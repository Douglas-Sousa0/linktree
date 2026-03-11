import  { type FormEvent, useState } from 'react'
import { Input } from '../../components/Input'
import { Label } from '../../components/Label'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

export function Cadastrar(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    
    function cadastrar_conta(e: FormEvent){
        e.preventDefault()

        const caracteres_especiais = ['*', '#', '?', '!', '~', '@', '[', ']', '{', '}', '%', '$', '&']
        const possui_caracter_especial = senha.split('').some(caracter => caracteres_especiais.includes(caracter))

        if(possui_caracter_especial){
            if(senha === confirmarSenha){
                createUserWithEmailAndPassword(auth, email, senha)
                .then( () => {
                    toast.success('Cadastro realizado com sucesso')

                    setEmail('')
                    setSenha('')
                    setConfirmarSenha('')
                })
                .catch(erro => {
                    switch(erro.code){
                        case 'auth/email-already-in-use':
                            toast.warn('Esse e-mail já está sendo utilizado')
                            break

                        case 'auth/invalid-email':
                            toast.warn('O e-mail digitado é inválido')
                            break
                    
                        case 'auth/weak-password':
                            toast.warn('A senha deve conter no mínimo 6 caracteres')
                            break

                        default:
                            toast.error('Um erro inesperado aconteceu, tente novamente mais tarde')
                            break      
                    }
                })
            }
            else{
                toast.warn('A senha deve ser a mesma em ambos os campos')
            } 
        } 
        else{
            toast.warn('A senha deve conter pelo menos 1 caracter especial')
        }
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
                autoComplete='off'
                required
                />

                <Label htmlFor='confirmar-senha'>Confirmar Senha</Label>

                <Input
                type='password'
                id='confirmar-senha'   
                placeholder='Confirme sua senha'
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                autoComplete='off'
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