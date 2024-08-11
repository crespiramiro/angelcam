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
        const data = await fetchCameras();
        const selectedCamera = data.find(camera => camera.id === parseInt(cameraId)); 
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
    <main className="h-screen w-screen overflow-x-hidden container bg-[#f5f5f5] flex flex-col justify-start items-center" >
      <Header onLogout={onLogout} />
      <div className="p-4">
        <CameraStream camera={camera} />
      </div>
    </main>
  );
};

export default LiveStream;
