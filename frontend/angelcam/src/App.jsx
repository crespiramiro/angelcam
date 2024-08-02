import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { CameraDetail } from './components/CameraDetail';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal para el Home */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para ver detalles de una cámara específica */}
        <Route path="/cameras/:id" element={<CameraDetail />} />
        
        {/* Ruta para el login si es necesario */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
