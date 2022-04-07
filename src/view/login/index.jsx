import { useState } from 'react'
import { Link } from 'react-router-dom'

import firebase from '../../config/firebase'
import 'firebase/auth'
import './login.css'

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [logado, setLogado] = useState("")
  const [loading, setLoading] = useState(false)

  function logar() {
    if (!email || !senha) {
      return
    }

    setLoading(true)
    const auth = firebase.auth()

    auth.signInWithEmailAndPassword(email, senha)
      .then(resp => {
        setLogado("sim")
        setLoading(false)
      })
      .catch(erro => {
        setLogado("não")
        setLoading(false)
      })
  }

  return (
    <div className="login-content d-flex align-items-center">
      <form className="form-signin mx-auto">
        <h1 className="h3 mb-3 fw-normal text-white fw-bold">Log In</h1>

        <div className="form-floating my-2">
          <input type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">E-mail</label>
        </div>
        <div className="form-floating my-2">
          <input type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            onChange={(e) => setSenha(e.target.value)}
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>

        <button type="button" onClick={ logar }
          className={`
            w-100 btn btn-lg btn-primary btn-login ${loading && "disabled"}
          `}
        >
          {
            loading &&
              <span className="spinner-border spinner-border-sm text-light"></span>
          }
          <span className="px-2">Entrar</span>
        </button>

        <div className="msg-login text-center span my-4">
          {
            logado === 'sim' &&
              <span className="my-span">Você está conectado! &#128526;</span>
          }
          {
            logado === 'não' &&
              <span className="my-span">Ops! Verifique se a senha ou usuário estão corretos! &#128577;</span>
          }
        </div>

        <div className="opcoes-login m-4">
          <a href="/" className="mx-2">Recuperar Senha</a>
          <span className="my-span">&#9788;</span>
          <Link to="/signup" className="mx-2">Quero Cadastrar</Link>
        </div>
      </form>
    </div>
  )
}