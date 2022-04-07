import { useState } from "react";
import firebase from '../../config/firebase'
import 'firebase/auth'
import './signup.css'

export default function Signup() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const [loading, setLoading] = useState(false)

  function cadastrar() {
    if (!email || !senha) {
      setErro(true)
      setMensagem("Informe o seu E-mail e Senha")
      return
    }

    setLoading(true)
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(response => {
        setErro(false)
        setMensagem("Usuário cadastrado com sucesso!")
        setLoading(false)
      })
      .catch(erro => {
        setErro(true)
        switch(erro.message) {
          case 'Password should be at least 6 characters':
            setMensagem("A senha deve ter no mínimo 6 caracteres!");
            break;
          case 'The email address is already in use by another account.':
            setMensagem("E-mail já foi cadastrado")
            break;
          case 'The email address is badly formatted.':
            setMensagem("E-mail inválido")
            break;
          default:
            setMensagem("Não foi possível cadastrar. Tente mais tarde.")
        }
        setLoading(false)
      })

  }

  return (
    <div className="form-cadastro">
      <form className="text-center form-login mx-auto mt-5">
        <h3 className="mb-3 text-black fw-bold">Cadastro</h3>

        <input type="email"
          className="form-control my-2"
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password"
          className="form-control my-2"
          placeholder="Senha"
          required
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="button" onClick={ cadastrar }
          className={`
            btn btn-lg mt-2 mb-5 text-white
            btn-cadastro ${loading && "disabled"}
          `}
        >
          {
            loading &&
              <span className="spinner-border spinner-border-sm text-light"></span>
          }
          <span className="px-2">Cadastrar</span>
        </button>

        <div className="msg-login text-black text-center span my-4">
          {
            !erro && !!mensagem &&
              <span className="my-span">{ mensagem } &#128526;</span>
          }
          {
            erro && !!mensagem &&
              <span className="my-span">{ mensagem } &#128577;</span>
          }
        </div>

      </form>
    </div>
  )
}