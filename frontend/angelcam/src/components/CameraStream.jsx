import { useEffect, useState } from 'react';
import { fetchCameraStream } from '../api';

export const CameraStream = ({ cameraId }) => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const data = await fetchCameraStream(cameraId);
        setStream(data.stream); // Ajusta según la estructura de la respuesta
      } catch (error) {
        console.error('Error fetching camera stream:', error);
      }
    };

    getCameraStream();
  }, [cameraId]);

  if (!stream) {
    return <div>Loading stream...</div>;
  }

  return (
    <div>
      <h2>Live Stream</h2>
      <video src={stream} autoPlay controls />
    </div>
  );
};
