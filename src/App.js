import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './view/login';
import Signup from './view/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
