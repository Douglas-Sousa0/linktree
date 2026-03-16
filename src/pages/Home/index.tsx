import { database } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

interface PerfisProps{
    usuario: string
    qtdLinks: number
}

export function Home(){
    const [perfis, setPerfis] = useState<PerfisProps[]>([])

    async function buscar_perfis(){
        const ref = (collection(database, 'linktrees'))

        await getDocs(ref)
        .then(snapshot => {
            let lista = [] as any[]

            snapshot.forEach(doc => {
                lista.push({
                    usuario: doc.id,
                    qtdLinks: doc.data().links.length
                })
            })

            setPerfis(lista)
            console.log(lista)
        })
    }

    useEffect(() => {
        buscar_perfis()
    }, [])

    return(
        <>
        
        <h1 className='text-white text-2xl font-medium w-full text-center mt-15'>Acompanhe abaixo todos os usuários</h1>

        <main className="w-full mt-15">
            <section className='grid grid-cols-1 md:grid-cols-2 gap-10 area-usuarios max-w-3xl m-auto px-4'>
               {perfis.map((item) => {
                    return(
                        <Link
                        to={`/perfil/${item.usuario}`}
                        key={item.usuario}
                        className='flex flex-col items-center gap-5 cursor-pointer border border-cyan-900 p-3 w-full hover:scale-110'
                        >
                            <span className='text-white text-xl'>{item.usuario}</span>
                            <span className='text-white font-medium'>Links: {item.qtdLinks}</span>
                        </Link>
                    )
                })}
            </section>
        </main>
        </>
    )
}