import './login.css'

export default function Login() {
  return (
    <div className="login-content d-flex align-items-center">
      <form className="form-signin mx-auto">
        <h1 className="h3 mb-3 fw-normal text-white fw-bold">Log In</h1>

        <div className="form-floating my-2">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">E-mail</label>
        </div>
        <div className="form-floating my-2">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Senha</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary btn-login" type="submit">Entrar</button>

        <div className="msg-login text-center span my-4">
          <span className="my-span">Você está conectado! &#128526;</span>
          <br />
          <span className="my-span">Ops! Verifique se a senha ou usuário estão corretos! &#128577;</span>
        </div>

        <div className="opcoes-login m-4">
          <a href="#" className="mx-2">Recuperar Senha</a>
          <span className="my-span">&#9788;</span>
          <a href="#" className="mx-2">Quero Cadastrar</a>
        </div>
      </form>
    </div>
  )
}