import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import firebase from '../../config/firebase'
import 'firebase/auth'
import './evento.css'
import Navbar from '../../components/navbar'

export default function Evento() {
  const [loading, setLoading] = useState(false)
  const [logado, setLogado] = useState('')

  return (
    <>
      <Navbar />
      <div className="d-flex mt-5">
        <div className="row mx-auto col-11">
          <form>
            <legend className='h3 fw-bold text-center'>Novo Evento</legend>
            <div className="form-group">
              <label>Título</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Tipo do Evento</label>
              <select className="form-control">
                <option disabled selected>-- Selecione o Tipo --</option>
                <option>Evento</option>
                <option>Show</option>
                <option>Aniversário</option>
                <option>Casamento</option>
                <option>Formatura</option>
                <option>Confraternização</option>
              </select>
            </div>

            <div className="form-group d-flex">
              <div className="me-3 col-4">
                <label>Data</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-4">
                <label>Hora</label>
                <input type="time" className="form-control" />
              </div>
            </div>

            <div className="form-group">
              <label>Imagem</label>
              <input type="file" className="form-control" />
            </div>

            <div className="row mx-auto my-4">
              <button type="button"
                className={`
                  btn btn-lg text-white btn-cadastro
                  ${loading && "disabled"}
                `}
              >
                Publicar Evento
              </button>
            </div>
          </form>

          <div className="msg-login text-center span my-2">
            {
              logado === 'sim' &&
                <span className="my-span text-primary">Evento publicado! &#128526;</span>
            }
            {
              logado === 'não' &&
                <span className="my-span text-danger">Ops! Não foi possível publicar o evento! &#128577;</span>
            }
          </div>
        </div>
      </div>
    </>
  )
}