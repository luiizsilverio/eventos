import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import EventCard from '../../components/eventcard'

import firebase from '../../config/firebase'
import 'firebase/firestore'
import './home.css'

export default function Home() {
  const [eventos, setEventos] = useState([])
  const [pesquisa, setPesquisa] = useState("")

  const db = firebase.firestore()

  useEffect(() => {
    const lista = []
    db.collection('eventos').get()
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
  }, [pesquisa])

  return (
    <>
      <Navbar />

      <div className="row m-3">
        <input type="text" className='form-control text-center'
          placeholder='Pesquisar Evento'
          // value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value.toUpperCase())}
        />
      </div>

      <h1>{ useSelector(state => state.email) }</h1>
      <div className="row p-3">
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
