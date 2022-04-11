import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// import firebase from '../../config/firebase'
// import 'firebase/auth'
import './navbar.css'

export default function Navbar() {
  const dispatch = useDispatch()

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <i class="fa-solid fa-wine-glass-empty fa-2x text-secondary me-2"></i>
        <strong className="navbar-brand text-secondary fw-bold">My-Events</strong>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link text-secondary" to="/">Home</Link>
            </li>

            {
              useSelector(state => !state.logado) ? (
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/login">Login</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-secondary" to="/">Publicar Evento</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-secondary" to="/">Meus Eventos</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-secondary" to="/login"
                      onClick={() => dispatch({ type: 'LOG_OUT' })}
                    >
                      Sair
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
