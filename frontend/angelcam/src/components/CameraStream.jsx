import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const CameraStream = ({ camera }) => {
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!camera) {
    return <div>No camera selected</div>;
  }

  const { streams } = camera;

  if (!streams || streams.length === 0) {
    return <div>No streams available for the camera</div>;
  }

  // Find the HLS stream
  const hlsStream = streams.find(stream => stream.format === 'hls');
  if (!hlsStream) {
    return <div>No HLS stream available for the camera</div>;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hlsInstance = new Hls();
      hlsInstance.loadSource(hlsStream.url);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
      setHls(hlsInstance);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsStream.url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [hlsStream.url]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
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
          onClick={handlePlayPause}
          className="text-white bg-red-500 px-2 py-1 rounded-full hover:bg-red-600"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="relative w-full h-full mt-16">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
        />
      </div>
    </div>
  );
};

export default CameraStream;
