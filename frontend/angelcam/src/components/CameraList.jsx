import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCameras } from "../api";

const CameraList = ({ onSelectCamera }) => {
  const [cameras, setCameras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCameras = async () => {
      try {
        const data = await fetchCameras();
        if (Array.isArray(data)) {
          setCameras(data);
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    getCameras();
  }, []);

  return (
    <section className="flex flex-col w-full h-full px-16 py-16 bg-[#f5f5f5]">
      <h2 className="text-2xl font-bold mb-4">Camera List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cameras.map(camera => (
          <li key={camera.id} className="bg-white p-4 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              <img src={camera.live_snapshot} alt={camera.name} className="mb-4 rounded-md w-full" />
              <h3 className="text-xl font-semibold mb-2">{camera.name}</h3>
              <p className="text-gray-600 mb-4">{camera.status}</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    onSelectCamera(camera); // Pasa la cámara seleccionada
                    navigate(`/live/${camera.id}`);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View Live
                </button>
                <button 
                  onClick={() => navigate(`/recordings/${camera.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View Recordings
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CameraList