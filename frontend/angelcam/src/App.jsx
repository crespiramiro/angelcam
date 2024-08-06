import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import { verifyToken } from './api';
import LiveStream from './pages/LiveStream';
import Recordings from './pages/Recordings';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async (token) => {
      console.log('Token recibido para el login:', token);
      const isValidToken = await verifyToken(token);
      console.log('El token es válido:', isValidToken);

      if (isValidToken) {
          setIsAuthenticated(true);
          console.log('Autenticación exitosa, redirigiendo a /home');
      } else {
          alert('Invalid token. Please try again.');
          console.log('Token inválido.');
      }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
};

    return (
        <Router>
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
            <Route path="/home" element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/live/:cameraId" element={isAuthenticated ? <LiveStream onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/recordings/:cameraId" element={isAuthenticated ? <Recordings onLogout={handleLogout} /> : <Navigate to="/" />} />
        </Routes>
    </Router>
    );
};

export default App;
