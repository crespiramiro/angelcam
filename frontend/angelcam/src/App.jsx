import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal para el Home */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para el login si es necesario */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
