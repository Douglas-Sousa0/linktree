import { useParams } from 'react-router'
import { useState, useEffect, } from 'react'

import { database } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'


interface LinksProps{
    idLink: string
    corFundo: string
    corTexto: string
    nome: string
    url: string
    data: string
}


export function Perfil(){
    const { id_perfil } = useParams() as { id_perfil: string}

    const [links, setLinks] = useState<LinksProps[]>([])

    async function buscar_links(){
        await getDoc(doc(database, 'linktrees', id_perfil))
        .then(snapshot => {
                setLinks(snapshot.data()?.links)
        })
        .catch(erro => {
            console.log('Erro ao buscar os links')
            console.log(erro)
        })
     }

    useEffect(() => {
        buscar_links()

    }, [])

    return(
        <>
        <h1 className='text-white text-2xl text-center mt-15 mb-15'>{id_perfil}</h1>

        <main className='max-w-2xl m-auto flex flex-col gap-4'>

        {links?.length > 0 && links?.map( item => (
            <div 
            key={item.idLink}
            className='w-full text-left rounded-md px-2 py-1 cursor-pointer flex justify-between m-auto'
            style={{backgroundColor: item.corFundo, color: item.corTexto}}
            >
                <a href={item.url} rel='noreferrer' target='_blank'>{item.nome}</a>
            </div>
        ))}
        </main>
        </>
    )
}