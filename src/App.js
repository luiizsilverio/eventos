import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './view/login';
import Signup from './view/signup';
import Home from './view/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
