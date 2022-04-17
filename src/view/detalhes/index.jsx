import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import 'firebase/storage'
import 'firebase/firestore'
import firebase from '../../config/firebase'

import './detalhes.css'
import Navbar from '../../components/navbar'

export default function Detalhes(props) {
  const [evento, setEvento] = useState({})
  const [urlImg, setUrlImg] = useState("")
  const [loading, setLoading] = useState(true)
  const [excluido, setExcluido] = useState(false)
  const { id } = useParams()

  const storage = firebase.storage()
  const db = firebase.firestore()
  const usuario = useSelector(state => state.email)

  function removerEvento() {
    setLoading(true)
    db.collection('eventos').doc(id).delete()
      .then(() => {
        if (urlImg && urlImg !== "https://via.placeholder.com/100x50") {
          storage.ref(`imagens/${evento.foto}`).delete()
        }
        setLoading(false)
        setExcluido(true)
      })
      .catch(() => setLoading(false))
  }

  function confirmaExclusao() {
    toast((t) => (
      <span>
        <b>Confirma Excluir o Evento?</b>
        <br />
        <button className="btn btn-danger my-4 mx-1" onClick={() => {
          toast.dismiss(t.id)
          removerEvento()
        }}>
          Confirma
        </button>
        <button className="btn btn-info m-4 text-white"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancela
        </button>
      </span>
    ));
  }


  useEffect(() => {
    setLoading(true)
    db.collection('eventos').doc(id).get()
      .then(response => {
        const dados = response.data()
        setEvento(dados)

        // incrementa o n.o visualizações
        db.collection('eventos').doc(id).update('visualizacoes', ++dados.visualizacoes)

        if (!dados.foto) {
          setUrlImg("https://via.placeholder.com/100x50") // foto genérica
          setLoading(false)

        } else {
          storage.ref(`imagens/${dados.foto}`).getDownloadURL()
            .then(url => setUrlImg(url))
            .then(() => setLoading(false))
          }
      })
      .catch(() => setLoading(false))
  }, [])


  if (loading) {
    return (
      <>
        <Navbar />
        <div className="spinner-border text-info row m-5" role="status">
          <span className='sr-only'></span>
        </div>
      </>
    )
  }

  if (excluido) {
    return (
      <Navigate replace to="/" />
    )
  }

  return (
    <>
      <Navbar />
      <Toaster />

      <div className="container-fluid">
        <div className="row">
          <img src={urlImg} className='img-banner' alt="Foto" />
          <div className="col-12 eye">
            <i className='fas fa-eye' /><span>{evento.visualizacoes}</span>
          </div>
        </div>

        <div className="row mt-5 d-flex justify-content-around">
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className='fa-solid fa-ticket fa-2x' />
            <h4><strong>Tipo</strong></h4>
            <span className='mt-3'>{evento.tipo}</span>
          </div>

          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className='fa-solid fa-calendar-days fa-2x' />
            <h4><strong>Data</strong></h4>
            <span className='mt-3'>{evento.data}</span>
          </div>

          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className='fa-solid fa-clock fa-2x' />
            <h4><strong>Hora</strong></h4>
            <span className='mt-3'>{evento.hora}</span>
          </div>
        </div>

        <div className="row box-detalhes mt-5">
          <h3 className='text-center'><strong>{evento.titulo}</strong></h3>
          <p className="p-3">{evento.detalhes}</p>
        </div>

        {
          usuario === evento.usuario && (
            <div className='acoes'>
              <Link to={`/editar/${id}`} className='btn-editar' title="Alterar o Evento">
                <i className='fa-solid fa-square-pen fa-3x text-primary' />
              </Link>
              <button
                onClick={confirmaExclusao}
                className='btn btn-editar' title="Excluir o Evento"
              >
                <i class="fa-solid fa-trash-can fa-3x text-danger"></i>
              </button>
            </div>
          )
        }
      </div>
    </>
  )
}