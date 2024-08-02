import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js'; 
import { fetchCameraStream } from '../api';

export const CameraStream = ({ cameraId }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const data = await fetchCameraStream(cameraId);
        setStream(data.url);
      } catch (error) {
        console.error('Error fetching camera stream:', error);
      }
    };

    getCameraStream();
  }, [cameraId]);

  useEffect(() => {
    if (stream && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(stream); 
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => {
        hls.destroy(); 
      };
    }
  }, [stream]);

  if (!stream) {
    return <div>Loading stream...</div>;
  }

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};
