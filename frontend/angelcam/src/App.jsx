import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { verifyToken } from './api';

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

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
