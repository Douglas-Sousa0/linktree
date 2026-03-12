import { Label } from '../../components/Label'
import { Input } from '../../components/Input'

import { useEffect, useState, type FormEvent } from 'react'
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { database } from '../../firebase'

import { UsuarioContext } from '../../context/usuario'
import { useContext } from 'react'

interface LinksProps{
    idLink: string
    corFundo: string
    corTexto: string
    nome: string
    url: string
    data: string
}

export function Admin(){
    const [nome, setNome] = useState('')
    const [url, setUrl] = useState('')
    const [corTexto, setCorTexto] = useState('#FFFFFF')
    const [corFundo, setCorFundo] = useState('#000000')

    const [links, setLinks] = useState<LinksProps[]>([])

    const { uid } = useContext(UsuarioContext)

    async function cadastrar_links(e: FormEvent){
        e.preventDefault()

        const ref = doc(database, 'linktrees', uid)

        await setDoc(ref, {
            links: [
                ...links ?? [],
                {
                    idLink: `${uid}-${nome.replaceAll(' ', '')}`,
                    corFundo: corFundo,
                    corTexto: corTexto,
                    nome: nome,
                    url: url,
                    data: new Date()
                }
            ]
        })
        .then(() => {
            console.log('Link cadastrado')
            buscar_links()
        })
        .catch(erro => {
            console.log('Erro ao cadastrar link')
            console.log(erro)
        })
    }
    
    async function buscar_links(){
        await getDoc(doc(database, 'linktrees', uid))
        .then(snapshot => {
            setLinks(snapshot.data()?.links)
        })
        .catch(erro => {
            console.log('Erro ao buscar os links')
            console.log(erro)
        })
    }

    async function excluir_links(id: string){
        // caso haja mais de um link irá atualizar o doc apenas removendo o link desejado
        if(links.length > 1){
            const index_link = links.findIndex(item => item.idLink === id)
            links.splice(index_link, 1)

            await updateDoc(doc(database, 'linktrees', uid), {
                links    
            })
            .then(() => {
                buscar_links()
            })
            .catch(erro => {
                console.log('Erro ao excluir link')
                console.log(erro)
            })
        }
        // caso seja o único link salvo irá excluir o doc completamente
        else{
            await deleteDoc(doc(database, 'linktrees', uid))
            .then(() => {
                console.log('Foi feita a exclusão do doc')
                buscar_links()
            })
        }
    }

    useEffect(() => {
        buscar_links()
    }, [])

    return(
        <>
        <main className='w-full flex flex-col justify-center items-center px-3'>

            <h1 className='text-white font-medium text-2xl mt-14'>Adicionar Links</h1>

            <form onSubmit={ cadastrar_links } className='max-w-2xl w-full flex flex-col'>
                <Label htmlFor=''>Nome do Link</Label>
                <Input
                type='text'
                placeholder='Digite o nome do link'
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                />

                <Label htmlFor=''>URL do Link</Label>
                <Input
                type='url'
                placeholder='Digite a URL'
                value={url}
                onChange={e => setUrl(e.target.value)}
                required
                />

                <div className='flex gap-4'>
                    <div className='flex gap-1'>
                        <Label htmlFor=''>Cor do Texto</Label>
                        <input
                        className='cursor-pointer'
                        type='color'
                        value={corTexto}
                        onChange={e => setCorTexto(e.target.value)}
                        />
                    </div>

                    <div className='flex gap-1'>
                        <Label htmlFor=''>Cor do Fundo</Label>
                        <input
                        className='cursor-pointer'
                        type='color'
                        value={corFundo}
                        onChange={e => setCorFundo(e.target.value)}
                        />
                    </div>
                </div>

            {nome !== '' &&
                <section className='max-w-2xl w-full flex flex-col gap-4 mt-4'>
                    <div className='border-white border rounded-md p-4'>
                        <div
                        className='w-full rounded-md px-2 py-1'
                        style={{backgroundColor: corFundo, color: corTexto}}>
                            {nome}
                        </div>
                    </div>
                    
                    <button className='text-white w-full bg-cyan-900 rounded-md p-1 font-medium cursor-pointer'>Cadastrar</button>
                </section>
            }
            </form>

            <section className='max-w-2xl w-full flex flex-col gap-4 mt-15'>

                <h2 className='text-white text-center text-2xl font-medium'>Meus Links</h2>

            {links?.length > 0 && links?.map( item => (
                <div 
                key={item.idLink}
                className='w-full text-left rounded-md px-2 py-1 cursor-pointer flex justify-between'
                style={{backgroundColor: item.corFundo, color: item.corTexto}}
                >
                    <a href={item.url} rel='noreferrer' target='_blank' className='flex-1'>{item.nome}</a>
                    <button
                    className='cursor-pointer'
                    style={{color: item.corTexto}}
                    onClickCapture={ () => excluir_links(item.idLink)}
                    >Excluir</button>
                </div>
            ))}

            {links === undefined &&
                <span className='text-center text-white'>Ainda não há nenhum link cadastrado</span>
            }
            </section>
            
        </main>
        </>
    )
}