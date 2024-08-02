import { useState, useEffect } from "react"
import { fetchCameras } from "../api"

export const CameraList = ({selectCamera}) => {

  const [cameras, setCameras] = useState([]);


  useEffect(() => {
    const getCameras = async () => {
      try {
        const data = await fetchCameras();
        setCameras(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCameras();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cameras</h2>
      <ul>
        {cameras.map((camera) => (
          <li key={camera.id}>
            <button onClick={() => onSelectCamera(camera.id)}>{camera.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

