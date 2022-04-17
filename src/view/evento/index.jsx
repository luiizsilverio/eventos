import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import 'firebase/storage'
import 'firebase/firestore'

import './evento.css'
import firebase from '../../config/firebase'
import Navbar from '../../components/navbar'

export default function Evento(props) {
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)
  const [mensagem, setMensagem] = useState("")

  const { id } = useParams()
  const email = useSelector(state => state.email)

  const [titulo, setTitulo] = useState('')
  const [tipo, setTipo] = useState('')
  const [detalhes, setDetalhes] = useState('')
  const [data, setData] = useState(new Date())
  const [hora, setHora] = useState('')
  const [fotoAtual, setFotoAtual] = useState('')
  const [fotoNova, setFotoNova] = useState('')

  const storage = firebase.storage()
  const db = firebase.firestore()

  async function IncluiEvento() {
    await db.collection('eventos').add({
      titulo,
      tipo,
      detalhes,
      data,
      hora,
      usuario: email,
      visualizacoes: 0,
      foto: fotoNova?.name || "",
      publico: true,
      created_at: new Date()
    })
  }


  function handleSaveNew() {
    setLoading(true)

    if (!fotoNova) {
      IncluiEvento()
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

    // faz upload da imagem
    storage.ref(`imagens/${fotoNova.name}`).put(fotoNova)
      .then(() => {
        IncluiEvento()

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


  async function AlteraEvento() {
    setLoading(true)

    if (fotoNova) {
      await storage.ref(`imagens/${fotoNova.name}`).put(fotoNova)
    }

    db.collection('eventos').doc(id).update({
      titulo,
      tipo,
      detalhes,
      data,
      hora,
      foto: fotoNova ? fotoNova.name : fotoAtual
    })
    .then(() => {
      setErro(false)
      setMensagem("Evento alterado com sucesso")
    })
    .catch((erro) => {
      setErro(true)
      setMensagem('Não foi possível salvar o evento.')
    })
    .finally(() => {
      setLoading(false)
    })
  }


  useEffect(() => {
    if (id) {
      setLoading(true)
      db.collection('eventos').doc(id).get()
        .then(response => {
          const dados = response.data()
          setTitulo(dados.titulo)
          setTipo(dados.tipo)
          setData(dados.data)
          setHora(dados.hora)
          setDetalhes(dados.detalhes)
          setFotoAtual(dados.foto)
        })
      .finally(() => setLoading(false))
    }
  }, [id])


  return (
    <>
      <Navbar />
      <div className="d-flex mt-5 box">
        <div className="row mx-auto col-11">
          <form>
            <legend className='h3 fw-bold text-center'>
              {
                id ? "Alterar Evento" : "Novo Evento"
              }
            </legend>
            <div className="form-group">
              <label>Título</label>
              <input type="text"
                className="form-control"
                onChange={e => setTitulo(e.target.value)}
                value={titulo}
              />
            </div>

            <div className="form-group">
              <label>Tipo do Evento</label>
              <select
                // defaultValue=""
                className="form-control"
                onChange={e => setTipo(e.target.value)}
                value={tipo}
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
                value={detalhes}
              />
            </div>

            <div className="form-group d-flex">
              <div className="me-3 col-4">
                <label>Data</label>
                <input type="date"
                  className="form-control"
                  onChange={e => setData(e.target.value)}
                  value={data}
                />
              </div>
              <div className="col-4">
                <label>Hora</label>
                <input type="time"
                  className="form-control"
                  onChange={e => setHora(e.target.value)}
                  value={hora}
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Imagem {id && '(caso queira manter a foto atual, não precisa clicar)'}
              </label>
              <input type="file"
                className="form-control"
                onChange={e => setFotoNova(e.target.files[0])}
                // value={foto}
              />
            </div>

            <div className="row mx-auto my-4">
              <button type="button"
                onClick={ id ? AlteraEvento : handleSaveNew }
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