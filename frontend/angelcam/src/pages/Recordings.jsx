import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { fetchCameras } from "../api"; 
import { useEffect, useState } from "react";
import { RecordingsList } from "../components/RecordingsList";

const Recordings = ({ onLogout }) => {
  const { cameraId } = useParams();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const data = await fetchCameras(cameraId);
        setCamera(data);
      } catch (error) {
        console.error('Error fetching camera:', error);
      }
    };

    getCamera();
  }, [cameraId]);

  if (!camera) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="p-4">
        <RecordingsList cameraId={cameraId} />
      </div>
    </div>
  );
};

export default Recordings;
