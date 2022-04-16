import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar'
import EventCard from '../../components/eventcard'

import firebase from '../../config/firebase'
import 'firebase/firestore'
import './home.css'

export default function Home() {
  const [eventos, setEventos] = useState([])
  const [pesquisa, setPesquisa] = useState("")

  const { user } = useParams()
  const usuario = useSelector(state => state.email)

  const db = firebase.firestore()

  useEffect(() => {
    const lista = []
    if (user) {
      db.collection('eventos')
        .where('usuario', '==', usuario)
        .get()
        .then(async(response) => {
          await response.docs.forEach(doc => {
            const dados = doc.data()
            const titulo = dados.titulo.toUpperCase()
            if (pesquisa.length === 0 || titulo.indexOf(pesquisa) >= 0) {
              lista.push({
                id: doc.id,
                ...dados  //...doc.data()
              })
            }
          })
          setEventos(lista)
        })
    }
    else {
      db.collection('eventos')
        .get()
        .then(async(response) => {
          await response.docs.forEach(doc => {
            const dados = doc.data()
            const titulo = dados.titulo.toUpperCase()
            if (pesquisa.length === 0 || titulo.indexOf(pesquisa) >= 0) {
              lista.push({
                id: doc.id,
                ...dados  //...doc.data()
              })
            }
          })
          setEventos(lista)
        })
    }

  }, [pesquisa, user])


  return (
    <>
      <Navbar />

      <div className="row m-3">
        <h3 className='mx-auto text-center p-3'>Eventos Publicados</h3>
        <input type="text" className='form-control text-center'
          placeholder='Pesquisar Evento'
          onChange={(e) => setPesquisa(e.target.value.toUpperCase())}
        />
      </div>

      <p className='ps-3'>{ useSelector(state => state.email) }</p>
      <div className="row p-3 pt-0 col-12">
        {
          eventos.map(evento => (
            <EventCard
              key={evento.id}
              id={evento.id}
              img={evento.foto}
              titulo={evento.titulo}
              detalhes={evento.detalhes}
              visualizacoes={evento.visualizacoes}
            />
          ))
        }
      </div>
    </>
  )
}
