import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Login from './view/login';
import Signup from './view/signup';
import Home from './view/home'
import RecupSenha from './view/recup-senha';
import Evento from './view/evento';
import Detalhes from './view/detalhes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos/:user" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recup-senha" element={<RecupSenha />} />
          <Route path="/evento" element={<Evento />} />
          <Route path="/evento/:id" element={<Detalhes />} />
          <Route path="/editar/:id" element={<Evento />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
