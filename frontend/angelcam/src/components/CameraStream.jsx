import React from 'react';
import Hls from 'hls.js';

const CameraStream = ({ camera }) => {
  console.log('Camera data:', camera);

  if (!camera) {
    return <div>No camera selected</div>;
  }

  const { streams } = camera;

  console.log('Streams data:', streams);

  if (!streams || streams.length === 0) {
    return <div>No streams available for the camera</div>;
  }

  // Find the HLS stream
  const hlsStream = streams.find(stream => stream.format === 'hls');
  if (!hlsStream) {
    return <div>No HLS stream available for the camera</div>;
  }

  return (
    <div>
      <h1>{camera.name}</h1>
      <video id="video" controls></video>
      {hlsStream && <HlsVideo url={hlsStream.url} />}
    </div>
  );
};

const HlsVideo = ({ url }) => {
  React.useEffect(() => {
    const video = document.getElementById('video');
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [url]);

  return null;
};

export default CameraStream;
