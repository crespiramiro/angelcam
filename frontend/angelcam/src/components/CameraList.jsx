import { useState, useEffect } from "react";
import { fetchCameras } from "../api";

export const CameraList = ({ onSelectCamera }) => {
  const [cameras, setCameras] = useState([]);

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
    <div>
      <h2 className="text-2xl font-bold mb-4">Camera List</h2>
      <ul className="list-disc pl-5">
        {cameras.map(camera => (
          <li 
            key={camera.id} 
            className="cursor-pointer text-blue-500 hover:underline" 
            onClick={() => onSelectCamera(camera)}
          >
            {camera.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
