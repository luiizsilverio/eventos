import { useState } from 'react'
import 'firebase/auth'
import firebase from '../../config/firebase'
import './recup-senha.css'
import NavBar from '../../components/navbar'

export default function RecupSenha() {
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")

  function handleRecuperarSenha() {
    firebase.auth().sendPasswordResetEmail(email)
      .then(response => {
        setMsg('Enviamos um e-mail para você redefinir a sua senha.')
      })
      .catch(erro => {
        setMsg('Verifique se o e-mail está correto.')
      })
  }

  return (
    <>
      <NavBar />
        <form className='text-center form-login mx-auto mt-5'>
          <h2 className='mb-3 fw-bold'>Recuperar Senha</h2>
          <input type="email"
            className="form-control my-2"
            placeholder='E-Mail'
            onChange={e => setEmail(e.target.value)}
          />

          <div className="msg my-4 text-center">
            <span>{ msg }</span>
          </div>

          <button type="button"
            className='btn btn-lg btn-block text-white btn-enviar'
            onClick={handleRecuperarSenha}
          >
            Enviar
          </button>

        </form>
    </>
  )
}