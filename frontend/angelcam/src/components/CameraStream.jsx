import { useState, useEffect } from 'react';
import { fetchCameraStream } from '../api';

export const CameraStream = ({ cameraId }) => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getStream = async () => {
      try {
        const data = await fetchCameraStream(cameraId);
        setStream(data);
      } catch (error) {
        console.error(error);
      }
    };

    getStream();
  }, [cameraId]);

  return (
    <div>
      {stream ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Live Stream</h2>
          <video src={stream.url} controls autoPlay />
        </div>
      ) : (
        <p>Loading stream...</p>
      )}
    </div>
  );
};

