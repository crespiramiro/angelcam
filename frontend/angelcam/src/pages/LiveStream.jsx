import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { fetchCameras } from "../api";
import CameraStream from "../components/CameraStream";

const LiveStream = ({ onLogout }) => {
  const { cameraId } = useParams();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const data = await fetchCameras(); // Obtén todas las cámaras
        const selectedCamera = data.find(camera => camera.id === parseInt(cameraId)); // Encuentra la cámara seleccionada
        setCamera(selectedCamera);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    getCameras();
  }, [cameraId]);

  if (!camera) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="p-4">
        <CameraStream camera={camera} />
      </div>
    </div>
  );
};

export default LiveStream;
