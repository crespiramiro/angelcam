import { useState, useEffect } from "react"
import { fetchCameras } from "../api"

export const CameraList = () => {

  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const getCameras = async () => {
        const data = await fetchCameras();
        if (Array.isArray(data)) {
            setCameras(data);
        } else {
            console.error('La respuesta de la API no es un array:', data);
        }
    };

    getCameras();
  }, []);

  return (
    <div>
            <h1>Camera List</h1>
            {cameras.length > 0 ? (
                <ul>
                    {cameras.map((camera, index) => (
                        <li key={index}>{camera.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No cameras available</p>
            )}
        </div>
  );
};

