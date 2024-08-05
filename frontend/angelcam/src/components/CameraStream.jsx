import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js'; 

export const CameraStream = ({ camera }) => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Verifica si `camera` es válido y contiene el array `streams`
    if (camera && camera.streams && camera.streams.length > 0) {
      // Encuentra el primer stream con formato 'hls'
      const hlsStream = camera.streams.find(s => s.format === 'hls');
      if (hlsStream) {
        setStream(hlsStream.url);
      } else {
        console.error('No HLS stream found');
      }
    }
  }, [camera]);

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
