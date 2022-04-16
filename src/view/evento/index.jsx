import { useState } from 'react'
import { useSelector } from 'react-redux'

import 'firebase/storage'
import 'firebase/firestore'

import './evento.css'
import firebase from '../../config/firebase'
import Navbar from '../../components/navbar'

export default function Evento() {
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)
  const [mensagem, setMensagem] = useState("")

  const email = useSelector(state => state.email)

  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState(new Date())
  const [hora, setHora] = useState('')
  const [foto, setFoto] = useState('')

  const storage = firebase.storage()
  const db = firebase.firestore()

  async function SalvaEvento() {
    await db.collection('eventos').add({
      titulo,
      tipo,
      detalhes,
      data,
      hora,
      usuario: email,
      visualizacoes: 0,
      foto: foto?.name || "",
      publico: true,
      created_at: new Date()
    })
  }

  function handleSave() {
    setLoading(true)

    if (!foto) {
      SalvaEvento()
        .then(() => {
          setErro(false)
          setMensagem("Evento cadastrado com sucesso")
        })
        .catch((erro) => {
          setErro(true)
          setMensagem('Não foi possível cadastrar o evento.')
        })
        .finally(() => {
          setLoading(false)
        })

      return
    }

    storage.ref(`imagens/${foto.name}`).put(foto) // faz upload da imagem
      .then(() => {
        SalvaEvento()

        .then(() => {
          setErro(false)
          setMensagem("Evento cadastrado com sucesso")
        })

        .catch((erro) => {
          setErro(true)
          setMensagem('Não foi possível cadastrar o evento.')
        })
      })

      .catch((erro) => {
        setErro(true)
        setMensagem('Não foi possível cadastrar o evento.')
      })

      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Navbar />
      <div className="d-flex mt-5 box">
        <div className="row mx-auto col-11">
          <form>
            <legend className='h3 fw-bold text-center'>Novo Evento</legend>
            <div className="form-group">
              <label>Título</label>
              <input type="text"
                className="form-control"
                onChange={e => setTitulo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tipo do Evento</label>
              <select
                defaultValue=""
                className="form-control"
                onChange={e => setTipo(e.target.value)}
              >
                <option value="" disabled>-- Selecione o Tipo --</option>
                <option value="evento">Evento</option>
                <option value="show">Show</option>
                <option value="aniversario">Aniversário</option>
                <option value="casamento">Casamento</option>
                <option value="formatura">Formatura</option>
                <option value="confraternizacao">Confraternização</option>
              </select>
            </div>

            <div className="form-group">
              <label>Detalhes</label>
              <textarea rows={3}
                className="form-control"
                onChange={e => setDetalhes(e.target.value)}
              />
            </div>

            <div className="form-group d-flex">
              <div className="me-3 col-4">
                <label>Data</label>
                <input type="date"
                  className="form-control"
                  onChange={e => setData(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label>Hora</label>
                <input type="time"
                  className="form-control"
                  onChange={e => setHora(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Imagem</label>
              <input type="file"
                className="form-control"
                onChange={e => setFoto(e.target.files[0])}
              />
            </div>

            <div className="row mx-auto my-4">
              <button type="button"
                onClick={handleSave}
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
              loading &&
                <span className="spinner-border spinner-border-sm text-light"></span>
            }
            {
              !erro && !!mensagem &&
                <span className="my-span text-primary">{ mensagem } &#128526;</span>
            }
            {
              erro && !!mensagem &&
                <span className="my-span text-danger">{ mensagem } &#128577;</span>
            }
          </div>
        </div>
      </div>
    </>
  )
}