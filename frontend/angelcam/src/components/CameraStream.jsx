import { useEffect, useState, useRef } from 'react';
import Hls from 'hls.js';

const CameraStream = ({ camera }) => {
  const [src, setSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const [isHls, setIsHls] = useState(false);

  if (!camera) {
    return <div>No camera selected</div>;
  }

  const { streams } = camera;
  const hlsStream = streams?.find(stream => stream.format === 'hls');
  const mjpegStream = streams?.find(stream => stream.format === 'mjpeg');

  useEffect(() => {
    // Priorizar HLS sobre MJPEG
    if (hlsStream) {
      setIsHls(true);
      setSrc(hlsStream.url);
      console.log('HLS Stream found, setting HLS to true and source to HLS URL');
    } else if (mjpegStream) {
      setIsHls(false);
      setSrc(mjpegStream.url);
      console.log('MJPEG Stream found, setting HLS to false and source to MJPEG URL');
    } else {
      console.log('No suitable stream found');
    }
  }, [hlsStream, mjpegStream]);

  useEffect(() => {
    console.log('isHls:', isHls);
    if (isHls && src && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => {
        hls.destroy();
      };
    }
  }, [src, isHls]);

  const handlePlayPause = () => {
    if (isHls && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full h-[70vh] bg-gray-900 flex flex-col rounded-md items-center">
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-transparent to-gray-800 flex justify-between items-center">
        <div className="flex flex-row justify-normal items-center">
          <h1 className="text-2xl font-bold text-white">{camera.name}</h1>
          <span className="ml-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            Live
          </span>
        </div>
        <button
          className="px-3 py-1 bg-red-500 hover:bg-red-600  text-white rounded-full"
          onClick={handlePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="relative w-full h-full mt-16">
        {isHls ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={false}
            autoPlay
          />
        ) : (
          <img
            src={src}
            alt="Camera stream"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default CameraStream;
